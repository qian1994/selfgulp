>  本项目是基于GULP实现前后端模版


### 项目技术架构
***
*  gulp
*  gulp-bro
*  gulp-less
*  babelify
*  gulp-minify-css
*  gulp-minify-html
*  gulp-watch
*  gulp-file-include
*  gulp-imagemin
*  gulp-clean
*  browser-sync
***


### 安装


通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install

```

启动服务(http://localhost:3000)


```
npm run dev
```

### 目录结构

<pre>
├── dist               // 最终生产的代码
├── package.json       // 项目配置文件
├── gulpfile.js        // gulp配置文件
├── src                // 生产目录
│   ├── img            // 图片资源
│   ├── css            // css 资源
│   ├── js             // js 资源
│   ├── html           //  页面 
</pre>

### 实现的功能

* 图片压缩
* 支持es6
* 支持html include
* 支持less
* 浏览器实时刷新
* 等等

### 注意事项
*本方案是最终生产的代码支持ie8 支持es6


###左侧tab栏对应的模块的文件名
* 首    页-----index
         首页-----index
* 客户管理-----customerManagement
         客户详情-----customerDetails
         客户联系人---customerLinker
         客户池-------customerPool
         新增客户跟进记录--followUpRecord
         客户---------index
         联系人详情-----linkerDetails
         新建客户-----newCustomer
         新建联系人-----newLinker
* 商机管理-----opportunityManagement
         商机详情-----businessDetails
         商机报备表---businessReport
         新增商机跟进记录--followUpRecord
         商机---------index
         新建商机-----newOpportunities
* 合资公司-----jointVenture
         合资公司详情---------details
         新增合资公司跟进记录--followUpRecord
         合资公司------------index
         新建合资公司---------newJointVenture
* 跟进记录-----followRecords
         跟进记录---------index
* 招标管理-----tenderManagement
         招标管理首页------index
         招标详情  ------- details
* 战略合作-----strategicCooperation
         战略合作-----index
         新增战略合作--newStrategicCooperation
         新增战略合作跟进--followUpRecord
* 系统管理-----systemManagement
         用户管理-----index
         增加角色-----increaseRole
         增加团队-----addTeam
         增加字典-----addDictionary
* 个人中心-----personalCenter
         商机审核--------businessReview
         我的招标--------myTender
         我的日报--------index
         我的周报--------myWeekly
         独立纵队周报-----separateColumns
         合资公司周报-----jointVentureWeekly
         新增日报---------newAddDaily
         日报详情---------dailyDetails
         人力资源周报-----humanResources

#公共css样式说明
         reset---------重置样式
         common--------公共样式：包含头部样式，头部导航样式，左侧导航的样式，弹出层的样式，系统管理的四个页面tab汇总
         commonComponent------公共样式：包含每个首页的main顶部样式，和下方table样式，另加一些弹出层（禁用，合并，转移）
         commonDetails--------详情页面的公共部分
         commonNew------------新建的公共部分（除了商机新建是单独的）






