import { game } from './src/components/Game/Game.js';
import { schedule } from './src/components/Schedule/Schedule.js';

const App = async () => {
  console.log('Initializing custom elements');
  schedule();
  game();
};

document.addEventListener('DOMContentLoaded', App);
