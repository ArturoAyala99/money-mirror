import apiClient from './client';
import type { AccountFormData } from '../components/accounts/AccountForm';

// Servicios (apis) de accounts

// Tipos de datos para account
export interface AccountData{
    id: number;
    name: string;
    type: "DEBIT" | "CREDIT" | "CASH" | "SAVINGS";
    initial_balance: number;
    current_balance: number;
    currency: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// funciones (llamadas a las apis) de accounts
export const getAccounts = async (): Promise<AccountData[]> => {
    const response = await apiClient.get('/accounts/');
    return response.data;
}

export const createAccount = async (data: AccountFormData): Promise<AccountData> => {
    const response = await apiClient.post('/accounts/', data);
    return response.data;
}

export const editAccount = async (id: number, data: AccountFormData): Promise<AccountData> => {
    const response = await apiClient.put(`/accounts/${id}/`, data);
    return response.data;
}

export const deleteAccount = async (id: number): Promise<void> => {
    await apiClient.delete(`/accounts/${id}/`);
}