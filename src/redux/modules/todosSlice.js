import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();

    const { id, title, body } = payload;
    const newTodo = { id, title, body };

    thunkAPI.dispatch(addTodo(newTodo));
    return newTodo;
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => { // 2초의 지연을 시키는 비동기 작업을 수행합니다.
    await waitTwoSeconds();

    // payload를 사용하여 삭제할 todo의 ID를 받아옵니다.
    const todoId = payload;

    // state를 업데이트하고 삭제한 todo의 ID를 반환합니다.
    thunkAPI.dispatch(deleteTodo(todoId));
    return todoId;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {state.list.push(action.payload);},
    deleteTodo: (state, action) => {state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
