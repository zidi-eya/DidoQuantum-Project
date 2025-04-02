export class DateTimeFormat {
  
  date: string
  time: string
  main_separator: string
  date_separator: string
  day_index: number
  month_index: number
  year_index: number

  static readonly EU = new DateTimeFormat(
    'DD/MM/YYYY','HH:mm',', ','/',0,1,2,
  )

  static readonly US = new DateTimeFormat(
    'YYYY/MM/DD','HH:mm',', ','/',2,1,0,
  )

  full(): string {
    return `${this.date}${this.main_separator}${this.time}`
  }

  private constructor(
    date: string,
    time: string,
    main_separator: string,
    date_separator: string,
    day_index: number,
    month_index: number,
    year_index: number
    ) {
    this.date = date
    this.time = time
    this.main_separator = main_separator
    this.date_separator = date_separator
    this.day_index = day_index
    this.month_index = month_index
    this.year_index = year_index
  }

}