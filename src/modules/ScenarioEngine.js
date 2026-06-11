import { scenariosData } from '../scenarios/index.js';

export class ScenarioEngine {
  constructor(instructionElement, selectorElement, logger, gridElement) {
    this.instructionElement = instructionElement;
    this.selectorElement = selectorElement;
    this.logger = logger;
    this.grid = gridElement;
    this.scenarios = scenariosData;
    this.currentScenario = null;
    this.currentStepIndex = 0;
    this.trainingActive = false;
    this.panelEnabled = false;
    this.highlightEnabled = true;
  }

  init() {
    this.selectorElement.innerHTML = '';
    this.scenarios.forEach((scenario, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = scenario.title;
      this.selectorElement.appendChild(option);
    });

    this.selectorElement.onchange = (e) => {
      this.startScenario(parseInt(e.target.value));
    };

    this.startScenario(0);
  }

  startScenario(index) {
    this.currentScenario = this.scenarios[index];
    this.currentStepIndex = 0;
    this.trainingActive = true;
    this.panelEnabled = false;

    document.querySelectorAll('.btn-push, .pilot-light, .switch-selector').forEach(el => {
      el.classList.remove('active', 'blinking');
      el.dataset.solid = "false";

      if (el.classList.contains('switch-selector')) {
        el.classList.remove('pos-center', 'pos-right', 'pos-left');

        const defaultPos = parseInt(el.dataset.default || '0');

        if (el.classList.contains('rotary-12')) {
          el.dataset.pos = defaultPos.toString();
          el.style.transform = `rotate(${defaultPos * 30}deg)`;
        } else if (el.dataset.type === "3") {
          const defaultClass = defaultPos === 0 ? 'pos-left' : (defaultPos === 1 ? 'pos-center' : 'pos-right');
          el.classList.add(defaultClass);
          el.dataset.pos = defaultPos.toString();
          el.dataset.dir = "1";
        } else {
          const defaultClass = defaultPos === 0 ? 'pos-left' : 'pos-right';
          el.classList.add(defaultClass);
          el.dataset.pos = defaultPos.toString();
          el.dataset.dir = "1";
        }
      }
    });

    if (this.currentScenario && this.currentScenario.initialState) {
      this.applyEffects(this.currentScenario.initialState);

      if (this.currentScenario.initialState.switches) {
        this.currentScenario.initialState.switches.forEach(s => {
          const index = (s.row - 1) * 12 + (s.col - 1);
          const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
          if (cell) {
            const sw = cell.querySelector('.switch-selector');
            if (sw) {
              sw.classList.remove('pos-left', 'pos-center', 'pos-right');
              sw.classList.add(s.state);

              if (s.state === 'pos-left') sw.dataset.pos = "0";
              else if (s.state === 'pos-center') sw.dataset.pos = "1";
              else if (s.state === 'pos-right') {
                sw.dataset.pos = sw.dataset.type === "3" ? "2" : "1";
              }
            }
          }
        });
      }

      if (this.currentScenario.initialState.panelEnabled !== undefined) {
        this.panelEnabled = this.currentScenario.initialState.panelEnabled;
      }
    }

    this.logger.clear();
    this.logger.log(`[SYSTEM] Changing scenario...`, 'system');
    this.logger.log(`Starting: ${this.currentScenario.title}`, 'info');

    this.startTraining();
  }

  setHighlightState(enabled) {
    this.highlightEnabled = enabled;
    this.refreshHighlights();
  }

  refreshHighlights() {
    Array.from(this.grid.children).forEach(cell => {
      cell.classList.remove('target-highlight', 'check-highlight');
      cell.removeAttribute('data-seq');
    });

    if (this.highlightEnabled && this.currentScenario) {
      this.currentScenario.steps.forEach((step, stepIndex) => {
        // Alvos de interaÃ§Ã£o (Roxo)
        if (step.target) {
          const index = (step.target.row - 1) * 12 + (step.target.col - 1);
          const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
          if (cell) {
            cell.classList.add('target-highlight');
            const currentSeq = cell.getAttribute('data-seq');
            if (currentSeq) {
              cell.setAttribute('data-seq', currentSeq + ', ' + (stepIndex + 1));
            } else {
              cell.setAttribute('data-seq', (stepIndex + 1).toString());
            }
          }
        }

        // Elementos que apenas devem ser verificados visualmente (Amarelo)
        if (step.check) {
          step.check.forEach(t => {
            const index = (t.row - 1) * 12 + (t.col - 1);
            const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
            if (cell && !cell.classList.contains('target-highlight')) {
              cell.classList.add('check-highlight');
            }
          });
        }

        // Efeitos visuais a serem checados apÃ³s a aÃ§Ã£o (Amarelo)
        if (step.onSuccess) {
          const effects = step.onSuccess;
          const arrays = [effects.solid, effects.startBlink, effects.stopBlink, effects.blinkThenSolid, effects.turnOff];
          arrays.forEach(arr => {
            if (arr) {
              arr.forEach(t => {
                const index = (t.row - 1) * 12 + (t.col - 1);
                const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
                if (cell && !cell.classList.contains('target-highlight')) {
                  cell.classList.add('check-highlight');
                }
              });
            }
          });
        }
      });
    }
  }

