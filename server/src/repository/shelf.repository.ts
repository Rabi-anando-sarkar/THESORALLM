import prisma from "../libs/db.js"
import type { CreateShelfInput, UpdateShelfInput } from "../validators/shelf.validator.js";

export const shelfSelect = {
    id: true,
    title: true,
    description: true,
    icon: true,
    selectModel: true,
    createdAt: true,
    updatedAt: true,
} as const;

export type ShelfRecord = {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    selectModel: string;
    createdAt: Date;
    updatedAt: Date;
};

export function findShelvesByUserId(userId: string) {
    return prisma.shelf.findMany({
        where: {
            userId
        },
        select: shelfSelect,
        orderBy: {
            updatedAt: "desc"
        }
    })
}

export function findShelvesByIdAndUserId(shelfId: string, userId: string) {
    return prisma.shelf.findFirst({
        where: {
            id: shelfId, userId
        },
        select: shelfSelect
    })
}

export function createShelfRecord(userId: string, data: CreateShelfInput) {
    return prisma.shelf.create({
        data: {
            userId,
            title: data.title,
            description: data.description ?? null,
            icon: data.icon ?? null,
            selectModel: data.selectModel
        },
        select: shelfSelect
    })
}

export function updateShelfRecord(shelfId: string, data: UpdateShelfInput) {
    return prisma.shelf.update({
        where: {
            id: shelfId
        },
        data: {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && {
                description: data.description,
            }),
            ...(data.icon !== undefined && {
                icon: data.icon,
            }),
        },
        select: shelfSelect
    })
}

export async function deleteShelfRecord(shelfId: string) {
    await prisma.shelf.delete({
        where: {
            id: shelfId
        }
    })
}