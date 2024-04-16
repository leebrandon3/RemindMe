import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App.jsx'
import Home from './components/Home.jsx'
import TaskPage from './components/TaskPage.jsx'
import CalenderPage from './components/Calender.jsx'
import Graph from './components/Graph.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'task',
        element: <TaskPage />
      },
      {
        path: 'calender',
        element: <CalenderPage />
      },
      {
        path: 'graph',
        element: <Graph />
      }
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
