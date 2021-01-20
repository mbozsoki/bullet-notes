import { createContext, Dispatch, SetStateAction } from 'react';
import { Item } from './models/item';

export type AppState = {
    items: Item[];
    currentDate: string;
    setCurrentDate: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<AppState>({
    items: [],
    currentDate: '',
    setCurrentDate: () => {},
});

export default AppContext;
