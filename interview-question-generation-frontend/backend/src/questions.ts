import { Elysia } from 'elysia';
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz_db'
});

export const questions = new Elysia()
    .get('/question', async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM questions');
            return new Response(JSON.stringify(rows), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Erreur lors du chargement des questions.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    })

    .get('/question/:id', async (ctx) => {
        try {
            const id = parseInt(ctx.params.id, 10);
            const [rows] = await pool.query('SELECT * FROM questions WHERE id = ?', [id]);

            // @ts-ignore
            if (rows.length === 0) {
                return new Response(JSON.stringify({ message: 'Question non trouvée.' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            return new Response(JSON.stringify(rows[0]), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Erreur lors de la récupération de la QuizQuestion.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    });
