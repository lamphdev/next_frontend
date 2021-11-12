import http from "../common/http"

export interface Menu {
    id: string;
    displayText: string;
    action: string;
    icon: string;
    path: string;
    parentId?: string;
    menu: Menu[];
}

export const create = async (menu: Menu): Promise<Menu> => {
    const response = await http().post('/api/menu', menu);
    return response.data;
}

export const update = async (menu: Menu): Promise<Menu> => {
    const response = await http().put(`/api/menu/${menu.id}`, menu);
    return response.data;
}

export const getMenu = async (): Promise<Menu[]> => {
    const response = await http().get('/api/menu');
    return response.data;
}