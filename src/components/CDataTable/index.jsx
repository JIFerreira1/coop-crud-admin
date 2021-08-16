import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
import { FormControlLabel, IconButton } from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';
import CEditStoreModal from '../../components/CEditStoreModal';

import useStyles from './style';
import StoreContext from '../../contexts/Store';

export default function CDataTable({ dataReceived }) {
  const classes = useStyles();
  const history = useHistory();

  const { collection, dataModal, dataEditStore } = useContext(StoreContext);
  
  const handleGoToEdit = () => {
    history.push('/edit-store');
  }
  
  const columns = [
    { field: 'id', disableSelectionOnClick: true, sortable: false, headerName: 'ID', width: 100, hide: true },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      flex: 1
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 140,
      editable: false,
      disableSelectionOnClick: true,
      disableClickEventBubbling: true,
      sortable: false,
      renderCell: (params) => (
        <HandleEditIcon index={params} />
      ),
    },
    {
      field: 'details',
      headerName: 'Visualizar',
      width: 140,
      editable: false,
      disableSelectionOnClick: true,
      disableClickEventBubbling: true,
      sortable: false,
      renderCell: (params) => (
        <HandleDetailsIcon index={params} />
      ),
    },
    {
      field: 'delete',
      headerName: 'Deletar',
      width: 130,
      disableSelectionOnClick: true,
      disableClickEventBubbling: true,
      sortable: false,
      renderCell: (params) => (
        <HandleDeleteIcon index={params} />
      ),
    },
  ];

  const HandleDeleteIcon = ({ index }) => {
    const handleDeleteClick = () => {
      // some action
      console.log('handleDeleteClick', index);
    };
  
    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleDeleteClick}
          >
            <DeleteForeverRoundedIcon />
          </IconButton>
        }
      />
    );
  };

  const HandleDetailsIcon = ({ index }) => {
    const handleDetailsClick = () => {
      // some action
      console.log('handleEditClick', index);

      dataModal(collection.find(current => current._id == index.id));
    };
  
    return (
      <FormControlLabel
        control={
          <IconButton
            color="primary"
            aria-label="add an alarm"
            onClick={handleDetailsClick}
          >
            <DetailsIcon />
          </IconButton>
        }
      />
    );
  };

  const HandleEditIcon = ({ index }) => {
    const handleEditClick = () => {
      // some action
      console.log('handleEditClick', index);

      dataEditStore(collection.find(current => current._id == index.id));
      window.sessionStorage.clear();
      window.sessionStorage.setItem('stores', JSON.stringify(collection.find(current => current._id == index.id)));
      handleGoToEdit();
    };
  
    return (
      <FormControlLabel
        control={
          <IconButton
            color="primary"
            aria-label="add an alarm"
            onClick={handleEditClick}
          >
            <EditIcon />
          </IconButton>
        }
      />
    );
  };

  return (
    <>
      <DataGrid
        disableSelectionOnClick={true}
        autoHeight
        pageSize={5}
        rows={collection.map(row => ({'id': row._id, 'name': row.nome, 'edit': '', 'details': '', 'delete': ''}))}
        columns={columns}
        style={{backgroundColor: '#fff', borderRadius: 5}}
      />
    </>
  );
}
