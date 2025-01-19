import { Elysia } from "elysia";
import { filesRoutes } from "./filesRoutes";

import cors from "@elysiajs/cors";
import {questionsRoutes} from "./questionsRoutes";
import {questions} from "./questions";

const port = process.env.PORT || 3000;

const app = new Elysia()
    .use(cors())
    .use(filesRoutes)
    .use(questionsRoutes)
    .use(questions)
    .listen(port);

console.log(`Server started on port ${port}`);
