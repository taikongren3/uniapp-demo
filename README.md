# uni-app 多端工程

面向微信小程序、支付宝小程序和 H5 的 Vue 3 + TypeScript 工程骨架。工程优先考虑清晰边界、严格类型、可测试性和长期升级成本。

## 环境要求

- Node.js 20 LTS 或 22
- pnpm 10+
- 微信开发者工具（调试微信小程序）
- 支付宝小程序开发者工具（调试支付宝小程序）

## 开始开发

```bash
pnpm install
pnpm dev:h5
pnpm dev:mp-weixin
pnpm dev:mp-alipay
```

编译产物位于 `dist/dev/` 或 `dist/build/`。小程序开发工具应导入对应平台目录，而不是项目根目录。

## 发布构建

```bash
pnpm build:h5
pnpm build:mp-weixin
pnpm build:mp-alipay
```

合并代码前运行：

```bash
pnpm check
```

## 目录约定

```text
src/
├── api/          # 按业务域组织的后端接口
├── config/       # 环境与运行配置
├── pages/        # 页面，只编排交互和视图
├── platform/     # 平台检测和平台差异适配
├── services/     # HTTP 等基础设施
├── shared/       # 无业务归属的复用工具
├── static/       # 静态资源
├── stores/       # Pinia 状态
└── types/        # 全局和第三方类型补充
```

依赖方向建议保持为：`pages → stores/api → services/shared`。基础设施层不要反向依赖页面。

## 接口约定

当前请求层默认后端返回：

```json
{
  "code": 0,
  "data": {},
  "message": "ok"
}
```

如果服务端协议不同，只修改 `src/services/http/index.ts` 的解包逻辑，不要在每个页面重复判断。登录成功后调用 `useAuthStore().setAccessToken(token)`，请求层会自动添加 `Authorization`。

## 环境配置

- `.env.development`：本地开发
- `.env.production`：生产构建
- `.env.*.local`：个人或密钥配置，不提交 Git

先把示例 API 域名改成真实地址。小程序还需在各自平台后台配置 request 合法域名；生产环境不要关闭域名校验。

## 多端开发原则

1. 页面和业务组件优先使用 uni-app 组件与 API，不直接操作 DOM。
2. 平台差异集中在 `src/platform`，使用条件编译，不在业务代码中散落平台判断。
3. 微信或支付宝原生能力先封装成统一接口，再由页面调用。
4. `manifest.json` 中的微信 AppID、支付宝配置和 H5 路由参数按环境补齐后再发布。
5. 升级 uni-app 时，所有 `@dcloudio/*` 包保持同一发行版本，并先在分支中完成三端构建与核心流程回归。

## 维护建议

- 业务新增时按领域拆分 `api` 与 `stores`，不要建立超大的全局 store。
- 通用组件达到三个真实使用场景后再抽象。
- CI 已执行 lint、类型检查、单元测试、格式检查和三端构建。
- 锁文件必须提交；依赖升级使用小步升级并保留回滚点。
