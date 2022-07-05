import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';
import { decrement, selectValue } from '../features/counter/counterSlice';

export const TaskList = () => {
	const taskList = useSelector((state) => state.tasks);

	const dispatch = useDispatch();
	const value = useSelector(selectValue);

	const handleDelete = (id) => {
		dispatch(deleteTask(id));
		dispatch(decrement());
	};

	return (
		<div>
			<header>
				<h1 className='font-bold text-xl text-center'>Task List: {value}</h1>
				<div className='flex justify-center mt-5 mb-3 mx-auto'>
					<Link
						to='/create-task'
						className='w-2/7 py-2 px-3 font-bold bg-emerald-800 text-center rounded-sm hover:bg-white hover:text-emerald-900 transition-colors'
					>
						Create a new task
					</Link>
				</div>
			</header>

			<div className='flex gap-3 flex-col mt-1 p-3'>
				{taskList.length > 0 ? (
					taskList.map((task, index) => (
						<div
							key={task.id}
							className='bg-gray-800 rounded-md shadow-md p-5 md:w-2/4 md:mx-auto'
						>
							<div className='text-gray-200 cursor-pointer hover:scale-95 transition-transform'>
								<h3
									href='#'
									className='font-bold text-center text-md'
									style={{ marginBottom: '6px' }}
								>
									{task.title}
								</h3>
								<hr />
								<p className='mt-2'>{task.description}</p>
							</div>
							<div className='flex gap-3 justify-between mt-4'>
								<Link
									to={`/edit-task/${task.id}`}
									className='w-16 text-xs bg-indigo-800 px-3 py-1 rounded-sm hover:bg-indigo-900 transition-colors'
								>
									Edit
								</Link>
								<button
									className='w-16 text-xs bg-red-800 px-3 py-1 rounded-sm hover:bg-red-900 transition-colors'
									onClick={() => handleDelete(task.id)}
								>
									Delete
								</button>
							</div>
						</div>
					))
				) : (
					<h2 className='text-center'>Aún no hay registros.</h2>
				)}
			</div>
		</div>
	);
};
