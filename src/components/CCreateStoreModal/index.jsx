import React, { useState, useEffect, useContext, useRef } from 'react';
import * as Yup from 'yup'

import { Form } from '@unform/web';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CInput from '../Form/Input'
import CInputTimepicker from '../Form/InputTimepicker'

import useStyles from './style';
import { useHistory } from 'react-router-dom';

import { createStore } from '../../services/store'


export default function CCreateStoreModal() {
  const formRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  let allErrors = {};

  const [openNotificationFieldRequired, setOpenNotificationFieldRequired] = React.useState(false);

  useEffect(() => {
    formRef.current.setData({
      drogariaRua: null,
      sigla: null,
      nome: null,
      categoria: null,
      logradouro: null,
      numero: null,
      complemento: null,
      bairro: null,
      cidade: null,
      uf: null,
      cep: null,
      telefone: null,
      funcionamentoSegSab: {'horarioSegunda': '00:00', 'horarioSabado': '00:00'},
      funcionamentoDomFer: {'horarioSegunda': '00:00', 'horarioSabado': '00:00'},
      latitude: null,
      longitude: null,
      blitzSaude: null,
      farmaciaPopular: null,
      sellerEcomm: null,
      idLojaPdv: null
    })
  }, [])

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotificationFieldRequired(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        // categoria: Yup.string()
        drogariaRua: Yup.string(),
        sigla: Yup.string(),
        nome: Yup.string(),
        categoria: Yup.string(),
        logradouro: Yup.string(),
        numero: Yup.number(),
        complemento: Yup.string(),
        bairro: Yup.string(),
        cidade: Yup.string(),
        uf: Yup.string(),
        cep: Yup.string(),
        telefone: Yup.string(),
        funcionamentoSegSab: Yup.string(),
        funcionamentoDomFer: Yup.string(),
        latitude: Yup.string(),
        longitude: Yup.string(),
        blitzSaude: Yup.string(),
        farmaciaPopular: Yup.string(),
        sellerEcomm: Yup.string(),
        idLojaPdv: Yup.number()
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      formRef.current.reset();
      formRef.current.setErrors({});

      await createStore(data).then((retorno) => console.log('esse é o retorno', retorno));
      console.log('dadosEnviados', data);
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
          console.log('erro', formRef.current.getErrors())
          setOpenNotificationFieldRequired(true)
        }
      }
    }    
  }

  const handleCancelEdition = () => {
    history.push('/dashboard');
  }

  return (
    <>
      <Snackbar open={openNotificationFieldRequired} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity="success">
          {`${allErrors}`}
        </Alert>
      </Snackbar>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <h1 style={{marginBottom: '3%', fontSize: '25px'}}>Criando uma nova Loja</h1> 
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} noValidate={true}>
        <Grid container spacing={1} style={{marginBottom: '20px'}}>
          <Grid item md={6}>
            <CInput
              label="Nome"
              name="nome"
            />        
          </Grid>
          <Grid item md={2}>
            <CInput
              label="Drogaria Rua"
              name="drogariaRua"
            />
          </Grid>
          <Grid item md={1}>
            <CInput
              label="Sigla"
              name="sigla"
            />
          </Grid>
          <Grid item md={2}>
            <CInput
              label="Categoria"
              name="categoria"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginBottom: '20px'}}>
          <Grid item md={4}>
            <CInput
              label="Logradouro"
              name="logradouro"
            />
          </Grid>
          <Grid item md={2}>
            <CInput
              label="Bairro"
              name="bairro"
            />
          </Grid>
          <Grid item md={2}>
            <CInput
              label="Cidade"
              name="cidade"
            />
          </Grid>
          <Grid item md={1}>
            <CInput
              label="Número"
              name="numero"
            />
          </Grid>
          <Grid item md={2}>
            <CInput
              label="Complemento"
              name="complemento"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginBottom: '20px'}}>
          <Grid item md={1}>
            <CInput
              label="UF"
              name="uf"
              />
          </Grid>
          <Grid item>
            <CInput
              label="CEP"
              name="cep"
            />
          </Grid>
          <Grid item>
            <CInput
              label="Telefone"
              name="telefone"
            />
          </Grid>
          <Grid item>
            <CInput
              label="Latitude"
              name="latitude"
            />
          </Grid>
          <Grid item>
            <CInput
              label="Longitude"
              name="longitude"
            />
          </Grid>
          <Grid item>
            <CInput
              label="Blitz Saúde"
              name="blitzSaude"
            />
          </Grid>
          <Grid item>
            <CInput
              label="Farmácia Popular"
              name="farmaciaPopular"
            />
          </Grid>
          <Grid item>
            <CInput
              label="Seller Ecomm"
              name="sellerEcomm"
            />
          </Grid>
          <Grid item>
            <CInput
              label="ID Loja PDV"
              name="idLojaPdv"
            /> 
          </Grid>
          <Grid item sm={3} md={3}>
            <CInputTimepicker
              type="time"
              variant="outlined"
              defaultValue={"07:30"}
              name="funcionamentoSegSab"
            />
          </Grid>
          <Grid item sm={3} md={3}>
            <CInputTimepicker
              type="time"
              variant="outlined"
              defaultValue={"07:30"}
              name="funcionamentoDomFer"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
            <Grid item sm={3} md={1}>
              <Button variant="contained" color={'secondary'} onClick={handleCancelEdition}>
                Cancelar
              </Button>
            </Grid>
            <Grid item sm={3} md={2} style={{textAlign: 'right'}}>
              <Button variant="contained" color={'primary'} type={'submit'}>
                Criar Loja
              </Button>
            </Grid>
          </Grid>
      </Form>
    </>
  )
}