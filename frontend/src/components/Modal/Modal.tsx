import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-2xl border border-gray-200'>
                <div className='flex justify-between items-center p-6 border-b border-gray-200'>
                    <h3 className='text-2xl font-bold text-gray-800'>{title}</h3>
                    <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path></svg>
                    </button>
                </div>
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;