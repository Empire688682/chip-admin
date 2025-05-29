import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPage from './SignupPage';

const SignupProtector = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("userData"));
    
      if (storedUser) {
        navigate("/dashboard");
        return;
      }
    }, []);

  return (
    <div>
      <SignupPage />
    </div>
  )
}

export default SignupProtector
