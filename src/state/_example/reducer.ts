import { createReducer } from '@reduxjs/toolkit';
import { decreaseCounter, increaseCounter } from './actions';

export interface ExampleState {
  counter: number;
}

export const initialState: ExampleState = {
  counter: 0,
};

export default createReducer(initialState, builder =>
  builder
    .addCase(increaseCounter, (state) => {
      state.counter += 1;
    })
    .addCase(decreaseCounter, (state) => {
      state.counter -= 1;
    })
);
