import './style/notification-center.scss';
import notification from './template/notification.hbs';

const ERROR_ICON = 'error';
const MESSAGE_ICON = 'list';
const ERROR_COLOR = '#c0a4a4';
const MESSAGE_COLOR = '#c0b3a4';

class Notification {
  constructor() {
    this.addNotificationCenter();
    this._queue = {};
  }
  addNotificationCenter() {
    this._box = document.createElement('div');
    this._box.classList.add('notification-center');
    this._box.classList.add('notification--hide');
    document.body.append(this._box);
    this._closeBox = document.createElement('button');
    this._closeBox.classList.add('notification-center__button');
    this._closeBox.textContent = 'close';
    this._box.append(this._closeBox);
    this._closeBox.addEventListener('click', () => {
      this.hideCenter();
    });
  }
  message({
    text = '',
    title = 'message',
    icon = MESSAGE_ICON,
    color = MESSAGE_COLOR,
  }) {
    const id = Date.now() * Math.random();
    this._box.insertAdjacentHTML(
      'beforeend',
      notification({ id, icon, title, text, color }),
    );
    this.showCenter();
    this.addToQueue(id);
    this.addCloseListener(id);
  }
  showCenter() {
    this._box.classList.remove('notification--hide');
  }
  hideCenter() {
    this._box.classList.add('notification--hide');
  }
  error({
    text = '',
    title = 'error',
    icon = ERROR_ICON,
    color = ERROR_COLOR,
  }) {
    this.message({ text, title, icon, color });
  }
  addToQueue(id) {
    this._queue[id] = document.querySelector(
      `.notification[data-notification-id="${id}"`,
    );
  }
  addCloseListener(id) {
    this._queue[id].querySelector('button').addEventListener('click', () => {
      this.removeMessage(id);
    });
  }
  isQueueEmpty() {
    return Object.keys(this._queue).length === 0 ? true : false;
  }
  removeMessage(id) {
    this._queue[id].classList.add('notification--remove');
    setTimeout(() => {
      this._queue[id].remove();
      delete this._queue[id];
      if (this.isQueueEmpty()) {
        this.hideCenter();
      }
    }, 500);
  }
}
const notificationCenter = new Notification();

export { notificationCenter };
