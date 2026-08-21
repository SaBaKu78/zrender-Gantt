# Gantt

一个基于 ZRender 参考 Echarts 图表的高密度资源调度甘特图库。项目同时包含可发布的图表核心、用于本地联调的演示页面，以及任务派遣、资源过滤和 WebSocket 推送等业务能力。

## 项目定位与运行边界

项目有两个入口，理解二者的区别是修改代码前最重要的前提：

| 入口 | 文件 | 职责 | 是否进入库产物 |
| --- | --- | --- | --- |
| 核心库入口 | `src/core/Gantt.ts` | 图表实例、模型、调度器、组件注册、Action 和 WebSocket 生命周期 | 是 |
| 开发页面入口 | `index.js` | 获取演示数据、创建任务控制器、组装 option、暴露 E2E 测试句柄 | 否 |

`vite build` 以 `src/core/Gantt.ts` 为入口生成 `dist/Gantt.*`。`index.js` 和 `src/config` 是当前演示应用的装配层，不属于库构建入口。

MockJS 只允许从开发页面加载：

```js
if (import.meta.env.DEV) {
  await import('./src/mock/index')
}
```

因此：

- `npm run dev` 使用 `src/mock` 注册的浏览器端 Mock 接口。
- `npm run build` 不应包含 MockJS 和 Mock 数据。
- 生产消费者负责提供真实 API、WebSocket 地址和业务回调。
- 不要从 `src/core`、`src/component`、`src/model` 等库运行时目录导入 `src/mock`。

## 总体架构

```text
开发/演示装配层
index.js
  ├─ DEV: src/mock
  ├─ src/api
  ├─ src/config/taskController
  ├─ src/config/taskTransform
  └─ src/config/ganttOptions
             │ option / dispatchAction
             ▼
甘特图核心
src/core/Gantt.ts
  ├─ GlobalModel / OptionManager
  ├─ Scheduler / lifecycle
  ├─ CoordinateSystem
  ├─ ComponentModel / ComponentView
  ├─ SeriesModel / ChartView
  ├─ Action / ExtensionAPI
  └─ WsManager
             │ render / event
             ▼
渲染与交互
ZRender
  ├─ Canvas painter
  ├─ 图形元素和动画
  ├─ dataZoom / split / axis / grid
  └─ 未分配任务面板和派遣交互
```

依赖方向应保持为：

```text
演示装配层 -> 业务适配层 -> Gantt 公共能力 -> ZRender
Mock -------------------------------------> 仅开发环境 API
```

核心层不应反向依赖演示入口、Mock 数据或具体部署环境。

## 目录职责

| 目录/文件 | 职责 |
| --- | --- |
| `src/core` | Gantt 实例、更新生命周期、调度器、坐标系管理和扩展 API |
| `src/model` | 全局模型、组件模型、系列模型和 option 合并 |
| `src/view` | 组件视图与图表视图基类 |
| `src/component` | Grid、坐标轴、缩放、分割线、未分配面板、资源过滤等功能模块 |
| `src/coord` | 坐标系、轴和刻度计算 |
| `src/data` | 数据源、维度、DataStore 和差异更新 |
| `src/interaction` | 通用状态机及任务派遣状态机 |
| `src/ws` | WebSocket 客户端、消息路由和业务域消息标准化 |
| `src/api` | 演示应用使用的 HTTP 接口适配 |
| `src/config` | 演示应用的 option 工厂、任务控制器、数据转换和 renderItem |
| `src/mock` | 仅开发环境使用的接口与数据，不得进入生产库入口 |
| `src/util` | 图形、类型、布局、格式化等公共工具 |
| `tests/unit` | Vitest 单元测试，只测试可隔离的业务规则和协议转换 |
| `tests/e2e` | Playwright 浏览器测试，验证真实 Canvas 交互主流程 |
| `extension.ts` | 组件、系列、Action、Processor 和 Preprocessor 的内部注册机制 |

## 初始化与数据流

开发页面初始化顺序如下：

1. `index.js` 在开发模式下等待 `src/mock/index` 完成接口注册。
2. `getResourceList` 和 `getTask` 获取资源及任务原始数据。
3. `createResourceIndexMaps` 建立资源 ID 到可见行索引的映射。
4. `createTaskController` 保存当前任务快照 `currentTaskData`。
5. `buildAssignedTasks` 将已分配任务转换为自定义系列的数组行。
6. `buildUnassignedTasks` 将未分配任务转换为面板数据。
7. `createGanttOption` 组装组件、系列、坐标轴、缩放和业务回调。
8. `gantt.setOption` 创建模型、调度数据任务并渲染到 ZRender Canvas。

