---
name: write-weekly-post
description: 自动收集项目更新数据（Git 提交和 CHANGELOG.md），结合微信公众号排版与 md2wechat 规范，全自动生成带有 AI 封面与配图的公众号文章并归档。无更新时自动推荐 3 个非雷同主题。支持一键推送草稿箱。Use when user wants to write a weekly WeChat post, generate a WeChat article, or says "生成本周公众号", "write-weekly-post".
---

# Write Weekly WeChat Post

一键自动生成并排版 TDuMAIC 每周微信公众号文章，利用内置 AI 工具生成配套视觉图片，并支持通过 `md2wechat` 一键推送至公众号草稿箱。

## Quick start

当用户请求生成本周公众号时，立即进入本 Skill 的执行流。

## Workflows

### 步骤 1：信息收集与分析

1. 自动执行以下命令获取本周更新的 commits 及 CHANGELOG：
   ```bash
   node .agents/skills/write-weekly-post/scripts/gather-info.mjs
   ```
2. 读取脚本输出的 JSON 结果。
3. 检查是否有近期核心更新。

### 步骤 2：主题与排版模板抉择（交互）

1. **信息整理与汇报**：
   - 如果有合适的新更新：整理出本周更新的亮点，向用户简短汇报，并询问是否有需要特别强调的主题。
   - 如果无更新，或更新过于细碎：深入分析 TDuMAIC 的核心功能，并查看以往发布的文章，为用户推荐 **3 个不同的微信选题**。
2. **提供排版/写作模板选择**：
   在向用户呈报选题时，同时提供以下 **4 种内置排版/写作模板** 的介绍，让用户在选定主题的同时指定使用哪一种模板：
   - 👥 **痛点情境式**（痛点代入 -> 核心方案特色 -> 案例/教师心声 -> 离线/本地化保障 -> CTA）
   - 🛠️ **硬核教程式**（技术/方案背景 -> 极简3步步骤 -> 详细代码或配置抽屉展示 -> 优势对比 -> CTA）
   - ❓ **Q&A答疑式**（开门见山提出最关心的5个问题 -> 精准卡片式Q&A -> 用户真实反馈 -> CTA）
   - 🎬 **案例拆解式**（真实名师/公开课故事 -> 教学困境 -> TDuMAIC 介入后的改变 -> 核心功能提炼 -> CTA）

### 步骤 3：Markdown 文章生成（md2wechat 规范）

在用户确认主题和排版模板后，撰写文章。保存路径必须为：`docs/posts/YYYY-MM-DD/README.md`（以当前日期为文件夹名称）。

撰写时必须遵循以下 **微信公众号 & md2wechat 排版与文风规范**：

1. **Frontmatter 头部**：
   必须包含以下 YAML 头部，以便 `md2wechat` 自动识别并发布：
   ```yaml
   ---
   title: "别让静态PPT消磨了课堂！TDuMAIC重磅来袭...（高吸引力标题）"
   author: "TDuMAIC 团队"
   digest: "一句话吸引眼球的摘要，不超过120个字"
   theme: "tech" # 推荐主题：tech / default / minimalist 等
   ---
   ```
2. **文风语调**：
   - 生动活泼、专业与科技感并重。
   - 紧扣“为教学减负”、“启发式互动学习”的产品心智，用教师或开发者的切身痛点代入。
3. **呼吸感排版**：
   - **绝对避免大段文字**：单段落文字原则上**不超过 3 行**，每句或每段文字之间**必须使用空行（双换行符 \n\n）**完全隔开。
   - **强调重点**：使用 `**` 粗体标注关键词。
   - **金句展示**：使用 Markdown 的 `>` 引用块展示关键结论、教师心声或产品宣言。
   - **多用 Emoji 列表**：使用 Emoji 代替普通无序列表（如 `✨`, `👥`, `🎨`, `🚀`）。
4. **配图与占位符规范**：
   - 必须在文章中设计 1 个封面图（`./images/cover.png`）和 1-2 个文中插图（如 `./images/illustration_1.png`）。
   - 统一使用相对路径 `./images/cover.png` 和 `./images/illustration_x.png` 链接。
   - **图片前后强制留空行**：图片语法 `![alt](./images/...)` 的前后必须有且只有空行，不可与段落文字或 HTML 注释紧贴，确保微信解析器能正确解析图片。
   - 在 Markdown 图片下方隔空行添加 HTML 注释，提供明确的 AI 绘图 Prompt（例如 `<!-- Prompt: ... -->`）。

### 步骤 4：AI 自动绘图与资源保存

1. 在 `docs/posts/YYYY-MM-DD/` 目录下创建 `images/` 文件夹。
2. 提取出步骤 3 中设计的封面和配图 Prompts。
3. 自动调用内置的 `generate_image` 工具来生成这些图片：
   - **封面**：保存为 `docs/posts/YYYY-MM-DD/images/cover.png`。
   - **配图**：保存为 `docs/posts/YYYY-MM-DD/images/illustration_1.png` 等。
4. 友情提示用户：“封面与配图已通过 AI 自动生成并存入相应目录，如果是系统界面截图，可后续手动替换。”

### 步骤 5：微信草稿发布（可选）

1. 检测本地环境是否已全局安装了 `md2wechat` 命令行工具：
   ```powershell
   where.exe md2wechat
   ```
2. **如果检测到已安装**：
   - 询问用户：“检测到本地已安装 md2wechat，是否直接为您生成草稿并上传微信公众号草稿箱？”
   - 用户确认后，在后台执行发布命令：
     ```bash
     md2wechat convert docs/posts/YYYY-MM-DD/README.md --draft --cover docs/posts/YYYY-MM-DD/images/cover.png
     ```
   - 向用户输出发布结果。
3. **如果未安装**：
   - 告知用户文章和 AI 配图已生成完毕，并提供手动发布的 CLI 指引：
     ```bash
     npm install -g @geekjourneyx/md2wechat
     md2wechat convert docs/posts/YYYY-MM-DD/README.md --draft --cover docs/posts/YYYY-MM-DD/images/cover.png
     ```
