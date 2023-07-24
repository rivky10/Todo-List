import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from '../components/todoList';

const initialState = {
  todoList: [] as Task[],
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<Task[]>) => {
      return { todoList: [...action.payload] };
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.todoList.push(action.payload);
    },

    deleteTask: (state, action: PayloadAction<{ delId: number }>) => {
      state.todoList = state.todoList.filter(item => item.id !== action.payload.delId);
    },

    toggleTask: (state, action: PayloadAction<{ delId: number }>) => {
      const taskId = action.payload.delId;
      const taskIndex = state.todoList.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        state.todoList[taskIndex].iscompleted = !state.todoList[taskIndex].iscompleted;
      }
    },
  },
});

export const { actions } = todoSlice;
export default todoSlice.reducer;
