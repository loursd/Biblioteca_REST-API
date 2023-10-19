import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        const [result]= await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, aniopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN]);
        res.json({"Nuevo libro agregado": result.insertid});
    }

    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [libro.id]);
        res.json({"Libro Eliminado": result.affectedRows});
    }

    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), año-publicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.aniopublicacion, libro.ISBN, libro.id]);
        res.json({"Libro Actualizado": result.changedRows});
    }

    async getOne(req, res){
        const libro = req.body;
        const id = parseInt(libro.id);
        const [result] = await pool.query(`SELECT * FROM Libros WHERE id=(?)`, [id]); 
        res.json(result);
    }

}

export const libro = new LibroController();