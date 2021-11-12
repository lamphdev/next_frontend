import { useEffect } from "react";

export const isServer = () => typeof window === 'undefined';
export const isBrowser = () => !isServer();

export const useClientEffect = (fn, denp?: any[]) => {
    if (isServer()) {
        return;
    }
    useEffect(fn, denp);
}