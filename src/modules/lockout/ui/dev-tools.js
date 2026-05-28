export function initDevTools() {
  const devAlignBtn = document.getElementById('dev-align-btn');
  if (devAlignBtn) {
    devAlignBtn.addEventListener('click', () => {
      alert("Alignment Mode ENABLED! Drag the tags to their perfect positions.\nCheck the browser console (F12) to copy the updated HTML coordinates when you drop a tag.");
      
      // Force all tags to be visible
      const allTags = document.querySelectorAll('.lockout-tag');
      allTags.forEach(tag => {
        tag.style.opacity = '1';
        tag.style.pointerEvents = 'auto';
        tag.style.cursor = 'move';
        tag.style.zIndex = '100';
        tag.style.animation = 'none'; // stop pulsing
        tag.classList.add('draggable-tag');
      });

      // Implement Drag and Drop
      const container = document.querySelector('.layout-container');
      if (!container) return;
      
      let draggedElement = null;
      let startX, startY, initialLeft, initialTop;

      container.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('draggable-tag')) {
          draggedElement = e.target;
          
          const rect = container.getBoundingClientRect();
          startX = e.clientX - rect.left;
          startY = e.clientY - rect.top;
          
          // Current percentages
          initialLeft = parseFloat(draggedElement.style.left) || 0;
          initialTop = parseFloat(draggedElement.style.top) || 0;
        }
      });

      container.addEventListener('mousemove', (e) => {
        if (!draggedElement) return;
        
        const rect = container.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        const deltaPercentX = (deltaX / rect.width) * 100;
        const deltaPercentY = (deltaY / rect.height) * 100;
        
        let newLeft = initialLeft + deltaPercentX;
        let newTop = initialTop + deltaPercentY;
        
        draggedElement.style.left = newLeft.toFixed(2) + '%';
        draggedElement.style.top = newTop.toFixed(2) + '%';
      });

      container.addEventListener('mouseup', () => {
        if (draggedElement) {
          console.log(`Updated ${draggedElement.textContent.trim()}: <div class="lockout-tag ${draggedElement.classList[1]}" style="top: ${draggedElement.style.top}; left: ${draggedElement.style.left};">${draggedElement.textContent.trim()}</div>`);
          draggedElement = null;
        }
      });
      
      container.addEventListener('mouseleave', () => {
        draggedElement = null;
      });
    });
  }
}
