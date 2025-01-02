let counter = 0;

export function inscriptionGenerator(course) {
    const coursePrefix = course.substring(0, 3).toUpperCase();
    
    counter++;
    
    const uniqueId = `${coursePrefix}${counter}`;
    
    return uniqueId;
}