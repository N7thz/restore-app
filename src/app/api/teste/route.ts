import { prisma } from "@/lib/prisma"
import { faker } from '@faker-js/faker'
import { NextResponse } from "next/server"
import { Notification } from "@prisma/client"

export async function GET() {

    const notifications: Notification[] = []

    Array.from({ length: 32 }).map(async () => {

        const notificationObject = {
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
            createdAt: faker.date.recent(),
            read: faker.datatype.boolean(),
            action: faker.helpers.arrayElement([
                "CREATE",
                "UPDATE",
                "DELETE",
                "MIN_QUANTITY"
            ])
        }

        const notification = await prisma.notification.create({
            data: notificationObject
        })

        notifications.push(notification)
    })

    return NextResponse.json(notifications)
}