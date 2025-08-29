import React from 'react';


interface AuthLayoutProps {
    title: string;
    children: React.ReactNode;
}


const AuthLayout = ({ title, children }: AuthLayoutProps) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200'>
                <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>{title}</h2>
                {children}
            </div>
        </div>
    );
};


export default AuthLayout;
