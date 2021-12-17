import { useMediaQuery } from 'react-responsive';

export function useMediaQueries() {
  const is1300PxOrLess = useMediaQuery({ query: '(max-width: 1300px)' });
  const is1200PxOrLess = useMediaQuery({ query: '(max-width: 1200px)' });
  const is1024PxOrLess = useMediaQuery({ query: '(max-width: 1024px)' });

  return { is1300PxOrLess, is1200PxOrLess, is1024PxOrLess };
}
