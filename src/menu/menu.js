import promptSync from 'prompt-sync';
import { createStudent, listStudents, findStudentByName, findStudentByInscription, listStudentsByCourse, deleteStudent, updateStudent } from './menuActions.js';

const prompt = promptSync({ sigint: true });

export function showMenu() {
    console.log('1. Create Student');
    console.log('2. List Students');
    console.log('3. Find Student by Name');
    console.log('4. Find Student by Inscription');
    console.log('5. List Students by Course');
    console.log('6. Delete Student');
    console.log('7. Update Student');
    console.log('0. Exit');
};

export function handleMenuOption(option) {
    switch (option) {
        case 1:
            createStudent();
            break;
        case 2:
            listStudents();
            break;
        case 3:
            findStudentByName();
            break;
        case 4:
            findStudentByInscription();
            break;
        case 5:
            listStudentsByCourse();
            break;
        case 6:
            deleteStudent();
            break;
        case 7:
            updateStudent();
            break;
        case 0:
            console.log('Exiting...');
            process.exit();
        default:
            console.log('Invalid option, please try again.');
    }
};

export function menuLoop  ()  {
    while (true) {
        showMenu();
        const option = parseInt(prompt('Select an option: '), 10);
        handleMenuOption(option);
    }
};