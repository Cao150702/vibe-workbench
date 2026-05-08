# Vibe Workbench 🛠️

> "从模糊想法到可执行方案——展示 AI 辅助产品开发的全流程"

## 问题定义

开发者（尤其是独立开发者）经常有模糊的产品想法，但缺乏将其结构化为可执行方案的能力：

1. **想法太模糊** —— "我想做一个XXX" 无法直接导致行动
2. **技术选型困难** —— 不知道用什么stack，怕选错
3. **任务拆解无力** —— 大目标不知道从哪开始
4. **与AI协作无章法** —— 提示词写得差，AI输出质量低

**核心洞察**：问题不在"写代码"，而在"定义问题"。

---

## 产品方案

Vibe Workbench 是一个 AI 驱动的产品构思工作台：

```
输入：一段模糊想法（自然语言）
  ↓
Step 1: PRD 生成（问题定义 → 用户故事 → 功能列表）
  ↓
Step 2: 技术选型（根据需求推荐stack + 理由）
  ↓
Step 3: 任务拆解（MVP → V1 → V2 渐进式）
  ↓
输出：完整的项目启动包（PRD + Tech Stack + Task List + Starter Code）
```

### 核心功能

| 功能 | 说明 |
|------|------|
| 💡 Idea Input | 自然语言描述想法，支持语音输入 |
| 📋 PRD Generator | 结构化产品需求文档，含用户故事和优先级 |
| 🔧 Tech Recommender | 根据需求推荐技术栈，附选型理由 |
| ✅ Task Breakdown | 自动拆解为可执行任务，支持导出到 Notion/Trello |
| 🚀 Starter Code | 一键生成项目脚手架（可选） |

---

## AI 协作记录

本项目本身就是"AI协作能力"的展示。详见 `/docs/ai-dialogue/`：

- [01-initial-problem-definition.md](docs/ai-dialogue/01-initial-problem-definition.md) — 初始需求描述
- [02-architecture-decisions.md](docs/ai-dialogue/02-architecture-decisions.md) — 架构决策过程
- [03-prompt-engineering-notes.md](docs/ai-dialogue/03-prompt-engineering-notes.md) — 提示词迭代记录
- [04-iteration-log.md](docs/ai-dialogue/04-iteration-log.md) — 开发迭代日志

---

## 技术栈

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **AI Layer**: OpenAI GPT-4o API（结构化输出 with Zod）
- **State**: React Server Components + Server Actions
- **Deploy**: Vercel

---

## 快速开始

```bash
npm install
npm run dev
# 访问 http://localhost:3000
```

需要配置环境变量：
```
OPENAI_API_KEY=sk-...
```

---

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页：想法输入
│   ├── prd/[[...slug]]   # PRD 生成页
│   ├── tech-stack/       # 技术选型页
│   └── tasks/            # 任务拆解页
├── components/
│   ├── IdeaInput.tsx     # 想法输入组件
│   ├── PRDViewer.tsx     # PRD 展示
│   ├── TechStackCard.tsx # 技术栈推荐卡片
│   └── TaskTree.tsx      # 任务树可视化
└── lib/
    ├── openai.ts         # OpenAI 客户端
    ├── prompts.ts        # 提示词模板
    └── schemas.ts        # Zod 验证 Schema
```

---

## 为什么这个项目能展示我的能力

| 能力维度 | 展示方式 |
|---------|---------|
| 问题定义 | README 的问题分析 + PRD生成逻辑 |
| 逻辑思维 | 从想法→PRD→技术选型→任务的递进结构 |
| 产品能力 | 每个功能都有明确的用户价值和交互设计 |
| AI协作 | `/docs/ai-dialogue/` 完整记录协作过程 |

---

## Author

[@Cao150702](https://github.com/Cao150702) — 正在寻找 Web3 / 全栈开发机会 🚀
