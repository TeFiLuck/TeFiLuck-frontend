export const removeLeadingZeros = (input: string): string => {
  if (Number.isNaN(Number(input))) {
    return '0';
  }
  const dot = input.includes('.') ? '.' : '';
  const [wholeNumbers, decimal] = input.split('.');
  const result = `${parseInt(wholeNumbers, 10)}${dot}${decimal || ''}`;

  // Negative null minus is neglected by template literals
  if (wholeNumbers.length === 2 && wholeNumbers[0] === '-' && wholeNumbers[1] === '0') {
    return `-${result}`;
  }

  return result;
};
