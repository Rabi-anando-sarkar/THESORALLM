import type { Request, Response } from "express";
import { createShelfForUser, deleteShelfForUser, getShelfByIdForUser, listShelvesByUser, updateShelfForUser } from "../services/shelf.service.js"
import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import { createShelfSchema, shelfIdParamSchema, updateShelfSchema } from "../validators/shelf.validator.js";

function parseShelfId(params: Request["params"]) {
    const parsed = shelfIdParamSchema.safeParse(params);

    if (!parsed.success) {
        throw new ValidationError(
            "Invalid workspace id",
            getZodFieldErrors(parsed.error),
        );
    }

    return parsed.data;
}

function parseCreateBody(body: unknown) {
    const parsed = createShelfSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }

    return parsed.data;
}

function parseUpdateBody(body: unknown) {
    const parsed = updateShelfSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }

    return parsed.data;
}

export async function listShelves(req: Request, res: Response) {
    const shelves = await listShelvesByUser(req.session.user.id)
    res.json(shelves)
}

export async function getShelf(req: Request, res: Response) {
    const { shelfId } = parseShelfId(req.params) 

    const shelf = await getShelfByIdForUser(
        shelfId,
        req.session.user.id
    )
    res.json(shelf)
}

export async function createShelf(req: Request, res: Response) {
    const input = parseCreateBody(req.body);
    const shelf = await createShelfForUser(
        req.session.user.id,
        input
    )
    res.status(201).json(shelf)
}

export async function updateShelf(req: Request, res: Response) {
    const { shelfId } = parseShelfId(req.params)
    const input = parseUpdateBody(req.body)
    const shelf = await updateShelfForUser(
        shelfId,
        req.session.user.id,
        input
    )
    res.json(shelf)
}

export async function deleteShelf(req: Request, res: Response) {
    const { shelfId } = parseShelfId(req.params)
    await deleteShelfForUser(shelfId, req.session.user.id)
    res.status(204).send()
}
