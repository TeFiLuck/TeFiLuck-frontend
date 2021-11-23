import { Input, InputProps } from 'antd';
import { FC, useEffect, useRef } from 'react';
import { useValidateInput } from './hooks';

export interface UiNumberInputProps extends InputProps {
  value: string;
  min?: number;
  max?: number;
  decimals?: number;
  selectAllOnFocus?: boolean;
  onChange: (value: any) => void;
  onFocus?: () => void;
}

export const UiNumberInput: FC<UiNumberInputProps> = ({
  value,
  min = 0,
  max = 100000000,
  decimals = 8,
  selectAllOnFocus = true,
  onChange = () => {},
  onFocus = () => {},
  ...restProps
}) => {
  const inputRef = useRef<any>(null);
  const validateInput = useValidateInput({ min, max, decimals, onChange });

  useEffect(() => {
    validateInput(value, (validValue) => {
      if (value !== validValue) {
        onChange(validValue);
      }
    });
  }, [min, max, decimals, value]);

  function handleOnChange(e: React.FormEvent<HTMLInputElement>): void {
    validateInput(e.currentTarget.value, (validValue) => {
      onChange(validValue);
    });
  }

  function handleFocus(): void {
    if (selectAllOnFocus) {
      inputRef.current!.focus({ cursor: 'all' });
    }
    onFocus();
  }

  return <Input ref={inputRef} value={value} onChange={handleOnChange} {...restProps} onFocus={handleFocus} />;
};
