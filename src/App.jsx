import { useSelector } from 'react-redux';

function App() {
	const tasksState = useSelector((state) => state.tasks);
	console.log(tasksState);

	return (
		<>
			<h1>Hello, World!</h1>
		</>
	);
}

export default App;
