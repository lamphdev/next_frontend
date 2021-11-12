import http from "../common/http"
import qs from 'qs';
import { Page } from "./common-model";

export interface Setting {
    id: string;
    name: string;
    metadata: string;
    options: SettingOption[];
}

export interface SettingOption {
    id: string;
    name: string;
    value: string;
    metadata: string;
    setting: Setting;
}


// setting
export const querySetting = async (filter: any): Promise<Page<Setting>> => {
    const query = qs.stringify(filter, {
        allowDots: true,
    })
    const response = await http().get(`/api/setting?${query}`);
    return response.data;
}

export const createSetting = async (setting: Setting): Promise<Setting> => {
    const response = await http().post('/api/setting', setting);
    return response.data;
}

export const infoSetting = async (id: string): Promise<Setting> => {
    const response = await http().get(`/api/setting/${id}`);
    return response.data;
}


// setting options

export const getOptions = async (settingId: string, filter: any): Promise<Page<SettingOption>> => {
    const query = qs.stringify(filter, { allowDots: true });
    const response = await http().get(`/api/setting/${settingId}/options?${query}`);
    return response.data;
}

export const createOption = async (settingId: string, option: SettingOption): Promise<SettingOption> => {
    const response = await http().post(`/api/setting/${settingId}/options`, option);
    return response.data;
}

export const updateOption = async (settingId: string, option: SettingOption): Promise<SettingOption> => {
    const response = await http().put(`/api/setting/${settingId}/options/${option.id}`, option);
    return response.data;
}


