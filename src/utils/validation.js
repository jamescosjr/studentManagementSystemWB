export function isValidString(str) { return typeof str === 'string' && str.trim() !== ''; }

export function isValidYear(year) { return typeof year === 'number' && year > 0; }

export function validStudentData(student) {
    if (!isValidString(student.name)){
        return false;
    }
    if (!isValidYear(student.year)) {
        return false;
    }
    if (!isValidString(student.course)) {
        return false;
    }
    return true;
}