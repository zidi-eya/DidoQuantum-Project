import enUS from './en-US';
import { DateTimeFormat } from 'src/utils/constants/datetime-formats';

export default {
  'en-US': enUS,
};

export type Language = {
  label: string, 
  code: string,
  date_format: DateTimeFormat 
}

export const languages:Language[] = [
  {
    label: 'English',
    code: 'en-US',
    date_format: DateTimeFormat.EU
  }
]
