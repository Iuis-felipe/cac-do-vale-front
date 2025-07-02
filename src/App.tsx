import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './core/routes'

function App() {

  return (
    <Suspense fallback={<p> Carregando... </p>}>
      <RouterProvider router={Router}  />
    </Suspense>
  )
}

export default App
