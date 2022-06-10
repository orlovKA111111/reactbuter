import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IModal } from './types';

const Modal: React.FC<IModal> = ({ onClose, children }:any) =>  {
    const modalRoot = document.getElementById("modals");

    const onPressEsc = React.useCallback((e:any) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    React.useEffect(() => {
        document.addEventListener('keydown', onPressEsc);
        return () => {
            document.removeEventListener('keydown', onPressEsc);
        };
    }, [onPressEsc]);

    return ( modalRoot && ReactDOM.createPortal(
        <div className={(children !== null) ? styles.wrap_active : styles.wrap}>
            <ModalOverlay onClose={onClose} />
            <div className={styles.modal}>
                <div className={styles.close} onClick={onClose} >
                <CloseIcon type="primary" />
                </div>

                {children}
            </div>
        </div>
        ,
        modalRoot
    ));
}
export default Modal;