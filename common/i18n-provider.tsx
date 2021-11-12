import { NextPageContext } from "next";
import { createContext, useContext, useState } from "react";

interface I18nStage {
    messageSource: { [key: string]: string };
    setMessageSource: (value) => void;
    trans: (messageCode, params?) => string;
}

const i18nContext = createContext<I18nStage>(null);

export const I18nProvider = ({ children, i18nMessage }) => {

    const [messageSource, setMessageSource] = useState(i18nMessage);
    const trans = (messageCode: string, params?: any) => {
        const message: string = messageSource[messageCode];
        if (!message) {
            return messageCode;
        }
        if (params) {
            return Object.keys(params).reduce((result, key) => {
                return result.replaceAll(`{${key}}`, params[key]);
            }, message);
        }
        return message;
    }

    const value: I18nStage = {
        messageSource,
        setMessageSource,
        trans
    }

    return (
        <i18nContext.Provider value={value}>
            {children}
        </i18nContext.Provider>
    )
}

export const getI18nMessage = async (ctx: NextPageContext) => {
    try {
        
    } catch (e) {

    }
}

export const useI18n = () => {
    return useContext(i18nContext);
}