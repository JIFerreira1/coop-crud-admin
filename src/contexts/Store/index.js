import React, { createContext, useState } from 'react';
import { getItemsListStore } from '../../services/store';

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
	const [collection, setCollection] = useState([]);
	const [modalInfos, setModalInfos] = useState([]);
	const [modalEdit, setModalEdit] = useState([]);

	async function getItems() {
		const response = await getItemsListStore();
		setCollection(response);
	}

	function dataModal(storeSelected) {
		setModalInfos(storeSelected);
	}

	function dataEditStore(storeSelected){
		console.log('dataEditStore', storeSelected);
		setModalEdit(storeSelected);
	}

	return (
		<StoreContext.Provider value={{ collection, getItems, dataModal, modalInfos, dataEditStore, modalEdit }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContext;