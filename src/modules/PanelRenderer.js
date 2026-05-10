export class PanelRenderer {
  constructor(gridElement, data, controlManager) {
    this.grid = gridElement;
    this.data = data;
    this.controlManager = controlManager;
  }

  render() {
    this.grid.innerHTML = '';
    const cells = new Array(6 * 12).fill(null);

    this.data.forEach(item => {
      if (item.row && item.col) {
        const index = (item.row - 1) * 12 + (item.col - 1);
        cells[index] = item;
      }
    });

    cells.forEach((item, i) => {
      if (item && item.type.includes('continuation')) {
        return; // Pula renderização da continuação para não quebrar o grid
      }

      const container = document.createElement('div');
      container.className = 'control-container';
      container.dataset.gridIndex = i;
      
      if (item) {
        if (item.label.includes('COREPULLS')) {
          container.style.gridColumn = 'span 2';
        }
        this.buildControl(item, container);
        this.controlManager.attachEvents(item, container);
      }
      
      this.grid.appendChild(container);
    });
  }

  buildControl(item, container) {
    let controlHtml = '';
    
    if (item.type.includes('Blank')) {
      controlHtml = `<div class="dummy-btn"></div>`;
    } 
    else if (item.label === 'EMERGENCY') {
      controlHtml = `<button class="btn-emergency"></button>`;
    }
    else if (item.type.includes('12-position')) {
      let numbersHtml = '';
      for (let i = 0; i <= 11; i++) {
        numbersHtml += `<span class="rotary-num" style="transform: rotate(${i * 30}deg) translateY(-28px) rotate(${-i * 30}deg)">${item.options ? item.options[i] : i}</span>`;
      }
      const defaultPos = item.default || 0;
      controlHtml = `
        <div class="rotary-12-container">
          ${numbersHtml}
          <div class="switch-selector rotary-12" data-pos="${defaultPos}" data-default="${defaultPos}" style="transform: rotate(${defaultPos * 30}deg);"></div>
        </div>
      `;
    }
    else if (item.type.includes('selector')) {
      const is3Pos = item.type.includes('3-position');
      const numOptions = is3Pos ? 3 : 2;
      const defaultPos = item.default !== undefined ? item.default : (is3Pos ? 1 : 0);
      const initialClass = defaultPos === 0 ? 'pos-left' : (defaultPos === 1 && is3Pos ? 'pos-center' : 'pos-right');

      let optionsHtml = '';
      if (item.options) {
        optionsHtml = item.options.map(opt => `<span>${opt}</span>`).join('');
      }

      controlHtml = `
        <div class="control-options">${optionsHtml}</div>
        <div class="switch-selector ${initialClass}" data-pos="${defaultPos}" data-type="${numOptions}" data-default="${defaultPos}" data-dir="1"></div>
      `;
    }
    else if (item.type.includes('Pilot light')) {
      controlHtml = `<div class="pilot-light color-${item.color.toLowerCase()}"></div>`;
    }
    else {
      const isIlluminated = item.type.includes('Illuminated') ? ' btn-illuminated' : '';
      controlHtml = `<button class="btn-push${isIlluminated} color-${item.color.toLowerCase()}"></button>`;
    }

    container.innerHTML = `
      <div class="control-label">${this.cleanLabel(item.label)}</div>
      ${controlHtml}
    `;
  }

  cleanLabel(label) {
    return label;
  }
}
