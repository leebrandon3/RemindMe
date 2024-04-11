import { useState } from 'react'

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
        <form onSubmit={handleSubmit}> 
            <label htmlFor='task'>Task: </label>
            <input name='task' placeholder='Dog Walk' onChange={handleChange} value={formObj.task}/>
            <br/>

            <label htmlFor='description'>Description: </label>
            <input name='description' placeholder='Doggo needs his steps' onChange={handleChange} value={formObj.description}/>
            <br/>

            <label htmlFor='start'>Start Date: </label>
            <input name='start' type='date' onChange={handleChange} value={formObj.start}/>
            <br/>

            <label htmlFor='due'>Due Date: </label>
            <input name='due' type='date' onChange={handleChange} value={formObj.due}/>
            <br/>

            <label htmlFor='priority-select'>Priority: </label>
            <select name='priority' id='priority-select' onChange={handleChange} value={formObj.priority}>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>high</option>
            </select>
            <br/>

            <input type='submit' value='TASK'/>
        </form>
    )
}

export default AddTask