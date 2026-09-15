import React, { useState, forwardRef  } from 'react';

// definir datos
export interface AccountFormData{
    name: string;
    type: "DEBIT" | "CREDIT" | "CASH" | "SAVINGS";
    initial_balance: number;
    currency: string;
    is_active: boolean;
}

interface AccountFormPropsData{
    initialData?: Partial<AccountFormData>;
    onSubmit: (data: AccountFormData) => Promise<void>;
    onCancel: () => void;
}

const AccountForm = forwardRef<HTMLFormElement, AccountFormPropsData>( ({ initialData = {}, onSubmit, onCancel }, ref) => {
   const [formData, setFormData] = useState<AccountFormData>({
        name: initialData.name || '',
        type: initialData.type || 'CASH',
        initial_balance: initialData.initial_balance || 0,
        currency: initialData.currency || 'USD',
        is_active: initialData.is_active !== undefined ? initialData.is_active : true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(formData);
    }

    return (
        <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder='Nombre'
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Tipo */}
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Tipo <span className="text-red-500">*</span>
                </label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="DEBIT">Débito</option>
                    <option value="CREDIT">Crédito</option>
                    <option value="CASH">Efectivo</option>
                    <option value="SAVINGS">Ahorro</option>

                </select>
            </div>

            {/* Saldo inicial */}
            <div>
                <label htmlFor="initial_balance" className="block text-sm font-medium text-gray-700">
                    Saldo inicial
                </label>
                <input
                    id="initial_balance"
                    name="initial_balance"
                    type="number"
                    value={formData.initial_balance}
                    onChange={handleChange}
                    required
                    placeholder="Saldo inicial"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Moneda */}
            <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Moneda
                </label>
                 <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="USD">USD</option>
                    <option value="MXN">MXN</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>

            {/* Activa */}
            <div className="flex items-center">
                <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Activa
                </label>
            </div>

            {/* botones */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-gray-200">
                <button type="button" onClick={onCancel} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    CANCELAR
                </button>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer">
                    GUARDAR
                </button>
            </div>

        </form>
    )
    
});

AccountForm.displayName = 'AccountForm';

export default AccountForm