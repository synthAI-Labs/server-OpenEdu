const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
    try {
        await prisma.User.deleteMany({});
        await prisma.skills.deleteMany({})
        await prisma.userProjects.deleteMany({});
        await prisma.experience.deleteMany({});
        await prisma.education.deleteMany({})
        await prisma.emailServiceSubscription.deleteMany({});
        await prisma.newsletterSubscription.deleteMany({})
        await prisma.UserSettings.deleteMany({});
        await prisma.Course.deleteMany({});
        await prisma.Module.deleteMany({});
        await prisma.question.deleteMany({});
        await prisma.assignment.deleteMany({})
        await prisma.Achievement.deleteMany({});
        await prisma.CourseEnrollment.deleteMany({});
        await prisma.projects.deleteMany({});

        console.info('The data in the db has been reset');
    } catch (error) {
        console.error(error);
    }
}

reset();