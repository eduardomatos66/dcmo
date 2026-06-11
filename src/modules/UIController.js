export class UIController {
  constructor(engine) {
    this.engine = engine;
    this.scenarioSelector = document.getElementById('scenario-selector');
    this.resetBtn = document.getElementById('reset-scenario-btn');
    this.highlightCb = document.getElementById('highlight-targets-cb');
    
    // Modals
    this.qrBtn = document.getElementById('qr-code-btn');
    this.qrModal = document.getElementById('qr-modal');
    this.qrModalClose = document.getElementById('qr-modal-close');
    
    this.tutorialBtn = document.getElementById('tutorial-btn');
    this.tutorialModal = document.getElementById('tutorial-modal');
    this.tutorialModalClose = document.getElementById('tutorial-modal-close');
  }

  init() {
    this.bindSimulatorControls();
    this.bindModals();
  }

  bindSimulatorControls() {
    if (this.resetBtn && this.scenarioSelector) {
      this.resetBtn.addEventListener('click', () => {
        const idx = parseInt(this.scenarioSelector.value);
        this.engine.startScenario(idx);
      });
    }

    if (this.highlightCb) {
      this.highlightCb.addEventListener('change', (e) => {
        this.engine.setHighlightState(e.target.checked);
        const legend = document.getElementById('target-legend');
        if (legend) {
          legend.style.display = e.target.checked ? 'flex' : 'none';
        }
      });
    }
  }

  bindModals() {
    // QR Modal
    if (this.qrBtn && this.qrModal && this.qrModalClose) {
      this.qrBtn.addEventListener('click', () => {
        this.qrModal.style.display = 'flex';
      });
      
      this.qrModalClose.addEventListener('click', () => {
        this.qrModal.style.display = 'none';
      });

      this.qrModal.addEventListener('click', (e) => {
        if (e.target === this.qrModal) {
          this.qrModal.style.display = 'none';
        }
      });
    }

    // Tutorial Modal
    if (this.tutorialBtn && this.tutorialModal && this.tutorialModalClose) {
      this.tutorialBtn.addEventListener('click', () => {
        this.tutorialModal.style.display = 'flex';
      });
      
      this.tutorialModalClose.addEventListener('click', () => {
        this.tutorialModal.style.display = 'none';
      });

      this.tutorialModal.addEventListener('click', (e) => {
        if (e.target === this.tutorialModal) {
          this.tutorialModal.style.display = 'none';
        }
      });
    }

    // Success Modal
    const successModal = document.getElementById('success-modal');
    const successModalClose = document.getElementById('success-modal-close');
    const successModalOk = document.getElementById('success-modal-ok');
    const successMessage = document.getElementById('success-message');

    if (successModal && successModalClose && successModalOk) {
      const closeSuccess = () => { successModal.style.display = 'none'; };
      successModalClose.addEventListener('click', closeSuccess);
      successModalOk.addEventListener('click', closeSuccess);
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccess();
      });

      document.addEventListener('scenarioCompleted', (e) => {
        if (successMessage) {
          successMessage.textContent = e.detail.message;
        }
        successModal.style.display = 'flex';
      });
    }
  }
}
