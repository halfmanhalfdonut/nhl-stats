import { DataService } from '../../services/DataService.js';

class Game extends HTMLElement {
  constructor() {
    super();
  }

  getData = async () => {
    const json = await DataService.fetch(this.link);
    this.render(json);
  }

  render = json => {
    const { gameData, liveData } = json;
    const boxscoreTeams = liveData.boxscore.teams;
    const awayTeam = gameData?.teams?.away;
    const homeTeam = gameData?.teams?.home;
    const awayStats = boxscoreTeams.away.teamStats.teamSkaterStats;
    const homeStats = boxscoreTeams.home.teamStats.teamSkaterStats;
    
    const html = `
        <header class="game-state">
          <span class="abstract-state">${gameData?.status?.abstractGameState}</span>
          <span class="detailed-stte">${gameData?.status?.detailedState}</span>
        </header>
        <section class="game-teams">
          <div data-id="${awayTeam.id}" class="team-away">
            <div class="team-name team-${awayTeam.id}">${awayTeam.name}</div>
            <div class="team-score">${awayStats.goals}</div>
          </div>
          <div class="game-divider">@</div>
          <div data-id="${homeTeam.id}" class="team-home">
            <div class="team-name team-${homeTeam.id}">${homeTeam.name}</div>
            <div class="team-score">${homeStats.goals}</div>
          </div>
        </section>
    `;

    const gameWrapper = document.createElement('section');
    gameWrapper.classList.add('game');
    gameWrapper.innerHTML = html;
    this.appendChild(gameWrapper);
  }

  /**
   * We're watching two attributes and they'll likely be changed together.
   * this should prevent extra requests with broken pieces
   */
  updateData = () => {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.getData();
    }, 100);
  }

  connectedCallback() {
    this.link = this.getAttribute('data-link');
    this.getData();
  }
}

export const game = () => customElements.define('nhl-game', Game);
