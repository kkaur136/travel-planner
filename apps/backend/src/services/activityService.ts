import prisma from "../lib/prisma";

interface ActivityInput {
    name: string;
    duration: string;
    destinationId: number;
}

export async function getActivities() {
    return prisma.activity.findMany({
        orderBy: {
            id: "asc"
        }
    });
}

export async function createActivity(data: ActivityInput) {
    const destination = await prisma.destination.findUnique({
        where: {
            id: data.destinationId
        }
    });

    if (!destination) {
        return null;
    }

    return prisma.activity.create({
        data
    });
}

export async function updateActivity(
    id: number,
    data: ActivityInput
) {
    const activity = await prisma.activity.findUnique({
        where: { id }
    });

    const destination = await prisma.destination.findUnique({
        where: {
            id: data.destinationId
        }
    });

    if (!activity || !destination) {
        return null;
    }

    return prisma.activity.update({
        where: { id },
        data
    });
}

export async function deleteActivity(id: number) {
    const activity = await prisma.activity.findUnique({
        where: { id }
    });

    if (!activity) {
        return null;
    }

    return prisma.activity.delete({
        where: { id }
    });
}
