### Mio Track API 文档

*   **更新时间：** 2024-07-29
*   **作者：** Mio
*   **版本号：** 1.9.0

#### 1. 简介

Mio Track API 允许开发者集成用户管理、项目跟踪、数据埋点、数据展示以及埋点事件管理功能到其应用中。本文档概述了 API 端点、请求/响应格式、认证方式、会话管理策略、安全策略以及数据分析相关内容。

#### 2. API 概述

##### 2.1 基础 URL

```
https://track.krumio.com
```

##### 2.2 认证

*   **管理平台 API：** 所有请求必须包含 `Authorization` 头部，格式为 `Bearer {token}`。
    *   `token` 获取方式见 **3.1.2 用户登录** 接口返回的 `token`。

*   **SDK 上报 API：** 使用 `trackId` 进行用户识别(trackId 将存储在 `Cookie` 中并上报)，同时需要进行数据签名校验。上报请求不再需要 `Authorization` 头部.

##### 2.3 数据格式

*   所有请求和响应都使用 `JSON` 格式。

#### 3.  接口列表

##### 3.1 用户管理接口

###### 3.1.1 用户注册

*   **接口:** `/v1/register`
*   **方法:** `POST`
*   **描述:** 新用户注册接口。
*   **请求参数:**

    ```json
    {
        "username": "string",
        "password": "string",
        "userAgent": "string"
    }
    ```

*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "userId": "string",
            "username": "string"
        }
    }
    ```

###### 3.1.2 用户登录

*   **接口:** `/v1/login`
*   **方法:** `POST`
*   **描述:** 用户登录接口。
*   **请求参数:**

    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```

*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "token": "string",
            "userId": "string",
            "username": "string"
        }
    }
    ```

##### 3.2 项目管理接口

###### 3.2.1 创建项目

*   **接口:** `/v1/project/create`
*   **方法:** `POST`
*   **描述:** 创建新的监测项目。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **请求参数:**

    ```json
    {
        "name": "string",
         "domains": array  // 新增，项目允许的域名白名单，例如： ['example.com', 'test.example.com']
    }
    ```

*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "projectId": "string",
            "projectUuid": "string",
            "name": "string",
              "domains": array // 新增，项目允许的域名白名单，例如： ['example.com', 'test.example.com']
        }
    }
    ```

###### 3.2.2 获取项目列表

*   **接口:** `/v1/project/list`
*   **方法:** `GET`
*   **描述:** 获取当前用户的监测项目列表。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": [
            {
                 "projectId": "string",
                 "projectUuid": "string",
                 "name": "string",
                  "domains": array
            }
        ]
    }
    ```

###### 3.2.3 获取项目详情

*   **接口:** `/v1/project/detail/:id`
*   **方法:** `GET`
*   **描述:** 获取指定项目的详细信息。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **路径参数:**
    *   `id`: 项目ID。
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "projectId": "string",
            "projectUuid": "string",
            "name": "string",
             "domains": array // 项目允许的域名白名单，例如： ['example.com', 'test.example.com']
        }
    }
    ```

###### 3.2.4 删除项目

*   **接口:** `/v1/project/delete/:id`
*   **方法:** `DELETE`
*   **描述:** 删除指定的监测项目。
*   **请求头:** `Authorization: Bearer {token}`  (用户 `token`)
*   **路径参数:**
    *   `id`: 项目ID。
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success"
    }
    ```

    ###### 3.2.5 更新项目（可选）

*   **接口:** `/v1/project/update/:id`
*  **方法:** `PUT`
*   **描述:** 更新指定的监测项目(例如：更新域名)。
*   **请求头:** `Authorization: Bearer {token}`
 *     **路径参数:**
    *   `id`: 项目ID.
*   **请求参数**
    ```json
    {
         "domains": array  // 更新后的域名白名单
     }
    ```
     *    **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success"
    }
    ```

##### 3.3 SDK 接口

###### 3.3.1 SDK 初始化

*   **接口:** `/v1/sdk/init`
*   **方法:** `POST`
*   **描述:** SDK 初始化，获取上报的 `token`。
*    **请求参数:**
  ```json
   {
        "projectUuid": "string"
   }
   ```

*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
         "data": {
            "publicKey": "string", // SDK 公钥，用于数据签名
           	  "encryptedDomains": "string" // 加密后的域名列表
        }
    }
    ```

###### 3.3.2 上报埋点事件

*   **接口:** `/v1/sdk/report`
*   **方法:** `POST`
*   **描述:** 上报埋点触发事件。
*   **请求头:** `无` (使用 Cookie 中的 `trackId` 识别用户)
*   **请求参数:**

    ```json
    {
    	"eventName": "string",
        "eventType": "string",
        "eventData": "object",
        "referrerUrl": "string",
        "currentUrl": "string",
          "trackId": "string",
        "timestamp": "number",
        "sign": "string", // 数据签名
        "os": "string",
        "browser": "string",
        "screenResolution": "string"
    }
    ```

*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success"
    }
    ```

