import './style/notification-center.scss';
import notification from './template/notification.hbs';

const ERROR_ICON = 'error';
const MESSAGE_ICON = 'list';
const ERROR_COLOR = 'rgba(252, 69, 69, 0.6)';
const MESSAGE_COLOR = 'rgba(123, 0, 255, 0.6)';

class Notification {
  constructor() {
    this._addNotificationCenter();
    this._addNotificationCenterOpenButton();
    this._heapOfMessages = {};
  }
  _addNotificationCenter() {
    this._createNotificationCenter();
    this._createHideBoxButton();
    this._createClearAllButton();
  }
  _createNotificationCenter() {
    this._notificationCenter = document.createElement('div');
    this._notificationCenter.classList.add('notification-center');
    this._notificationCenter.classList.add('notification-center--hide');
    document.body.append(this._notificationCenter);
  }
  _createHideBoxButton() {
    this._hideBox = document.createElement('button');
    this._hideBox.classList.add('notification-center__hide-button');
    this._hideBox.innerHTML = '<i class="material-icons">visibility_off</i>';
    this._notificationCenter.append(this._hideBox);
    this._hideBox.addEventListener('click', () => {
      this._hideNotificationCenter();
      this._showNotificationCenterOpenButton();
    });
  }
  _createClearAllButton() {
    this._clearAll = document.createElement('button');
    this._clearAll.classList.add('notification-center__clear-button');
    this._clearAll.innerHTML = '<i class="material-icons">delete</i>';
    this._notificationCenter.append(this._clearAll);
    this._clearAll.addEventListener('click', this._clearAllMessages.bind(this));
  }
  _showNotificationCenter() {
    this._notificationCenter.classList.remove('notification-center--hide');
    this._ifNoMessages();
  }
  _hideNotificationCenter() {
    this._notificationCenter.classList.add('notification-center--hide');
  }
  _ifNoMessages() {
    if (!this._isHeapOfMessagesEmpty()) return;
    const messageId = this.error({
      text: '',
      title: 'NO MORE MESSAGES',
      icon: 'search',
    });
    setTimeout(this.removeMessage.bind(this, messageId), 1000);
  }
  _addNotificationCenterOpenButton() {
    this._notificationCenterOpenButton = document.createElement('button');
    this._notificationCenterOpenButton.classList.add(
      'notification-center__open-button',
    );
    this._notificationCenterOpenButton.innerHTML =
      '<i class="material-icons">visibility</i>';
    document.body.append(this._notificationCenterOpenButton);
    this._notificationCenterOpenButton.addEventListener('click', () => {
      this._hideNotificationCenterOpenButton();
      this._showNotificationCenter();
    });
  }
  _hideNotificationCenterOpenButton() {
    this._notificationCenterOpenButton.classList.add(
      'notification-center__open-button--hide',
    );
  }
  _showNotificationCenterOpenButton() {
    this._notificationCenterOpenButton.classList.remove(
      'notification-center__open-button--hide',
    );
  }
  _hideNotificationCenterIfHeapEmpty() {
    if (this._isHeapOfMessagesEmpty()) {
      this._hideNotificationCenter();
      this._showNotificationCenterOpenButton();
    }
  }
  setNotificationCenterWidth(width) {
    this._notificationCenter.style.width = width;
  }
  message({
    text = '',
    title = 'MESSAGE',
    icon = MESSAGE_ICON,
    color = MESSAGE_COLOR,
  }) {
    const id = Date.now() * Math.random();
    this._notificationCenter.insertAdjacentHTML(
      'beforeend',
      notification({ id, icon, title, text, color }),
    );
    this._addToHeapOfMessages(id);
    this._addCloseButtonListener(id);
    this._showNotificationCenter();
    this._hideNotificationCenterOpenButton();
    this._showMessage(id);

    return id;
  }
  error({
    text = '',
    title = 'ERROR',
    icon = ERROR_ICON,
    color = ERROR_COLOR,
  }) {
    return this.message({ text, title, icon, color });
  }
  _addCloseButtonListener(id) {
    this._heapOfMessages[id]
      .querySelector('button')
      .addEventListener('click', this.removeMessage.bind(this, id));
  }
  removeMessage(id) {
    if (this._heapOfMessages[id] === undefined) return;
    this._heapOfMessages[id].classList.add('notification--remove');
    setTimeout(() => {
      this._removeMessageFromNotificationCenter(id);
      this._removeMessageFromHeap(id);
      this._hideNotificationCenterIfHeapEmpty();
    }, 500);
  }
  _clearAllMessages() {
    for (const key in this._heapOfMessages) {
      this.removeMessage(key);
    }
  }
  _showMessage(id) {
    setTimeout(() => {
      this._heapOfMessages[id].classList.remove('notification--create');
    }, 20);
  }
  _addToHeapOfMessages(id) {
    this._heapOfMessages[id] = document.querySelector(
      `.notification[data-notification-id="${id}"`,
    );
  }
  _removeMessageFromHeap(id) {
    delete this._heapOfMessages[id];
  }
  _removeMessageFromNotificationCenter(id) {
    this._heapOfMessages[id].remove();
  }
  _isHeapOfMessagesEmpty() {
    return Object.keys(this._heapOfMessages).length === 0 ? true : false;
  }
}
const notificationCenter = new Notification();

export { notificationCenter };
