import { NextApiRequest, NextApiResponse } from "next";
import http from "../../common/http";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    console.log(req.query);
    try {
        const params = new URLSearchParams();
        params.append('token', req.body.token);
        params.append('writeCookie', 'true');
        const response = await http().post('/api/auth/social/gg', params, {
            withCredentials: true
        });
        res.setHeader("set-cookie", response.headers["set-cookie"]);
        res.json(response.data);
    } catch (e) {
        res.status(401).json(e);
    }
}