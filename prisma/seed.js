const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      photo: 'user1.jpg',
      name: 'User One',
      bio: 'This is the bio for User One.',
      email: 'user1@example.com',
      password: 'password1',
      role: 'user',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      photo: 'user2.jpg',
      name: 'User Two',
      bio: 'This is the bio for User Two.',
      email: 'user2@example.com',
      password: 'password2',
      role: 'user',
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      name: 'Course 1',
      description: 'Description for Course 1',
      image: 'course1.jpg',
      userId: user1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Course 2',
      description: 'Description for Course 2',
      image: 'course2.jpg',
      userId: user2.id,
    },
  });

  // Create subtopics
  const subtopic1 = await prisma.subtopic.create({
    data: {
      name: 'Subtopic 1',
      description: 'Description for Subtopic 1',
      image: 'subtopic1.jpg',
      courseId: course1.id,
    },
  });

  const subtopic2 = await prisma.subtopic.create({
    data: {
      name: 'Subtopic 2',
      description: 'Description for Subtopic 2',
      image: 'subtopic2.jpg',
      courseId: course2.id,
    },
  });

  // Create modules
  const module1 = await prisma.module.create({
    data: {
      name: 'Module 1',
      courseId: course1.id,
      type: 'video',
      content: ['Content for Module 1'],
      video: 'module1.mp4',
      image: 'module1.jpg',
      subtopicId: subtopic1.id,
    },
  });

  const module2 = await prisma.module.create({
    data: {
      name: 'Module 2',
      courseId: course2.id,
      type: 'quiz',
      content: ['Content for Module 2'],
      quiz: ['Question 1', 'Question 2'],
      image: 'module2.jpg',
      subtopicId: subtopic2.id,
    },
  });

  // Create achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      name: 'Achievement 1',
      icon: 'achievement1.png',
      description: 'Description for Achievement 1',
      courseId: course1.id,
      userId: user1.id,
    },
  });

  const achievement2 = await prisma.achievement.create({
    data: {
      name: 'Achievement 2',
      icon: 'achievement2.png',
      description: 'Description for Achievement 2',
      courseId: course2.id,
      userId: user2.id,
    },
  });

  // Update relationships
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      coursesCompleted: { set: [course1.id] },
      coursesInProgress: { set: [course2.id] },
      coursesEnrolled: { set: [course2.id] },
    },
  });

  await prisma.user.update({
    where: { id: user2.id },
    data: {
      coursesCompleted: { set: [course2.id] },
      coursesInProgress: { set: [course1.id] },
      coursesEnrolled: { set: [course1.id] },
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
