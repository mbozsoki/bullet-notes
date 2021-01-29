import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --primary-color: #4B4F6A;
        --primary-color-active: #5D6283;
        --background-color: #F9F4F1;
        --secondary-color: #b3b0bf;
        font-size: 18px;
    }

    * {
        box-sizing: border-box;
    }

    html {
        background-color: var(--background-color);
    }

    body {
        overflow: hidden;
        margin: 0;
        font-family: 'Shadows Into Light';
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-image: url('./assets/images/Background.svg');
    }

    html,body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .root-overlay {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .regular-font {
        font-family: 'Open Sans';
    }

    // Overwrite react-day-picker
    .DayPicker-Day--selected {
        background-color: var(--primary-color) !important;
        border-radius: 3px;
    }

    .DayPicker *:focus {
        outline: none;
    }
`;

export default GlobalStyle;
