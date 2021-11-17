import qs from 'qs';
import http from '../common/http';

export interface Role {
    role: string;
    description: string;
    metadata: string;
}

export const query = async (filter: any): Promise<Role[]> => {
    const query = qs.stringify(filter, { allowDots: true });
    const result = await http().get(`/api/role?${query}`);
    return result.data;
}

export const create = async (role: Role): Promise<Role> => {
    const result = await http().post('/api/role', role);
    return result.data;
}

export const update = async (role: Role): Promise<Role> => {
    const result = await http().put(`/api/role/${role.role}`, role);
    return result.data;
}

export const remove = async (role: string): Promise<Role> => {
    const result = await http().delete(`/api/role/${role}`);
    return result.data;
}