import { HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';

import Label from '@/components/atoms/Label';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement>, ILabel {
  name: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.inactive};
  border-radius: 4px;
  padding: 0.5em;
  color: #999999;
  :focus {
    color: black;
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export default function Input({
  name,
  placeholder,
  onChange,
  type,
  label,
  value,
  width,
  labelAlign,
  ...rest
}: IProps) {
  const { register } = useFormContext();
  return (
    <>
      {label && (
        <Label htmlFor={name} width={width} align={labelAlign}>
          {label}
        </Label>
      )}
      <StyledInput
        {...rest}
        type={type}
        placeholder={placeholder}
        value={value}
        {...register(name, {
          onChange,
        })}
      />
    </>
  );
}
