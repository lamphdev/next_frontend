import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useGoogleLogin } from "react-google-login";
import { useAuth } from "../common/auth-provider";
import { LphPage } from "../common/page-utils"

function Login() {

    const router = useRouter();
    const { setUserInfo } = useAuth();
    const responseGoogle = async (response) => {
        try {
            const { accessToken } = response;
            const param = new URLSearchParams();
            param.append('token', accessToken);
            param.append('writeCookie', 'true');
            const callResponse = await axios.post('/api/social-login', {
                provider: 'gg',
                token: accessToken,
            }, {
                withCredentials: true
            })
            const { userInfo, token } = callResponse.data;
            setUserInfo(userInfo);
            router.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    const errorGoogle = (error) => {
        console.log("error response", error);
    };

    const { loaded, signIn } = useGoogleLogin({
        clientId:
            process.env.NODE_ENV === "production"
                ? "163174605453-7qra336kspcocvmr6oo46io1hl3jooqi.apps.googleusercontent.com"
                : "163174605453-2acc6ro4u2vtvtnukare1hlprla24hgk.apps.googleusercontent.com",
        redirectUri:
            process.env.NODE_ENV === "production"
                ? "https://story-fe.vercel.app"
                : "http://localhost:3000",
        onSuccess: responseGoogle,
        onFailure: errorGoogle,
    });

    return (
        <div>
            <h1>Login page</h1>
            <button onClick={() => signIn()}>Google login</button>
        </div>
    )
}

export default LphPage(Login);