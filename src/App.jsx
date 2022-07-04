import { useSelector } from 'react-redux';
import { TaskForms } from './components/TaskForm';

function App() {
	const tasksState = useSelector((state) => state.tasks);
	console.log(tasksState);

	return (
		<>
			<h1>Hello, World!</h1>
			<TaskForms />
		</>
	);
}

export default App;
