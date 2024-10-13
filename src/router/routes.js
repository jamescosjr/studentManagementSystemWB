import { Router } from 'express';
import {
    createStudentHandler,
    listStudentsHandler,
    findStudentByNameHandler,
    findStudentByInscriptionHandler,
    listStudentsByCourseHandler,
    deleteStudentHandler,
    updateStudentHandler
} from '../controllers/studentController.js';

const router = Router();

router.post('/students', createStudentHandler);
router.get('/students', listStudentsHandler);
router.get('/students/name/:name', findStudentByNameHandler);
router.get('/students/inscription/:inscription', findStudentByInscriptionHandler);
router.get('/students/course/:course', listStudentsByCourseHandler);
router.delete('/students/:id', deleteStudentHandler);
router.put('/students/:id', updateStudentHandler);

export default router;