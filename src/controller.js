import { pool } from './database.js';

class LibroController {

    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al obtener los libros" })
        }
    }
    async getOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('SELECT * FROM libros WHERE ISBN = ?', [libro.ISBN]);
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ "Error": `No se encontró un libro asociado al ISBN ${libro.ISBN} ` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al obtener el libro" });
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, aniopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN]);
            res.json({ "ID agregado": result.insertid, "message": "Nuevo libro agregado con éxito" });
        } catch (error) {
            res.status(500).json({"Error":"Ocurrió un error al agregar el libro"});
        }
    }

    async deleteISBN(req, res) {
        try{
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con ISBN ${libro.ISBN} eliminado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con el ISBN ${libro.ISBN}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al intentar eliminar el libro" });
        }
    }
    
    async deleteID(req, res) {
        try{
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM Libros WHERE ID=(?)`, [libro.id]);
            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con ID ${libro.id} eliminado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con ID ${libro.id}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al intentar eliminar el libro" });
        }
    }
    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), año-publicacion=(?) WHERE ISBN=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN]);
            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con ISBN ${libro.ISBN} actualizado con éxito` });             
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con el ISBN ${libro.ISBN}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al actualizar el libro."});
        }
        
    }

}

export const libro = new LibroController();