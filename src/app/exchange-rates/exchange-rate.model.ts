import { Rates } from './rates.model';

export interface ExchangeRate {
    data: Rates;
    loading: boolean;
    networkStatus: number;
    stale: boolean;
    errors?: any[];
}