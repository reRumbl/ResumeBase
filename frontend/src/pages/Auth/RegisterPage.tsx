// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import AuthForm from '../../components/Auth/AuthForm';
import InputField from '../../components/Form/InputField';
import AuthButton from '../../components/Auth/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirm_password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed', error);
            // TODO: Handle registration error (e.g., show a message to the user)
        }
    };

    return (
        <AuthLayout title='Register'>
            <AuthForm onSubmit={handleSubmit}>
                <InputField
                    label='Email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='email@example.com'
                />
                <InputField
                    label='Password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='********'
                />
                <InputField
                    label='Confirm password'
                    type='password'
                    name='confirm_password'
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder='********'
                />
                <AuthButton text='Register' />
            </AuthForm>
            <div className='mt-4 text-center text-sm text-gray-600'>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-600 hover:text-blue-800 font-medium transition'>
                    Login
                </Link>
            </div>
        </AuthLayout>
    );
};


export default RegisterPage;