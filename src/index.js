import './sass/main.scss';
import './js/main.js';
import 'material-design-icons/iconfont/material-icons.css';

import { notificationCenter } from './js/notification-center';


// notificationCenter.setNotificationCenterWidth('30vw');

// notificationCenter.message({ text: 'Standart message' });
// notificationCenter.error({ text: 'Standart error' });
// const messageId = notificationCenter.error({
//   text: 'Error. Different icon',
//   icon: 'fiber_new',
// });
// console.log('We can remember the message ID', messageId);
// for (let i = 0; i < 4; i++) {
//   setTimeout(() => {
//     if (i % 2 === 0) {
//       notificationCenter.message({
//         text: 'Message with different title',
//         title: i,
//       });
//       return;
//     }
//     notificationCenter.error({
//       text: 'Error with different title',
//       title: i,
//     });
//   }, i * 1000);
// }
// setTimeout(() => {
//   notificationCenter.message({
//     text: 'Message. delay 10s. Different color',
//     icon: 'stay_current_portrait',
//     color: 'blue',
//   });
// }, 10000);
// setTimeout(() => {
//   notificationCenter.error({
//     text: 'Error. delay 20s. Different color',
//     icon: 'report',
//     color: 'yellow',
//   });
// }, 20000);

// setTimeout(() => {
//   notificationCenter.removeMessage(messageId);
//   console.log('After that we can delete the message with ID', messageId);
// }, 5000);
