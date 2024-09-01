export function isValidString(str) { typeof str === 'string' && str.trim() !== '' };

export function isValidYear(year) { typeof year === 'number' && year > 0 };