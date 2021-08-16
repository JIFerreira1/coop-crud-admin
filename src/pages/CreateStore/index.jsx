import React, { useEffect, useContext } from 'react';

import { Container, Box } from '@material-ui/core';
import CNavbar from '../../components/CNavbar';
import CCreateStoreModal from '../../components/CCreateStoreModal';

import StoreContext from '../../contexts/Store';

export default function Dashboard (){
  const { getItems } = useContext(StoreContext);
    
	useEffect(() => {
    getItems();
	}, []);
  
  return (
    <>
      <Box style={{backgroundColor: '#DCDCDC', display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <CNavbar style={{float: 'left'}}/>
        <Container style={{width: '100%', height: '70%', margin: '3% auto', padding: '3% 2% 2% 2%', backgroundColor: 'rgb(255, 255, 255)', borderRadius: 4}} >
          <CCreateStoreModal />
        </Container>
      </Box>
    </>
  )
}