##### 3.4 数据展示接口

###### 3.4.1 获取活跃用户数

*   **接口:** `/v1/data/active-users`
*   **方法:** `GET`
*   **描述:** 获取指定时间范围内每日的活跃用户数，支持自定义时间范围查询。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **请求参数:**
    *   `projectId`: (query参数) 项目ID。
    *   `startDate`: (query参数) 开始日期，格式 `YYYY-MM-DD`,例: `2024-07-01`。
    *   `endDate`: (query参数) 结束日期，格式 `YYYY-MM-DD`,例: `2024-07-27`。
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": [
            {
                "date": "string",
                "activeCount": "number"
            }
        ]
    }
    ```

###### 3.4.2 获取事件统计

*   **接口:** `/v1/data/event-summary`
*   **方法:** `GET`
*   **描述:** 获取指定时间范围内每日的事件统计汇总数据，支持自定义时间范围查询。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*     **请求参数:**
    *  `projectId`: (query参数) 项目ID。
    *   `eventName`: (query参数) 事件名称,可选.
    *   `startDate`: (query参数) 开始日期，格式 `YYYY-MM-DD`,例: `2024-07-01`。
    *   `endDate`:  (query参数) 结束日期，格式 `YYYY-MM-DD`,例: `2024-07-27`。
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": [
            {
                "date": "string",
                "eventName": "string",
                "eventCount": "number"
            }
        ]
    }
    ```

##### 3.5 埋点事件管理接口

###### 3.5.1 查询事件列表

*   **接口:** `/v1/event/list`
*   **方法:** `GET`
*   **描述:** 查询指定项目下的所有埋点事件列表。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **请求参数:**
    *   `projectId`: (query参数) 项目ID。
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": [
            {
                "eventId": "string",
                "eventName": "string",
                "eventType": "string",
                "createTime": "string"
            }
        ]
    }
    ```

###### 3.5.2 查询事件详情

*   **接口:** `/v1/event/detail/:id`
*   **方法:** `GET`
*   **描述:** 查询指定ID的事件详情。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*     **路径参数:**
    *   `id`: 事件ID。
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
                "eventId": "string",
                "eventName": "string",
                "eventType": "string",
                "createTime": "string"
        }
    }
    ```

###### 3.5.3 创建埋点事件

*   **接口:** `/v1/event/create`
*   **方法:** `POST`
*   **描述:** 创建新的埋点事件。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **请求参数:**

    ```json
    {
        "projectId": "string",
        "eventName": "string",
        "eventType": "string",
        "eventParams": [
            {
                "paramName": "string",
                "paramType": "string"
            }
        ]
    }
    ```

*   **响应参数:**

    ```json
      {
        "code": 200,
        "message": "success",
           "data":{
           "eventId":"string", // 事件ID
            "eventName": "string",
            "eventType": "string",
            "createTime": "string"
        }
    }
    ```

###### 3.5.4 删除埋点事件

*   **接口:** `/v1/event/delete/:id`
*   **方法:** `DELETE`
*   **描述:** 根据事件ID删除指定的埋点事件。
*   **请求头:** `Authorization: Bearer {token}` (用户 `token`)
*   **路径参数:**
    *   `id`: 事件ID.
*   **响应参数:**

    ```json
    {
        "code": 200,
        "message": "success"
    }
    ```

#### 4. 会话管理

*   **管理平台会话:** 使用 `Bearer Token` 进行认证，存储在服务器端 Session 或者使用 JWT 等方式。
*   **埋点项目前端会话**
    *   **`trackId`:** 当用户首次访问网站或应用（前端）时，SDK 会生成一个 `trackId`，， 存储在用户的 Cookie，用于后续标识用户.
    *    **`trackId` 的上报：**  前端 SDK 在上报埋点事件时，会自动将 `trackId` 作为请求体的一部分发送到后端，后端通过 `trackId` 来标识用户，从而进行用户行为分析.
    *    **`Authorization` 的移除：**  埋点项目前端上报接口不再需要传递 `Authorization` 头部，而是通过 `Cookie` 中的 `trackId` 来区分用户。

#### 5. 安全策略

##### 5.1 SDK 初始化安全

*   **域名校验**: SDK 初始化时，后端下发**加密的**域名列表(`encryptedDomains`)，客户端解密后，进行比对, 只有当前域名在白名单中,才能继续上报操作。
*   **项目唯一标识**:  SDK 使用 projectUuid 与后端进行绑定，后端校验 projectUuid 的合法性，防止伪装。

##### 5.2 上报安全

*   **数据签名：**
    *   **SDK 签名生成：** SDK 使用后端下发的 `publicKey` 对数据进行签名，确保数据不被篡改。（签名算法可以选择 `HMAC-SHA256` 等安全算法）
    *   **后端签名校验：** 后端使用预先配置的 `secretKey` 来验证签名的有效性，并拒绝无效的请求。
*   **请求时效性：**
    *   **时间戳：** 上报请求中包含时间戳，用于校验请求的时效性。
    *   **时效性验证：** 后端校验时间戳是否在合理的时间范围内，防止请求重放。
