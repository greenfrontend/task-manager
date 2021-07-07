import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    transitions: PropTypes.array,
    assignee: PropTypes.object,
    author: PropTypes.object,
  },
  {
    cardHeader(task) {
      return `Task # ${this.id(task)} [${this.name(task)}]`;
    },
  },
);
