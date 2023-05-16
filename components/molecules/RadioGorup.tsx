import styled from '@emotion/styled';

import Radio from '@/components/atoms/Radio';
import Label from '@/components/atoms/Label';

interface IProps extends ILabel {
  items: IRadioItem[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroupCotainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default function RadioGorup({
  label,
  width,
  labelAlign,
  items,
  onChange,
}: IProps) {
  return (
    <>
      <Label width={width} align={labelAlign}>
        {label}
      </Label>
      <RadioGroupCotainer>
        {items.map(item => (
          <Radio key={item.value} {...item} onChange={onChange} />
        ))}
      </RadioGroupCotainer>
    </>
  );
}
