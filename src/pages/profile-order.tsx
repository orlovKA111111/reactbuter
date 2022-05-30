import React from 'react';
import { useDispatch } from '../services/hooks';
import FeedDetails from '../components/FeedDetails/FeedDetails';


export const ProfileOrderPage: React.FC = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: 'WS_CONNECTION_START_USER' });
    return () => {
      dispatch({ type: 'WS_CONNECTION_CLOSED_USER' });
    };
  }, [dispatch]);

  return (
    <main>
      <FeedDetails isProfile={true} />
    </main>
  )
};