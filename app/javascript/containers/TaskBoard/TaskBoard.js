import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Task from 'components/Task';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import ColumnHeader from 'components/ColumnHeader';

import TaskPresenter from 'presenters/TaskPresenter';
import useTasks from 'hooks/store/useTasks';
import TaskForm from 'forms/TaskForm';

import useStyles from './useStyles';

const MODES = {
  ADD: 'add',
  NONE: 'none',
  EDIT: 'edit',
};

const TaskBoard = () => {
  const {
    board,
    loadBoard,
    loadColumn,
    loadColumnMore,
    loadTask,
    task,
    setTask,
    resetTask,
    updateTask,
    destroyTask,
    createTask,
  } = useTasks();

  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    loadBoard();
  }, []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (taskToOpen) => {
    setOpenedTaskId(taskToOpen.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleTaskLoad = (id) => loadTask(id);

  const handleTaskUpdate = async (updatedTask) => {
    const params = TaskForm.attributesToSubmit(updatedTask);
    await updateTask(updatedTask.id, params).unwrap();
    await loadColumn(updatedTask.state);
    handleClose();
  };

  const handleTaskDestroy = async (taskToDestroy) => {
    await destroyTask(taskToDestroy.id);
    await loadColumn(taskToDestroy.state);
    handleClose();
  };

  const handleTaskCreate = async (params) => {
    const newTask = TaskForm.attributesToSubmit(params);
    await createTask(newTask).unwrap();
    await loadColumn('new_task');
    handleClose();
  };

  const handleCardDragEnd = async (taskToDrag, source, destination) => {
    const transition = TaskPresenter.transitions(taskToDrag).find(({ to }) => destination.toColumnId === to);

    if (!transition) {
      return null;
    }

    try {
      await updateTask(taskToDrag.id, { stateEvent: transition.event }).unwrap();
      await Promise.all([loadColumn(destination.toColumnId), loadColumn(source.fromColumnId)]);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Move failed! ${error.stateEvent}`);
    }

    return null;
  };

  return (
    <>
      <Fab onClick={handleOpenAddPopup} className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
          task={task}
          setTask={setTask}
          resetTask={resetTask}
        />
      )}
    </>
  );
};

export default TaskBoard;
