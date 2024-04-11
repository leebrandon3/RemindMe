import TaskList from './TaskList'
import { useOutletContext } from 'react-router-dom'
import '../index.css'
import AddTask from './AddTask'

function TaskPage() {

  const {taskArray, setTaskArray} = useOutletContext()

  return (
    <div className='tasks'>
      <AddTask setTaskArray={setTaskArray}/>
      <div>
        <TaskList taskArray={taskArray} setTaskArray={setTaskArray}/>
      </div>
    </div>
  );
}

export default TaskPage;