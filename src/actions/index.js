// src/actions/index.js
'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addNewUserAction(formData, pathToRevalidate) {
    const data = Object.fromEntries(formData.entries());

    await prisma.user.create({
        data: { username: data.username, useremail: data.useremail, position: data.position, skills: data.skills, phone: parseInt(data.phone), address: data.address, age: parseInt(data.age), birthdate: new Date(data.birthdate),}
    });

    revalidatePath(pathToRevalidate);
    return { success: true };
}

export async function fetchUserAction() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" }
    });
    return users;
}

export async function deleteUserAction(currentUserId, pathToRevalidate) {
    await prisma.user.delete({
        where: { id: currentUserId }
    });
    revalidatePath(pathToRevalidate);
    return { success: true };
}

export async function editUserAction(currentUserId, formData, pathToRevalidate) {
    const data = Object.fromEntries(formData.entries());

    await prisma.user.update({
        where: { id: currentUserId },
        data: { username: data.username, useremail: data.useremail, position: data.position, skills: data.skills, phone: parseInt(data.phone), address: data.address, age: parseInt(data.age), birthdate: new Date(data.birthdate), }
    });

    revalidatePath(pathToRevalidate);
    return { success: true };
}
