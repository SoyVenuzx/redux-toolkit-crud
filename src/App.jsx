import { useSelector } from 'react-redux';
import { TaskForms } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const StateTasks = useSelector((state) => state.tasks);
	// console.log(StateTasks);

	return (
		<div
			className='flex flex-col gap-3 p-5 bg-gray-900 w-full text-gray-200'
			style={{ minHeight: '100vh' }}
		>
			<h1 className='font-extrabold text-2xl mb-2 text-center'>
				Task Manager - Redux Toolkit
			</h1>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<TaskList />} />
					<Route path='/create-task' element={<TaskForms />} />
					<Route path='/edit-task/:id' element={<TaskForms />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
