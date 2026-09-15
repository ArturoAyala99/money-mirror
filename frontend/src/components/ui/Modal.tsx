import React from 'react';

interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay */}
            <div onClick={onClose} className="fixed inset-0 bg-black/50"/>

            {/* Contenedor del modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                {/* Cabecera */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Cerrar">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-4 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal