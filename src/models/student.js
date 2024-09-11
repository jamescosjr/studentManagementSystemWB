function validateStudentData({ name, course, year }) {
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid name');
    }
    if (!course || typeof course !== 'string') {
        throw new Error('Invalid course');
    }
    if (!year || typeof year !== 'number' || year < 0) {
        throw new Error('Invalid year');
    }
};

export function createStudentModel({ name, inscription, course, year }) {
    validateStudentData({ name, inscription, course, year });
    return { name, inscription, course, year, id: null };
};