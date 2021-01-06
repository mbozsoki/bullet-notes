import { AnyAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const currentDateSlice = createSlice({
    name: 'currentDate',
    initialState: dayjs().format('YYYY-MM-DD'),
    reducers: {
        setCurrentDate(state: string, action: AnyAction) {
            return action.payload;
        },
    },
});

export const { setCurrentDate } = currentDateSlice.actions;

export default currentDateSlice.reducer;
