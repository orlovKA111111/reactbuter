import React  from 'react';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import ReactDOM from "react-dom";

export function useModal() {
    const modalCtx = useContext(ModalContenxt);
    const [isOpened, setIsOpened] = useState(false);
    const open = useCallback(
        (content) => {
            modalCtx.control.open(content);
            setIsOpened(true);
        },
        [modalCtx.control]
    );

    const close = useCallback(() => {
        modalCtx.control.close();
        setIsOpened(false);
    }, [modalCtx.control]);

    useEffect(() => {
        modalCtx.control.setIsOpened = setIsOpened;
        return
    }, []);

    return { isOpened, open, close };
}

export const modalControl = {
    control: {
        setIsOpened: () => void 0,
        close: () => void 0,
        open: () => void 0
    }
};

export const ModalContenxt = createContext(modalControl);

export function ModalWithUseEffect() {
    const modalCtx = useContext(ModalContenxt);
    const modalPortalRef = useRef(null);
    const [content, setContent] = useState(null);

    const onOpen = useCallback((nextContent) => {
        setContent(nextContent);
        modalCtx.control.setIsOpened(true);
    }, []);

    const onClose = useCallback(() => {
        setContent(null);
        modalCtx.control.setIsOpened(false);
    }, []);

    useEffect(() => {
        if (!modalPortalRef.current) {
            modalPortalRef.current = document.createElement("div");
            document.body.appendChild(modalPortalRef.current);
        }

        return () => {
            document.body.removeChild(modalPortalRef.current);
            modalPortalRef.current = null;
        };
    }, []);

    useEffect(() => {
        modalCtx.control.open = onOpen;
        modalCtx.control.close = onClose;
    }, [modalCtx.control, onOpen, onClose]);

    if (content) {
        return ReactDOM.createPortal(
            <div>
                {content}
            </div>,
            modalPortalRef.current
        );
    }

    return null;
}
