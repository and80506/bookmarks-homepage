# Bookmarks as New Tab

将书签转换为新标签页的可视化展示，方便快速访问常用网站。

## 功能特性

- **书签可视化**：在新标签页中以清晰的层级结构展示你的书签
- **智能搜索**：中文用户可使用关键词搜索，自动翻译成英文后进行 Google 搜索
- **简洁设计**：清爽的界面风格，快速访问常用网站

## Description
将书签转换为新标签页的可视化展示，方便快速访问常用网站。Transforms bookmarks into a visual display on the New Tab page, facilitating quick access to frequently visited websites.

中文区用户福利：在使用标签页内的 google 搜索时，自动将搜索词先翻译成英文后搜索。

- 在新标签页中以清晰的层级结构展示你的书签 Display your bookmarks in a clear hierarchical structure on a new tab.
- 实时同步书签 Real-time Bookmark Synchronization
- 弹出框中提供开关可临时关闭该功能 A toggle switch is provided within the pop-up window to temporarily disable this feature.

## 安装

### 从 Chrome Web Store 安装

*即将上线*

### 从源码安装

```bash
# 克隆仓库
git clone https://github.com/your-username/bookmarks-homepage.git

# 安装依赖 (需要 Node.js 14.x)
nvm use 14
npm install

# 构建
npm run build
```

然后在 Chrome 中：
1. 打开 `chrome://extensions/`
2. 开启「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择项目的 `build` 文件夹

## 开发

```bash
# 开发模式（支持热重载）
npm run dev
```

然后在 Chrome 中加载 `dev` 文件夹。

## 构建

```bash
# 构建生产版本
npm run build

# 打包为 .zip 和 .crx 文件
npm run compress
```

## 技术栈

- [React](https://reactjs.org/) - UI 框架
- [Redux](https://redux.js.org/) - 状态管理
- [Webpack](https://webpack.js.org/) - 模块打包
- [Babel](https://babeljs.io/) - JavaScript 编译
- Chrome Extension Manifest V3

## 权限说明

| 权限 | 用途 |
|------|------|
| `bookmarks` | 读取书签数据以在新标签页展示 |
| `storage` | 存储用户设置 |
| `favicon` | 获取网站图标 |
| `translate.googleapis.com` | 中文关键词翻译功能（仅对中文用户显示） |

## 许可证

[MIT](LICENSE)

## 作者

Andy Wu
