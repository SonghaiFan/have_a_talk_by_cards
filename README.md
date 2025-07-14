# CueCards - 对话卡片 🎯

<div align="center">

![CueCards Logo](public/card-icon.svg)

**Thoughtfully curated conversation cards for deeper human connection**  
**精心策划的对话卡片，促进更深层的人际连接**

[![Build Status](https://github.com/SonghaiFan/have_a_talk_by_cards/actions/workflows/build.yml/badge.svg)](https://github.com/SonghaiFan/have_a_talk_by_cards/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20|%20macOS%20|%20Linux-blue.svg)](https://github.com/SonghaiFan/have_a_talk_by_cards/releases)

[English](#english) | [中文](#中文)

</div>

---

## 中文

### 📖 项目简介

CueCards 是一个跨平台的对话卡片应用，旨在通过精心策划的问题来促进更深层的人际连接。无论是情侣、朋友、家人还是团队建设，CueCards 都能帮助您开启有意义的对话。

### ✨ 主要特性

- 🎨 **美观的界面设计** - 现代简约的卡片式界面
- 🎯 **多种对话主题** - 深度连接、关系检测等多种游戏模式
- 🌈 **主题分类** - 不同颜色主题区分不同类型的问题
- 📱 **跨平台支持** - 支持 Windows、macOS 和 Linux
- 🎭 **流畅动画** - 使用 Motion 库打造丝滑的用户体验
- 💫 **卡片切换** - 自然的卡片翻转和切换动画
- 🔄 **进度追踪** - 实时显示对话进度

### 🚀 快速开始

#### 下载安装

访问 [Releases 页面](https://github.com/SonghaiFan/have_a_talk_by_cards/releases) 下载适合您系统的版本：

- **Windows**: `CueCards_0.1.0_x64.msi`
- **macOS**: `CueCards_0.1.0_x64.dmg`
- **Linux**: `CueCards_0.1.0_x64.deb` 或 `CueCards_0.1.0_x64.AppImage`

#### 安装说明

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

### 🎮 使用方法

1. **选择游戏模式** - 在主界面选择您想要的对话主题
2. **开始对话** - 点击开始按钮进入游戏
3. **阅读问题** - 每张卡片包含一个精心设计的问题
4. **深入交流** - 与对方分享您的想法和感受
5. **继续下一题** - 使用导航按钮切换到下一个问题

### 🛠️ 开发相关

#### 技术栈

- **前端**: React + TypeScript + Tailwind CSS
- **动画**: Motion (React)
- **桌面应用**: Tauri
- **构建工具**: Vite
- **语言**: Rust + TypeScript

#### 本地开发

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
```

### 📝 更新日志

- **v0.1.0** - 初始版本发布
  - 基础对话卡片功能
  - 多种游戏模式
  - 跨平台支持

### 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 📄 许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。

### 💬 联系我们

如有问题或建议，请通过以下方式联系：

- 📧 Email: [您的邮箱]
- 🐛 Bug 报告: [Issues](https://github.com/SonghaiFan/have_a_talk_by_cards/issues)
- 💡 功能建议: [Discussions](https://github.com/SonghaiFan/have_a_talk_by_cards/discussions)

---

## English

### 📖 About

CueCards is a cross-platform conversation card application designed to foster deeper human connections through thoughtfully curated questions. Whether for couples, friends, families, or team building, CueCards helps you start meaningful conversations.

### ✨ Features

- 🎨 **Beautiful Interface** - Modern, minimalist card-based UI
- 🎯 **Multiple Conversation Topics** - Deep connections, relationship check, and more
- 🌈 **Themed Categories** - Different color themes for different question types
- 📱 **Cross-Platform** - Supports Windows, macOS, and Linux
- 🎭 **Smooth Animations** - Built with Motion library for fluid user experience
- 💫 **Card Interactions** - Natural card flipping and transition animations
- 🔄 **Progress Tracking** - Real-time conversation progress display

### 🚀 Quick Start

#### Download & Install

Visit the [Releases page](https://github.com/SonghaiFan/have_a_talk_by_cards/releases) to download the version for your system:

- **Windows**: `CueCards_0.1.0_x64.msi`
- **macOS**: `CueCards_0.1.0_x64.dmg`
- **Linux**: `CueCards_0.1.0_x64.deb` or `CueCards_0.1.0_x64.AppImage`

#### Installation Instructions

**Windows Users:**

1. Download the `.msi` file
2. Double-click to install
3. If SmartScreen warning appears, click "More info" → "Run anyway"

**macOS Users:**

1. Download the `.dmg` file
2. Double-click to open, drag the app to Applications folder
3. If security warning appears, allow it in System Preferences → Security & Privacy

**Linux Users:**

```bash
# Ubuntu/Debian
sudo dpkg -i CueCards_0.1.0_x64.deb

# AppImage
chmod +x CueCards_0.1.0_x64.AppImage
./CueCards_0.1.0_x64.AppImage
```

### 🎮 How to Use

1. **Select Game Mode** - Choose your desired conversation theme from the main interface
2. **Start Conversation** - Click the start button to enter the game
3. **Read Questions** - Each card contains a thoughtfully designed question
4. **Share & Connect** - Share your thoughts and feelings with others
5. **Continue** - Use navigation buttons to move to the next question

### 🛠️ Development

#### Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Animation**: Motion (React)
- **Desktop App**: Tauri
- **Build Tool**: Vite
- **Languages**: Rust + TypeScript

#### Local Development

```bash
# Clone the repository
git clone https://github.com/SonghaiFan/have_a_talk_by_cards.git
cd have_a_talk_by_cards

# Install dependencies
npm install

# Development mode
npm run tauri dev

# Build application
npm run tauri build
```

### 📝 Changelog

- **v0.1.0** - Initial release
  - Basic conversation card functionality
  - Multiple game modes
  - Cross-platform support

### 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 💬 Contact

For questions or suggestions, please contact us through:

- 📧 Email: [Your Email]
- 🐛 Bug Reports: [Issues](https://github.com/SonghaiFan/have_a_talk_by_cards/issues)
- 💡 Feature Requests: [Discussions](https://github.com/SonghaiFan/have_a_talk_by_cards/discussions)

---

<div align="center">

**Made with ❤️ for meaningful conversations**  
**用 ❤️ 为有意义的对话而制作**

</div>
