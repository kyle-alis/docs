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
        "/guides/set-up-your-favourite-IDE",
        "/guides/command-line-interface",
        '/guides/make-your-first-request',
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
        ['link', { rel: 'icon', href: '/assets/images/_EX.png', type: "image/x-icon" }]
      ],
    configureWebpack: {
      resolve: {
        alias: {
          '@asset_directory': '../.vuepress/public/assets/images'
        }
      }
    },
    // theme and its config
    theme: '@vuepress/theme-default',
    themeConfig: {
      repo: "alis-x/docs",
      docsDir: 'docs',
      docsBranch: 'main',
      editLinks: true,
      logo: "https://github.com/alis-x/docs/blob/main/docs/.vuepress/public/assets/images/alis_exchange.png?raw=true",
      displayAllHeaderLinks: true,
      sidebar: sidebar,
      nextLinks: false,
      prevLinks: false,
    },
    plugins: [
        [
          'vuepress-plugin-container',
          {
            type: 'VSCodePluginImage',
            before: `<div class="VSCodePluginImage">`,
            after: '</div>',
          },
        ],
        [
            'vuepress-plugin-container',
            {
              type: 'GoLandPluginImage',
              before: `<div class="GoLandPluginImage">`,
              after: '</div>',
            },
          ],
      ],
  }