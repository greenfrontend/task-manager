import React, { useEffect, useState } from 'react';
import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import { propOr } from 'ramda';

import Task from 'components/Task';
import ColumnHeader from 'components/ColumnHeader';
import TasksRepository from 'repositories/TasksRepository';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './useStyles';

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'In Dev' },
  { key: 'in_qa', value: 'In QA' },
  { key: 'in_code_review', value: 'in CR' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const initialBoard = {
  columns: STATES.map((column) => ({
    id: column.key,
    title: column.value,
    cards: [],
    meta: {},
  })),
};

const TaskBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);

  const styles = useStyles();

  const generateBoard = () => {
    const generatedBoard = {
      columns: STATES.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr({}, 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    };

    setBoard(generatedBoard);
  };

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const PER_PAGE = 10;

  const loadColumnMore = (state, page = 1, perPage = PER_PAGE) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: {
          cards: [...prevState[state].cards, ...data.items],
          meta: { ...data.meta, count: prevState[state].meta.count + data.meta.count },
        },
      }));
    });
  };

  const loadColumnInitial = (state, page = 1, perPage = PER_PAGE) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: data.items, meta: data.meta },
      }));
    });
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(`Move failed! ${error.message}`);
      });
  };

  return (
    <>
      <Fab className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Board
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
        renderCard={(card) => <Task task={card} />}
        onCardDragEnd={handleCardDragEnd}
        disableColumnDrag
      >
        {board}
      </Board>
    </>
  );
};

export default TaskBoard;
