import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(
  `
      margin: var(--spacing-ref);
      width: var(--width-input-form);
      height: var(--height-input-form);
      font-family: var(--textFont);
      font-size: calc(var(--font-size-ref) * 0.875);
      font-weight: var(--font-weight-S);
      letter-spacing: var(--spacing-letter-ref);
      line-height: 1.5;
      padding: var(--padding-input);
      border-radius: calc(var(--border-ref) * 3);
      color: var(--color-input);
      margin-top: auto;
      background: var(--bckgColorCTA);
      border: var(--border-input);
      transition: 0.5s ease;
  
      &:hover {
        border-color: black;
        background-color: white;
        color:black;
      }
    }
  `,
);
