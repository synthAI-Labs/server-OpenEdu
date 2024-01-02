const sidebar = [{ text: "Introduction", link: "/" }]
module.exports = {
  title: "OPEN-EDU Server",
  description: "OPEN-EDU Server",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "API {Swaggers}", link: "https://ai-res-server-development.onrender.com/api" },
      { text: "API Calls", link: "/api" },
      { text: "GitHub", link: "https://github.com/synthAI-Labs/server" }
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
        text: "Services",
        items: [
          {
            text: "dashboard - service",
            link: "/services/dashboard"
          },
          {
            text: "learn - service",
            link: "/services/learn"
          },
          {
            text: "auth - service",
            link: "/services/auth"
          },
        ]
      },
      {
        text: "API Calls",
        items: [
          {
            text: "Dashboard",
            link: "/api/dashboard-api"
          },
          {
            text: "Learn",
            link: "/api/learn-api"
          },
          {
            text: "Auth",
            link: "/api/auth-api"
          },
        ]
      }
    ]
  }
};
