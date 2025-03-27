import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { TextAreaField } from './TextAreaField';
import userEvent from '@testing-library/user-event';

describe('TextAreaField', () => {
  it('Should render label, if passed label prop', () => {
    const LABEL = 'some-label';
    render(<TextAreaField name="name" label={LABEL} />);

    expect(screen.getByLabelText(LABEL))
      .toBeInTheDocument();
  });

  it('Should render error message, if passed error prop', () => {
    const ERROR_MESSAGE = 'error-message';
    render(<TextAreaField name="name" error={ERROR_MESSAGE} />);

    expect(screen.getByRole('textbox'))
      .toHaveAccessibleErrorMessage(ERROR_MESSAGE);
  });
  it('Should display correct value in text area', () => {
    const VALUE = 'value';
    render(<TextAreaField name="name" value={VALUE} />);

    expect(screen.getByRole('textbox'))
      .toHaveValue(VALUE);
  });
  it('Should call change handler with correct arguments', () => {
    const changeHandler = jest.fn();
    const TYPE_VALUE = '1';
    const NAME = 'text-area-name';

    render(<TextAreaField name={NAME} onChange={changeHandler} value="" />);

    const textArea = screen.getByRole('textbox');
    userEvent.type(textArea, TYPE_VALUE);

    expect(changeHandler)
      .toBeCalledWith(NAME, TYPE_VALUE);
  });
  it('Should call blur handler', () => {
    const blurHandler = jest.fn();
    const NAME = 'text-area-name';

    render(<TextAreaField name={NAME} onBlur={blurHandler} value="" />);

    const textArea = screen.getByRole('textbox');
    userEvent.click(textArea);
    userEvent.tab();

    expect(blurHandler)
      .toBeCalledWith(NAME);
  });
  it('Should add additional classes to nested components', () => {
    const CONTROL_CLASSNAME = 'controlClass';
    const LABEL_CLASSNAME = 'labelClass';
    const LABEL = 'label';

    render(<TextAreaField
      name="name"
      label={LABEL}
      classes={{
        control: CONTROL_CLASSNAME,
        label: LABEL_CLASSNAME,
      }}
    />);

    expect(screen.getByRole('textbox'))
      .toHaveClass(CONTROL_CLASSNAME);
    expect(screen.getByText(LABEL))
      .toHaveClass(LABEL_CLASSNAME);
  });
});
