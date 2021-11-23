import { cutDecimals, removeLeadingZeros } from '@/utils/format';
import { useState } from 'react';

type ValidationSuccessCallback = (validValue: string) => void;

interface HookParams {
  min: number;
  max: number;
  decimals: number;
  onChange: (v: string) => void;
}

export function useValidateInput({ min, max, decimals, onChange }: HookParams) {
  const [prevValidValue, setPrevValidValue] = useState(String(min));

  function validateInput(examinedInput: string, onSuccessCallback?: ValidationSuccessCallback): void {
    const formattedExaminedInput = examinedInput.replace(/,/gi, '.');
    const inputNumber = Number(formattedExaminedInput);

    if (Number.isNaN(Number(prevValidValue)) || prevValidValue === '') {
      setPrevValidValue(String(min));
    }

    if (formattedExaminedInput.startsWith('.') && formattedExaminedInput !== '.') {
      return onChange(formattedExaminedInput);
    }

    if (Number.isNaN(inputNumber) || formattedExaminedInput.includes('e') || formattedExaminedInput.includes('E')) {
      onChange(prevValidValue);
      return;
    }

    if (formattedExaminedInput === '' || (min >= 0 && formattedExaminedInput.includes('-'))) {
      onChange(String(min));
      setPrevValidValue(String(min));
      return;
    }

    if (inputNumber > max) {
      onChange(String(max));
      setPrevValidValue(String(max));
      return;
    }

    const finalValue = cutDecimals(removeLeadingZeros(formattedExaminedInput), decimals);

    setPrevValidValue(finalValue);

    if (onSuccessCallback) {
      onSuccessCallback(finalValue);
    }
  }

  return validateInput;
}
