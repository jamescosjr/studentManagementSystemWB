import { Router } from 'express';
import {
    studentRegisterController,
    findAllController,
    updateByIdController,
    deleteByIdController,
    findByCourseController,
    findByNameController,
    findByInscriptionController,
} from '../controllers/studentController.js';

const router = Router();

router.post('/students', studentRegisterController);
router.get('/students', findAllController);
router.get('/students/name/:name', findByNameController);
router.get('/students/inscription/:inscription', findByInscriptionController);
router.get('/students/course/:course', findByCourseController);
router.delete('/students/:id', deleteByIdController);
router.put('/students/:id', updateByIdController);

export default router;