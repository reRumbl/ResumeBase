import React from 'react';


interface AuthButtonProps {
    text: string;
    onClick?: () => void;
}


const AuthButton = ({ text, onClick }: AuthButtonProps) => {
    return (
        <button
        type='submit'
        onClick={onClick}
        className='w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition cursor-pointer'
        >
            {text}
        </button>
    );
};


export default AuthButton;
