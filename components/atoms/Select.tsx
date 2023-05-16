import React, { useCallback, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from '@emotion/styled';

import useComponentVisible from '@/hooks/useComponentVisible';

import Label from '@/components/atoms/Label';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement>, ILabel {
  name: string;
  placeholder?: string;
  value?: string;
  options?: readonly IOption[]; // FIXME: 집에가려고 남겨둠
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  color?: ColorType;
  multiple?: boolean;
}

const NativeSelect = styled.select`
  display: none;
`;

const Option = styled(Button)<{ selected?: boolean }>`
  padding: 10px 0;
  border-radius: 0;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.primary};
  }
  ${({ selected, theme }) =>
    selected &&
    `
  background-color: ${theme.colors.primary}};
  color: ${theme.colors.white}};
  `}
`;

const OptionContainer = styled.div<{ hide: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  opacity: 1;
  transform: translateY(0);
  transition: all 0.2s ease-in;
  ${({ hide, theme }) =>
    hide &&
    `
      z-index: -1;
      opacity: 0;
      color: ${theme.colors.white};
      border-color: ${theme.colors.white};
      transform: translateY(-30px);
  `}
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const PlaceHolder = styled(Button)<{ width?: number | string }>`
  flex: 1;
  flex-basis: ${({ width }) => width || ''};
  svg {
    transition: transform 0.2s ease-in;
  }
`;

const Container = styled.div<{ width?: string | number }>`
  flex-basis: ${({ width }) => width || ''};
  position: relative;
  display: flex;
`;

function Select({
  name,
  placeholder,
  value,
  onChange,
  label,
  width,
  labelAlign,
  color,
  options,
  multiple,
  ...rest
}: IProps) {
  const { register, setValue, control, reset } = useFormContext();
  const {
    ref: targetRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const selectedValue = useWatch({
    control,
    name,
  });
  const selectedLabel = useMemo(
    () =>
      Array.isArray(options)
        ? options?.filter(({ value }) => value === selectedValue)?.[0]?.label
        : undefined,
    [selectedValue, options],
  );
  const isSelected = useCallback(
    (value: string) => {
      if (multiple) {
        return Array.isArray(selectedValue)
          ? selectedValue.includes(value)
          : false;
      }
      return selectedValue === value;
    },
    [selectedValue, multiple],
  );

  const onClickOption = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('[data-value]');
      if (!(button instanceof HTMLElement)) return;
      const { value } = button.dataset;
      if (value === undefined) return;
      if (value === 'clear') {
        reset({ name });
        setIsComponentVisible(false);
        return;
      }
      if (!multiple) {
        setValue(name, value);
        return;
      }
      if (Array.isArray(selectedValue) && selectedValue.includes(value)) {
        setValue(
          name,
          selectedValue.filter(v => v !== value),
        );
        return;
      }
      setValue(name, [value, ...(selectedValue || [])]);
    },
    [name, setValue, selectedValue, multiple, reset, setIsComponentVisible],
  );

  const onClickPlaceholder = useCallback(() => {
    setIsComponentVisible(prev => !prev);
  }, [setIsComponentVisible]);

  return (
    <>
      {label && (
        <Label htmlFor={name} align={labelAlign}>
          {label}
        </Label>
      )}
      <Container ref={targetRef} width={width}>
        <NativeSelect
          {...rest}
          value={value}
          {...register(name, {
            onChange,
          })}
        />
        <PlaceHolder
          type="button"
          color={isComponentVisible ? color : 'inactive'}
          outlined
          onClick={onClickPlaceholder}
          aria-label={placeholder}
        >
          {(!multiple && selectedLabel) || placeholder}{' '}
          <IconWrapper>
            <Icon
              name={isComponentVisible ? 'up' : 'down'}
              color={isComponentVisible ? 'primary' : 'inactive'}
            />
          </IconWrapper>
        </PlaceHolder>
        {Array.isArray(options) && (
          <OptionContainer hide={!isComponentVisible} onClick={onClickOption}>
            <Option type="button" data-value="clear">
              전체
            </Option>
            {options.map(({ label, value }) => (
              <Option
                key={value}
                type="button"
                data-value={value}
                selected={isSelected(value)}
              >
                {label}
              </Option>
            ))}
          </OptionContainer>
        )}
      </Container>
    </>
  );
}

export default React.memo(Select);
