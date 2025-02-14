import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ArchiveList from './ArchiveList';


function App() {
  return (
    <div className="App">
      {/* <h1>Task Manager</h1> */}
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/task-form">Task Form</Link>
        <Link to="/archive-form">Archive Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="/archive-form" element={<ArchiveList/>} />
      </Routes>
    </div>
  );
}

export default App;
