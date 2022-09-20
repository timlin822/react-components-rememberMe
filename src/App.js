import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ForgetPasswordPage from 'pages/ForgetPasswordPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;