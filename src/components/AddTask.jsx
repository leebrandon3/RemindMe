import { useState } from 'react'
import '../index.css'

function AddTask({setTaskArray}) {

    const [formObj,setFormObj] = useState({
        task: '',
        description: '',
        start: '',
        due: '',
        priority: 'Low'
    })

    function handleChange(event){
        console.log(event.target.value)
        setFormObj({...formObj, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3000/tasks',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({...formObj, complete: false})
        })
        .then(res => res.json())
        .then(data => setTaskArray(taskArray => [...taskArray, data]))
    }

    return (
        <form onSubmit={handleSubmit} className='form'> 
            <h3>Add new task</h3>
            <div>
                <label htmlFor='task'>Task: </label>
                <input name='task' placeholder='Dog Walk' onChange={handleChange} value={formObj.task}/>
            </div>
            <div>
                <label htmlFor='description'>Description: </label>
                <input name='description' placeholder='Doggo needs his steps' onChange={handleChange} value={formObj.description}/>
            </div>
            <div>
                <label htmlFor='start'>Start Date: </label>
                <input name='start' type='date' onChange={handleChange} value={formObj.start}/>
            </div>
            <div>
                <label htmlFor='due'>Due Date: </label>
                <input name='due' type='date' onChange={handleChange} value={formObj.due}/>
            </div>
            <div>
                <label htmlFor='priority-select'>Priority: </label>
                <select name='priority' id='priority-select' onChange={handleChange} value={formObj.priority}>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>high</option>
                </select>
            </div>
            <div>
                <input type='submit' value='Submit'/>
            </div>
        </form>
    )
}

export default AddTask