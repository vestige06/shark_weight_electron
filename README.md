# 轻量化智能称重系统
## 【功能介绍】
1. 满足百分之八十以上的轻量化称重需求 
2. 一款基于车牌自动识别和远距离刷卡硬件开发的称重系统
3. 可实现有人值守和无人值守, 可控制道闸, 光栅, 红绿灯,自动抓拍车辆过磅照片, 支持主流称重仪表
4. 自动称重完成打印自定义磅单
5. 软件安装简单, 所对接的硬件可满足百分之八十以上的需求
6. 软件基于typescript react nodejs electron 实现, 可跨平台部署到Mac Windows 和 不同 Linux 桌面的操作系统
7. 嵌入式数据库sqlite3 无服务安装, 告别配置数据库的繁琐过程,开箱即用, 开发导向轻量化为主

## 【技术架构】
1. 技术栈 html5 + css + javascript + react+ nodejs + sqlite3 + luckysheet

## 【开源情况】
1. 代码完全开源，不存在授权问题，完全自主原创，不存在任何后门，性能和安全完全自主可控，想怎么耍就这么耍，就是这么任性，后续更新的话本人会持续更新部署教程。代码专业规范，新手看得懂，高手喜欢用。本系统完全免费

## 【关于作者】
* 作者 ves
* 邮箱 58036050@qq.com

## 【硬件部署指引】
* 请参见 称重系统清单白皮书.pdf 
## 【安装教程】
* 安装第三方依赖和编译串口库
```
    npm install or yarn install

    npm run rebuild
```
* 启用渲染主逻辑
```
    npm run start
```
* 启用electron 
```
    npm run estart
```

* 这样程序基本就可以跑起来了, 数据库路径配置在 src/model/* 配好数据文件路径即可


* 本软件会持续维护更新, 由于是第一版, 还有许多不合理的需要优化和改善, 如有建议和进一步交流, 请联系我们。 感谢您的参与 和 贡献


# 售后微信号 18565665465