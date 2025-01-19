import { Elysia } from 'elysia';
import { promises as fs } from 'fs';
import { join } from 'path';

const questionsFilePath = join(process.cwd(), './questions/questions.json');

export const questionsRoutes = new Elysia()


    .get('/questions', async () => {
        try {
            const data = await fs.readFile(questionsFilePath, 'utf-8');
            const questions = JSON.parse(data);
            return new Response(JSON.stringify(questions), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Erreur lors du chargement des questions.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    })


    .get('/questions/:id', async (ctx) => {
        try {
            const id = parseInt(ctx.params.id, 10);
            const data = await fs.readFile(questionsFilePath, 'utf-8');
            const questions = JSON.parse(data);
            const question = questions.find((q: any) => q.id === id);

            if (!question) {
                return new Response(JSON.stringify({ message: 'Question non trouvée.' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            return new Response(JSON.stringify(question), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Erreur lors de la récupération de la QuizQuestion.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    });
