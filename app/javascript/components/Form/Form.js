import React from 'react';
import PropTypes from 'prop-types';
import { has, path } from 'ramda';

import UserSelect from 'components/UserSelect';

import TextField from '@material-ui/core/TextField';

import useStyles from './useStyles';

const Form = ({ errors, onChange, task }) => {
  const handleChangeTextField = (event) => {
    const name = path(['target', 'name'], event);
    const value = path(['target', 'value'], event);
    return onChange({ ...task, [name]: value });
  };
  const handleChangeSelectField = (name, value) => onChange({ ...task, [name]: value });
  const styles = useStyles();

  return (
    <form className={styles.form}>
      <TextField
        name="name"
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField}
        value={task.name}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        name="description"
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField}
        value={task.description}
        label="Description"
        required
        multiline
        margin="dense"
      />
      <UserSelect
        name="author"
        label="Author"
        value={task.author}
        onChange={handleChangeSelectField}
        isDisabled={false}
        isRequired
        error={has('author', errors)}
        helperText={errors.author}
      />
      <UserSelect
        name="assignee"
        label="Assignee"
        value={task.assignee}
        onChange={handleChangeSelectField}
        isDisabled={false}
        isRequired
        error={has('assignee', errors)}
        helperText={errors.author}
      />
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  task: PropTypes.shape().isRequired,
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
