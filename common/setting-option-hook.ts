import { useState } from "react"
import { Page } from "../services/common-model";
import { createOption, getOptions, SettingOption, updateOption, } from "../services/setting-service";

export const useSettingOptionPagination = (initValue?) => {
    const [filter, setFilter] = useState<any>({ pageSize: 5 });
    const [page, setPage] = useState<Page<SettingOption>>(initValue);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const query = async (settingId: string) => {
        try {
            setLoading(true);
            const result = await getOptions(settingId, filter);
            setPage(result);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const create = async (settingId: string, option: SettingOption) => {
        try {
            setLoading(true);
            const result = await createOption(settingId, option);
            setPage({
                ...page,
                content: [result, ...page?.content]
            })
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const update = async (settingId: string, option: SettingOption) => {
        try {
            setLoading(true);
            const result = await updateOption(settingId, option);
            setPage({
                ...page,
                content: page.content.map(el => el.id === result.id ? result : el)
            })
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return {
        filter, setFilter,
        page, setPage,
        loading, setLoading,
        error, setError,
        query, create, update
    }

}