*   **HTTPS 加密传输**： 强制使用 HTTPS 协议进行数据传输，防止数据被窃听或篡改.
*   **IP 反查**: 后端通过请求的 IP 地址反查域名信息,若与 SDK 初始化时的域名列表不匹配,拒绝该请求.
*   **IP 限制**：(可选) 可以考虑对访问 IP 进行限制,设置 IP 白名单或者黑名单.

##### 5.3 后端数据校验

*   **参数校验：** 后端对所有接收到的数据进行严格的参数校验，确保数据的有效性和安全性。
*   **数据过滤：** 后端对接收到的数据进行过滤，去除潜在的恶意代码。
*   **异常监控**: 后端可以设置数据异常监控,当数据明显异常时,可直接告警,提醒相关人员排查问题.

#### 6. 埋点与数据分析

##### 6.1 埋点的基本概念

*   **监控类型**
    *   数据监控
    *   性能监控
    *   异常监控
*   **上报方式**
    *   手动上报
    *   可视化上报
    *   自动上报（无埋点）

##### 6.2 数据消费经验

*   **PV 和 UV**: 页面访问量和独立访客数。
*   **事件行为分析**: 通过埋点分析用户的操作习惯和行为路径。
*   **路径转换分析**: 跟踪用户完成目标的转化过程。
*   **异常值与极端行为分析**: 识别潜在问题或优化点。
*   **数据变更归因**: 分析性能优化和A/B测试结果。
*   **核心指标**: 关注每日活跃用户数，每日事件统计等指标。

#### 7. 新增字段说明

*   user 表新增了 `userAgent` 字段，用于记录用户的浏览器信息。
*   `project` 表新增 `domains` 字段，用于存储项目允许的域名白名单。
*   sdk report表增加了 `referrerUrl`，`currentUrl`, `trackId`, `timestamp`,`sign` `os`, `browser`, `screenResolution`。
*   创建项目接口，去除了 `description` 字段。
*   引入了 `trackId` 用于识别埋点项目前端的用户。
*   用户初始化不需要传递 `domain` 参数，而是返回加密的 `encryptedDomains`。
*   初始化返回 `publicKey` 用于客户端签名。
*   SDK 上报数据需要传递 `sign`和 `timestamp` 参数。
*    移除了 SDK 上报接口的 `Authorization` 头部，并采用 Cookie 管理 Session。
*   数据展示和埋点事件管理接口的 `token` 获取方式见 **3.1.2 用户登录** 接口返回的 `token`。
*   修改了 `获取每日活跃用户数` 接口为可自定义时间范围查询。
*   修改了 `获取每日事件统计` 接口为可自定义时间范围查询。
*  新增了 `创建埋点事件` 接口，支持定义事件名称和参数。
*   新增了 `删除埋点事件` 接口。

#### 8. 结语

在数字化时代，了解埋点和数据分析对于产品优化和业务决策至关重要。开发者应积极参与相关的技术学习，以提升自身的核心竞争力。

### 更新说明

1.  **数据库模型更新：** `Project` 表添加了 `domains` 字段，用于存储域名白名单。
2.  **安全性增强：**
    *   SDK 初始化时，后端下发**加密的**域名列表`encryptedDomains`，客户端解密并校验。
    *   SDK 上报数据新增签名验证，防止数据被伪造。
    *   SDK 上报数据新增时间戳验证，防止重放攻击。
    *   所有上报通过 https 协议传输。
    *   后端新增 IP 反查，防止域名伪造。
3.  **会话管理改进:**
    *    管理平台使用 `Bearer Token` 进行认证。
    *   埋点项目前端使用 Cookie 存储 `trackId` 进行用户跟踪。
4.  **SDK 上报接口修改:**
    *   SDK 上报接口移除了 `Authorization` 头部，改为传递  `trackId` 作为请求参数。
5.  **更准确的描述**: 根据新的表结构，修改了用户注册，SDK上报等接口的入参。
6.  **参数定义灵活性**:  创建事件接口中，增加了 `eventParams` 字段，支持传入参数数组，定义更加灵活.
7.  **新增字段说明**: 增加了字段说明.
8.  **细化认证方式**: 明确了用户管理，项目管理，SDK 上报，埋点事件管理接口的 `token` 的获取来源.
9.   **删除不必要的字段**: 例如删除了创建项目的 description 字段.

### 备注

*   请注意，你需要根据实际的代码实现来调整响应和请求的参数。
*   这个文档假定你使用了 `Bearer Token` 的认证方式。
*   埋点项目前端 SDK 需要生成并存储 `trackId` 到 Cookie 中，并在上报时传递该 `trackId`。
*   前端 SDK 需要实现数据签名,并传递签名到后端进行验证。
*   后端需要实现签名校验，时间戳校验，域名校验(IP 反查)等逻辑。
*    后端需要实现创建项目时，存储域名列表。
*   后续如果有新的 API 接口或者表结构变更，请及时更新文档。
