export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type StylingVariablesMap = {
  [stylingRule: string]: string | number;
};
