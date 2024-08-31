export const isValidString = (str) => typeof str === 'string' && str.trim() !== '';

export const isValidYear = (year) => typeof year === 'number' && year > 0;