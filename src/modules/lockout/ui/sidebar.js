export function initSidebar(scenarios) {
  const areaList = document.getElementById('area-list');
  if (!areaList) return;

  let activeId = null;

  function selectScenario(scenario) {
    // Clear old active tags
    document.querySelectorAll('.lockout-tag').forEach(el => {
      el.classList.remove('active');
    });

    // If clicking same item, deselect
    if (activeId === scenario.id) {
      const activeEl = document.querySelector(`.area-item[data-id="${scenario.id}"]`);
      if (activeEl) activeEl.classList.remove('active');
      activeId = null;
      return;
    }

    // Remove old active from list
    if (activeId) {
      const oldActive = document.querySelector(`.area-item[data-id="${activeId}"]`);
      if (oldActive) oldActive.classList.remove('active');
    }

    // Set new active
    activeId = scenario.id;
    const newItem = document.querySelector(`.area-item[data-id="${scenario.id}"]`);
    if (newItem) newItem.classList.add('active');
    
    // Highlight specific lockout tags based on the scenario's tag list
    document.querySelectorAll('.lockout-tag').forEach(tagEl => {
      const tagText = tagEl.dataset.tag || tagEl.textContent.trim();
      if (scenario.tags.includes(tagText)) {
        tagEl.classList.add('active');
      }
    });
    
    // Smooth scroll the sidebar
    if (newItem) {
      newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Render scenarios to sidebar
  scenarios.forEach(scenario => {
    const li = document.createElement('li');
    li.className = 'area-item';
    li.dataset.id = scenario.id;
    li.innerHTML = `
      <span class="area-title">${scenario.title}</span>
      <span class="area-desc">${scenario.desc}</span>
    `;
    
    li.addEventListener('click', () => {
      selectScenario(scenario);
    });

    areaList.appendChild(li);
  });

  // Mobile menu toggle logic
  const mobileBtn = document.getElementById('mobile-dropdown-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      areaList.classList.toggle('show');
    });

    // Close menu when a scenario is selected (on mobile)
    areaList.addEventListener('click', (e) => {
      if (e.target.closest('.area-item') && window.innerWidth <= 768) {
        areaList.classList.remove('show');
        mobileBtn.textContent = '▼ ' + e.target.closest('.area-item').querySelector('.area-title').textContent;
      }
    });
  }
}
