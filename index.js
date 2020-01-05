import './src/scss/index.scss';
import moment from 'moment';
import App from './src/js/App';

// prettier-ignore
const firstDateOfWeek = moment().isoWeekday(1).format('YYYY-MM-DD');
const repositoryWrapper = document.querySelector('#js-repo-wrapper');
const closeButtons = document.querySelectorAll('.select-menu__close-button');
const langButtonContainer = document.querySelector('#js-lang-buttons');
const langButtons = langButtonContainer.querySelectorAll('.items__button');
const frameworkContainer = document.querySelector('#js-framework-buttons');
const frameworkButtons = frameworkContainer.querySelectorAll('.items__button');

const app = new App(
  firstDateOfWeek,
  repositoryWrapper,
  closeButtons,
  langButtons,
  frameworkButtons,
);

app.mount();
