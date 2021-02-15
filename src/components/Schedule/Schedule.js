import { DataService } from '../../services/DataService.js';

class Schedule extends HTMLElement {
  constructor() {
    super();

    this.start = this.getAttribute('start');
    this.end = this.getAttribute('end');

    this.timeout;

    const date = new Date();
    this.today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`;
  }

  getData = async () => {
    let scheduleUrl = '/api/v1/schedule';
    if (this.start) {  
      scheduleUrl += `?startDate=${this.start}&endDate=${this.end || this.today}`
    }

    const json = await DataService.fetch(scheduleUrl);
    this.render(json);
  }

  render = json => {
    // nothing yet
    console.log(json);
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
    this.getData();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
      this.updateData();
    }
  }

  static get observedAttributes() {
    return [
      'start',
      'end'
    ];
  }
}

export const schedule = () => customElements.define('nhl-schedule', Schedule);
