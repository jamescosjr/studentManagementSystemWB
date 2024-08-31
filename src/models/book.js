const validateBookData = ({ title, author, year }) => {
    if (!title || typeof title !== 'string') {
        throw new Error('Invalid title');
    }
    if (!author || typeof author !== 'string') {
        throw new Error('Invalid author');
    }
    if (!year || typeof year !== 'number' || year < 0) {
        throw new Error('Invalid year');
    }
};

export const createBookModel = ({ title, author, year }) => {
    validateBookData({ title, author, year });
    return { title, author, year, id: null };
};