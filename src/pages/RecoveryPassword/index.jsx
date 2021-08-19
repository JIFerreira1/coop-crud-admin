import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NumberFormat from 'react-number-format';
import { 
  Typography,
  Button,
  InputLabel,
  Grid, 
  Container,
  Avatar
} from '@material-ui/core';

import { useSnackbar } from 'notistack';

import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import CRadioButton from '../../components/Form/RadioButton'
import CInput from '../../components/Form/Input'
import { verifyCPFCreated, recoveryPassword } from '../../services/auth'



import useStyles from './style';

export default function RecoveryPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const formRef = useRef(null);
  const classes = useStyles();
  let userDataCreateUser = {};
  let userDataRecoveryPW = {};

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
        .then((result) => console.log(result));
    }
  }

  async function handleSubmit(data, { reset }) {
    debugger
    try {
      setDisableState(true)
      setStartRequest(true)
      const schema = Yup.object().shape({
        cpf: Yup.string().required(),
        gender1: Yup.string().required()  
      })
  
      await schema.validate(data, {
        abortEarly: false,
      })
      debugger
      userDataRecoveryPW = JSON.stringify({
        "cpf": data.cpf.split('.').join('').split('-').join(''),
        "mode": data.gender1,
      });
      console.log(userDataRecoveryPW)
      await recoveryPassword(userDataRecoveryPW)
        .then(response => response.json())
        .then((result) => {
          if(result.message.includes('Erro')){
            setDisableState(false)
            setStartRequest(false)
            setMessageErrors(result.message);
            console.log('messageErrors', messageErrors)
          } else {
            console.log('recuperado com sucesso', result);
            // window.localStorage.setItem('tokenUser', result.token);
            // history.push('/dashboard');
            setStartRequest(false)
            formRef.current.setErrors({});
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
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar Senha
        </Typography>
        <Form className={classes.form} ref={formRef} onSubmit={handleSubmit} noValidate={true}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <NumberFormat 
              format="###.###.###-##" 
              customInput={CInput} 
              variant="outlined"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              onBlur={() => verifyCPFValid()}/>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-outlined-label">Como deseja receber a nova senha?</InputLabel>
              <br />
              <CRadioButton name="gender1" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Recuperar Senha
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Fazer Login
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
  );
}