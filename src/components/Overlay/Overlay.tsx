import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    children: ReactNode;
    className?: string;
    element?: string;
    top?: number;
    onRemove?: () => void;
};

export const Overlay = ({
    children,
    className = 'root-overlay',
    element = 'div',
    top = 0,
    onRemove = () => {},
}: Props) => {
    const [container] = React.useState(document.createElement(element));
    const onClickOutsideListener = (event: any) => {
        if (!event.path.includes(container)) {
            onRemove();
        }
    };

    container.classList.add(className);

    React.useEffect(() => {
        if (top) {
            container.style.top = `${top}px`;
        }
        document.body.appendChild(container);
        document.addEventListener('click', onClickOutsideListener);
        return () => {
            document.body.removeChild(container);
            document.removeEventListener('click', onClickOutsideListener);
        };
    }, []);

    return ReactDOM.createPortal(children, container);
};
