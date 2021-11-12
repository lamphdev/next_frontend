import { NextPageContext } from "next";
import { isBrowser } from "../common/helper"
import http from "../common/http"

export const getUserInfo = async (ctx: NextPageContext) => {
    try {
        if (isBrowser()) {
            const response = await http().get('/api/auth/user-info', { withCredentials: true });
            return response.data;
        } else {
            const { req, res } = ctx;
            const response = await http().get('/api/auth/user-info', {
                headers: {
                    Cookie: req.headers.cookie
                }
            });
            return response.data;
        }
    } catch (e) {
        console.error('get user info error', e);
        return null;
    }
}