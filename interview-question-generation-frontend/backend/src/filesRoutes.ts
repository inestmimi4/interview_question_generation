import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { join } from "path";
import { promises as fs } from "fs";
// @ts-ignore
import Bun from "bun";

const baseDir = "./uploads/";
let fileCounter = 1;

const removeFileExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return fileName;
    }
    return fileName.substring(0, lastDotIndex);
};

export const filesRoutes = new Elysia()
    .use(cors())
    .post('/upload', async (ctx) => {
        try {
            const formData = await ctx.request.formData();
            const file = formData.get('file') as File | null;

            if (!file) {
                return new Response(JSON.stringify({ message: "No file was uploaded." }), {
                    headers: { "Content-Type": "application/json" },
                    status: 400
                });
            }

            const fileName = file.name;
            const fileId = fileCounter++;
            const filePath = join(baseDir, `${fileId}_${fileName}`);

            await Bun.write(filePath, file);

            return new Response(JSON.stringify({
                message: "File uploaded successfully.",
                fileId,
                fileName: removeFileExtension(fileName)
            }), {
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            console.error('Error processing the file:', error);
            return new Response(JSON.stringify({ message: "Error processing the file." }), {
                headers: { "Content-Type": "application/json" },
                status: 500
            });
        }
    })

    .get("/files/:fileId", async (ctx) => {
        const fileId = Number(ctx.params.fileId);
        const filePattern = new RegExp(`^${fileId}_(.*)$`);

        try {
            const files = await fs.readdir(baseDir);
            const fileName = files.find(file => filePattern.test(file));

            if (!fileName) {
                return new Response(JSON.stringify({ message: "File not found." }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            const filePath = join(baseDir, fileName);
            const stats = await fs.stat(filePath);
            const sizeInMB = (stats.size / 1048576).toFixed(2);

            const fileInfo = {
                id: fileId,
                name: removeFileExtension(fileName.split('_').slice(1).join('_')),
                size: sizeInMB,
                extension: fileName.split('.').pop() || ""
            };

            return new Response(JSON.stringify([fileInfo]), {
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            return new Response(JSON.stringify({ message: "Error retrieving file info." }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    })

    .delete("/files/:fileId", async (ctx) => {
        const fileId = Number(ctx.params.fileId);
        const filePattern = new RegExp(`^${fileId}_(.*)$`);

        try {
            const files = await fs.readdir(baseDir);
            const fileName = files.find(file => filePattern.test(file));

            if (!fileName) {
                return new Response(JSON.stringify({ message: "File not found." }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            const filePath = join(baseDir, fileName);
            await fs.unlink(filePath);

            return new Response(JSON.stringify({ message: "File deleted successfully." }), { headers: { "Content-Type": "application/json" } });
        } catch (error) {
            return new Response(JSON.stringify({ message: "Error deleting file." }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    })

    .get("/files", async (ctx) => {
        try {
            const files = await fs.readdir(baseDir);
            const fileInfos = await Promise.all(files.map(async (file) => {
                const [fileId, ...nameParts] = file.split('_');
                const filePath = join(baseDir, file);
                const stats = await fs.stat(filePath);
                const sizeInMB = (stats.size / 1048576).toFixed(2);
                return {
                    id: Number(fileId),
                    name: removeFileExtension(nameParts.join('_')),
                    size: sizeInMB,
                    extension: file.split('.').pop() || ""
                };
            }));

            return new Response(JSON.stringify(fileInfos), {
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            return new Response(JSON.stringify({ message: "Error retrieving files." }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    })

    .get("/files/name/:fileName", async (ctx) => {
        const fileName = ctx.params.fileName;

        try {
            const files = await fs.readdir(baseDir);
            const matchingFiles = files.filter(file => {
                const namePart = removeFileExtension(file.split('_').slice(1).join('_'));
                return namePart === fileName;
            });

            if (matchingFiles.length === 0) {
                return new Response(JSON.stringify({ message: "File not found." }), { status: 404, headers: { "Content-Type": "application/json" } });
            }

            const fileInfos = await Promise.all(matchingFiles.map(async (file) => {
                const fileId = file.split('_')[0];
                const filePath = join(baseDir, file);
                const stats = await fs.stat(filePath);
                const sizeInMB = (stats.size / 1048576).toFixed(2);
                return {
                    id: Number(fileId),
                    name: removeFileExtension(file.split('_').slice(1).join('_')),
                    size: sizeInMB,
                    extension: file.split('.').pop() || ""
                };
            }));

            return new Response(JSON.stringify(fileInfos), {
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            return new Response(JSON.stringify({ message: "Error retrieving files." }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    })

    .delete("/files", async (ctx) => {
        try {
            const files = await fs.readdir(baseDir);
            for (const file of files) {
                await fs.unlink(join(baseDir, file));
            }
            return new Response(JSON.stringify({ message: "All files deleted successfully" }), { headers: { "Content-Type": "application/json" } });
        } catch (error) {
            return new Response(JSON.stringify({ message: "Error deleting files" }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
    })


