// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, dispatch]);

  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
