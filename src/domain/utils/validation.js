export function validStudentData(name, course, year) {
    if (typeof name !== 'string' || name.trim() === '') {
        return { valid: false, message: 'The name should be a valid string' };
    }
    if (typeof course !== 'string' || course.trim() === '') {
        return { valid: false, message: 'The course should be a valid string' };
    }
    if (typeof year !== 'number' || year < 2000 || year > new Date().getFullYear()) {
        return { valid: false, message: 'The year should be a valid number' };
    }
    return { valid: true };
}