export class DateTimeFormat {
    date;
    time;
    main_separator;
    date_separator;
    day_index;
    month_index;
    year_index;
    static EU = new DateTimeFormat('DD/MM/YYYY', 'HH:mm', ', ', '/', 0, 1, 2);
    static US = new DateTimeFormat('YYYY/MM/DD', 'HH:mm', ', ', '/', 2, 1, 0);
    full() {
        return `${this.date}${this.main_separator}${this.time}`;
    }
    constructor(date, time, main_separator, date_separator, day_index, month_index, year_index) {
        this.date = date;
        this.time = time;
        this.main_separator = main_separator;
        this.date_separator = date_separator;
        this.day_index = day_index;
        this.month_index = month_index;
        this.year_index = year_index;
    }
}
//# sourceMappingURL=datetime-formats.js.map