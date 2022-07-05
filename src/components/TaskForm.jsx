import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { increment } from '../features/counter/counterSlice';

export const TaskForms = () => {
	const [task, setTask] = useState({});

	const [taskInput, setTaskInput] = useState('');
	const [taskArea, setTaskArea] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const tasks = useSelector((state) => state.tasks);

	const notifyAlert = () => {
		toast.error('🦄 ¡Todos los campos son requeridos!', {
			position: 'top-right',
			autoClose: 1200,
			// autoClose: false,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const handleChange = (e) => {
		const value = e.target.value;
		e.target.name === 'title' ? setTaskInput(value) : setTaskArea(value);

		setTask({
			...task,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (![tasks.title, tasks.description].includes('')) {
			if (params.id) {
				dispatch(updateTask(task));
			} else {
				dispatch(
					addTask({
						id: uuid(),
						...task,
					})
				);
				dispatch(increment());
			}

			setTaskInput('');
			setTaskArea('');

			navigate('/');
		} else {
			console.log('Todos los campos son requeridos');
			notifyAlert();
		}
	};

	useEffect(() => {
		if (params.id) {
			setTask(
				tasks.find((task) => {
					return task.id === params.id;
				})
			);
		}
	}, []);

	return (
		<div className='mb-4'>
			<h1 className='text-xl font-bold text-center'>Task Form</h1>
			<form
				action=''
				className='flex flex-col gap-2 justify-center items-center mt-4'
				onSubmit={handleSubmit}
			>
				<input
					name='title'
					type='text'
					placeholder='Task Title'
					className='md:w-2/5 w-4/5 py-2 px-3 placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-700 outline-gray-600 rounded-sm'
					onChange={handleChange}
					value={params.id ? task.title : taskInput}
				/>
				<textarea
					name='description'
					placeholder='Task Description'
					className='md:w-2/5 w-4/5 px-3 py-2 h-20 placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-700 outline-gray-600 rounded-sm'
					onChange={handleChange}
					value={params.id ? task.description : taskArea}
				></textarea>
				<button className='md:w-2/5 w-4/5 text-gray-200 px-4 py-3 rounded-sm font-bold uppercase bg-black'>
					Save
				</button>
			</form>
			<div className='flex justify-center mt-5 mb-3 mx-auto'>
				<Link
					to='/'
					className='w-2/7 py-2 px-3 font-bold bg-emerald-800 text-center rounded-sm hover:bg-white hover:text-emerald-900 transition-colors'
				>
					Back to task list
				</Link>
			</div>
			<ToastContainer />
		</div>
	);
};
