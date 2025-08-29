import React from 'react';
import Modal from './Modal';


interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div>
                <p className='text-gray-600 mb-6'>{message}</p>
                <div className='flex justify-end space-x-4'>
                    <button
                        onClick={onClose}
                        className='px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition'
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
};


export default ConfirmationModal;
