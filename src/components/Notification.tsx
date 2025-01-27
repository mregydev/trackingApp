import { useDispatch, useSelector } from 'react-redux';
import { AppState, changeNotifcationMessage } from '../store';
import { Snackbar } from '@mui/material';

const Notifcation = () => {
  const notificationMessage = useSelector(
    (state: AppState) => state.notificationMessage
  );

  const dispatch = useDispatch();

  return (
    <Snackbar
      open={!!notificationMessage}
      message={notificationMessage}
      autoHideDuration={4000}
      onClose={() => {
        dispatch(changeNotifcationMessage(''));
      }}
    ></Snackbar>
  );
};

export default Notifcation;
