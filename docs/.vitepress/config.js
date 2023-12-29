const sidebar = [{ text: "Introduction", link: "/" }]
module.exports = {
  title: "AI-Res Server",
  description: "AI-Res Server",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "API {Swaggers}", link: "https://ai-res-server-development.onrender.com/api" },
      { text: "API Calls", link: "/api" },
      { text: "GitHub", link: "https://github.com/ai-res/server" }
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
        ]
      }
    ]
  }
};
