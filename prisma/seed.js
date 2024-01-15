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
      "name": "JavaScript",
      "description": "Learn JavaScript from scratch",
      "tags": ['tag1', 'tag2'],
      "madeByUser": ['https://avatars.githubusercontent.com/u/117301124?v=4'],
      "madeByUserGit": ['https://github.com/Himasnhu-AT/'],
      "image": "image.png",
      "modules": {
        "create": [
          {
            "numbering": 1,
            "name": "Module 1",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 01_Day_Introduction",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/01_Day_Introduction/01_day_introduction.mdx",
            "image": "image1.jpg"
          },
          {
            "numbering": 2,
            "name": "Module 2",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 02_Day_Data_types",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/02_Day_Data_types/02_day_data_types.mdx",
            "image": "image2.jpg"
          },
          {
            "numbering": 3,
            "name": "Module 3",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 03_Day_Booleans_operators_date",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/03_Day_Booleans_operators_date/03_day_booleans_operators_date.mdx",
            "image": "image3.jpg"
          },
          {
            "numbering": 4,
            "name": "Module 4",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 04_Day_Conditionals",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/04_Day_Conditionals/04_day_conditionals.mdx",
            "image": "image4.jpg"
          },
          {
            "numbering": 5,
            "name": "Module 5",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 05_Day_Arrays",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/05_Day_Arrays/05_day_arrays.mdx",
            "image": "image5.jpg"
          },
          {
            "numbering": 6,
            "name": "Module 6",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 06_Day_Loops",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/06_Day_Loops/06_day_loops.mdx",
            "image": "image6.jpg"
          },
          {
            "numbering": 7,
            "name": "Module 7",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 07_Day_Functions",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/07_Day_Functions/07_day_functions.mdx",
            "image": "image7.jpg"
          },
          {
            "numbering": 8,
            "name": "Module 8",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 08_Day_Objects",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/08_Day_Objects/08_day_objects.mdx",
            "image": "image8.jpg"
          },
          {
            "numbering": 9,
            "name": "Module 9",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 09_Day_Higher_order_functions",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/09_Day_Higher_order_functions/09_day_higher_order_functions.mdx",
            "image": "image9.jpg"
          },
          {
            "numbering": 10,
            "name": "Module 10",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 10_Day_Sets_and_Maps",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/10_Day_Sets_and_Maps/10_day_sets_and_maps.mdx",
            "image": "image10.jpg"
          },
          {
            "numbering": 11,
            "name": "Module 11",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 11_Day_Destructuring_and_spreading",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/11_Day_Destructuring_and_spreading/11_day_destructuring_and_spreading.mdx",
            "image": "image11.jpg"
          },
          {
            "numbering": 12,
            "name": "Module 12",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 12_Day_Regular_expressions",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/12_Day_Regular_expressions/12_day_regular_expressions.mdx",
            "image": "image12.jpg"
          },
          {
            "numbering": 13,
            "name": "Module 13",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 13_Day_Console_object_methods",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/13_Day_Console_object_methods/13_day_console_object_methods.mdx",
            "image": "image13.jpg"
          },
          {
            "numbering": 14,
            "name": "Module 14",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 14_Day_Error_handling",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/14_Day_Error_handling/14_day_error_handling.mdx",
            "image": "image14.jpg"
          },
          {
            "numbering": 15,
            "name": "Module 15",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 15_Day_Classes",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/15_Day_Classes/15_day_classes.mdx",
            "image": "image15.jpg"
          },
          {
            "numbering": 16,
            "name": "Module 16",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 16_Day_JSON",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/16_Day_JSON/16_day_json.mdx",
            "image": "image16.jpg"
          },
          {
            "numbering": 17,
            "name": "Module 17",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 17_Day_Web_storages",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/17_Day_Web_storages/17_day_web_storages.mdx",
            "image": "image17.jpg"
          },
          {
            "numbering": 18,
            "name": "Module 18",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 18_Day_Promises",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/18_Day_Promises/18_day_promises.mdx",
            "image": "image18.jpg"
          },
          {
            "numbering": 19,
            "name": "Module 19",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 19_Day_Closures",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/19_Day_Closures/19_day_closures.mdx",
            "image": "image19.jpg"
          },
          {
            "numbering": 20,
            "name": "Module 20",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 20_Day_Writing_clean_codes",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/20_Day_Writing_clean_codes/20_day_writing_clean_codes.mdx",
            "image": "image20.jpg"
          },
          {
            "numbering": 21,
            "name": "Module 21",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 21_Day_DOM",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/21_Day_DOM/21_day_dom.mdx",
            "image": "image21.jpg"
          },
          {
            "numbering": 22,
            "name": "Module 22",
            "type": "text",
            "madeByUser": [
              "https://avatars.githubusercontent.com/u/117301124?v=4"
            ],
            "madeByUserGit": [
              "https://github.com/Himasnhu-AT/"
            ],
            "description": "Description for 22_Day_Manipulating_DOM_object",
            "content": "https://raw.githubusercontent.com/synthAI-Labs/OpenEdu-material/main/JavaScript/22_Day_Manipulating_DOM_object/22_day_manipulating_dom_object.mdx",
            "image": "image22.jpg"
          }
        ]
      }
    }
  });

  // const course2 = await prisma.course.create({
  //   data: {
  //     name: 'Course 2',
  //     description: 'Description for Course 2',
  //     tags: ['tag3', 'tag4'],
  //     madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //     madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //     image: 'image.png',
  //     subtopics: {
  //       create: [
  //         {
  //           name: 'Subtopic 2.1',
  //           description: 'Description for Subtopic 2.1',
  //           image: 'image1.jpg',
  //           madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //           madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //           modules: {
  //             create: [
  //               {
  //                 name: 'Module 2.1.1',
  //                 type: 'text',
  //                 madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //                 madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //                 description: 'Description for Module 2.1.1',
  //                 content: 'Content for Module 2.1.1',
  //                 image: 'image5.jpg',
  //               },
  //               {
  //                 name: 'Module 2.1.2',
  //                 type: 'text',
  //                 madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //                 madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //                 description: 'Description for Module 2.1.1',
  //                 content: 'Content for Module 2.1.1',
  //                 image: 'image5.jpg',
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           id: 4,
  //           name: 'Subtopic 2.2',
  //           description: 'Description for Subtopic 2.2',
  //           madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //           madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //           image: 'image1.jpg',
  //           modules: {
  //             create: [
  //               {
  //                 name: 'Module 2.2.1',
  //                 type: 'text',
  //                 madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //                 madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //                 description: 'Description for Module 2.2.1',
  //                 content: 'Content for Module 2.2.1',
  //                 image: 'image7.jpg',
  //               },
  //               {
  //                 name: 'Module 2.2.2',
  //                 type: 'video',
  //                 madeByUser: ['https://avatars.githubusercontent.com/u/117301124?v=4'],
  //                 madeByUserGit: ['https://github.com/Himasnhu-AT/'],
  //                 description: 'Description for Module 2.2.2',
  //                 video: 'video2.mp4',
  //                 image: 'image8.jpg',
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

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

  // await prisma.courseEnrollment.create({
  //   data: {
  //     userId: user1.id,
  //     courseId: course2.id,
  //     name: course2.name,
  //     description: course2.description,
  //     image: course2.image,
  //     totalModules: 4,
  //   },
  // });

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

  // await prisma.courseEnrollment.create({
  //   data: {
  //     userId: user2.id,
  //     courseId: course2.id,
  //     name: course2.name,
  //     description: course2.description,
  //     image: course2.image,
  //     totalModules: 4,
  //   },
  // });

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

  // const achievement2 = await prisma.achievement.create({
  //   data: {
  //     name: 'Achievement 2',
  //     icon: 'icon2.jpg',
  //     description: 'Description for Achievement 2',
  //     courseId: 2,
  //     userId: 2,
  //   },
  // });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
