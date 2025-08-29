import React from 'react';


interface AuthFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}


const AuthForm = ({ onSubmit, children }: AuthFormProps) => {
    return (
        <form onSubmit={onSubmit} className='space-y-6'>
            {children}
        </form>
    );
};


export default AuthForm;
