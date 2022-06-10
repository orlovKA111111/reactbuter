import React from 'react';
import { useAppDispatch } from '../services/hooks';
import FeedDetails from '../components/FeedDetails/FeedDetails';
import {WS_CONNECTION_CLOSED_USER, WS_CONNECTION_START_USER} from "../services/action/wsActionsUser";


export const ProfileOrderPage: React.FC = () => {

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_USER });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_USER });
    };
  }, [dispatch]);

  return (
    <main>
      <FeedDetails isProfile={true} />
    </main>
  )
};