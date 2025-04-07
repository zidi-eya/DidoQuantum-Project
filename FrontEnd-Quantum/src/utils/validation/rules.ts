import { usePreferenceStore } from '@/stores/user-preference-store';
import { DateTimeParser } from '../functions/datetime-parser';

type Rule<T> = (value: T) => boolean | string;
type Rules<T> = Array<Rule<T>>;

const userPreferenceStore = usePreferenceStore();

export class GeneralRules {
  static fieldRequired: <T = string>(errorMessage: string) => Rules<T> = (
    errorMessage: string
  ) => [(value) => !!value || errorMessage];

  static optionalField: (rules: Rules<string>) => Rules<string> = (
    rules = []
  ) => {
    return rules.map((rule) => (value: string) => !value ? true : rule(value));
  };

  static maxNumber: (max: number) => Rules<number> = (max: number) => [
    (value: number) => value <= max || `Value must be at most ${max}`,
  ];

  static date: Rules<string> = [
    (value: string) => {
      return (
        !isNaN(
          DateTimeParser(
            value,
            userPreferenceStore.language.date_format
          ).getDate()
        ) || 'Please enter a valid date'
      );
    },
  ];

  static email: Rules<string> = [
    (value: string) => {
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value) || 'Please enter a valid email address';
    },
  ];

  static blacklisted: <T = string>(
    blacklist: string[],
    errorMessage: string
  ) => Rules<T> = (blacklist: string[], errorMessage: string) => [
    (value) => {
      const preparedValue = (value as string).toLowerCase().trim();
      return !blacklist.includes(preparedValue) || errorMessage;
    },
  ];

  static minItemsCount: <T = string>(
    min: number,
    array: any[],
    errorMessage: string
  ) => Rules<T> = (min: number, array: any[], errorMessage: string) => [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (value) => {
      return array.length >= min || errorMessage;
    },
  ];

  static maxFieldLength: <T = string>(
    length: number,
    errorMessage: string
  ) => Rules<T> = (length: number, errorMessage: string) => [
    (value) => (value as any).length <= length || errorMessage,
  ];
}

export class AuthRules {
  static email: Rules<string> = [
    (value: string) => {
      const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value) || 'Please enter a valid email address';
    },
  ];

  static passwordRequired: Rules<string> = GeneralRules.fieldRequired(
    'Please enter your password'
  );

  static passwordRequirements: Rules<string> = [
    (val: string) => val.length > 0 || 'Please enter your password',
    (val: string) =>
      val.length >= 8 || 'Password must be at least 8 characters long',
    (val: string) =>
      val.length <= 20 || 'Password must be at most 20 characters long',
    (val: string) =>
      /[a-z]/g.test(val) ||
      'Password must contain at least one lowercase letter',
    (val: string) =>
      /[A-Z]/g.test(val) ||
      'Password must contain at least one uppercase letter',
    (val: string) =>
      /[0-9]/g.test(val) || 'Password must contain at least one number',
    (val: string) =>
      /[^a-zA-Z\d]/g.test(val) ||
      'Password must contain at least one special character',
  ];

  static repeatPassword: (password: string) => Rules<string> = (
    password: string
  ) => [
    (val: string) => val.length > 0 || 'Please repeat your password',
    (val: string) => val === password || 'Passwords do not match',
  ];
}
