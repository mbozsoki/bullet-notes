import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    children: ReactNode;
    className?: string;
    element?: string;
    top?: number;
}

export const Overlay = ({
    children,
    className = 'root-overlay',
    element = 'div',
    top = 0,
}: Props) => {
    const [container] = React.useState(document.createElement(element));

    container.classList.add(className);

    React.useEffect(() => {
        if (top) {
            container.style.top = `${top}px`;
        }
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);

    return ReactDOM.createPortal(children, container);
};
