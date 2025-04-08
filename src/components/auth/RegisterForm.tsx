
import React from 'react';
import RegisterFormContainer from './RegisterFormContainer';

interface RegisterFormProps {
  onSuccess: () => void;
  onCaptchaError?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onCaptchaError }) => {
  return <RegisterFormContainer onSuccess={onSuccess} onCaptchaError={onCaptchaError} />;
};

export default RegisterForm;
