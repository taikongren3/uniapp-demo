# Issue 跟踪平台：GitHub

本仓库的 Issue 和 PRD 均存放在 GitHub Issues 中。所有操作都使用 `gh` CLI。

## 约定

- **创建 Issue**：`gh issue create --title "..." --body "..."`。多行正文使用 heredoc。
- **读取 Issue**：`gh issue view <number> --comments`，使用 `jq` 筛选评论，并同时获取标签。
- **列出 Issue**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，并按需添加 `--label` 和 `--state` 筛选条件。
- **评论 Issue**：`gh issue comment <number> --body "..."`
- **添加/移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭 Issue**：`gh issue close <number> --comment "..."`

通过 `git remote -v` 判断仓库；在克隆的仓库内运行时，`gh` 会自动完成此操作。

## 是否将 Pull Request 纳入分诊

**将 PR 作为需求入口：否。** _（如果本仓库将外部 PR 视为功能请求，请改为“是”；`/triage` 会读取此设置。）_

设置为“是”后，PR 将使用与 Issue 相同的标签和状态流转，并使用对应的 `gh pr` 命令：

- **读取 PR**：使用 `gh pr view <number> --comments`，并通过 `gh pr diff <number>` 获取差异。
- **列出待分诊的外部 PR**：运行 `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，仅保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的 PR。
- **评论、添加标签或关闭**：使用 `gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 Issue 和 PR 共用同一编号空间，因此单独的 `#42` 可能指其中任意一种。先运行 `gh pr view 42`；若失败，再运行 `gh issue view 42`。

## 当技能要求“发布到 Issue 跟踪平台”时

创建一个 GitHub Issue。

## 当技能要求“获取相关工单”时

运行 `gh issue view <number> --comments`。

## Wayfinding 操作

供 `/wayfinder` 使用。**地图**是一个独立 Issue，**子 Issue**作为具体工单。

- **地图**：一个带有 `wayfinder:map` 标签的独立 Issue，正文包含“笔记”“已有决策”和“待探索区域”。
- **子工单**：以 GitHub 子 Issue 的形式关联到地图。如果未启用子 Issue，则将子工单加入地图正文的任务列表，并在子工单正文顶部添加 `Part of #<map>`。
- **阻塞关系**：使用 GitHub 原生 Issue 依赖关系。如果该功能不可用，则在子工单正文顶部添加 `Blocked by: #<n>`。
- **前沿查询**：按照地图中的顺序，选择第一个未被阻塞、未分配且仍处于开放状态的子工单。
- **认领**：运行 `gh issue edit <n> --add-assignee @me`。
- **完成**：评论并给出答案，关闭子工单，再把上下文引用追加到地图的“已有决策”部分。
