import React from 'react';
import styles from './ModalOverlay.module.css';


export default function ModalOverlay({onClose}) {

    return (
        <div className={styles.overlay} onClick={onClose}>
        </div>
    );
}
