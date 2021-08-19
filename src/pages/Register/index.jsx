import React, { useRef, useEffect} from 'react';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import CInput from '../../components/Form/Input'
import NumberFormat from 'react-number-format';
import { createUser, verifyCPFCreated } from '../../services/auth'


import useStyles from './style';

export default function SignUp() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const formRef = useRef(null);
  const classes = useStyles();
  let userDataCreateUser = {};

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

  function verifyCPFValid() {
    if(formRef.current.getFieldValue('cpf')) {
      formRef.current.setErrors({});
      const formatDataValidateCPFExistent = JSON.stringify({
        "cpf": formRef.current.getFieldValue('cpf').split('.').join('').split('-').join(''),
        "origin": "App"
      });
  
      verifyCPFCreated(formatDataValidateCPFExistent)
        .then((response) => response.json())
        .then((result) => {
          if(result) {
            setDisableState(false)
            setStartRequest(false)
            setMessageErrors({message: 'CPF Já Cadastrado'});
          }
        });
    }
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});
    setMessageErrors({});
    try {
      setDisableState(true)
      setStartRequest(true)
      const schema = Yup.object().shape({
        firstName: Yup.string().required(),
        cpf: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
      })
  
      await schema.validate(data, {
        abortEarly: false,
      })
      userDataCreateUser = JSON.stringify({
        "active": true,
        "name": data.firstName,
        "login": data.cpf.split('.').join('').split('-').join(''),
        "email": data.email,
        "password": data.password,
        "permissions": [
          {
            "roles": [
              "admin"
            ],
            "system": "App"
          }
        ],
        "origin": "App"
      });
      console.log(userDataCreateUser)
      await createUser(userDataCreateUser)
        .then(response => response.json())
        .then((result) => {
          if(result.message.includes('Erro')){
            setDisableState(false)
            setStartRequest(false)
            setMessageErrors(result.message);
            console.log('messageErrors', messageErrors)
          } else {
            console.log('criado com sucesso', result);
            // window.localStorage.setItem('tokenUser', result.token);
            // history.push('/dashboard');
            setStartRequest(false)
            formRef.current.setErrors({});
          }
        })
    } catch (err) {
      debugger
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
          setMessageErrors(formRef.current.getErrors());
          console.log('erro', formRef.current.getErrors())
        }
      }
    }    
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Form className={classes.form} ref={formRef} onSubmit={handleSubmit} noValidate={true}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CInput
                disabled={disableState}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <NumberFormat
              format="###.###.###-##"
              customInput={CInput}
              disabled={disableState}
              variant="outlined"
              required
              fullWidth
              id="cpf"
              onBlur={() => verifyCPFValid()}
              label="CPF"
              name="cpf"
              autoComplete="cpf"
            />
            </Grid>
            <Grid item xs={12}>
              <CInput
                disabled={disableState}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <CInput
                disabled={disableState}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
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
            Cadastrar-se
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Já tem uma conta? Faça o Login
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