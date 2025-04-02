import { DateTimeFormat } from 'src/utils/constants/datetime-formats';

export function DateTimeParser(datetime_string: string, input_format: DateTimeFormat): Date {
    const [date_part, time_part] = datetime_string.split(input_format.main_separator)
    const full_date = date_part.split(input_format.date_separator)

    const day = full_date[input_format.day_index]
    const month = full_date[input_format.month_index]
    const year = full_date[input_format.year_index]

    let corrected_format;
    if(time_part) {
        corrected_format = `${year}-${month}-${day}T${time_part}`
    } else {
        corrected_format = `${year}-${month}-${day}`
    }
    return new Date(corrected_format);
}
