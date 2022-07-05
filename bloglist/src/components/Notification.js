import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  console.log('notification', notification);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notification.isShow}
      >
        <Alert severity={notification.type || 'error'}>
          {notification.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
