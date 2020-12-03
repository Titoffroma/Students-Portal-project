import './sass/main.scss';
import './js/main.js';
import 'material-design-icons/iconfont/material-icons.css';

import { notificationCenter } from './js/notification-center';

notificationCenter.message({ text: 'Message test', title: 'OK' });
notificationCenter.error({ text: 'test Error' });
notificationCenter.error({ text: 'test Error 2' });

// setTimeout(() => {
//   notificationCenter.removeMessage(0);
// }, 5000);
setTimeout(() => {
  notificationCenter.message({ text: 'Message test', title: 'OK' });
}, 10000);
setTimeout(() => {
  notificationCenter.error({ text: 'test Error' });
}, 20000);
