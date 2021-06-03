import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import { Modal, Card, CardHeader, CardContent, CardActions, CircularProgress, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Form from './Form';

import useStyles from './useStyles';

const EditPopup = ({ cardId, onClose, onCardDestroy, onLoadCard, onCardUpdate }) => {
  const [task, setTask] = useState(null);
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const styles = useStyles();

  useEffect(() => {
    onLoadCard(cardId).then(setTask);
  }, []);

  const handleCardUpdate = () => {
    setSaving(true);

    onCardUpdate(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        alert(`Update Failed! Error: ${error.message}`);
      }
    });
  };

  const handleCardDestroy = () => {
    setSaving(true);

    onCardDestroy(task).catch((error) => {
      setSaving(false);

      alert(`Destrucion Failed! Error: ${error.message}`);
    });
  };
  const isLoading = isNil(task);

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={isLoading ? 'Your task is loading. Please be patient.' : `Task # ${task.id} [${task.name}]`}
        />
        <CardContent>
          {isLoading ? (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          ) : (
            <Form errors={errors} onChange={setTask} task={task} />
          )}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            disabled={isLoading || isSaving}
            onClick={handleCardUpdate}
            size="small"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            disabled={isLoading || isSaving}
            onClick={handleCardDestroy}
            size="small"
            variant="contained"
            color="secondary"
          >
            Destroy
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

EditPopup.propTypes = {
  cardId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onCardDestroy: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onCardUpdate: PropTypes.func.isRequired,
};

export default EditPopup;
