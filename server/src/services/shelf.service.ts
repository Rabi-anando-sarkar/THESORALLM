import { createShelfRecord, deleteShelfRecord, findShelvesByIdAndUserId, findShelvesByUserId, updateShelfRecord, type ShelfRecord } from "../repository/shelf.repository.js"
import { NotFoundError } from "../types/app-error.js"
import type { CreateShelfInput, UpdateShelfInput } from "../validators/shelf.validator.js"

export function listShelvesByUser(userId: string) {
    return findShelvesByUserId(userId)
}

export async function getShelfByIdForUser(shelfId: string, userId: string): Promise<ShelfRecord> {
    const shelf = await findShelvesByIdAndUserId(shelfId, userId)

    if(!shelf) {
        throw new NotFoundError("Shelf not Found")
    }

    return shelf
}

export async function createShelfForUser(userId: string, input: CreateShelfInput) {
    return createShelfRecord(userId, input)
}

export async function updateShelfForUser(shelfId: string, userId: string, input: UpdateShelfInput) {
    await getShelfByIdForUser(shelfId,userId)
    return updateShelfRecord(shelfId, input)
}

export async function deleteShelfForUser(shelfId: string, userId: string) {
    await getShelfByIdForUser(shelfId,userId)

    try {
        await deleteShelfVectors(shelfId)
    } catch (error) {
        console.error();
        console.error("Failed to delete Pinecone namespace:", error);
    }

    await deleteShelfRecord(shelfId)
}