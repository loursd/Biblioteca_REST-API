import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);
router.get('/libro/:id', libro.getOne); //llamar solo un libro por id
router.post('/libro', libro.add);
router.delete('/libro/id', libro.deleteID); //elimina libro por ID
router.delete('/libro/ISBN', libro.deleteISBN); //elimina libro por ISBN
router.put('/libro', libro.update); //actualiza libro por id




