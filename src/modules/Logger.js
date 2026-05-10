export class Logger {
  constructor(containerElement) {
    this.container = containerElement;
  }

  clear() {
    this.container.innerHTML = '';
  }

  log(message, type = 'normal') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const prefix = type === 'system' ? '> ' : (type === 'error' ? '[!] ' : '');
    entry.textContent = `${prefix}${message}`;
    this.container.appendChild(entry);
    this.container.scrollTop = this.container.scrollHeight;
  }
}
