// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import AuthForm from '../../components/Auth/AuthForm';
import InputField from '../../components/Form/InputField';
import AuthButton from '../../components/Auth/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            // TODO: Handle login error
        }
    };

    return (
        <AuthLayout title='Login'>
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
                <AuthButton text='Login' />
            </AuthForm>
            <div className='mt-4 text-center text-sm text-gray-600'>
                No account?{' '}
                <Link to='/register' className='text-blue-600 hover:text-blue-800 font-medium transition'>
                    Register
                </Link>
            </div>
        </AuthLayout>
    );
};


export default LoginPage;