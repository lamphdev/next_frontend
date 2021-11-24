import { useCallback, useEffect } from "react";

export const isServer = () => typeof window === 'undefined';
export const isBrowser = () => !isServer();

export const useClientEffect = (fn, denp?: any[]) => {
    if (isServer()) {
        return;
    }
    useEffect(fn, denp);
}


export const useDebounce = (hanele, time) => {
    let id = null;
    const fn = (e) => {
        if (id) {
            clearTimeout(id);
        }
        id = setTimeout(() => hanele(e), time);
    }
    return useCallback(fn, []);
}