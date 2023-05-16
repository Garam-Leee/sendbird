import { useFormContext } from 'react-hook-form';
import styled from '@emotion/styled';

import Label from '@/components/atoms/Label';

interface IProps extends IRadioItem {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledRadio = styled.input`
  width: 1rem;
  height: 1rem;
  & {
    margin-right: 1rem;
  }
  &:has(+ label) {
    margin-right: 0.5rem;
  }
  & + label {
    margin-right: 1rem;
  }
`;

export default function Radio({
  name,
  label,
  width,
  labelAlign,
  value,
  onChange,
}: IProps) {
  const { register } = useFormContext();
  const id = `radio-${name}-${value}`;
  return (
    <>
      <StyledRadio
        id={id}
        type="radio"
        value={value}
        {...register(name, {
          onChange,
        })}
      />
      {label && (
        <Label htmlFor={id} width={width} align={labelAlign}>
          {label}
        </Label>
      )}
    </>
  );
}