当前任务数据的所有权关系为：

```text
后端任务对象
    │
    ▼
taskController.currentTaskData      业务快照
    │
    ├─ buildAssignedTasks ----------> series[id=assignedTasks].data
    └─ buildUnassignedTasks --------> unassignedBoard.data
                                      │
                                      ▼
                              Gantt Model / View
```

图表 Model 中的数据是业务快照的派生结果，不应作为持久化业务数据源。需要变更任务时，应先更新控制器中的原始任务，再通过 Action 更新派生数据。

### 资源过滤流

```text
resourceFilter.onChange
  -> 创建新的资源索引映射
  -> taskController.setResourceIndexMaps
  -> 重新计算任务行和资源行
  -> dispatchAction({ type: 'updateResourceFilter' })
  -> 同步 assignedTasks、resourceRows 和 unassignedBoard
```

过滤只改变资源的可见索引，不应修改原始任务的资源 ID。

## 任务派遣状态流

未分配任务派遣由 `UnassignedBoardView`、`AssignmentStateMachine` 和 `taskController` 协作完成。

### 交互状态

```text
idle
  └─ SELECT_TASK -> selected
       └─ ENTER_GRID -> previewing
            └─ CLICK_GRID -> confirming
                 └─ CONFIRM -> submitting
                      ├─ SUBMIT_FAIL -> error
                      └─ SUBMIT_OK -> waiting_ws
                           ├─ WS_TIMEOUT -> error
                           └─ WS_UPDATE -> refreshing
                                ├─ REFRESH_FAIL -> error
                                └─ REFRESH_OK -> idle
```

`ESC`、取消选择或重新选择任务会根据当前状态回到 `idle` 或重新进入 `selected`。状态机的 Context 保存当前任务、悬停资源、资源行索引、请求 ID 和错误信息。

### 当前成功派遣链路

```text
双击未分配任务
  -> SELECT_TASK
移动到资源行
  -> ENTER_GRID / MOVE_HOVER
点击资源行
  -> CLICK_GRID / CONFIRM
  -> onAssignTask
  -> POST /api2/ips/task/manage/assign
  -> searchTaskByIds
  -> 更新 taskController.currentTaskData
  -> dispatchAction({ type: 'updateTaskData' })
  -> 任务移出 unassignedBoard
  -> 任务进入 assignedTasks 系列
```

当前实现会在 HTTP 查询并刷新数据成功后，连续执行 `SUBMIT_OK`、`WS_UPDATE` 和 `REFRESH_OK`。也就是说 `waiting_ws` 暂时表达目标状态流，但当前页面并没有真正等待 WebSocket 消息。接入真实推送后，应由任务事件处理器触发 `WS_UPDATE` 和数据刷新，而不是在提交回调中模拟这一过程。

### 与任务有关的 Action

| Action | 输入 | 更新范围 |
| --- | --- | --- |
| `updateTaskData` | `assignedData`、`unassignedData` | 已分配任务系列和未分配任务面板 |
| `updateResourceFilter` | 任务数据、资源行、可见资源 | 已分配系列、资源系列和未分配面板 |
| `updateUnassignedBoardPosition` | 新的分割位置 | 未分配面板、dataZoom、Y 轴虚拟留白 |

Action 负责同步修改 Model 并触发 Gantt 更新，不应直接请求接口或持有远端业务状态。

## WebSocket 状态流

```text
option.ws
  -> Gantt.setOption
  -> WsManager.configure
  -> WebSocketClient.connect
  -> installWsPush 创建 WsMessageRouter
  -> installTaskWsPush 监听原始消息
       ├─ needAck: 发送 ack
       └─ TaskEventNormalizer
            -> TASK_EVENT
            -> router.dispatch
            -> option.ws.onTaskEvent
```

任务消息标准化规则位于 `src/ws/task/TaskEventNormalizer.ts`：

- 只处理 `category: "gateTask"`。
- `update` 转换为 `upsert`。
- `delete`、`remove`、`cancel` 转换为 `remove`。
- 无效 JSON、无任务 ID 和不支持的类别会被忽略。
- `needAck` 消息由任务 WS 安装器发送确认。

