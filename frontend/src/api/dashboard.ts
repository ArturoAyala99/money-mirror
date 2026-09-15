import apiClient from './client';

// Servicios (apis) del dashboard

// Tipos de datos para el dashboard
export interface SpendingByCategoryData{
    category: string;
    total: string;
    percentage: string;
}

export interface DailyExpenseData{
    date: string;
    total: string;
}

export interface RecentTransactionData{
    id: number;
    date: string;
    description: string;
    amount: number;
    category: string;
    account: string
}

export interface GoalProgressData{
    name: string;
    progress: number;
    target_amount: number;
    current_amount: number;
}

export interface DashboardData{
    total_balance: number;
    income_this_month: number;
    expenses_this_month: number;
    saving_percentage: number;
    spending_by_category: SpendingByCategoryData[];
    daily_expenses: DailyExpenseData[];
    recent_transactions: RecentTransactionData[];
    goals_progress: GoalProgressData[];
}

// funciones (llamadas a las apis) del dashboard
export const getDashboardData = async (): Promise<DashboardData> => {
    const response = await apiClient.get('/dashboard/');
    return response.data;
}