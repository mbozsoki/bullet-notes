import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --primary-color: #e1aa9d;
        --primary-color-active: #e7bbb1;
        --background-color: #fcfcfc;
        --secondary-color: #b3b0bf;
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
        font-family: -apple-system, 'Open Sans', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 18px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