通用 WS 层只负责连接和路由；具体后端协议解析必须放在对应业务域目录，例如 `src/ws/task`。不要让 `WsManager` 直接理解任务字段。

当前演示 option 已提供 `onTaskEvent` 参数，但 `index.js` 尚未把任务事件接入 `taskController`。完整生产接入应实现以下闭环：

```text
TASK_EVENT
  -> 根据 eventType 和 taskIds 查询或移除任务
  -> 更新 taskController 中的任务快照
  -> 重新执行 taskTransform
  -> dispatchAction(updateTaskData)
```

## 扩展开发

### 新增组件

组件遵循 Model、View、Install 三部分结构：

```text
src/component/example/
  ├─ ExampleModel.ts
  ├─ ExampleView.ts
  ├─ exampleAction.ts       可选
  └─ install.ts
```

1. Model 继承 `ComponentModel`，声明稳定的 `type` 和 `defaultOption`。
2. View 继承 `ComponentView`，实现 `render`；局部布局变化可实现 `updateLayout`。
3. 在 `install.ts` 中通过 `ExtensionInstallRegisters` 注册 Model、View 和 Action。
4. 在核心入口中调用 `use(ExampleInstall)`。
5. 在 option 中加入对应组件配置；未出现在 option 中的组件不会创建实例。
6. 为 Model 默认值、Action 更新和关键交互分别补充单元或 E2E 测试。

注册器当前支持：

- `registerComponentModel`
- `registerComponentView`
- `registerSeriesModel`
- `registerChartView`
- `registerSubTypeDefaulter`
- `registerAction`
- `registerProcessor`
- `registerPreprocessor`

### 新增 Action

Action 名称只能包含字母、数字和下划线。推荐把 Action 放在所属组件目录，并由该组件的 `install.ts` 注册：

```ts
registers.registerAction(
  { type: 'updateExample', update: 'update' },
  (payload, model, api) => {
    // 修改 Model；副作用和远端请求留在业务控制器中。
  },
)
```

Action Payload 应定义明确接口。不要用 Action 保存服务端状态，也不要从 View 直接修改其它组件的私有字段。

### 新增任务字段或数据转换

1. 保留后端对象作为控制器中的原始数据。
2. 在 `taskTransform` 中完成校验、时间转换和资源索引映射。
3. 同步更新 `assignedTasks.dimensions` 和 `encode`。
4. 更新 `renderTask` 对数组位置的读取。
5. 添加转换测试，至少覆盖缺失值、非法时间、数字/字符串 ID 和资源不可见情况。

数组行结构的位置具有契约意义。新增字段时不要在不同文件中直接使用未经说明的魔法下标；应同步维护 dimensions，必要时引入命名类型或集中常量。

### 新增 WebSocket 业务域

1. 在 `src/ws/<domain>` 定义后端消息和标准事件类型。
2. 编写纯函数 Normalizer，将不可信输入转换为内部事件。
3. 编写安装器，注册原始消息监听、ACK 和路由分发。
4. 由 `WsManager` 提供的运行时安装业务处理器。
5. 为非法消息、支持事件、忽略事件和 ACK 条件补充单元测试。

### 新增交互状态机

复杂交互应继承 `BaseStateMachine`，显式声明 State、Event、Context、Transitions 和 Guards。View 只把鼠标或键盘行为翻译为状态事件，业务请求通过回调交给控制器执行。

状态机测试应覆盖：

- 合法状态迁移。
- Guard 拒绝的迁移。
- 取消和重置。
- 请求失败、超时与重复事件。
- Context 在切换任务后不残留旧值。

## 测试策略

Vitest 与 Playwright 已完全隔离：

| 层级 | 工具 | 目录 | 适合覆盖 |
| --- | --- | --- | --- |
| 单元测试 | Vitest | `tests/unit` | 转换函数、状态机、Normalizer、控制器和 Action 规则 |
| 浏览器 E2E | Playwright | `tests/e2e` | Canvas 点击、拖拽、派遣、过滤以及最终业务状态 |

常用命令：

```bash
npm test
npm run test:watch
npm run typecheck
npm run e2e
npm run e2e:headed
npm run e2e:debug
```

仅运行 Chrome 派遣测试：

```bash
npx playwright test tests/e2e/assign-unassigned-task.spec.ts --project=chrome
```

