import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '90%',
    padding: '9%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '9%',
    marginBottom: '9%',
    backgroundColor: '#E6E6FA',
    // border: '1px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
}));


export default useStyles;
