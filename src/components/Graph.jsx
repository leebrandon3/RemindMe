import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom'

function Graph() {
  const {taskArray} = useOutletContext()

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'RemindMe Completion Chart',
      },
    },
  }

  const labels = []
  const incompleteData = []
  const completeData = []

  taskArray.forEach(task => {
    const {due} = task
    if(labels.includes(due) === false){
      labels.push(due)
      if(task.complete === false){
        completeData[labels.length - 1] = 0
        incompleteData[labels.length - 1] = 1
      }
      else if(task.complete === true){
        completeData[labels.length - 1] = 1
        incompleteData[labels.length - 1] = 0
      }
    }
    else if(labels.includes(due) === true){
      
      if(task.complete === false){
        incompleteData[labels.indexOf(due)]++
      }
      else if(task.complete === true){
        completeData[labels.indexOf(due)]++
      }
    }
  })  
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Incomplete',
        data: incompleteData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Complete',
        data: completeData,
        borderColor: 'rgb(0, 128, 0)',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
      },
    ],
  }

  return (
    <div className="home">
      <h3>Stats for the nerds out there</h3>
      <Line options={options} data={data}/>
    </div>
  );
}
  
  export default Graph;