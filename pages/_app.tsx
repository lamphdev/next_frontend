import { AppContextType } from 'next/dist/shared/lib/utils';
import { AuthProvider } from '../common/auth-provider';
import { isServer } from '../common/helper';
import { getUserInfo } from '../services/auth-service';
import 'antd/dist/antd.css'
import '../styles/globals.css'
import { I18nProvider } from '../common/i18n-provider';
import { initHttp } from '../common/http';

function MyApp({ Component, pageProps, initUser, i18nMessage }) {
  const { Layout } = Component;
  console.log(initUser);
  return (
    <AuthProvider initUser={initUser}>
      <I18nProvider i18nMessage={i18nMessage}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async (context: AppContextType) => {
  const { Component, ctx } = context;

  let userInfo;
  if (isServer()) {
    userInfo = await getUserInfo(ctx);
  }

  const pageProps = await Component.getInitialProps(ctx);
  return {
    pageProps: { ...pageProps },
    initUser: userInfo
  }
}

export default MyApp
