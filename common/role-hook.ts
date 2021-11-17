import { useState } from "react"
import { create, query, remove, Role, update } from "../services/role-service";
import { useClientEffect } from "./helper";

export const useRoleHook = (initFilter?: any) => {
    const [filter, setFilter] = useState<any>(initFilter);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fnQuery = async () => {
        try {
            setLoading(true);
            const result = await query(filter);
            setRoles(result);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const fnCreate = async (role: Role) => {
        try {
            setLoading(true);
            const result = await create(role);
            setRoles([result, ...roles]);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const fnUpdate = async (role: Role) => {
        try {
            setLoading(true);
            const result = await update(role);
            setRoles(roles.map(el => el.role === role.role ? role : el));
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const fnDelete = async (role: string) => {
        try {
            setLoading(true);
            const result = await remove(role);
            setRoles(roles.filter(el => el.role !== result.role));
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useClientEffect(() => {
        fnQuery();
    }, [filter]);

    return {
        filter, setFilter,
        roles, setRoles,
        loading, setLoading,
        error, setError,
        fnQuery, fnCreate, fnUpdate, fnDelete
    }


}