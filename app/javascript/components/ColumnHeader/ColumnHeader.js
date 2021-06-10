import React from 'react';
import PropTypes from 'prop-types';
import { getNumberOrPlaceholder } from 'utils/numbers';
import IconButton from '@material-ui/core/IconButton';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import useStyles from './useStyles';

const ColumnHeader = ({ column, onLoadMore }) => {
  const styles = useStyles();

  const {
    id,
    title,
    cards,
    meta: { totalCount, currentPage },
  } = column;

  const count = cards.length;

  const handleLoadMore = () => onLoadMore(id, currentPage + 1);

  const isUpdateButtonVisible = count < totalCount;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <b>{title}</b> ({count}/{getNumberOrPlaceholder(totalCount)})
      </div>
      <div className={styles.actions}>
        {isUpdateButtonVisible && (
          <IconButton aria-label="Load more" onClick={handleLoadMore}>
            <SystemUpdateAltIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

ColumnHeader.propTypes = {
  column: PropTypes.shape().isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ColumnHeader;
