import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Form from 'components/Form';
import TaskForm from 'forms/TaskForm';

import useStyles from './useStyles';

const AddPopup = ({ onClose, onCreateCard }) => {
  const [task, changeTask] = useState(TaskForm.defaultAttributes());
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const handleCreate = () => {
    setSaving(true);

    onCreateCard(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(`Creation Failed! Error: ${error.message}`);
      }
    });
  };

  const styles = useStyles();

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title="Add New Task"
        />
        <CardContent>
          <Form errors={errors} onChange={changeTask} task={task} />
        </CardContent>
        <CardActions className={styles.actions}>
          <Button disabled={isSaving} onClick={handleCreate} variant="contained" size="small" color="primary">
            Add
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

AddPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func.isRequired,
};

export default AddPopup;
