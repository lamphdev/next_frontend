import { useState } from "react"
import { Page } from "../services/common-model";
import { createSetting, querySetting, Setting } from "../services/setting-service";

export const useSettingPagination = () => {
    const [filter, setFilter] = useState<any>({
        pageSize: 5
    });
    const [page, setPage] = useState<Page<Setting>>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const create = async (setting: Setting) => {
        try {
            setLoading(true);
            const result = await createSetting(setting);
            setPage({
                ...page,
                content: [result, ...page.content]
            });
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const query = async (filter: any) => {
        try {
            setLoading(true);
            const result = await querySetting(filter);
            setPage(result);
            console.log('set value', result, page);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return {
        page, setPage, loading, setLoading, error, setError, filter, setFilter, create, query
    }
}