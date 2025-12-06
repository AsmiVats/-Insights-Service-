import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './page/Dashboard'
import SignIn from './page/SignIn'
import SignUp from './page/SignUp'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/signin' element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
    </Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
