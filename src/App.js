import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import CreateCollection from './pages/CreateCollection';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/create-collection' element={<CreateCollection />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
