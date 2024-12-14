/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import EditEntry from './components/EditEntry';

const router = createBrowserRouter(
  createRoutesFromElements([
  <Route path="/" element={<App />} />,
  <Route path="/entries/edit/:id" element={<EditEntry />} />
])
)

export default router
