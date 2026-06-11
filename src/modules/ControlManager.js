export class ControlManager {
  constructor(logger, engine) {
    this.logger = logger;
    this.engine = engine;
    this.blinkLabelsList = ['LADLE HOME POSITION', 'DCM HOME', 'LAMP TEST', 'CYCLE START'];
  }

  handleInteraction(item, element, e) {
    let actionResult = 'click';

    if (item.type.includes('selector')) {
      const sw = element.querySelector('.switch-selector');
      if (sw && e) {
        const clickDir = e.offsetX < (sw.offsetWidth / 2) ? -1 : 1;
        
        if (item.type.includes('12-position')) {
          let pos = parseInt(sw.dataset.pos || '0');
          pos += clickDir;
          if (pos > 11) pos = 0;
          if (pos < 0) pos = 11;
          
          actionResult = `pos-${pos}`;
          if (!this.engine.validateAction(item, actionResult)) return;

          sw.dataset.pos = pos;
          sw.style.transform = `rotate(${pos * 30}deg)`;
          this.logger.log(`${item.label}: POSITION ${pos}`);
          
          this.engine.processValidAction(item, actionResult);
          return;
        }
        else if (item.type.includes('3-position')) {
          let pos = parseInt(sw.dataset.pos || '1');
          let newPos = pos + clickDir;
          if (newPos > 2) newPos = 2;
          if (newPos < 0) newPos = 0;
          
          if (pos === newPos) return; // did not move
          
          actionResult = newPos === 0 ? 'pos-left' : newPos === 1 ? 'pos-center' : 'pos-right';
          
          if (!this.engine.validateAction(item, actionResult)) return;

          sw.dataset.pos = newPos;
          sw.classList.remove('pos-left', 'pos-center', 'pos-right');
          sw.classList.add(actionResult);
          
          const optText = item.options ? item.options[newPos] : newPos;
          this.logger.log(`${item.label}: ${optText}`);
          
          this.engine.processValidAction(item, actionResult);
          return;
        } else {
          // 2 position switch
          let pos = parseInt(sw.dataset.pos || '0');
          let newPos = pos + clickDir;
          if (newPos > 1) newPos = 1;
          if (newPos < 0) newPos = 0;
          
          if (pos === newPos) return;

          actionResult = newPos === 0 ? 'pos-left' : 'pos-right';
          
          if (!this.engine.validateAction(item, actionResult)) return;

          sw.dataset.pos = newPos;
          sw.classList.remove('pos-left', 'pos-right');
          sw.classList.add(actionResult);
          
          const optText = item.options ? item.options[newPos] : newPos;
          this.logger.log(`${item.label}: ${optText}`);
          
          this.engine.processValidAction(item, actionResult);
          return;
        }
      }
    }

    if (!this.engine.validateAction(item, actionResult)) return;

    if (item.type.includes('push button') || item.type.includes('toggle')) {
      this.logger.log(`Command sent: ${item.label}`);
    }
    
    if (item.label === 'EMERGENCY') {
      this.logger.log('!!! EMERGENCY STOP ACTIVATED !!!', 'error');
      element.querySelector('button').classList.toggle('active');
    }

    if (item.type.includes('Illuminated') || item.type.includes('Pilot light')) {
      if (!this.blinkLabelsList.includes(item.label.toUpperCase())) {
        const btn = element.querySelector('button, div:not(.control-label):not(.control-options)');
        if (btn) {
          btn.classList.toggle('active');
          const state = btn.classList.contains('active') ? 'ON' : 'OFF';
          this.logger.log(`Light ${item.label} changed to: ${state}`);
        }
      }
    }

    this.engine.processValidAction(item, actionResult);
  }

  attachEvents(item, element) {
    if (item.type.includes('selector')) {
      const sw = element.querySelector('.switch-selector');
      if (sw) {
        sw.addEventListener('mousedown', (e) => this.handleInteraction(item, element, e));
      }
      return;
    }

    const btn = element.querySelector('button');
    if (!btn) return;

    let holdTimeout;
    let isHolding = false;
    let wasBlinking = false;
    
    btn.addEventListener('mousedown', () => {
      this.handleInteraction(item, element);
      if (item.label === 'LAMP TEST') {
        document.querySelectorAll('.btn-illuminated, .pilot-light').forEach(el => {
          el.classList.add('lamp-test-on');
        });
      }
      if (this.blinkLabelsList.includes(item.label.toUpperCase())) {
        if (btn.dataset.solid === "true") return;
        isHolding = true;
        wasBlinking = btn.classList.contains('blinking');
        btn.classList.add('blinking');
        holdTimeout = setTimeout(() => {
          btn.classList.remove('blinking');
          btn.classList.add('active');
          btn.dataset.solid = "true";
          this.logger.log(`${item.label}: CONTINUOUS MODE ON`);
          this.engine.processValidAction(item, 'hold');
        }, 5000);
      }
    });

    btn.addEventListener('mouseup', () => {
      if (item.label === 'LAMP TEST') {
        document.querySelectorAll('.lamp-test-on').forEach(el => {
          el.classList.remove('lamp-test-on');
        });
      }
      if (this.blinkLabelsList.includes(item.label.toUpperCase())) {
        clearTimeout(holdTimeout);
        if (isHolding) {
          isHolding = false;
          if (!wasBlinking && btn.dataset.solid !== "true") {
            btn.classList.remove('blinking');
          }
        }
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (item.label === 'LAMP TEST') {
        document.querySelectorAll('.lamp-test-on').forEach(el => {
          el.classList.remove('lamp-test-on');
        });
      }
      if (this.blinkLabelsList.includes(item.label.toUpperCase())) {
        clearTimeout(holdTimeout);
        if (isHolding) {
          isHolding = false;
          if (!wasBlinking && btn.dataset.solid !== "true") {
            btn.classList.remove('blinking');
          }
        }
      }
    });
  }
}
