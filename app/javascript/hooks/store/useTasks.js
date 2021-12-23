import { useSelector, useDispatch } from 'react-redux';
import { loadColumn, loadColumnMore, loadTask, updateTask, destroyTask, createTask, setTask } from 'slices/TasksSlice';
import { STATES } from 'presenters/TaskPresenter';

const useTasks = () => {
  const dispatch = useDispatch();

  const board = useSelector((state) => state.TasksSlice.board);
  const task = useSelector((state) => state.TasksSlice.task);

  const loadBoard = () => Promise.all(STATES.map(({ key }) => dispatch(loadColumn({ state: key }))));

  return {
    task,
    board,
    loadBoard,
    loadColumn: (state, page, perPage) => dispatch(loadColumn({ state, page, perPage })),
    loadColumnMore: (state, page, perPage) => dispatch(loadColumnMore({ state, page, perPage })),
    loadTask: (id) => dispatch(loadTask(id)),
    updateTask: (id, params) => dispatch(updateTask({ id, params })),
    destroyTask: (id) => dispatch(destroyTask(id)),
    createTask: (newTask) => dispatch(createTask(newTask)),
    setTask: (updatedTask) => dispatch(setTask({ task: updatedTask })),
  };
};

export default useTasks;
