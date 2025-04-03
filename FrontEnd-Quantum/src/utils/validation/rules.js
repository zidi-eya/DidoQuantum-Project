import { usePreferenceStore } from 'src/stores/user-preference-store';
import { DateTimeParser } from '../functions/datetime-parser';
const userPreferenceStore = usePreferenceStore();
export class GeneralRules {
    static fieldRequired = (errorMessage) => [(value) => !!value || errorMessage];
    static optionalField = (rules = []) => {
        return rules.map((rule) => (value) => !value ? true : rule(value));
    };
    static maxNumber = (max) => [
        (value) => value <= max || `Value must be at most ${max}`,
    ];
    static date = [
        (value) => {
            return (!isNaN(DateTimeParser(value, userPreferenceStore.language.date_format).getDate()) || 'Please enter a valid date');
        },
    ];
    static email = [
        (value) => {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) || 'Please enter a valid email address';
        },
    ];
    static blacklisted = (blacklist, errorMessage) => [
        (value) => {
            const preparedValue = value.toLowerCase().trim();
            return !blacklist.includes(preparedValue) || errorMessage;
        },
    ];
    static minItemsCount = (min, array, errorMessage) => [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (value) => {
            return array.length >= min || errorMessage;
        },
    ];
    static maxFieldLength = (length, errorMessage) => [
        (value) => value.length <= length || errorMessage,
    ];
}
export class AuthRules {
    static email = [
        (value) => {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) || 'Please enter a valid email address';
        },
    ];
    static passwordRequired = GeneralRules.fieldRequired('Please enter your password');
    static passwordRequirements = [
        (val) => val.length > 0 || 'Please enter your password',
        (val) => val.length >= 8 || 'Password must be at least 8 characters long',
        (val) => val.length <= 20 || 'Password must be at most 20 characters long',
        (val) => /[a-z]/g.test(val) ||
            'Password must contain at least one lowercase letter',
        (val) => /[A-Z]/g.test(val) ||
            'Password must contain at least one uppercase letter',
        (val) => /[0-9]/g.test(val) || 'Password must contain at least one number',
        (val) => /[^a-zA-Z\d]/g.test(val) ||
            'Password must contain at least one special character',
    ];
    static repeatPassword = (password) => [
        (val) => val.length > 0 || 'Please repeat your password',
        (val) => val === password || 'Passwords do not match',
    ];
}
//# sourceMappingURL=rules.js.map