export function initPhotosModal() {
  const btn = document.getElementById('view-photos-btn');
  const modal = document.getElementById('photos-modal');
  const closeBtn = document.getElementById('photos-modal-close');
  const grid = document.getElementById('photos-grid');

  if (!btn || !modal || !closeBtn || !grid) return;

  let photoUrls = [];
  try {
    const photoModules = import.meta.glob('/assets/lockout/lockout_item*.*', { eager: true, query: '?url', import: 'default' });
    photoUrls = Object.values(photoModules);
  } catch(e) {
    console.warn("import.meta.glob not supported or failed, using fallback");
  }

  // Fallback if empty
  if (photoUrls.length === 0) {
    for (let i = 1; i <= 3; i++) {
      photoUrls.push(`/assets/lockout/lockout_item${i}.jpg`);
    }
  }

  let populated = false;
  function populateGrid() {
    if (populated) return;
    photoUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.style.width = '100%';
      img.style.height = '250px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '8px';
      img.style.border = '2px solid #28a745';
      img.style.cursor = 'pointer';
      img.style.transition = 'transform 0.2s, box-shadow 0.2s';
      
      img.onmouseenter = () => {
        img.style.transform = 'scale(1.02)';
        img.style.boxShadow = '0 5px 15px rgba(40,167,69,0.5)';
      };
      
      img.onmouseleave = () => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = 'none';
      };
      
      img.addEventListener('click', () => {
        window.open(url, '_blank');
      });

      grid.appendChild(img);
    });
    populated = true;
  }

  btn.addEventListener('click', () => {
    populateGrid();
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
