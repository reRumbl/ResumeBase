import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { Resume } from '../types/Resume';
import Modal from '../components/Modal/Modal';
import ResumeForm from '../components/Resume/ResumeForm';
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import { ImprovementHistory } from '../types/ImprovementHistory';
import ImprovementHistoryModal from '../components/Resume/ImprovementHistoryModal';


const HomePage = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResume, setEditingResume] = useState<Resume | null>(null);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedResumeHistory, setSelectedResumeHistory] = useState<ImprovementHistory[]>([]);
    const [selectedResumeTitle, setSelectedResumeTitle] = useState('');
    const [resumeToImprove, setResumeToImprove] = useState<string | null>(null);
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
    const [isConfirmImproveModalOpen, setIsConfirmImproveModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const response = await api.get<Resume[]>('/resume/');
            setResumes(response.data);
        } catch (err) {
            setError('Failed to fetch resumes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingResume(null);
    };

    const handleCreateResume = async (resumeData: { title: string; content: string }) => {
        try {
            const response = await api.post<Resume>('/resume/', resumeData);
            setResumes(prevResumes => [...prevResumes, response.data]);
            handleModalClose();
        } catch (err) {
            console.error('Failed to create resume', err);
            // TODO: show error to user
        }
    };

    const handleUpdateResume = async (resumeData: { title: string; content: string }) => {
        if (!editingResume) return;
        try {
            await api.put(`/resume/${editingResume.id}`, resumeData);
            setResumes(prevResumes => 
                prevResumes.map(resume => 
                    resume.id === editingResume.id ? { ...resume, ...resumeData } : resume
                )
            );
            handleModalClose();
        } catch (err) {
            console.error('Failed to update resume', err);
            // TODO: show error to user
        }
    };

    const handleDeleteResume = async (resumeId: string) => {
        setResumeToDelete(resumeId);
        setIsConfirmDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!resumeToDelete) return;

        try {
            await api.delete(`/resume/${resumeToDelete}`);
            setResumes(prevResumes => prevResumes.filter(resume => resume.id !== resumeToDelete));
            setIsConfirmDeleteModalOpen(false);
            setResumeToDelete(null);
        } catch (err) {
            console.error('Failed to delete resume', err);
            // TODO: show error to user
        }
    };

    const handleImproveResume = async (resumeId: string) => {
        setResumeToImprove(resumeId);
        setIsConfirmImproveModalOpen(true);
    };

    const handleConfirmImprove = async () => {
        if (!resumeToImprove) return;

        try {
            const response = await api.patch<Resume>(`/resume/${resumeToImprove}/improve`);
            setResumes(prevResumes =>
                prevResumes.map(resume =>
                    resume.id === resumeToImprove ? response.data : resume
                )
            );
            setIsConfirmImproveModalOpen(false);
            setResumeToImprove(null);
        } catch (err) {
            console.error('Failed to improve resume', err);
            // TODO: show error to user
        }
    }
    

    const handleShowHistory = async (resume: Resume) => {
        try {
            const response = await api.get<ImprovementHistory[]>(`/resume/${resume.id}/history`);
            setSelectedResumeHistory(response.data);
            setSelectedResumeTitle(resume.title);
            setHistoryModalOpen(true);
        } catch (err) {
            console.error('Failed to fetch history', err);
            // TODO: show error to user
        }
    };

    if (loading) {
        return <div className='text-center p-4'>Loading...</div>;
    }

    if (error) {
        return <div className='text-center p-4 text-red-500'>{error}</div>;
    }

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>Your Resumes</h1>
                <button 
                    onClick={() => { setEditingResume(null); setIsModalOpen(true); }}
                    className='bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition'
                >
                    Create New Resume
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingResume ? 'Edit Resume' : 'Create New Resume'}>
                <ResumeForm 
                    onSubmit={editingResume ? handleUpdateResume : handleCreateResume} 
                    initialData={editingResume || undefined}
                    buttonText={editingResume ? 'Save Changes' : 'Create'}
                />
            </Modal>

            <ImprovementHistoryModal
                isOpen={historyModalOpen}
                onClose={() => setHistoryModalOpen(false)}
                history={selectedResumeHistory}
                resumeTitle={selectedResumeTitle}
            />

            <ConfirmationModal
                isOpen={isConfirmImproveModalOpen}
                onClose={() => {
                    setIsConfirmImproveModalOpen(false);
                    setResumeToImprove(null);
                }}
                onConfirm={handleConfirmImprove}
                title='Improve Resume'
                message='Are you sure you want to improve this resume with AI?'
            />

            <ConfirmationModal
                isOpen={isConfirmDeleteModalOpen}
                onClose={() => {
                    setIsConfirmDeleteModalOpen(false);
                    setResumeToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title='Delete Resume'
                message='Are you sure you want to delete this resume? This action cannot be undone.'
            />

            {resumes.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {resumes.map(resume => (
                        <div key={resume.id} className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between'>
                            <div>
                                <h2 className='text-xl font-bold text-gray-800 mb-2'>{resume.title}</h2>
                                <p className='text-gray-600 mb-4 whitespace-pre-wrap'>{resume.content.substring(0, 150)}...</p>
                            </div>
                            <div className='flex justify-end space-x-3 mt-4'>
                                <button 
                                    onClick={() => { setEditingResume(resume); setIsModalOpen(true); }}
                                    className='text-sm font-medium text-blue-600 hover:text-blue-800 transition'
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleImproveResume(resume.id)}
                                    className='text-sm font-medium text-green-600 hover:text-green-800 transition'
                                >
                                    Improve
                                </button>
                                <button 
                                    onClick={() => handleShowHistory(resume)}
                                    className='text-sm font-medium text-purple-600 hover:text-purple-800 transition'
                                >
                                    History
                                </button>
                                <button 
                                    onClick={() => handleDeleteResume(resume.id)}
                                    className='text-sm font-medium text-red-600 hover:text-red-800 transition'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center py-10 bg-white rounded-lg shadow-md'>
                    <p className='text-gray-500'>You don't have any resumes yet.</p>
                    <p className='text-gray-500 mt-2'>Click 'Create New Resume' to get started!</p>
                </div>
            )}
        </div>
    );
};


export default HomePage;