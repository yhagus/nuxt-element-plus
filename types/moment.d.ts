declare global {
  type MomentFormat
    = | 'YYYY-MM-DD'
      | 'MM/DD/YYYY'
      | 'DD-MM-YYYY'
      | 'D MMMM YYYY'
      | 'D/M/YYYY'
      | 'DD/MM/YYYY'
      | 'YYYY-MM-DD HH:mm:ss'
      | 'YYYY/MM/DD'
      | 'DD/MM/YYYY HH:mm'
      | 'HH:mm'
      | 'hh:mm A'
      | 'dddd'
      | 'ddd'
      | 'MMMM'
      | 'MMM'
      | 'YYYY'
      | 'YY'
      | 'Z'
      | 'LL' // Localized format: 'MMMM D, YYYY'
      | 'LLL' // Localized format with time: 'MMMM D, YYYY h:mm A'
      | 'LLLL' // Full localized format: 'dddd, MMMM D, YYYY h:mm A'
      | 'X' // Unix timestamp (seconds)
      | 'x'; // Unix timestamp (milliseconds)
}

export {};
