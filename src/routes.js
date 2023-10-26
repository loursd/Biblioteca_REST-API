import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne); //llamar solo un libro por id
router.post('/libro', libro.add);
router.delete('/libro', libro.deleteID); //elimina libro por ID
router.delete('/libro', libro.deleteISBN); //elimina libro por ISBN
router.put('/libro', libro.update); //actualiza libro por ISBN
