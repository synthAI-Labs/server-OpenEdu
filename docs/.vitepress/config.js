module.exports = {
  title: "AI-Res Server",
  description: "AI-Res Server",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "API", link: "https://localhost:3000/api" },
      { text: "GitHub", link: "https://github.com/ai-res/server" }
    ],
    sidebar: [
      {
        text: "Introduction",
        link: "/"
      },
      {
        text: "Installation",
        link: "/installation"
      },
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
  }
};