  updateUI() {
    if (!this.trainingActive) {
      if (this.currentScenario && this.currentScenario.steps.length === 0) {
        this.instructionElement.textContent = "Free Mode Active. Interact with the panel freely.";
      } else {
        this.instructionElement.textContent = this.currentScenario.completionMessage || "Training Completed.";
      }
      this.instructionElement.classList.add('completed');
      return;
    }
    const step = this.currentScenario.steps[this.currentStepIndex];
    if (step) {
      this.instructionElement.textContent = `Step ${this.currentStepIndex + 1}/${this.currentScenario.steps.length}: ${step.instruction}`;
      this.instructionElement.classList.remove('completed');
    }
  }

  startTraining() {
    if (!this.currentScenario) {
      this.instructionElement.textContent = "Please select a scenario to start.";
      return;
    }

    if (this.currentScenario.steps.length === 0) {
      this.trainingActive = false;
      this.updateUI();
      this.refreshHighlights();
      return;
    }

    this.currentStepIndex = 0;
    this.trainingActive = true;
    this.updateUI();
    this.refreshHighlights();
  }

  validateAction(item, actionResult) {
    if (!this.trainingActive) return true;

    const step = this.currentScenario.steps[this.currentStepIndex];
    if (step.target.row === item.row && step.target.col === item.col) {
      if (step.expectedState === 'hold' && actionResult === 'click') {
        // Just return true to allow the click to be processed without error,
        // but DON'T advance the step.
        return true;
      }
      if (step.expectedState === actionResult || step.expectedState === 'click') {
        return true;
      } else {
        this.logger.log(`INCORRECT ACTION: Set the switch to the correct position. Please read the step description carefully.`, 'error');
        return false;
      }
    } else {
      if (!this.panelEnabled) {
        this.logger.log(`INCORRECT ACTION: Operate the correct control. Please read the step description carefully.`, 'error');
        return false;
      }
    }
    return true;
  }

  processValidAction(item, actionResult) {
    if (!this.trainingActive) return;
    const step = this.currentScenario.steps[this.currentStepIndex];
    if (step.target.row === item.row && step.target.col === item.col) {
      if (step.expectedState === 'hold' && actionResult === 'click') {
        // Do nothing yet, wait for 'hold'
        return;
      }
      if (step.expectedState === actionResult || step.expectedState === 'click') {
        this.processSuccess(step);
      }
    }
  }

  processSuccess(step) {
    this.logger.log(`[Training] Step ${this.currentStepIndex + 1} completed!`, 'system');

    const effects = step.onSuccess;
    if (effects) {
      this.applyEffects(effects);

      const finishDelay = effects.delay || 0;
      setTimeout(() => {
        let justCompleted = false;

        if (effects.enablePanel) {
          this.panelEnabled = true;
          if (this.trainingActive) {
            this.trainingActive = false;
            justCompleted = true;
          }
        }
        
        this.currentStepIndex++;
        
        if (this.currentStepIndex >= this.currentScenario.steps.length) {
          if (this.trainingActive) {
            this.trainingActive = false;
            justCompleted = true;
          }
        }
        
        if (justCompleted) {
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('scenarioCompleted', { 
              detail: { message: this.currentScenario.completionMessage || "Training Completed successfully." }
            }));
          }, 2000);
        }

        this.updateUI();
        this.refreshHighlights();
      }, finishDelay);
    } else {
      this.currentStepIndex++;
      if (this.currentStepIndex >= this.currentScenario.steps.length) {
        if (this.trainingActive) {
          this.trainingActive = false;
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('scenarioCompleted', { 
              detail: { message: this.currentScenario.completionMessage || "Training Completed successfully." }
            }));
          }, 2000);
        }
      }
      this.updateUI();
      this.refreshHighlights();
    }
  }

  applyEffects(effects) {
    if (effects.startBlink) {
      effects.startBlink.forEach(t => {
        const index = (t.row - 1) * 12 + (t.col - 1);
        const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
        if (!cell) return;
        const btn = cell.querySelector('button');
        if (btn) btn.classList.add('blinking');
      });
    }
    if (effects.stopBlink) {
      effects.stopBlink.forEach(t => {
        const index = (t.row - 1) * 12 + (t.col - 1);
        const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
        if (!cell) return;
        const btn = cell.querySelector('button');
        if (btn) btn.classList.remove('blinking');
      });
    }
    if (effects.solid) {
      effects.solid.forEach(t => {
        const index = (t.row - 1) * 12 + (t.col - 1);
        const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
        if (!cell) return;
        const btn = cell.querySelector('button, div:not(.control-label):not(.control-options)');
        if (btn) {
          setTimeout(() => {
            btn.classList.remove('blinking');
            btn.classList.add('active');
            btn.dataset.solid = "true";
          }, t.delay || 0);
        }
      });
    }
    if (effects.turnOff) {
      effects.turnOff.forEach(t => {
        const index = (t.row - 1) * 12 + (t.col - 1);
        const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
        if (!cell) return;
        const btn = cell.querySelector('button, div:not(.control-label):not(.control-options)');
        if (btn) {
          btn.classList.remove('blinking', 'active');
          btn.dataset.solid = "false";
        }
      });
    }
    if (effects.blinkThenSolid) {
      effects.blinkThenSolid.forEach(t => {
        const index = (t.row - 1) * 12 + (t.col - 1);
        const cell = this.grid.querySelector(`[data-grid-index="${index}"]`);
        if (!cell) return;
        const btn = cell.querySelector('button, div:not(.control-label):not(.control-options)');
        if (btn) {
          btn.classList.add('blinking');
          const delay = (t.blinks || 4) * 500;
          setTimeout(() => {
            btn.classList.remove('blinking');
            btn.classList.add('active');
            btn.dataset.solid = "true";
          }, delay);
        }
      });
    }
  }
}
