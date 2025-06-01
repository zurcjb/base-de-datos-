import { Hono } from 'hono';
import { FilmSchema } from '../schemas/film.schema.ts';
import { FilmController } from '../controllers/film.controller.ts';
import { validateBody } from '../middlewares/validate.ts';
import {filmRepository} from "../repositories/film.repos.ts"; // este es el nuevo middleware

const filmRouter = new Hono();

filmRouter.get('/films', async (): Promise<Response> => {
    const { status, body } = await FilmController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

filmRouter.get('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await FilmController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

filmRouter.post(
    '/films',
    validateBody(FilmSchema), // ✅ validación personalizada
    async (c) => {
        const bodyValidated = c.get('validatedBody'); // ya está validado
        const { status, body } = await FilmController.add(bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/jsimport { Hono } from \'hono\';\n' +
                    'import { FilmSchema } from \'../schemas/film.schema.ts\';\n' +
                    'import { FilmController } from \'../controllers/film.controller.ts\';\n' +
                    'import { validateBody } from \'../middlewares/validate.ts\';\n' +
                    'import {filmRepository} from "../repositories/film.repos.ts"; // este es el nuevo middleware\n' +
                    '\n' +
                    'const filmRouter = new Hono();\n' +
                    '\n' +
                    'filmRouter.get(\'/films\', async (): Promise<Response> => {\n' +
                    '    const { status, body } = await FilmController.getAll();\n' +
                    '    return new Response(JSON.stringify(body), {\n' +
                    '        status: status,\n' +
                    '        headers: { \'Content-Type\': \'application/json\' }\n' +
                    '    });\n' +
                    '});\n' +
                    '\n' +
                    'filmRouter.get(\'/films/:id\', async (c) => {\n' +
                    '    const id = Number(c.req.param(\'id\'));\n' +
                    '    const { status, body } = await FilmController.getById(id);\n' +
                    '    return new Response(JSON.stringify(body), {\n' +
                    '        status: status,\n' +
                    '        headers: { \'Content-Type\': \'application/json\' }\n' +
                    '    });\n' +
                    '});\n' +
                    '\n' +
                    'filmRouter.post(\n' +
                    '    \'/films\',\n' +
                    '    validateBody(FilmSchema), // ✅ validación personalizada\n' +
                    '    async (c) => {\n' +
                    '        const bodyValidated = c.get(\'validatedBody\'); // ya está validado\n' +
                    '        const { status, body } = await FilmController.add(bodyValidated);\n' +
                    '        return new Response(JSON.stringify(body), {\n' +
                    '            status: status,\n' +
                    '            headers: { \'Content-Type\': \'application/json\' }\n' +
                    '        });\n' +
                    '    }\n' +
                    ');\n' +
                    '\n' +
                    'export default filmRouter;\non' }
        });
    }
);

export default filmRouter;
