import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { 
  Typography, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button, 
  TextField, 
  Grid, 
  Container,
  Avatar
} from '@material-ui/core';
import InputMask from 'react-input-mask';

import { Link } from 'react-router-dom';


import useStyles from './style';

export default function RecoveryPassword() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar Senha
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
              />
            </Grid>
            <Grid item xs={12}>
            <FormLabel component="legend">Receber nova senha por:</FormLabel>
              <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel value="email" control={<Radio />} label="E-mail" checked/>
                <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              </RadioGroup>
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
        </form>
      </div>
    </Container>
  );
}