E2E 使用真实 Chrome channel。`slowMo` 只用于放慢可见操作，不改变断言超时。MockJS 在浏览器内部拦截 XHR，Playwright 不一定能观察到真实网络请求，因此测试应优先断言最终业务状态，例如任务是否从未分配面板移入已分配系列。

新增主流程功能时，测试至少覆盖：

1. 纯业务规则的单元测试。
2. 成功路径与失败路径。
3. 一个从用户操作到最终 Model 状态的 E2E。
4. 涉及 WebSocket 时，覆盖乱序、重复、无效消息和重连后的幂等性。

## 当前边界与技术债

以下行为是现状说明，不应被当作推荐扩展方式：

- `buildUnassignedTasks` 在没有未分配任务时仍会生成 `mock-unassigned-*` 演示任务；生产接入前应移除此兜底。
- `index.js` 尚未把 `onTaskEvent` 接回 `taskController`，WebSocket 任务更新链路还没有闭环。
- 派遣成功后状态机当前同步模拟 `WS_UPDATE`，没有真正等待推送。
- `src/util/axios.ts` 创建了配置实例但导出原始 Axios，拦截器目前不会作用于业务请求。
- `tsconfig.app.json` 当前为 `strict: false`，且 `.js` 业务文件未开启 `checkJs`。
- `Gantt.ts` 和 `UnassignedBoardView.ts` 职责较多，新增功能时优先抽离纯业务逻辑，不继续扩大 View。
- `package.json` 的 `main`、`module` 尚未与 `dist` 库产物对齐，正式发布 npm 包前需要修正导出声明。

这些边界应通过小步重构和测试逐项消除，避免在调用方增加新的兼容分支。

## 甘特图设计生态

这套甘特图是一个高密度调度工具，设计目标不是装饰感，而是让调度人员在大量资源、任务、时间线和异常状态中快速扫描、判断和操作。整体风格应保持克制、清晰、稳定，优先服务长期使用效率。

### 1. 设计原则

- 信息优先：任务时间、资源、状态、航班/任务名必须比装饰元素更突出。
- 低噪声：网格线、斑马纹、分割线只用于辅助定位，不能抢任务卡的视觉层级。
- 强一致：左侧资源列、右侧 grid、任务卡、dataZoom、未分配面板都应使用同一套颜色、间距和状态表达。
- 可扩展：未来接入 WebSocket、任务实时变化、更多状态时，不应临时增加杂乱颜色和符号，而应进入统一状态体系。
- 可操作：hover、选中、拖拽、滚动、展开未分配面板时，用户应始终知道当前操作对象和可操作范围。

### 2. 颜色体系

基础色：

- 页面背景：`#FFFFFF`
- 资源列/主视图区偶数行：`#FFFFFF`
- 资源列/主视图区奇数行：`#F7F8FA`
- 普通网格线：`#EDF1F5`
- 主刻度线：`#D6DEE8`
- 分割线/边界线：`#CBD5E1`
- 主文字：`#1F2937`
- 次级文字：`#64748B`

任务色：

- 默认任务边框：`#2F9EEB`
- 默认任务背景：`#F3FAFF`
- hover 任务边框：`#168BCE`
- 选中任务边框：`#0B75BB`
- 选中任务背景：`#E8F6FF`

状态色：

- 普通/待处理：`#F3B33D`
- 进行中：`#20C7B5`
- 完成：`#10B981`
- 异常/阻塞：`#EF4444`
- 锁定/不可编辑：`#64748B`

### 3. 资源列规范

- 资源列是冻结列表，应和右侧 grid 行高、背景色完全对齐。
- 每行资源左侧使用一个状态圆点，默认直径 `8px`。
- 圆点和资源名必须垂直居中并保持同一行。
- 资源名使用 `13px`，颜色 `#1F2937`。
- 资源列右边界线可以略强于普通网格线，用来建立冻结列感。
- 行背景使用灰白交替，不额外增加复杂卡片样式。

### 4. 时间轴规范

- 时间轴是表头层级，应比普通 grid 更清晰。
- 主刻度按业务需要固定，例如当前使用 20 分钟一格。
- 主刻度线颜色使用 `#D6DEE8`，普通次级线使用 `#EDF1F5`。
- 时间文字使用次级文字色，整点或关键时间可适当加粗。
- 当前时间线、关键时间线应使用单独强调色，不和普通网格线混用。

