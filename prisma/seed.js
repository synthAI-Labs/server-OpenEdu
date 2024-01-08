const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      name: 'User One',
      photo: 'boy1.png',
      bio: 'Bio for User One',
      emailVerified: true,
      email: 'user1@example.com',
      password: '$2b$10$lKDjIf1d7TOcVpTk/nl2QOYkQlJE8uYORnzxMGWvwDd42U7fIbUim',
      settings: {
        create: {
          publicProfile: true,
          publicEmail: false,
          userId: 1,
        },
      },
      EmailServiceSubscription: {
        create: {
          emailService: true,
          userId: 1
        }
      }
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      name: 'User Two',
      photo: 'girl1.png',
      bio: 'Bio for User Two',
      email: 'user2@example.com',
      password: '$2b$10$lKDjIf1d7TOcVpTk/nl2QOYkQlJE8uYORnzxMGWvwDd42U7fIbUim',
      settings: {
        create: {
          publicProfile: true,
          publicEmail: false,
          userId: 2,
        },
      },
      EmailServiceSubscription: {
        create: {
          emailService: true,
          userId: 2
        }
      }
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'user3',
      name: 'User Three',
      photo: 'girl2.png',
      bio: 'Bio for User Three',
      email: 'user3@example.com',
      password: '$2b$10$lKDjIf1d7TOcVpTk/nl2QOYkQlJE8uYORnzxMGWvwDd42U7fIbUim',
      settings: {
        create: {
          publicProfile: false,
          publicEmail: false,
          userId: 3,
        },
      },
      EmailServiceSubscription: {
        create: {
          emailService: true,
          userId: 3
        }
      }
    },
  });

  // Create courses with subtopics and modules
  const course1 = await prisma.course.create({
    data: {
      name: 'Course 1',
      description: 'Description for Course 1',
      tags: ['tag1', 'tag2'],
      madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
      madeByUserGit: ['https://github.com/Himasnhu-AT/'],
      image: 'image.png',
      subtopics: {
        create: [
          {
            name: 'Subtopic 1.1',
            image: 'image1.jpg',
            madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
            madeByUserGit: ['https://github.com/Himasnhu-AT/'],
            description: 'Description for Subtopic 1.1',
            modules: {
              create: [
                {
                  name: 'Module 1.1.1',
                  type: 'text',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 1.1.1',
                  content: 'Content for Module 1.1.1',
                  image: 'image1.jpg',
                },
                {
                  name: 'Module 1.1.2',
                  type: 'text',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 1.1.1',
                  content: 'Content for Module 1.1.1',
                  image: 'image1.jpg',
                },
              ],
            },
          },
          {
            name: 'Subtopic 1.2',
            description: 'Description for Subtopic 1.2',
            image: 'image1.jpg',
            madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
            madeByUserGit: ['https://github.com/Himasnhu-AT/'],
            modules: {
              create: [
                {
                  name: 'Module 1.2.1',
                  type: 'text',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 1.2.1',
                  content: 'Content for Module 1.2.1',
                  image: 'image3.jpg',
                },
                {
                  name: 'Module 1.2.2',
                  type: 'video',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 1.2.2',
                  video: 'video1.mp4',
                  image: 'image4.jpg',
                },
              ],
            },
          },
        ],
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Course 2',
      description: 'Description for Course 2',
      tags: ['tag3', 'tag4'],
      madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
      madeByUserGit: ['https://github.com/Himasnhu-AT/'],
      image: 'image.png',
      subtopics: {
        create: [
          {
            name: 'Subtopic 2.1',
            description: 'Description for Subtopic 2.1',
            image: 'image1.jpg',
            madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
            madeByUserGit: ['https://github.com/Himasnhu-AT/'],
            modules: {
              create: [
                {
                  name: 'Module 2.1.1',
                  type: 'text',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 2.1.1',
                  content: 'Content for Module 2.1.1',
                  image: 'image5.jpg',
                },
                {
                  name: 'Module 2.1.2',
                  type: 'text',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 2.1.1',
                  content: 'Content for Module 2.1.1',
                  image: 'image5.jpg',
                },
              ],
            },
          },
          {
            id: 4,
            name: 'Subtopic 2.2',
            description: 'Description for Subtopic 2.2',
            madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
            madeByUserGit: ['https://github.com/Himasnhu-AT/'],
            image: 'image1.jpg',
            modules: {
              create: [
                {
                  name: 'Module 2.2.1',
                  type: 'text',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 2.2.1',
                  content: 'Content for Module 2.2.1',
                  image: 'image7.jpg',
                },
                {
                  name: 'Module 2.2.2',
                  type: 'video',
                  madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
                  madeByUserGit: ['https://github.com/Himasnhu-AT/'],
                  description: 'Description for Module 2.2.2',
                  video: 'video2.mp4',
                  image: 'image8.jpg',
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
      name: course1.name,
      description: course1.description,
      image: course1.image,
      totalModules: 4,
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user3.id,
      courseId: course1.id,
      name: course1.name,
      description: course1.description,
      image: course1.image,
      totalModules: 4,
    },
  });


  await prisma.courseEnrollment.create({
    data: {
      userId: user1.id,
      courseId: course2.id,
      name: course2.name,
      description: course2.description,
      image: course2.image,
      totalModules: 4,
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user2.id,
      courseId: course1.id,
      name: course1.name,
      description: course1.description,
      image: course1.image,
      totalModules: 4,
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user2.id,
      courseId: course2.id,
      name: course2.name,
      description: course2.description,
      image: course2.image,
      totalModules: 4,
    },
  });

  const achievement1 = await prisma.achievement.create({
    data: {
      name: 'Achievement 1',
      icon: 'icon1.jpg',
      description: 'Description for Achievement 1',
      courseId: 1,
      userId: 1,
    },
  });

  const achievement3 = await prisma.achievement.create({
    data: {
      name: 'Achievement 3',
      icon: 'icon3.jpg',
      description: 'Description for Achievement 3',
      courseId: course1.id,
      userId: user3.id,
    },
  });

  const achievement2 = await prisma.achievement.create({
    data: {
      name: 'Achievement 2',
      icon: 'icon2.jpg',
      description: 'Description for Achievement 2',
      courseId: 2,
      userId: 2,
    },
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
