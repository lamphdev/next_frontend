import { NextPage, NextPageContext } from "next";

const NoneLayout = ({ children }) => <>{children}</>

export function LphPage(Component: NextPage, Layout?: any) {

    /**
     * create a page component
     * @param props page props
     * @returns next page
     */
    const Page = (props) => {

        return (<Component {...props} />)
    }

    /**
     * setting layout for page created
     */
    if (!Layout) {
        Layout = NoneLayout;
    }
    Page.Layout = Layout;

    /**
     * login server side here
     * @param ctx NextPageContext
     */
    Page.getInitialProps = async (ctx: NextPageContext) => {
        const pageProps = (await Promise.all([
            Component.getInitialProps && Component.getInitialProps(ctx),
            Layout.getInitialProps && Layout.getInitialProps(ctx)
        ])).reduce((result, item) => ({ ...result, ...item }), {});
        return {
            ...pageProps
        }
    }

    return Page;

}