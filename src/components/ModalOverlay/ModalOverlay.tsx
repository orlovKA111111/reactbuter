import React from 'react';
import styles from './ModalOverlay.module.css';

import { IModal } from '../Modal/types';

const ModalOverlay: React.FC<IModal> = ({ onClose }) => {

    return (
        <div className={styles.overlay} onClick={onClose}>
        </div>
    );
}

export default ModalOverlay;