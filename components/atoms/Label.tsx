import styled from '@emotion/styled';

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

const StyledLabel = styled.label<IProps>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ align }) => align || 'left'};
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width || 'auto'};
`;

export default StyledLabel;
