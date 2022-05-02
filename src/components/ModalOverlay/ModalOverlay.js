import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from "prop-types";

ModalOverlay.propTypes ={
    onClose: PropTypes.func
}

export default function ModalOverlay({onClose}) {

    return (
        <div className={styles.overlay} onClick={onClose}>
        </div>
    );
}
