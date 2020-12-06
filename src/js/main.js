import loginMarkup from '../templates/login.hbs';
import registerMarkup from '../templates/register.hbs';

const mainPage = document.querySelector('body');

mainPage.insertAdjacentHTML('afterbegin', loginMarkup());
// mainPage.insertAdjacentHTML('afterbegin', registerMarkup());

