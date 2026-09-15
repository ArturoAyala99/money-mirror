import { useEffect, useState } from 'react';
import { getAccounts, createAccount, editAccount, deleteAccount } from '../api/accounts';
import type { AccountData } from '../api/accounts';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import type { AccountFormData } from '../components/accounts/AccountForm'
import AccountForm from '../components/accounts/AccountForm';

const Accounts = () => {
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    const ICONS: Record<string, string> = {
        DEBIT: "💳",
        CREDIT: "🏦",
        CASH: "💵",
        SAVINGS: "💰"
    };
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');
    // modal para crear/editar cuenta
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalError, setModalError] = useState('');
    // modal, nombre y id de la cuenta a eliminar
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [accountDataToDelete, setAccountDataToDelete] = useState({ id: 0, name: '' });
    // variable para editar
    const [accountDataToEdit, setAccountDataToEdit] = useState<AccountData | null>(null);

    // llamada a la api
    useEffect(() => {
        const fetchAccountsData = async () => {
            try{
                const responseData = await getAccounts();
                setAccounts(responseData);
            } catch (error) {
                console.error(error);
                setError('Error al obtener las cuentas');
            } finally{
                setLoading(false);
            }
        }

        fetchAccountsData();
    }, []);

    // crear cuenta
    const handleCreateAccount = async (data: AccountFormData) => {
        //setIsSubmitting(true);
        setModalError('');
        try{
            // 1. Crear la cuenta en el backend
            await createAccount(data);
            // 2. Refrescar la lista de cuentas
            const refreshed = await getAccounts();
            setAccounts(refreshed);
            // 3. Cerrar el modal
            setIsModalOpen(false);
        } catch (error: any){
            console.error(error);
            setModalError(error.response?.data?.detail || 'Error al crear la cuenta');
        }
    }

    // editar cuenta
    const setDataToEdit = (data: AccountData) => {
        setAccountDataToEdit(data);
        setIsModalOpen(true);
    }

    const handleEditAccount = async (data: AccountFormData) => {
        // validar que exista id (por cualquier cosa)
        if (accountDataToEdit === null) return;

        setModalError('');
        try{
            // 1. Editar la cuenta
            await editAccount(accountDataToEdit.id, data);
            // 2. Refrescar la lista de cuentas
            const refreshed = await getAccounts();
            setAccounts(refreshed);
            // 3. Cerrar el modal
            setIsModalOpen(false);
        } catch (error: any){
            console.error(error);
            setModalError(error.response?.data?.detail || 'Error al editar la cuenta');
        }
    }

    // eliminar cuenta
    const setDataToDelete = (name: string, id: number) => {
        setAccountDataToDelete({ id, name });
        setIsConfirmDialogOpen(true);
    }

    const handleDeleteAccount = async () => {
        try{
            // 1. Eliminar la cuenta
            await deleteAccount(accountDataToDelete.id);
            // 2. refrescar lista
            const refreshed = await getAccounts();
            setAccounts(refreshed);
            // 3. Cerrar dialog
            setIsConfirmDialogOpen(false);
        } catch (error: any){
            console.error(error);
        }finally{
            // limpiamos los datos
            setAccountDataToDelete({ id: 0, name: '' });
        }
    }

    if (loading){
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Cargando Cuentas...</p>
            </div>
        );
    }

    if (error) {
        return (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
            {error}
        </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Mis Cuentas</h1>
                <button onClick={() => {setAccountDataToEdit(null);setModalError('');setIsModalOpen(true);}} className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer">
                    <span className="mr-2">+</span> Agregar cuenta
                </button>
            </div>

            {/* Listado de cuentas */}
            {accounts.length ===  0 ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg text-center">
                    No tienes cuentas registradas.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {accounts.map(account => (
                        <div key={account.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
                            {/* Icono y nombre */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    {
                                        <span className="text-2xl">{ICONS[account.type]}</span>
                                    }
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{account.name}</h3>
                                        <span className="text-xs text-gray-500">{account.type}</span>
                                    </div>
                                </div>
                                {/* Botones de acción (editar/eliminar) */}
                                <div className="flex gap-1">
                                    <button onClick={() => setDataToEdit(account)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"aria-label="Editar">
                                        ✏️
                                    </button>
                                    <button onClick={() => setDataToDelete(account.name, account.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer" aria-label="Eliminar">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            {/* Saldo */}
                            <div className="mt-3">
                                <p className="text-sm text-gray-500">Saldo actual</p>
                                <p>{account.current_balance} {account.currency}</p>
                            </div>
                            {/* Estado (activa/inactiva) */}
                            <div className="mt-2">
                                <span className={`inline-block text-xs px-2 py-1 rounded-full ${account.is_active ? 'bg-green-100 text-green-800': 'bg-gray-100 text-gray-600'}`}>
                                    {account.is_active ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para crear o editar */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => { 
                    setIsModalOpen(false);
                    setAccountDataToEdit(null);
                    setModalError('');
                }}
                title={accountDataToEdit ? "Editar Cuenta" : "Agregar Cuenta"}
            >
                {modalError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                        {modalError}
                    </div>
                )}
                <AccountForm key={accountDataToEdit?.id || 'new'} onSubmit={accountDataToEdit ? handleEditAccount : handleCreateAccount} onCancel={() => {setIsModalOpen(false);setAccountDataToEdit(null);setModalError('');}} initialData={accountDataToEdit || undefined} />
            </Modal>

            {/* Diálogo de confirmación para eliminar */}
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => {
                    setIsConfirmDialogOpen(false);
                    setAccountDataToDelete({ id: 0, name: '' });
                }}
                onConfirm={handleDeleteAccount}
                title="Eliminar Cuenta"
                message={`¿Estás seguro de que deseas eliminar la cuenta: "${accountDataToDelete.name}"?`}
            />
        </div>
    )
}

export default Accounts