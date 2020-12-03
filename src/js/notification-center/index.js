import './style/notification-center.scss';
import notification from './template/notification.hbs';

const ERROR_ICON = 'error';
const MESSAGE_ICON = 'list';
const ERROR_COLOR = 'rgba(252, 69, 69, 0.6)';
const MESSAGE_COLOR = 'rgba(123, 0, 255, 0.6)';

class Notification {
  constructor() {
    this.addNotificationCenter();
    this._heapOfMessages = {};
  }
  addNotificationCenter() {
    this._box = document.createElement('div');
    this._box.classList.add('notification-center');
    this._box.classList.add('notification-center--hide');

    document.body.append(this._box);
    this._closeBox = document.createElement('button');
    this._closeBox.classList.add('notification-center__button');
    this._closeBox.innerHTML = '<i class="material-icons">clear</i>';
    this._box.append(this._closeBox);
    this._closeBox.addEventListener('click', () => {
      this.hideNotificationCenter();
    });
  }
  showNotificationCenter() {
    this._box.classList.remove('notification-center--hide');
  }
  hideNotificationCenter() {
    this._box.classList.add('notification-center--hide');
  }
  setNotificationCenterWidth(width) {
    this._box.style.width = width;
  }
  message({
    text = '',
    title = 'MESSAGE',
    icon = MESSAGE_ICON,
    color = MESSAGE_COLOR,
  }) {
    const id = Date.now() * Math.random();
    this._box.insertAdjacentHTML(
      'beforeend',
      notification({ id, icon, title, text, color }),
    );
    this.showNotificationCenter();
    this.addToHeapOfMessages(id);
    this.addCloseButtonListener(id);
    this.showMessage(id);

    return id;
  }
  error({
    text = '',
    title = 'ERROR',
    icon = ERROR_ICON,
    color = ERROR_COLOR,
  }) {
    this.message({ text, title, icon, color });
  }
  addCloseButtonListener(id) {
    this._heapOfMessages[id]
      .querySelector('button')
      .addEventListener('click', () => {
        this.removeMessage(id);
      });
  }
  removeMessage(id) {
    this._heapOfMessages[id].classList.add('notification--remove');
    setTimeout(() => {
      this.removeMessageFromNotificationCenter(id);
      this.removeMessageFromHeap(id);
      if (this.isHeapOfMessagesEmpty()) {
        this.hideNotificationCenter();
      }
    }, 500);
  }
  showMessage(id) {
    setTimeout(() => {
      this._heapOfMessages[id].classList.remove('notification--create');
    }, 20);
  }
  addToHeapOfMessages(id) {
    this._heapOfMessages[id] = document.querySelector(
      `.notification[data-notification-id="${id}"`,
    );
  }
  removeMessageFromHeap(id) {
    delete this._heapOfMessages[id];
  }
  removeMessageFromNotificationCenter(id) {
    this._heapOfMessages[id].remove();
  }
  isHeapOfMessagesEmpty() {
    return Object.keys(this._heapOfMessages).length === 0 ? true : false;
  }
}
const notificationCenter = new Notification();

export { notificationCenter };
