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

  const Question = [
    {
      "title": "What does CSS stand for?",
      "options": ["A. Cascading Style Sheets", "B. Computer Style Sheets", "C. Creative Style Sheets", "D. Colorful Style Sheets"],
      "answer": "A",
      "topics": ["Frontend Development", "Web Development"],
      "tags": ["CSS", "HTML"],
      "level": "Easy"
    },
    {
      "title": "What is the purpose of the \"use strict\" directive in JavaScript?",
      "options": ["A. To enforce stricter syntax checking", "B. To enable strict mode for better performance", "C. To use advanced language features", "D. To allow dynamic typing"],
      "answer": "A",
      "topics": ["JavaScript", "Programming Fundamentals"],
      "tags": ["JavaScript"],
      "level": "Medium"
    },
    {
      "title": "What is a callback function in JavaScript?",
      "options": ["A. A function passed as an argument to another function to be executed later", "B. A function that calls another function", "C. A function that handles errors", "D. A function used for debugging"],
      "answer": "A",
      "topics": ["JavaScript", "Asynchronous Programming"],
      "tags": ["JavaScript"],
      "level": "Medium"
    },
    {
      "title": "What is the purpose of a constructor function in object-oriented programming?",
      "options": ["A. To initialize an object", "B. To destroy an object", "C. To modify an object", "D. To declare a variable"],
      "answer": "A",
      "topics": ["Object-Oriented Programming (OOP)"],
      "tags": ["JavaScript", "Python", "Java"],
      "level": "Easy"
    },
    {
      "title": "What does MVC stand for in the context of web development?",
      "options": ["A. Model View Component", "B. Model View Controller", "C. Most Valuable Code", "D. Model Visual Code"],
      "answer": "B",
      "topics": ["Web Development", "Software Architecture"],
      "tags": ["MVC", "Web Development"],
      "level": "Medium"
    },
    {
      "title": "What is the difference between `==` and `===` operators in JavaScript?",
      "options": ["A. They are identical", "B. `==` compares both value and type, `===` compares only value", "C. `===` compares both value and type, `==` compares only value", "D. They are alternative syntaxes for the same operation"],
      "answer": "C",
      "topics": ["JavaScript"],
      "tags": ["JavaScript"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of hoisting in JavaScript.",
      "options": ["A. Declaring variables at the top of the scope", "B. Raising errors during runtime", "C. Scheduling asynchronous tasks", "D. None of the above"],
      "answer": "A",
      "topics": ["JavaScript"],
      "tags": ["JavaScript"],
      "level": "Medium"
    },
    {
      "title": "How do you declare a variable in TypeScript?",
      "options": ["A. Using the `var` keyword", "B. Using the `let` keyword", "C. Using the `const` keyword", "D. All of the above"],
      "answer": "D",
      "topics": ["TypeScript"],
      "tags": ["TypeScript"],
      "level": "Easy"
    },
    {
      "title": "What are the different data types supported by TypeScript?",
      "options": ["A. Boolean", "B. Number", "C. String", "D. All of the above"],
      "answer": "D",
      "topics": ["TypeScript"],
      "tags": ["TypeScript"],
      "level": "Easy"
    },
    {
      "title": "Explain the concept of asynchronous programming in JavaScript.",
      "options": ["A. Executing code sequentially", "B. Running code in parallel", "C. Dealing with operations that may take some time to complete", "D. None of the above"],
      "answer": "C",
      "topics": ["JavaScript", "Asynchronous Programming"],
      "tags": ["JavaScript"],
      "level": "Medium"
    },
    {
      "title": "What is a closure in JavaScript?",
      "options": ["A. A way to bind variables to a function's scope", "B. A way to create private variables", "C. A way to delay the execution of a function", "D. All of the above"],
      "answer": "D",
      "topics": ["JavaScript"],
      "tags": ["JavaScript"],
      "level": "Hard"
    },
    {
      "title": "How do you handle errors in Node.js?",
      "options": ["A. Using try...catch blocks", "B. Using callbacks", "C. Using promises", "D. All of the above"],
      "answer": "D",
      "topics": ["Node.js", "Error Handling"],
      "tags": ["Node.js"],
      "level": "Medium"
    },
    {
      "title": "Explain the event loop in Node.js.",
      "options": ["A. A loop that iterates through events", "B. A mechanism that allows Node.js to perform non-blocking I/O operations", "C. A loop that executes synchronous code", "D. All of the above"],
      "answer": "B",
      "topics": ["Node.js"],
      "tags": ["Node.js"],
      "level": "Hard"
    },
    {
      "title": "What is the difference between `let`, `const`, and `var` in JavaScript?",
      "options": ["A. They are all used to declare variables", "B. `let` and `const` have block scope, `var` has function scope", "C. `var` is immutable, `let` and `const` are mutable", "D. `const` cannot be reassigned, `let` and `var` can"],
      "answer": "B",
      "topics": ["JavaScript"],
      "tags": ["JavaScript"],
      "level": "Medium"
    },
    {
      "title": "How do you create a class in TypeScript?",
      "options": ["A. Using the `class` keyword", "B. Using function constructors", "C. Using object literals", "D. All of the above"],
      "answer": "A",
      "topics": ["TypeScript"],
      "tags": ["TypeScript"],
      "level": "Easy"
    },
    {
      "title": "What are decorators in TypeScript?",
      "options": ["A. Syntax sugar for modifying classes and class members", "B. Functions that take an object and return a modified object", "C. A way to add metadata to a class, method, property, or parameter", "D. All of the above"],
      "answer": "C",
      "topics": ["TypeScript"],
      "tags": ["TypeScript"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of modules in TypeScript.",
      "options": ["A. A way to organize code into reusable units", "B. A way to encapsulate data and functions", "C. A way to create namespaces", "D. All of the above"],
      "answer": "A",
      "topics": ["TypeScript"],
      "tags": ["TypeScript"],
      "level": "Easy"
    },
    {
      "title": "How do you handle routing in a Next.js application?",
      "options": ["A. Using the `next/router` module", "B. Using server-side routing", "C. Using client-side routing", "D. All of the above"],
      "answer": "A",
      "topics": ["Next.js", "React"],
      "tags": ["Next.js"],
      "level": "Medium"
    },
    {
      "title": "What are hooks in React?",
      "options": ["A. Functions that let you use state and other React features without writing a class", "B. Functions that let you modify the DOM directly", "C. Functions that let you manage asynchronous operations", "D. All of the above"],
      "answer": "A",
      "topics": ["React"],
      "tags": ["React"],
      "level": "Easy"
    },
    {
      "title": "Explain the concept of state in React.",
      "options": ["A. Data that determines how a component renders and behaves", "B. Data that is stored in a database", "C. Data that is passed between components", "D. All of the above"],
      "answer": "A",
      "topics": ["React"],
      "tags": ["React"],
      "level": "Medium"
    },
    {
      "title": "How do you manage global state in React?",
      "options": ["A. Using props drilling", "B. Using context API", "C. Using Redux", "D. All of the above"],
      "answer": "D",
      "topics": ["React", "State Management"],
      "tags": ["React", "Redux"],
      "level": "Medium"
    },
    {
      "title": "What is JSX in React?",
      "options": ["A. JavaScript Extension", "B. JavaScript XML", "C. JavaScript Syntax eXtension", "D. JavaScript eXtended"],
      "answer": "B",
      "topics": ["React"],
      "tags": ["React"],
      "level": "Easy"
    },
    {
      "title": "How do you fetch data from an API in React?",
      "options": ["A. Using the `fetch` API", "B. Using Axios", "C. Using the `fetch` API or Axios", "D. All of the above"],
      "answer": "C",
      "topics": ["React", "API Integration"],
      "tags": ["React"],
      "level": "Medium"
    },
    {
      "title": "What are props in React?",
      "options": ["A. Functions that allow you to modify component behavior", "B. Functions that allow you to access component state", "C. Data that is passed from parent to child components", "D. Data that is stored in the component's state"],
      "answer": "C",
      "topics": ["React"],
      "tags": ["React"],
      "level": "Easy"
    },
    {
      "title": "Explain the concept of virtual DOM in React.",
      "options": ["A. A lightweight version of the browser's DOM", "B. A representation of the actual DOM in memory", "C. A way to improve performance by minimizing DOM updates", "D. All of the above"],
      "answer": "C",
      "topics": ["React", "Performance Optimization"],
      "tags": ["React"],
      "level": "Medium"
    },
    {
      "title": "What is server-side rendering (SSR) in Next.js?",
      "options": ["A. Rendering React components on the server and sending the HTML to the client", "B. Rendering React components on the client", "C. Rendering static HTML files", "D. None of the above"],
      "answer": "A",
      "topics": ["Next.js", "React"],
      "tags": ["Next.js"],
      "level": "Medium"
    },
    {
      "title": "How do you optimize performance in a React application?",
      "options": ["A. Minimizing component renders", "B. Lazy loading components", "C. Using memoization", "D. All of the above"],
      "answer": "D",
      "topics": ["React", "Performance Optimization"],
      "tags": ["React"],
      "level": "Hard"
    },
    {
      "title": "What are the different lifecycle methods in React?",
      "options": ["A. Mounting, updating, unmounting", "B. Loading, processing, unloading", "C. Initialize, render, destroy", "D. None of the above"],
      "answer": "A",
      "topics": ["React"],
      "tags": ["React"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of context API in React.",
      "options": ["A. A way to pass data through the component tree without having to pass props down manually at every level", "B. A way to create global variables", "C. A way to manage state in functional components", "D. All of the above"],
      "answer": "A",
      "topics": ["React", "State Management"],
      "tags": ["React"],
      "level": "Medium"
    },
    {
      "title": "How do you handle forms in React?",
      "options": ["A. Using controlled components", "B. Using uncontrolled components", "C. Using form libraries like Formik", "D. All of the above"],
      "answer": "D",
      "topics": ["React", "Form Handling"],
      "tags": ["React"],
      "level": "Medium"
    },
    {
      "title": "What is Redux and how does it work with React?",
      "options": ["A. A predictable state container for JavaScript apps", "B. A library for managing global state in React applications", "C. It works by maintaining a single immutable state tree", "D. All of the above"],
      "answer": "D",
      "topics": ["React", "State Management"],
      "tags": ["React", "Redux"],
      "level": "Hard"
    },
    {
      "title": "Explain the concept of lazy loading in React.",
      "options": ["A. Loading components only when they are needed", "B. Loading components asynchronously", "C. Loading components lazily", "D. All of the above"],
      "answer": "D",
      "topics": ["React"],
      "tags": ["React"],
      "level": "Hard"
    },
    {
      "title": "What is GraphQL and how is it different from REST?",
      "options": ["A. A query language for APIs", "B. It allows clients to request only the data they need", "C. It returns predictable results", "D. All of the above"],
      "answer": "D",
      "topics": ["GraphQL", "API Development"],
      "tags": ["GraphQL"],
      "level": "Medium"
    },
    {
      "title": "How do you handle authentication in a web application?",
      "options": ["A. Using JSON Web Tokens (JWT)", "B. Using session cookies", "C. Using OAuth", "D. All of the above"],
      "answer": "D",
      "topics": ["Authentication", "Web Development"],
      "tags": ["Authentication"],
      "level": "Medium"
    },
    {
      "title": "What is CORS and how do you handle it in a web application?",
      "options": ["A. Cross-Origin Resource Sharing, it is a security feature implemented by browsers", "B. It allows servers to specify who can access their resources", "C. It can be handled by setting appropriate headers on the server", "D. All of the above"],
      "answer": "D",
      "topics": ["Web Development", "Security"],
      "tags": ["CORS", "Security"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of dependency injection in Nest.js.",
      "options": ["A. A design pattern used to separate concerns and make code more modular", "B. A way to pass dependencies to a class when it is instantiated", "C. A way to manage module dependencies in Nest.js", "D. All of the above"],
      "answer": "B",
      "topics": ["Nest.js", "Dependency Injection"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you create controllers in Nest.js?",
      "options": ["A. Using the `@Controller` decorator", "B. Using classes with methods decorated with `@Get`, `@Post`, etc.", "C. Using plain JavaScript functions", "D. All of the above"],
      "answer": "B",
      "topics": ["Nest.js"],
      "tags": ["Nest.js"],
      "level": "Easy"
    },
    {
      "title": "What is the purpose of middleware in Nest.js?",
      "options": ["A. To handle incoming HTTP requests", "B. To modify the request or response objects", "C. To perform tasks before or after handling a request", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Middleware"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you handle database connections in Nest.js?",
      "options": ["A. Using the TypeORM module", "B. Using plain SQL queries", "C. Using MongoDB", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Database"],
      "tags": ["Nest.js", "TypeORM"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of guards in Nest.js.",
      "options": ["A. A way to protect routes based on certain conditions", "B. A way to validate input data", "C. A way to intercept requests and modify them", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Guards"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you implement validation in Nest.js?",
      "options": ["A. Using class-validator library", "B. Using built-in decorators like `@IsNotEmpty`, `@IsString`, etc.", "C. Using Pipes", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Validation"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "What is the purpose of interceptors in Nest.js?",
      "options": ["A. To intercept incoming requests before they reach the controller", "B. To intercept outgoing responses before they are sent to the client", "C. To modify the request or response objects", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Interceptors"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you handle file uploads in Nest.js?",
      "options": ["A. Using the `multer` middleware", "B. Using the `express-fileupload` middleware", "C. Using the `@nestjs/platform-express` package", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "File Uploads"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of modules in Nest.js.",
      "options": ["A. A way to organize code into reusable units", "B. A way to encapsulate data and functions", "C. A way to create namespaces", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js"],
      "tags": ["Nest.js"],
      "level": "Easy"
    },
    {
      "title": "What is Nest.js CLI and how do you use it?",
      "options": ["A. A command-line interface for generating Nest.js projects and components", "B. A tool for managing dependencies in Nest.js projects", "C. A tool for building and deploying Nest.js applications", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "CLI"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you create custom decorators in Nest.js?",
      "options": ["A. By creating functions that return decorator functions", "B. By extending the `Decorator` class", "C. By using the `@Decorate` decorator", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Decorators"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "What are pipes in Nest.js and how do you use them?",
      "options": ["A. Pipes are used for input validation and transformation", "B. Pipes are used for handling errors", "C. Pipes are used for managing asynchronous operations", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Pipes"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you handle logging in Nest.js?",
      "options": ["A. By using the built-in logger module", "B. By using third-party logging libraries like Winston or Bunyan", "C. By implementing a custom logger service", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Logging"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "What is the purpose of providers in Nest.js?",
      "options": ["A. Providers are used to define services or dependencies that can be injected into controllers, modules, or other providers", "B. Providers are used to handle HTTP requests", "C. Providers are used to manage database connections", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Providers"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of GraphQL schema in Nest.js.",
      "options": ["A. A schema defines the structure of data that can be queried or mutated using GraphQL", "B. A schema defines the structure of data in a database", "C. A schema defines the structure of data in a REST API", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "GraphQL"],
      "tags": ["Nest.js", "GraphQL"],
      "level": "Medium"
    },
    {
      "title": "How do you handle errors globally in Nest.js?",
      "options": ["A. By using middleware", "B. By implementing a global exception filter", "C. By setting up error handling middleware", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Error Handling"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "What is the purpose of serializers in Nest.js?",
      "options": ["A. Serializers are used to transform data before sending it to the client", "B. Serializers are used to serialize and deserialize JSON data", "C. Serializers are used to handle file uploads", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Serialization"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you implement caching in Nest.js?",
      "options": ["A. By using built-in caching modules", "B. By using third-party caching libraries like Redis", "C. By implementing custom caching logic", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Caching"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "Explain the concept of testing in Nest.js.",
      "options": ["A. Testing involves writing tests to ensure that your application behaves as expected", "B. Testing involves manually verifying that your application works correctly", "C. Testing is not necessary in Nest.js applications", "D. All of the above"],
      "answer": "A",
      "topics": ["Nest.js", "Testing"],
      "tags": ["Nest.js"],
      "level": "Medium"
    },
    {
      "title": "How do you deploy a Nest.js application to production?",
      "options": ["A. By using cloud platforms like AWS, Azure, or Google Cloud", "B. By containerizing the application with Docker and deploying it to a container orchestration platform like Kubernetes", "C. By using CI/CD pipelines for automated deployment", "D. All of the above"],
      "answer": "D",
      "topics": ["Nest.js", "Deployment"],
      "tags": ["Nest.js"],
      "level": "Hard"
    }
  ];


  for (const q of Question) {
    await prisma.question.create({ data: q });
  }

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
      totalModules: 22,
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: user3.id,
      courseId: course1.id,
      name: course1.name,
      description: course1.description,
      image: course1.image,
      totalModules: 22,
    },
  });

  // await prisma.courseEnrollment.create({
  //   data: {
  //     userId: user1.id,
  //     courseId: course2.id,
  //     name: course2.name,
  //     description: course2.description,
  //     image: course2.image,
  //     totalModules: 22,
  //   },
  // });

  await prisma.courseEnrollment.create({
    data: {
      userId: user2.id,
      courseId: course1.id,
      name: course1.name,
      description: course1.description,
      image: course1.image,
      totalModules: 22,
    },
  });

  // await prisma.courseEnrollment.create({
  //   data: {
  //     userId: user2.id,
  //     courseId: course2.id,
  //     name: course2.name,
  //     description: course2.description,
  //     image: course2.image,
  //     totalModules: 22,
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
