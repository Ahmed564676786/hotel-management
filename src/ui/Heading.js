import styled, { css } from "styled-components";



export const Heading = styled.h1`
  /* Heading sizes */
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 2rem;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 1.5rem;
    `}

  /* Colors */
  ${(props) =>
    props.color === "yellow" &&
    css`
      color: yellow;
    `}

  ${(props) =>
    props.color === "red" &&
    css`
      color: red;
    `}

  ${(props) =>
    props.color === "blue" &&
    css`
      color: blue;
    `}
`;
