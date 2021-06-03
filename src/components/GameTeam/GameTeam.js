class GameTeam extends HTMLElement {
  constructor() {
    super();

    const id = this.getAttribute('data-id');
    const name = this.getAttribute('team-name');
    const goals = this.getAttribute('goals');

    const html = `
      <div class="team-name team-${id}">${name}</div>
      <div class="team-score">${goals}</div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    this.appendChild(wrapper);
  }
}

export const gameTeam = () => customElements.define('nhl-game-team', GameTeam);
