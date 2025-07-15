# CueCards - 对话卡片 🎯

<div align="center">

![CueCards Logo](public/card-icon.svg)

**精心策划的对话卡片，促进更深层的人际连接**

[![Build Status](https://github.com/SonghaiFan/have_a_talk_by_cards/actions/workflows/build.yml/badge.svg)](https://github.com/SonghaiFan/have_a_talk_by_cards/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20|%20macOS%20|%20Linux-blue.svg)](https://github.com/SonghaiFan/have_a_talk_by_cards/releases)

**中文** | [English](public/README-EN.md)

</div>

---

## 📖 项目简介

CueCards 是一个跨平台的对话卡片应用，旨在通过精心策划的问题来促进更深层的人际连接。无论是情侣、朋友、家人还是团队建设，CueCards 都能帮助您开启有意义的对话。

## ✨ 主要特性

- 🎨 **简约美观界面** - 现代极简主义设计，情感亲密的用户体验
- 🎯 **多种对话主题** - 深度连接、关系检测等多种游戏模式
- 🌈 **主题分类** - 不同颜色主题区分不同类型的问题
- 🌐 **双语支持** - 中英文无缝切换
- 📱 **跨平台支持** - 支持 Windows、macOS 和 Linux
- 🎭 **流畅动画** - 使用 Motion 库打造丝滑的用户体验
- 💫 **卡片交互** - 自然的卡片翻转和切换动画
- 🔄 **进度追踪** - 实时显示对话进度

## 🚀 快速开始

### 下载安装

访问 [Releases 页面](https://github.com/SonghaiFan/have_a_talk_by_cards/releases) 下载适合您系统的版本：

- **Windows**: `CueCards_0.1.0_x64.msi`
- **macOS**: `CueCards_0.1.0_x64.dmg`
- **Linux**: `CueCards_0.1.0_x64.deb` 或 `CueCards_0.1.0_x64.AppImage`

### 安装说明

**Windows 用户:**

1. 下载 `.msi` 文件
2. 双击安装
3. 如遇到 SmartScreen 警告，点击"更多信息" → "仍要运行"

**macOS 用户:**

1. 下载 `.dmg` 文件
2. 双击打开，将应用拖拽到 Applications 文件夹
3. 如遇到安全警告，在系统偏好设置 → 安全性与隐私中允许运行

**Linux 用户:**

```bash
# Ubuntu/Debian
sudo dpkg -i CueCards_0.1.0_x64.deb

# AppImage
chmod +x CueCards_0.1.0_x64.AppImage
./CueCards_0.1.0_x64.AppImage
```

## 🎮 使用方法

1. **选择游戏模式** - 在主界面选择您想要的对话主题
2. **选择分类** - 选择问题分类并调整难度百分比
3. **开始对话** - 点击开始按钮进入游戏
4. **阅读问题** - 每张卡片包含一个精心设计的问题
5. **深入交流** - 与对方分享您的想法和感受
6. **继续下一题** - 使用导航按钮或键盘（空格/回车）切换到下一个问题

## 🛠️ 开发相关

### 技术栈

- **前端**: React + TypeScript + Tailwind CSS
- **动画**: Motion (React)
- **桌面应用**: Tauri
- **构建工具**: Vite
- **语言**: Rust + TypeScript
- **国际化**: i18next

### 本地开发

```bash
# 克隆项目
git clone https://github.com/SonghaiFan/have_a_talk_by_cards.git
cd have_a_talk_by_cards

# 安装依赖
npm install

# 开发模式
npm run tauri dev

# 构建应用
npm run tauri build

# 生成游戏索引
npm run generate-games
```

### 添加新游戏

1. 在 `/public/games/` 目录下创建 JSON 文件，遵循 `ConversationGame` 接口
2. 运行 `npm run generate-games` 更新游戏索引
3. 游戏文件会自动添加到 `/public/games/index.json` 中

## 📝 更新日志

- **v0.1.0** - 初始版本发布
  - 基础对话卡片功能
  - 多种游戏模式
  - 跨平台支持
  - 双语支持（中英文）
  - 极简主义、情感亲密的界面设计

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。

## 💬 联系我们

如有问题或建议，请通过以下方式联系：

- 🐛 Bug 报告: [Issues](https://github.com/SonghaiFan/have_a_talk_by_cards/issues)
- 💡 功能建议: [Discussions](https://github.com/SonghaiFan/have_a_talk_by_cards/discussions)

---

<div align="center">

**用 ❤️ 为有意义的对话而制作**

</div>
