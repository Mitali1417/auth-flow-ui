import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Signup } from './pages/Signup';
import { OTPVerification } from './pages/OTPVerification';
import { LoginOTP } from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginOTP />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;