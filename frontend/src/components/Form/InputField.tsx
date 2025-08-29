import React from 'react';


interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}


const InputField = ({ label, type, name, value, onChange, placeholder }: InputFieldProps) => {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
            />
        </div>
    );
};


export default InputField;