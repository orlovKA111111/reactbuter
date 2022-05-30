import React from 'react';
import styles from './ModalOverlay.module.css';

import {IModalOverlay} from "./types";

const ModalOverlay: React.FC<IModalOverlay> = ({ onClose }) => {

    return (
        <div className={styles.overlay} onClick={onClose}>
        </div>
    );
}

export default ModalOverlay;