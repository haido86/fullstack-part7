// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   }

//   return (
//     <div
//       className='error'
//       style={
//         message.includes('remove') ||
//         message.includes('failed') ||
//         message.includes('replace') ||
//         message.includes('Wrong')
//           ? { color: 'red' }
//           : {}
//       }
//     >
//       {message}
//     </div>
//   )
// }

// export default Notification

import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  console.log('notification', notification);

  return (
    <div>
      {notification.isShow && (
        <div className="error">{notification.content}</div>
      )}
    </div>
  );
};

export default Notification;
