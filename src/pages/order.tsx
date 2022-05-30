import React from 'react';
import { useDispatch } from '../services/hooks';
import FeedDetails from '../components/FeedDetails/FeedDetails';


export const OrderPage: React.FC = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: 'WS_CONNECTION_START' });
    return () => {
      dispatch({ type: 'WS_CONNECTION_CLOSED' });
    };
  }, [dispatch]);

  return (
    <main>
      <FeedDetails isProfile={false} />
    </main>
  )
};