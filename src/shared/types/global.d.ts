declare module 'rc-pagination/lib/locale/ru_RU';

declare module '*.svg' {
  import { FunctionComponent, SVGAttributes } from 'react';

  const content: FunctionComponent<SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.avif'

declare module 'dom-speech-recognition';

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    webkitSpeechRecognition: SpeechRecognition;
    dataLayer: unknown[];
    fbq?: (event: string, value: string, options?: Record<string, any>, deduplication?: { eventID: string }) => void;
  }
}

export {};
