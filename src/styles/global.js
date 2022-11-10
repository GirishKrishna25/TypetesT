import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
    }    

    body {
        background: black;
        color: white;
        transition: all 0.25s linear;
    }

    h1 {
        // font-size: 5rem;
    }

    .canvas {
        display: grid;
        grid-auto-flow: row;
        grid-template-row: auto 1fr auto;
        min-height: 100vh;
        gap: 0.5rem;
        padding: 1rem;
        width: 100vw;
        align-items: center;
    }

    .type-box {
        display: block;
        max-width: 1000px;
        height: 140px;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }

    .words {
        font-size: 30px;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        width: 100%;
    }

    .word {
        margin: 5px;
        padding-right: 2px;
    }

    .hidden-input {
        display: block;
        opacity: 0;
    }

    .correct {
        color: green;
    }

    .incorrect {
        color: red;
    }
`;
