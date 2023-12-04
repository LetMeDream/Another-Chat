import ReactDOM from 'react-dom/client'
import Root from './routes/Root.tsx'
import './index.css'
import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom'
//import ErrorPage from './error-page.jsx'
import RedirectRoute from './routes/RedirectRoute.tsx'

/* const router = createBrowserRouter([
  {
    path: '/Another-Chat-FE/',
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: '/Another-Chat-FE/redirect/:userId',
    element: <RedirectRoute />,
    errorElement: <ErrorPage />
  },
]) */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/Another-Chat-FE' element={<Root />}></Route>
      <Route path='/' element={<Root />}></Route>
      <Route path='Another-Chat-FE/redirect/:userId' element={<RedirectRoute />}></Route>
      <Route path='/redirect/:userId' element={<RedirectRoute />}></Route>
    </Routes>
  </BrowserRouter> 
  /* <React.StrictMode> */
    //<RouterProvider router={router} />
  /* </React.StrictMode>, */
)
