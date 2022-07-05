import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import constReducer from '../features/counter/counterSlice';

export const store = configureStore({
	reducer: {
		tasks: taskReducer,
		counter: constReducer,
	},
});
