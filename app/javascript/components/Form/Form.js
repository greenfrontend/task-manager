import React from 'react';
import PropTypes from 'prop-types';
import { has, path, isNil } from 'ramda';

import UserSelect from 'components/UserSelect';
import ImageUpload from 'components/ImageUpload';

import { TextField, Button } from '@material-ui/core';
import TaskPresenter from 'presenters/TaskPresenter';
import useStyles from './useStyles';
import TasksRepository from 'repositories/TasksRepository';

const Form = ({ errors, onChange, task }) => {
  const handleChangeTextField = (event) => {
    const name = path(['target', 'name'], event);
    const value = path(['target', 'value'], event);
    return onChange({ ...task, [name]: value });
  };
  const handleChangeSelectField = (name, value) => onChange({ ...task, [name]: value });
  const styles = useStyles();

  const onAttachImage = async (json) => {
    try {
      const response = await TasksRepository.putFormData(task.id, json);
      onChange({
        ...task,
        imageUrl: response.data.task.imageUrl,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };
  const onRemoveImage = async () => {
    try {
      await TasksRepository.removeImage(task.id);
      onChange({
        ...task,
        imageUrl: null,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };
  const imageUrl = TaskPresenter.imageUrl(task);

  return (
    <form className={styles.form}>
      <TextField
        name="name"
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField}
        value={TaskPresenter.name(task)}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        name="description"
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField}
        value={TaskPresenter.description(task)}
        label="Description"
        required
        multiline
        margin="dense"
      />
      <UserSelect
        name="author"
        label="Author"
        value={TaskPresenter.author(task)}
        onChange={handleChangeSelectField}
        isDisabled={false}
        isRequired
        error={has('author', errors)}
        helperText={errors.author}
      />
      <UserSelect
        name="assignee"
        label="Assignee"
        value={TaskPresenter.assignee(task)}
        onChange={handleChangeSelectField}
        isDisabled={false}
        isRequired
        error={has('assignee', errors)}
        helperText={errors.author}
      />
      {isNil(imageUrl) ? (
        <div className={styles.imageUploadContainer}>
          <ImageUpload onUpload={onAttachImage} />
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <img className={styles.preview} src={imageUrl} alt="Attachment" />
          <Button variant="contained" size="small" color="primary" onClick={onRemoveImage}>
            Remove image
          </Button>
        </div>
      )}
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  task: TaskPresenter.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;
