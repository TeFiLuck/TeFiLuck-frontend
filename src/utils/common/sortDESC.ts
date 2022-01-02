export function sortDESC<T>(param1: T, param2: T): 1 | -1 {
  return param1 < param2 ? 1 : -1;
}
