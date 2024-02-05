const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
    try {
        await prisma.CourseEnrollment.deleteMany({});
        await prisma.Achievement.deleteMany({});
        await prisma.question.deleteMany({});
        await prisma.Module.deleteMany({});
        // await prisma.Subtopic.deleteMany({});
        await prisma.Course.deleteMany({});
        await prisma.User.deleteMany({});
        await prisma.UserSettings.deleteMany({});
        await prisma.emailServiceSubscription.deleteMany({});
        console.info('The data in the db has been reset');
    } catch (error) {
        console.error(error);
    }
}

reset();