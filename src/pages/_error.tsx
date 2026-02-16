import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';

const Error = ({ statusCode }: any) => <NextErrorComponent statusCode={statusCode} />;

Error.getInitialProps = async (contextData: any) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  return NextErrorComponent.getInitialProps(contextData);
};

export default Error;
