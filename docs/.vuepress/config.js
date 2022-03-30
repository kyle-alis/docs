const sidebar = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            "/getting-started/introduction",
            "/getting-started/quick-start",
        ]
    },
    {
    title: 'Guides',
    collapsable: false, 
    children: [
        '/guides/make-your-first-request',
        "/getting-started/command-line-interface"
    ]
    },
    {
    title: 'References',
    collapsable: false,
    children: [
        '/references/resource-oriented-design',
        '/references/core-concepts'
    ],
    },
    {
        title: "Other Resources",
        path: "/other-resources/other-resources",
        collapsable: false,
    }
];

module.exports = {
    // site config
    base: "/",
    lang: 'en-UK',
    title: 'alis.exchange',
    description: 'This is my first VuePress site',
    head: [
        ['link', { rel: 'icon', href: 'https://github.com/kyle-alis/demo2/blob/gh-pages/assets/images/_EX.png?raw=true' }]
      ],
    // theme and its config
    theme: '@vuepress/theme-default',
    themeConfig: {
      repo: "alis-x/docs",
      logo: 'https://github.com/kyle-alis/demo2/blob/gh-pages/assets/images/alis_exchange.png?raw=true',
      displayAllHeaderLinks: true,
      sidebar: sidebar,
      nextLinks: false,
      prevLinks: false,
    },
  }