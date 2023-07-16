module.exports = {
  base: '/blog/',
  title: "Linda's Diary",
  description: "Linda's Diary",
  theme: "reco",
  themeConfig: {
    displayAllHeaders: true, // 默认值：false
    subSidebar: "auto",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "Linda's Diary",
        items: [
          { text: "Github", link: "https://github.com/linda-hhhuang" },
          // {
          //   text: "掘金",
          //   link: "https://juejin.cn/user/712139234359182/posts",
          // },
        ],
      },
    ],
    sidebar: [
      {
        title: "欢迎",
        path: "/",
        children: [{ title: "Linda's Introduce", path: "/" }],
      },
      {
        title: "Algorithm",
        path: "/handbook/AlgorithmIntro",
        sidebarDepth: 2,
        children: [
          { title: "Algorithm Introduce", path: "/handbook/AlgorithmIntro" },
          {
            title: "Algorithm Points",
            // path: "/handbook/AlgorithmPoints/",
            children: [
              {
                title: "Catalan",
                path: "/handbook/AlgorithmPoints/Catalan",
              },
              {
                title: "Grey",
                path: "/handbook/AlgorithmPoints/Grey",
              },
            ],
          },
        ],
      },
    ],
  },
};
