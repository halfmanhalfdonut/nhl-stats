import { schedule } from './src/components/Schedule/Schedule.js';

const App = async () => {
  console.log('Initializing custom elements');
  schedule();
};


document.addEventListener('DOMContentLoaded', App);
