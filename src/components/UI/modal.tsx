'use client';

import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div
            id="modal-overlay"
            onClick={handleClose}
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 overflow-hidden"
        >
            <div className="bg-white rounded-lg shadow-lg w-auto mx-4 max-h-[90vh] overflow-auto custom-scrollbar">
                <div className="flex justify-end sticky mr-3">
                    <button
                        onClick={onClose}
                        className="text-gray-600 text-xl font-bold"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
