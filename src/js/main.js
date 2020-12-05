import loginMarkup from '../templates/login.hbs'

const mainPage = document.querySelector('body');

mainPage.insertAdjacentHTML('afterbegin', loginMarkup());

