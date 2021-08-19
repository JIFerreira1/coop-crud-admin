import React, { useState, useEffect, useContext, useRef } from 'react';
import * as Yup from 'yup'
import NumberFormat from 'react-number-format';

import { Form } from '@unform/web';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CInput from '../Form/Input'
import CInputTimepicker from '../Form/InputTimepicker'

import useStyles from './style';
import { useHistory } from 'react-router-dom';


export default function CEditStoreModal() {
  const formRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  let allErrors = {};

  const [openNotificationFieldRequired, setOpenNotificationFieldRequired] = React.useState(false);

  const recoveryData = JSON.parse(window.sessionStorage.getItem('stores'));
    if(recoveryData == undefined || recoveryData == null){
      history.push('/dashboard');
  }

  useEffect(() => {
    console.log('formRef.current', formRef.current.getErrors());
    allErrors = formRef.current.getErrors();
    formRef.current.setData({
      drogariaRua: (recoveryData.drogariaRua !== undefined ? recoveryData.drogariaRua : null),
      sigla: (recoveryData.sigla !== undefined ? recoveryData.sigla : null),
      nome: (recoveryData.nome !== undefined ? recoveryData.nome : null),
      categoria: (recoveryData.categoria !== undefined ? recoveryData.categoria : null),
      logradouro: (recoveryData.logradouro !== undefined ? recoveryData.logradouro : null),
      numero: (recoveryData.numero !== undefined ? recoveryData.numero : 0),
      complemento: (recoveryData.complemento !== undefined ? recoveryData.complemento : null),
      bairro: (recoveryData.bairro !== undefined ? recoveryData.bairro : null),
      cidade: (recoveryData.cidade !== undefined ? recoveryData.cidade : null),
      uf: (recoveryData.uf !== undefined ? recoveryData.uf : null),
      cep: (recoveryData.cep !== undefined ? recoveryData.cep : null),
      telefone: (recoveryData.telefone !== undefined ? recoveryData.telefone : null),
      funcionamentoSegSab: (recoveryData.funcionamentoSegSab !== undefined ? {'horarioSegunda': handleFormatingDateTime(recoveryData.funcionamentoSegSab, 0), 'horarioSabado': handleFormatingDateTime(recoveryData.funcionamentoSegSab, 1)} : null),
      funcionamentoDomFer: (recoveryData.funcionamentoDomFer !== undefined ? {'horarioSegunda': handleFormatingDateTime(recoveryData.funcionamentoDomFer, 0), 'horarioSabado': handleFormatingDateTime(recoveryData.funcionamentoDomFer, 1)} : null),
      latitude: (recoveryData.latitude !== undefined ? recoveryData.latitude : null),
      longitude: (recoveryData.longitude !== undefined ? recoveryData.longitude : null),
      blitzSaude: (recoveryData.blitzSaude !== undefined ? recoveryData.blitzSaude : null),
      farmaciaPopular: (recoveryData.farmaciaPopular !== undefined ? recoveryData.farmaciaPopular : null),
      sellerEcomm: (recoveryData.sellerEcomm !== undefined ? recoveryData.sellerEcomm : null),
      idLojaPdv: (recoveryData.idLojaPdv !== undefined ? recoveryData.idLojaPdv : 0)
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

  function handleFormatingDateTime(time, campo) {
    let newDateTime = new Date();
    let formatTimeParam = time.split(" às ")[campo]
    newDateTime.setHours(formatTimeParam.split(':')[0], formatTimeParam.split(':')[1])
    return newDateTime.toTimeString().split(" ")[0]
  }

  async function handleSubmit(data, { reset }) {
    // updateStore(modalEdit._id, data);
    console.log('dadosEnviados', data);
    try {
      const schema = Yup.object().shape({
        categoria: Yup.string().required('Categoria é obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      formRef.current.reset();
      formRef.current.setErrors({});
    } catch (err) {
      debugger
      if(err instanceof Yup.ValidationError) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
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
        <h1 style={{marginBottom: '3%', fontSize: '25px'}}>Editando informações da <span style={{textTransform: 'lowercase', fontStyle: 'italic'}}>{recoveryData.nome}</span></h1> 
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} noValidate={true}>
        <Grid container spacing={1} style={{marginBottom: '20px'}}>
          <Grid item md={6}>
            <CInput
              label="Nome"
              name="nome"
              readOnly={true}
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
              readOnly={true}
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
          <Grid item sm={3} md={4}>
            <CInputTimepicker
              type="time"
              variant="outlined"
              defaultValue={"07:30"}
              name="funcionamentoSegSab"
            />
          </Grid>
          <Grid item sm={3} md={4}>
            <CInputTimepicker
              type="time"
              variant="outlined"
              defaultValue={"07:30"}
              name="funcionamentoDomFer"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end" >
            <Grid item sm={3} md={1}>
              <Button variant="contained" color={'primary'} type={'submit'}>
                Alterar
              </Button>
            </Grid>
            <Grid item sm={3} md={1}>
              <Button variant="contained" color={'secondary'} onClick={handleCancelEdition}>
                Cancelar
              </Button>
            </Grid>
          </Grid>
      </Form>
    </>
  )
}