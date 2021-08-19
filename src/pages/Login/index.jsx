import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';

import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import CInput from '../../components/Form/Input'
import NumberFormat from 'react-number-format'
import { loggingUser } from '../../services/auth'

import useStyles from './style';

export default function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const formRef = useRef(null);
  const classes = useStyles();
  const userDataLoggin = {};
  
  const [disableState, setDisableState] = React.useState(false);
  const [startRequest, setStartRequest] = React.useState(false);
  const [messageErrors, setMessageErrors] = React.useState({});


  useEffect(() => {
    debugger
    if(typeof messageErrors == 'object'){
      Object.keys(messageErrors).map((key, i) => enqueueSnackbar(messageErrors[key], {variant: 'error'})) 
    } else {
      enqueueSnackbar(messageErrors, {variant: 'error'})
    }
  }, [messageErrors])

  async function handleSubmit(data, { reset }) {
    try {
      setDisableState(true)
      setStartRequest(true)
      const schema = Yup.object().shape({
        login: Yup.string().required(),
        password: Yup.string().required()
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await loggingUser({"login": data.login.split('.').join('').split('-').join(''), "password": data.password, "origin": "App"})
        .then(response => response.json())
        .then((result) => {
          if(result.status.businessMessage.includes('Error')){
            setDisableState(false)
            setStartRequest(false)
            setMessageErrors(result.status.businessMessage);
            console.log('messageErrors', messageErrors)
          } else {
            window.localStorage.setItem('tokenUser', result.token);
            history.push('/dashboard');
            setStartRequest(false)
          }
        })
    } catch (err) {
      console.log('err', err)
      if(err instanceof Yup.ValidationError) {
        setDisableState(false)
        setStartRequest(false)
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
          console.log('erro', formRef.current.getErrors())
          setMessageErrors(formRef.current.getErrors());
        }
      }
    }    
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form className={classes.form} ref={formRef} onSubmit={handleSubmit} noValidate={true}>
          <NumberFormat 
            format="###.###.###-##"
            autoFocus
            disabled={disableState}
            variant="outlined"
            required
            fullWidth
            id="login"
            label="login"
            name="login"
            customInput={CInput} />
          <br/>
          <CInput
            variant="outlined"
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            disabled={disableState}
            autoComplete="current-password"
          />
          <br/>
          {
            startRequest ?
            <div style={{width: '100%', textAlign: 'center'}}>
              <CircularProgress disableShrink />
            </div>
           : 
            <>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
              <Grid item xs>
                <Link to="/recovery-password" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
            </>
          }
        </Form>
      </div>
    </Container>
  );
}
