import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';

export const storeTodo = configureStore({
  reducer: {
    todoSlice,
  },
});
