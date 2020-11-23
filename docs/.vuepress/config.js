module.exports = {
  title: "nfeng-ui-vue文档",
  description: "基于antd二次开发配置化ui库",
  base: "/nfeng-ui-vue/",
  port: 9000,
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "组件文档", link: "/guide/" },
      {
        text: "github",
        // 这里是下拉列表展现形式。
        items: [
          {
            text: "nfeng-ui-vue",
            link: "https://github.com/N-feng/nfeng-ui-vue",
          },
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "开发指南",
          collapsable: false,
          children: [
            { title: "安装", path: "/guide/" },
            { title: "快速上手", path: "/guide/fast" }
          ],
        },
        {
          title: "表单类组件",
          collapsable: false,
          children: [
            { title: "Upload 上传", path: "/guide/upload" },
            { title: "Select 选择器", path: "/guide/select" },
            { title: "FormSearch 搜索表单", path: "/guide/formSearch" },
            { title: "FormCreate 创建表单", path: "/guide/formCreate" },
          ],
        },
        {
          title: "表格类组件",
          collapsable: false,
        },
        {
          title: "显示类组件",
          collapsable: false,
          children: [
            { title: "Vmodal 图片弹框", path: "/guide/vmodal" },
          ]
        },
      ],
    },
  },
};
