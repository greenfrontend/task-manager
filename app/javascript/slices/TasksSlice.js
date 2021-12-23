import { propEq } from 'ramda';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TasksRepository from 'repositories/TasksRepository';
import { STATES } from 'presenters/TaskPresenter';
import { changeColumn } from '@asseinfo/react-kanban';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
  task: null,
};

export const loadColumn = createAsyncThunk('tasks/loadColumn', async ({ state, page = 1, perPage = 10 }) => {
  const response = await TasksRepository.index({
    q: { stateEq: state },
    page,
    perPage,
  });
  return response.data;
});

export const loadColumnMore = createAsyncThunk('tasks/loadColumnMore', async ({ state, page = 1, perPage = 10 }) => {
  const response = await TasksRepository.index({
    q: { stateEq: state },
    page,
    perPage,
  });
  return response.data;
});

export const loadTask = createAsyncThunk('tasks/loadTask', async (taskId) => {
  const response = await TasksRepository.show(taskId);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, params }, { rejectWithValue }) => {
  try {
    const response = await TasksRepository.update(id, params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const destroyTask = createAsyncThunk('tasks/destroyTask', async (id) => {
  const response = await TasksRepository.destroy(id);
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (newTask, { rejectWithValue }) => {
  try {
    const response = await TasksRepository.create(newTask);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTask(state, { payload }) {
      state.task = payload.task;
    },
  },
  extraReducers: {
    [loadColumn.fulfilled]: (state, { payload, meta: actionMeta }) => {
      const columnId = actionMeta.arg.state;
      const { items, meta } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });
    },
    [loadColumnMore.fulfilled]: (state, { payload, meta: actionMeta }) => {
      const columnId = actionMeta.arg.state;
      const { items, meta } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta: { ...meta, count: column.meta.count + meta.count },
      });
    },
    [loadTask.fulfilled]: (state, { payload }) => {
      state.task = payload.task;
    },
  },
});

export default tasksSlice.reducer;

export const { setTask } = tasksSlice.actions;
