import React, { useState, useEffect, useContext } from 'react';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import useStyles from './style';

import StoreContext from '../../contexts/Store';

export default function CShowDetailsModal() {
  const classes = useStyles();
  
  // const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [dataCurrent, setDataCurrent] = useState({});

  const { modalInfos, dataModal, collection } = useContext(StoreContext);

  useEffect(() => {

    modalInfos.length == 0 ? setOpen(false) : setOpen(true);

  }, [modalInfos])

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  // function getModalStyle() {
  //   const top = 45 + rand();
  //   const left = 45 + rand();
  
  //   return {
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     // transform: `translate(-${top}%, -${left}%)`
  //   };
  // }

  const body = (
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Drogaria Rua"
              name="drogaria rua"
              value={modalInfos.drogariaRua}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Sigla"
              name="sigla"
              value={modalInfos.sigla}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome"
              name="nome"
              value={modalInfos.nome}
              InputProps={{
                readOnly: true,
              }}
            />        
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Categoria"
              name="categoria"
              value={modalInfos.categoria}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Logradouro"
              name="logradouro"
              value={modalInfos.logradouro}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Número"
              name="numero"
              value={modalInfos.numero}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Complemento"
              name="complemento"
              value={modalInfos.complemento}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Bairro"
              name="bairro"
              value={modalInfos.bairro}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Cidade"
              name="cidade"
              value={modalInfos.cidade}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="UF"
              name="uf"
              value={modalInfos.uf}
              InputProps={{
                readOnly: true,
              }}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="CEP"
              name="cep"
              value={modalInfos.cep}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone"
              name="telefone"
              value={modalInfos.telefone}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Funcionamento de Segunda a Sábado"
              name="funcionamentoSegSab"
              value={modalInfos.funcionamentoSegSab}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Funcionamento de Domingo e Feriados"
              name="funcionamentoDomFer"
              value={modalInfos.funcionamentoDomFer}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Latitude"
              name="latitude"
              value={modalInfos.latitude}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Longitude"
              name="longitude"
              value={modalInfos.longitude}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Blitz-Saúde"
              name="blitz-Saude"
              value={modalInfos.blitzSaude}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Farmácia Popular"
              name="farmaciaPopular"
              value={modalInfos.farmaciaPopular}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Seller Ecomm"
              name="sellerEcomm"
              value={modalInfos.sellerEcomm}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="ID Loja PDV"
              name="idLojaPdv"
              value={modalInfos.idLojaPdv}
              InputProps={{
                readOnly: true,
              }}
            /> 
          </Grid>
        </Grid>
      </form>
    </div>
  );

  const handleClose = () => {
    setOpen(false);
    dataModal('');
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{overflowY: 'auto', margin: '15px 0'}}
      
    >
      {body}
    </Modal>
  )
}