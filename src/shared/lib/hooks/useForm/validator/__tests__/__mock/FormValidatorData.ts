import {
  HasCapitalizeValidator,
  HasNumberValidator, HasSpecSymbolValidator,
  MinLengthValidator, MinValueValidator, OneOfValidator, RequiredIfEquals,
  RequiredValidator, RequiredWithValidator, SameWithValidator,
} from '@/shared/lib/hooks/useForm';
import { FormField } from '../../../FormField';

export const getCustomMessage = (name: string) => `Custom message for "${name}"`;

export const fullValidatorConfig = {
  login: [
    new RequiredValidator(),
    new MinLengthValidator({ value: 3 }),
  ],
  password: [
    new RequiredValidator(),
    new MinLengthValidator({ value: 8 }),
    new HasCapitalizeValidator(),
    new HasNumberValidator(),
    new HasSpecSymbolValidator(),
  ],
  passwordConfirmation: [
    new RequiredValidator(),
    new SameWithValidator({ target: 'password' }),
  ],
  age: [
    new MinValueValidator({ value: 18 }),
  ],
  checkAge: [
    new OneOfValidator({ value: [true, false] }),
    new RequiredIfEquals({ value: 21, target: 'age' }),
  ],
  info: {
    enabled: [
      new OneOfValidator({ value: [true, false] }),
    ],
    languages: [
      [
        new MinLengthValidator({ value: 2 }),
      ],
      [
        new MinLengthValidator({ value: 2 }),
      ],
      [
        new MinLengthValidator({ value: 2 }),
      ],
    ],
    address: {
      city: [
        new RequiredWithValidator({ target: 'info.enabled' }),
      ],
      skills: [
        {
          title: [
            new MinLengthValidator({ value: 3 }),
          ],
          level: [
            new MinLengthValidator({ value: 3 }),
          ],
        },
      ],
    },
  },
};

export const fieldPaths = [
  'login',
  'password',
  'passwordConfirmation',
  'age',
  'checkAge',
  'info.enabled',
  'info.languages.0',
  'info.languages.1',
  'info.languages.2',
  'info.address.city',
  'info.address.skills.0.title',
  'info.address.skills.0.level',
];

export const formStateValid = {
  login: new FormField('login', 'login'),
  password: new FormField('Password1_', 'password'),
  passwordConfirmation: new FormField('Password1_', 'passwordConfirmation'),
  age: new FormField(21, 'age'),
  checkAge: new FormField(true, 'checkAge'),
  info: {
    enabled: new FormField(true, 'info.enabled'),
    languages: [
      new FormField('ru', 'info.languages.0'),
      new FormField('ru', 'info.languages.1'),
      new FormField('ru', 'info.languages.2'),
    ],
    address: {
      city: new FormField('odessa', 'info.address.city'),
      skills: [
        {
          title: new FormField('html', 'info.skills.0.title'),
          level: new FormField('high', 'info.skills.0.level'),
        },
      ],
    },
  },
};

export const formStateInvalid = {
  login: new FormField('', 'login'),
  password: new FormField('assword', 'password'),
  passwordConfirmation: new FormField('Password1', 'passwordConfirmation'),
  age: new FormField(21, 'age'),
  checkAge: new FormField(false, 'checkAge'),
  info: {
    enabled: new FormField(true, 'info.enabled'),
    languages: [
      new FormField('r', 'info.languages.0'),
      new FormField('r', 'info.languages.1'),
      new FormField('r', 'info.languages.2'),
    ],
    address: {
      city: new FormField('', 'info.address.city'),
      skills: [
        {
          title: new FormField('as', 'info.skills.0.title'),
          level: new FormField('ds', 'info.skills.0.level'),
        },
      ],
    },
  },
};
