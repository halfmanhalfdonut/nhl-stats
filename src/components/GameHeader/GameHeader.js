class GameHeader extends HTMLElement {
  constructor() {
    super();

    const abstractState = this.getAttribute('abstract-state');
    const detailedState = this.getAttribute('detailed-state');

    const html = `
      <span class="abstract-state">${abstractState}</span>
      <span class="detailed-state">${detailedState}</span>
    `;

    const wrapper = document.createElement('header');
    wrapper.classList.add('game-state');
    wrapper.innerHTML = html;

    this.appendChild(wrapper);
  }
}

export const gameHeader = () => customElements.define('nhl-game-header', GameHeader);
