import React, { useState, useEffect } from 'react';
import { Resume } from '../../types/Resume';
import InputField from '../Form/InputField';

interface ResumeFormProps {
    onSubmit: (resumeData: { title: string; content: string }) => void;
    initialData?: Partial<Resume>;
    buttonText: string;
}

const ResumeForm = ({ onSubmit, initialData, buttonText }: ResumeFormProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <InputField
                label='Title'
                type='text'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='e.g. Senior Python Developer'
            />
            <div>
                <label htmlFor='content' className='block text-sm font-medium text-gray-700'>
                    Content
                </label>
                <textarea
                    id='content'
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className='mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    placeholder='Your resume content here...'
                />
            </div>
            <div className='flex justify-end'>
                <button
                    type='submit'
                    className='bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition'
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
};

export default ResumeForm;