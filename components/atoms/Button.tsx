import NextLink, { LinkProps } from 'next/link';
import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';

interface IOption {
  color?: ColorType;
  outlined?: boolean;
  fullWidth?: boolean;
}

interface IBase extends IOption {
  theme: Theme;
}

interface IButton
  extends IOption,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

interface ILink extends IOption, LinkProps {}

const base = ({ theme, color, outlined, fullWidth }: IBase) => css`
  padding: 0.25em 0.5em;
  border-radius: 6px;
  ${color &&
  !outlined &&
  `
		color: ${theme.colors[color]};
		border-color: ${theme.colors[color]};
		`}
  ${color &&
  outlined &&
  `
	border: 1px solid ${theme.colors[color]};
	background-color:inherit;
	color: ${theme.colors[color]};
	`}
	${fullWidth &&
  `
	width: 100%;
	flex:1;
	`}
	:disabled {
    background-color: ${theme.colors.disabled};
    color: ${theme.colors.disabled};
  }
`;

export const Button = styled.button<IButton>`
  ${base}
`;

export const Link = styled(NextLink)<ILink>`
  display: flex;
  align-items: center;
  ${base}
`;

export default Button;
