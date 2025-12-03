declare module 'react-input-mask' {
  import * as React from 'react';

  export interface InputState {
    value: string;
    selection: { start: number; end: number } | null;
  }

  export interface BeforeMaskedStateChangeStates {
    previousState: InputState;
    currentState: InputState;
    nextState: InputState;
  }

  export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string | (string | RegExp)[];
    maskChar?: string | null;
    maskPlaceholder?: string | null;
    alwaysShowMask?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    beforeMaskedStateChange?: (states: BeforeMaskedStateChangeStates) => InputState;
    children?: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
  }

  const InputMask: React.FC<Props>;
  export default InputMask;
}
