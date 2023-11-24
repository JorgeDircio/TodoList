import { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import './App.css'
function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const addTask = (newTask) => {
    if(newTask.length === 0) return alert('Ingrese un valor');
    setTasks([...tasks, newTask]);
    setTask('');
  }

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleCheckboxChange = (index) => {
    const newSelectedTasks = [...selectedTasks];
    if (newSelectedTasks.includes(index)) {
      newSelectedTasks.splice(newSelectedTasks.indexOf(index), 1);
    } else {
      newSelectedTasks.push(index);
    }
    setSelectedTasks(newSelectedTasks);

    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => !newSelectedTasks.includes(i));
      setTasks(updatedTasks);
      setSelectedTasks([]);
    }, 3000);
  };
  

  return (
    <>
      <Box display='flex'>
        <TextField
          label="Nueva tarea"
          variant="outlined"
          value={task}
          onChange={handleInputChange}
        />
        <Box mt={2} ml={1}>
          <Button variant="contained" color="primary" onClick={() => addTask(task)}>
            Agregar tarea
          </Button>
        </Box>
    </Box>
      {
        tasks.length > 0 && (
          <>
              <Box mt={5} display="flex">
              <Typography variant="subtitle1">Lista de Tareas</Typography>
              </Box>
              {
                tasks.map((task, index) =>(
                  <Box key={index} display='flex'>
                    <Typography mt={1} variant="subtitle1" style={{ textDecoration: selectedTasks.includes(index) ? 'line-through' : 'none' }}>{task}</Typography>
                    <Checkbox
                      {...label}
                      checked={selectedTasks.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </Box>
                ))
              }
          </>
        )
      }
    </>
  )
}

export default App
