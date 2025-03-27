import { FormField } from '@/shared/lib/hooks/useForm/FormField';
import { getArrayFieldName, isArrayElement, unregisterHandler } from '../unregisterHandler';

describe('Unregister handler', () => {
  describe('getArrayFieldName', () => {
    it('Should return array field name', () => {
      expect(getArrayFieldName(['person', 'info', 'skills', '0'])).toBe('person.info.skills');
    });
  });

  describe('isArrayElement', () => {
    it('Should return true, if field is array element', () => {
      expect(isArrayElement(['person', 'info', 'skills', '1']));
      expect(isArrayElement(['person', 'info', 'skills', '10']));
      expect(isArrayElement(['person', 'info', '0', 'skills', '234']));
    });

    it('Should return false, if value is not array element', () => {
      expect(isArrayElement(['person', 'info', 'skills']));
    });
  });

  describe('unregisterHandler', () => {
    let formState: any;

    beforeEach(() => {
      formState = {
        name: new FormField('hello', ''),
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
          new FormField('de', ''),
        ],
        person: {
          email: new FormField('email', ''),
          info: {
            skills: [
              {
                title: new FormField('html', ''),
                level: new FormField('high', ''),
              },
              {
                title: new FormField('css', ''),
                level: new FormField('medium', ''),
              },
            ],
          },
        },
      };
    });

    it('Should return new data without passed field', () => {
      const expectedValue = {
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
          new FormField('de', ''),
        ],
        person: {
          email: new FormField('email', ''),
          info: {
            skills: [
              {
                title: new FormField('html', ''),
                level: new FormField('high', ''),
              },
              {
                title: new FormField('css', ''),
                level: new FormField('medium', ''),
              },
            ],
          },
        },
      };

      expect(unregisterHandler('name')(formState)).toEqual(expectedValue);
    });

    it('Should return new data, without deep nested passed field', () => {
      const expectedValue = {
        name: new FormField('hello', ''),
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
          new FormField('de', ''),
        ],
        person: {
          info: {
            skills: [
              {
                title: new FormField('html', ''),
                level: new FormField('high', ''),
              },
              {
                title: new FormField('css', ''),
                level: new FormField('medium', ''),
              },
            ],
          },
        },
      };

      expect(unregisterHandler('person.email')(formState)).toEqual(expectedValue);
    });

    it('Should return new data without passed array element', () => {
      const expectedValue = {
        name: new FormField('hello', ''),
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
        ],
        person: {
          email: new FormField('email', ''),
          info: {
            skills: [
              {
                title: new FormField('html', ''),
                level: new FormField('high', ''),
              },
              {
                title: new FormField('css', ''),
                level: new FormField('medium', ''),
              },
            ],
          },
        },
      };

      expect(unregisterHandler('languages.2')(formState)).toEqual(expectedValue);
    });

    it('Should return new data without nested part of state', () => {
      const expectedValue = {
        name: new FormField('hello', ''),
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
          new FormField('de', ''),
        ],
      };

      expect(unregisterHandler('person')(formState)).toEqual(expectedValue);
    });

    it('Should return new data without nested array elem', () => {
      const expectedValue = {
        name: new FormField('hello', ''),
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
          new FormField('de', ''),
        ],
        person: {
          email: new FormField('email', ''),
          info: {
            skills: [
              {
                title: new FormField('css', ''),
                level: new FormField('medium', ''),
              },
            ],
          },
        },
      };

      expect(unregisterHandler('person.info.skills.0')(formState)).toEqual(expectedValue);
    });

    it('Should return new data without nested object in array element', () => {
      const expectedValue = {
        name: new FormField('hello', ''),
        languages: [
          new FormField('en', ''),
          new FormField('uk', ''),
          new FormField('de', ''),
        ],
        person: {
          email: new FormField('email', ''),
          info: {
            skills: [
              {
                title: new FormField('html', ''),
              },
              {
                title: new FormField('css', ''),
                level: new FormField('medium', ''),
              },
            ],
          },
        },
      };

      expect(unregisterHandler('person.info.skills.0.level')(formState)).toEqual(expectedValue);
    });
  });
});
