import { useState } from "react"
import { ApiRule, create, query, remove, update } from "../services/api-rule-service";
import { useClientEffect } from "./helper";

export const useApiRuleHook = (initFilter = { pageSize: 10 }) => {

    const [filter, setFilter] = useState<any>(initFilter);
    const [apiRules, setApiRules] = useState<ApiRule[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fnQuery = async () => {
        try {
            setLoading(true);
            const result = await query(filter);
            setApiRules(result);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const fnCreate = async (data: ApiRule) => {
        try {
            setLoading(true);
            const result = await create(data);
            setApiRules([result, ...apiRules]);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const fnUpdate = async (data: ApiRule) => {
        try {
            setLoading(true);
            const result = await update(data.id, data);
            setApiRules(
                apiRules.map(el => el.id === result.id ? result : el)
            );
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const fnDelete = async (id: string) => {
        try {
            setLoading(true);
            const result = await remove(id);
            setApiRules(
                apiRules.filter(el => el.id !== result.id)
            );
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }


    useClientEffect(() => {
        fnQuery();
    }, [filter])

    return {
        filter, setFilter,
        apiRules, setApiRules,
        loading, setLoading,
        error, setError
    }

}