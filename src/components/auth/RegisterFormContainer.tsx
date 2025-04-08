
import React, { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import LoginError from './LoginError';
import RegisterFormFields from './RegisterFormFields';
import RegisterButton from './RegisterButton';
import RegisterFooter from './RegisterFooter';
import { useRegistration, RegistrationHookProps, RegistrationData } from '@/hooks/useRegistration';

const RegisterFormContainer: React.FC<RegistrationHookProps> = ({ onSuccess, onCaptchaError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { isLoading, errorMessage, handleRegister } = useRegistration({
    onSuccess,
    onCaptchaError
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: RegistrationData = {
      email,
      password,
      name,
      phone
    };
    
    await handleRegister(formData, acceptTerms, confirmPassword);
  };

  return (
    <>
      {errorMessage && (
        <div className="p-3 pt-6 px-6">
          <LoginError error={errorMessage} />
        </div>
      )}
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <RegisterFormFields
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
            isLoading={isLoading}
          />
          <RegisterButton isLoading={isLoading} />
        </form>
      </CardContent>
      <RegisterFooter />
    </>
  );
};

export default RegisterFormContainer;
