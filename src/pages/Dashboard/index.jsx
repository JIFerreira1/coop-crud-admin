import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Container, Box, Button } from '@material-ui/core';
import CNavbar from '../../components/CNavbar';
import CDataTable from '../../components/CDataTable';
import CModal from '../../components/CShowDetailsModal';

import StoreContext from '../../contexts/Store';

export default function Dashboard (){
  const { collection, getItems } = useContext(StoreContext);
    
	useEffect(() => {
    getItems();
    window.sessionStorage.clear();
	}, []);
  
  return (
    <>
      <Box style={{height: '100vh', backgroundColor: '#DCDCDC', display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <CNavbar style={{float: 'left'}}/>
        <Container style={{width: '100%', height: '80%', padding: '3% 2% 0 2%', backgroundColor: 'rgb(255, 255, 255)', borderRadius: 4}} >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <h1 style={{marginBottom: '3%', fontSize: '25px'}}>Lista de Lojas</h1> 
            <Link to="/create-store">
              <Button color={'primary'}>
                Criar Loja
              </Button>
            </Link>
          </div>
          <CDataTable dataReceived={collection} />
          <CModal />
        </Container>
      </Box>
    </>
  )
}