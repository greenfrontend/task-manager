import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import { Modal, Card, CardHeader, CardContent, CardActions, CircularProgress, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Form from 'components/Form';
import TaskPresenter from 'presenters/TaskPresenter';
import useStyles from './useStyles';

const EditPopup = ({ cardId, onClose, onCardDestroy, onLoadCard, onCardUpdate, task, setTask }) => {
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const styles = useStyles();

  useEffect(() => {
    onLoadCard(cardId);
  }, []);

  const handleCardUpdate = async () => {
    setSaving(true);

    try {
      await onCardUpdate(task);
    } catch (error) {
      setSaving(false);
      setErrors(error || {});

      // eslint-disable-next-line no-alert
      alert(`Update Failed! Error: ${error.message}`);
    }
  };

  const handleCardDestroy = async () => {
    setSaving(true);

    await onCardDestroy(task);
  };
  const isLoading = isNil(task);

  const isButtonDisabled = isLoading || isSaving;

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={isLoading ? 'Your task is loading. Please be patient.' : TaskPresenter.cardHeader(task)}
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
            disabled={isButtonDisabled}
            onClick={handleCardUpdate}
            size="small"
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            disabled={isButtonDisabled}
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
  setTask: PropTypes.func.isRequired,
  task: PropTypes.oneOfType([TaskPresenter.shape().isRequired, PropTypes.oneOf([null]).isRequired]).isRequired,
};

export default EditPopup;
