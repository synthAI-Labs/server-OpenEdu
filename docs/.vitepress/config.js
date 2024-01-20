module.exports = {
  title: "OPEN-EDU Server",
  description: "OPEN-EDU Server",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "API {Swaggers}", link: "https://ai-res-server-development.onrender.com/api" },
      { text: "API Calls", link: "/api" },
      { text: "GitHub", link: "https://github.com/synthAI-Labs/server-openedu" }
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          {
            text: "Introduction",
            link: "/"
          },
          {
            text: "Installation",
            link: "/installation"
          },
        ]
      },
      {
        text: "API Calls",
        items: [
          {
            text: "Dashboard",
            link: "/api/dashboard"
          },
          {
            text: "Learn",
            link: "/api/learn"
          },
          {
            text: "Auth",
            link: "/api/auth"
          },
          {
            text: "Projects",
            link: "/api/project"
          },
          {
            text: "Practise",
            link: "/api/practise"
          },
          {
            text: "Quiz",
            link: "/api/quiz"
          },
        ]
      },
      {
        text: "ProjectDetails",
        link: "/docs/ProjectDetails"
      },
    ]
  }
};
