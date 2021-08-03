import React, { useEffect, useContext } from 'react';

import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CNavbar from '../../components/CNavbar';
import CDataTable from '../../components/CDataTable';


import StoreContext from '../../contexts/Store';


export default function Dashboard (){
  const { collection, getItems } = useContext(StoreContext);
    
	useEffect(() => {
    getItems();
	}, []);
  
  return (
    <>
      <CNavbar />
        <Container style={{maxHeight: 50}}>
            <Grid item xs={8}>
              <CDataTable dataReceived={collection} />
            </Grid>
        </Container>
    </>
  )
}