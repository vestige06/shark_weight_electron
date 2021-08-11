/*
 Navicat Premium Data Transfer

 Source Server         : AWS
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 22/07/2021 17:10:40
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for Settings
-- ----------------------------
DROP TABLE IF EXISTS "Settings";
CREATE TABLE "Settings" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "key" TEXT,
  "value" TEXT,
  "name" TEXT,
  "isReadOnly" TEXT,
  "type" TEXT
);

-- ----------------------------
-- Records of Settings
-- ----------------------------
INSERT INTO "Settings" VALUES (1, 'isWeighingCompletedPrinted', '1', '称重完成后打印', '0', '打印设置');
INSERT INTO "Settings" VALUES (2, 'printWay', '2', '1.直接打印 2. 先预览再打印', '0', '打印设置');
INSERT INTO "Settings" VALUES (3, 'printDevice', 'Microsoft XPS Document Writer', '打印机设备', '0', '打印设置');
INSERT INTO "Settings" VALUES (4, 'printWidth', NULL, '打印宽度', '0', '打印设置');
INSERT INTO "Settings" VALUES (5, 'printHeight', NULL, '打印高度', '0', '打印设置');
INSERT INTO "Settings" VALUES (6, 'tare', '{"type":"2","content1":"234","content2":"333"}', '扣重 1.按kg 扣 2. 按扣率扣% json {type:1,content:''22kg''}', '0', '扣重扣率');
INSERT INTO "Settings" VALUES (7, 'weighingMode', '2', '称重模式 1. 一次称重 2. 二次称重', '0', '称重模式');
INSERT INTO "Settings" VALUES (8, 'isAutoWeighing', '2', '1. 自动称重 2 手动称重', '0', '称重控制');
INSERT INTO "Settings" VALUES (9, 'isOnDesktopReadCard', '{"type":"1","content":"COM2"}', '启用桌面读卡器 json {type:1,content:[]}  type:0 标识禁用', '0', '称重控制');
INSERT INTO "Settings" VALUES (10, 'isOnQrScan', '{"type":"1","content":"COM1"}', '启用二维码读卡器 json {type:1,content:[]} type:0 标识禁用', '0', '称重控制');
INSERT INTO "Settings" VALUES (11, 'weighingRelayTime', '3', '稳定延时', '0', '称重控制');
INSERT INTO "Settings" VALUES (12, 'minWeight', '50', '最小称重重量', '0', '称重控制');
INSERT INTO "Settings" VALUES (13, 'plateRecognizeWay', '{"type":"0","content":{}}', '0 不启用 1 远距离射频卡 2 车牌识别相机 json {type:2,content:{}}', '0', '车牌识别');
INSERT INTO "Settings" VALUES (14, 'barrierWay', '0', '0 无道闸 1 单向道闸(先上秤) 2 双向道闸', '0', '道闸控制');
INSERT INTO "Settings" VALUES (15, 'isMonitorCamera', '1', '启用监控摄像头 0 不启用 1 启用', '0', '视频抓拍');
INSERT INTO "Settings" VALUES (16, 'isWeighingDataSync', '1', '启用称重数据上传 0 不启用 1 启用', '0', '数据同步');
INSERT INTO "Settings" VALUES (17, 'isCarScreen', '{"type":"1"}', '启用汽车衡大屏幕 json {type:1,content{}}', '0', '室外大屏');
INSERT INTO "Settings" VALUES (18, 'isDaemonScreen', '1', '启用无人值守大屏幕 0 不启用 1 启用', '0', '室外大屏');
INSERT INTO "Settings" VALUES (19, 'volumn', '33', '声量 0~100 数值', '0', '语音设置');
INSERT INTO "Settings" VALUES (20, 'isWhenRecognizePlate', '{"type":"1","content":"1"}', '识别到车牌时 json {type:1,content:""}', '0', '语音设置');
INSERT INTO "Settings" VALUES (21, 'isWhenWeighingStable', '{"type":"1","content":"2"}', '重量稳定时 json {type:1,content:""}', '0', '语音设置');
INSERT INTO "Settings" VALUES (22, 'isWhenFirstWeighingFinished', '{"type":"1","content":"3"}', '第一次称重完成时 json {type:1,content:""}', '0', '语音设置');
INSERT INTO "Settings" VALUES (23, 'isWhenOnDaemonScreen', '{"type":"1","content":"4"}', '启用无人值守大屏幕 json {type:1,content:""}', '0', '语音设置');
INSERT INTO "Settings" VALUES (24, 'WarningWeighingWay', '0', '超载报警方式 0 不启用 1 毛重报警 2 净重报警', '0', '超载报警');
INSERT INTO "Settings" VALUES (25, 'WarningWeight', '112222', '报警重量', '0', '超载报警');
INSERT INTO "Settings" VALUES (26, 'WarningWeightMessage', '222', '报警重量 提示', '0', '超载报警');
INSERT INTO "Settings" VALUES (27, 'poundSheetDisplayWay', '0', '界面磅单显示方式 1. 直接预览 0.列表显示', '0', '磅单设置');

-- ----------------------------
-- Auto increment value for Settings
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 27 WHERE name = 'Settings';

PRAGMA foreign_keys = true;
