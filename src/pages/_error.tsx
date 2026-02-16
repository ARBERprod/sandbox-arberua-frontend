import NextErrorComponent from 'next/error';

const Error = ({ statusCode }: any) => <NextErrorComponent statusCode={statusCode} />;

Error.getInitialProps = async (contextData: any) => NextErrorComponent.getInitialProps(contextData);

export default Error;
