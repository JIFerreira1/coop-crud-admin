import React, { createContext, useState } from 'react';
import { getItemsListStore } from '../../services/store';

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
	const [collection, setCollection] = useState([]);

	async function getItems() {
		const response = await getItemsListStore();
		setCollection(response);
	}

	return (
		<StoreContext.Provider value={{ collection, getItems }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContext;