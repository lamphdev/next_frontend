import qs from 'qs';
import http from '../common/http';

export interface ApiRule {
    id: string;
    urlPattern: string;
    method: string;
    description: string;
    roles: string[];
}

export const query = async (filter: any): Promise<ApiRule[]> => {
    const query = qs.stringify(filter, { allowDots: true });
    const response = await http().get(`/api/api-rule?${query}`);
    return response.data;
}

export const create = async (rule: ApiRule): Promise<ApiRule> => {
    const response = await http().post('/api/api-rule', rule);
    return response.data;
}

export const update = async (id: string, rule: ApiRule): Promise<ApiRule> => {
    const response = await http().put(`/api/api-rule/${id}`, rule);
    return response.data;
}

export const remove = async (id: string): Promise<ApiRule> => {
    const response = await http().delete(`/api/api-rule/${id}`);
    return response.data;
}