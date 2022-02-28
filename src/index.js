import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import Modal from "./components/Modal/Modal";

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
ReactDOM.render(
    <Modal />,
    document.getElementById('Modal')
);