### 5. Grid 规范

- grid 背景与资源列保持一致的灰白交替。
- 普通横线和竖线必须低对比，避免形成强烈线框感。
- grid 内容必须裁剪在绘图区内，不能穿透到时间轴、dataZoom 或其它面板。
- 不建议使用大面积高饱和色作为行背景。

### 6. 任务卡规范

默认任务卡：

- 使用浅蓝背景 `#F3FAFF`。
- 使用蓝色细边框 `#2F9EEB`。
- 圆角保持小半径，建议 `3px - 4px`。
- 任务卡内部信息按 2 行 3 区组织：
  - 左上：计划开始时间
  - 中上：航班 + 状态标识
  - 右上：计划结束时间
  - 左下：机位
  - 中下：任务名称
  - 右下：登机口

任务卡信息密度：

- 宽任务：显示完整 6 区信息。
- 中等任务：优先显示开始/结束时间、航班/状态、任务名。
- 窄任务：只显示任务名或航班号。
- 极窄任务：只保留状态色块或简短标识。

重叠任务：

- 同一资源行内任务重叠时，按重叠数量拆分 lane。
- 每个任务高度按 `资源行高度 / laneCount` 计算。
- lane 内任务仍需保留最小可读高度；低于可读高度时应减少内部文本显示。

### 7. 状态表达规范

状态不要全部堆进文本，应逐步图形化：

- 通知状态：使用小方块或小点。
- 锁定：使用锁图标或灰色锁定标识。
- 异常/阻塞：使用红色状态点或左侧状态条。
- 完成：使用绿色状态点或完成标识。
- 描述/调度说明：使用轻量提醒图标。

状态图标应放在固定区域内，不应挤占主要任务名的阅读空间。

### 8. 交互规范

hover：

- 任务卡边框加深。
- 可选轻微阴影，但不能影响密集任务阅读。

选中：

- 使用更强边框和浅蓝选中背景。
- 选中状态必须明显区别于 hover。

拖拽：

- 拖拽过程中保持任务卡轻量渲染，避免频繁重建复杂元素。
- 拖动分割线、dataZoom 和未分配面板时，应保持主视图滚动职责清晰。

滚动：

- y 轴资源列和右侧 grid 必须同步。
- 滚动到底部时，最后一个资源和对应任务都必须可见。

### 9. 未分配任务面板规范

- 未分配面板属于高层级操作区，唤起后必须遮挡背后无关 UI。
- 水平 dataZoom 应跟随水平分割线移动，避免被未分配面板遮挡。
- 未分配面板未来有独立滚动条时，应和主视图滚动互不影响。
- 面板不应改变主 grid 坐标精度，优先通过 dataZoom 和 overlay 布局协调。

### 10. 扩展规则

新增 UI 或状态时，先判断属于以下哪类：

- 基础布局：资源列、时间轴、grid、dataZoom、分割线。
- 任务内容：时间、航班、任务名、机位、登机口。
- 状态表达：锁定、异常、完成、取消、提醒。
- 操作反馈：hover、选中、拖拽、滚动、加载。

新增设计必须复用本生态中的颜色、字体、间距和状态规则。只有当现有体系无法表达业务含义时，才新增颜色或组件样式。

## 开发与构建

### 环境要求

- Node.js：当前开发环境为 `v22.12.0`，升级时需满足 Vite 7 的版本要求。
- Vite：`7.3.6`。
- Vitest：`3.0.0`。
- Playwright：`1.62.1`。

### 本地启动

```bash
npm install
npm run dev
```

访问 `http://localhost:8099`。

### 生产构建

```bash
npm run build
```

构建产物：

| 文件 | 用途 |
| --- | --- |
| `dist/Gantt.iife.js` | 通过普通 `<script>` 标签引入 |
| `dist/Gantt.mjs` | ES Module 引入 |
| `dist/Gantt.js` | CommonJS 引入 |

### 开发注意事项

- `createHashMap` 必须从 `zrender/src/core/util` 导入，以匹配当前路径映射和构建方式。
- 修改生产入口后运行 `npm run build`，并确认 `dist` 中没有 MockJS 或 `src/mock` 数据。
- 提交前至少运行 `npm run typecheck`、`npm test`；修改主交互流程时还需运行对应 Playwright 测试。
