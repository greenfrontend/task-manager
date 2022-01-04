import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  crop: {
    maxHeight: 300,
    maxWidth: 300,

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
}));

export default useStyles;
