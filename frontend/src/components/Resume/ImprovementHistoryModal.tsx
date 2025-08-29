import React from 'react';
import Modal from '../Modal/Modal';
import { ImprovementHistory } from '../../types/ImprovementHistory';

interface ImprovementHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    history: ImprovementHistory[];
    resumeTitle: string;
}

const ImprovementHistoryModal = ({ isOpen, onClose, history, resumeTitle }: ImprovementHistoryModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Improvement History for '${resumeTitle}'`}>
            {history.length > 0 ? (
                <div className='space-y-6 max-h-[60vh] overflow-y-auto'>
                    {history.map((entry) => (
                        <div key={entry.id} className='p-4 border border-gray-200 rounded-lg'>
                            <p className='text-sm text-gray-500 mb-2'>
                                {new Date(entry.created_at).toLocaleString()}
                            </p>
                            <div>
                                <h4 className='font-semibold text-gray-700'>Before:</h4>
                                <p className='text-sm text-gray-600 bg-red-50 p-2 rounded whitespace-pre-wrap'>{entry.content_before}</p>
                            </div>
                            <div className='mt-2'>
                                <h4 className='font-semibold text-gray-700'>After:</h4>
                                <p className='text-sm text-gray-600 bg-green-50 p-2 rounded whitespace-pre-wrap'>{entry.content_after}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>No improvement history found for this resume.</p>
            )}
        </Modal>
    );
};

export default ImprovementHistoryModal;