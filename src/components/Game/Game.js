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
      <nhl-game-header
        abstract-state="${gameData?.status?.abstractGameState}"
        detailed-state="${gameData?.status?.detailedState}"
      ></nhl-game-header>
      
      <section class="game-teams">
        <nhl-game-team
          class="team-away"
          data-id="${awayTeam.id}"
          team-name="${awayTeam.name}"
          goals="${awayStats.goals}"
        ></nhl-game-team>

        <div class="game-divider">@</div>
        
        <nhl-game-team
          class="team-home"
          data-id="${homeTeam.id}"
          team-name="${homeTeam.name}"
          goals="${homeStats.goals}"
        ></nhl-game-team>
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
