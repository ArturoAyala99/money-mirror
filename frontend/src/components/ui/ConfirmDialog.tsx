import React from 'react';

interface ConfirmDialogProps{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Contenedor del diálogo */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                {/* Cabecera */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate pr-2">
                        {title}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer" aria-label="Cerrar">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Mensaje */}
                <div className="p-3 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-600">{message}</p>
                </div>
                {/* Botones */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-3 sm:p-4 border-t border-gray-200">
                    <button onClick={onClose} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                        CANCELAR
                    </button>
                    <button onClick={onConfirm} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                        ELIMINAR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog