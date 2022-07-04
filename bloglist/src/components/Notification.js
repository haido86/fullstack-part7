import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  // console.log('notification', notification);

  return (
    <div>
      {notification.isShow && (
        <div className="error">{notification.content}</div>
      )}
    </div>
  );
};

export default Notification;
