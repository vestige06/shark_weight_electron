/*
 Navicat Premium Data Transfer

 Source Server         : AWS
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 29/07/2021 16:03:59
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for WeighingRecord
-- ----------------------------
DROP TABLE IF EXISTS "WeighingRecord";
CREATE TABLE "WeighingRecord" (
  "AutoNo" INTEGER PRIMARY KEY AUTOINCREMENT,
  "Bh" VARCHAR,
  "Kh" VARCHAR,
  "Kh2" VARCHAR,
  "Kh3" VARCHAR,
  "Ch" VARCHAR,
  "Wz" VARCHAR,
  "Mz" VARCHAR,
  "Mzrq" VARCHAR,
  "Mzsby" VARCHAR,
  "Pz" VARCHAR,
  "Pzrq" VARCHAR,
  "Pzsby" VARCHAR,
  "Jz" VARCHAR,
  "Jzrq" VARCHAR,
  "Kz" VARCHAR,
  "Kl" VARCHAR,
  "Sz" VARCHAR,
  "Bz" VARCHAR,
  "ICCard" VARCHAR,
  "By1" VARCHAR,
  "By2" VARCHAR,
  "By3" VARCHAR,
  "By4" VARCHAR,
  "By5" VARCHAR,
  "WeighingTimes" INTEGER,
  "WeighingFormTemplate" VARCHAR,
  "IsFinish" BOOLEAN DEFAULT (0),
  "Valid" BOOLEAN DEFAULT (1),
  "WeightUnit" VARCHAR
);

-- ----------------------------
-- Records of WeighingRecord
-- ----------------------------
INSERT INTO "WeighingRecord" VALUES (6224, '202107150001', NULL, NULL, NULL, '蒙A25021', NULL, '0.74', '2021-07-15 15:47:03', '系统管理员', '0.68', '2021-07-15 15:46:47', '系统管理员', '0.06', '2021-07-15 15:47:03', NULL, NULL, '0.06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6225, '202107150002', NULL, NULL, NULL, '蒙A25021', NULL, '1.00', '2021-07-15 15:47:29', '系统管理员', '0.98', '2021-07-15 15:47:47', '系统管理员', '0.02', '2021-07-15 15:47:47', NULL, NULL, '0.02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6226, '202107170001', NULL, NULL, NULL, '蒙A25021', NULL, '94.28', '2021-07-17 17:39:46', '系统管理员', '94.20', '2021-07-17 17:40:09', '系统管理员', '0.08', '2021-07-17 17:40:09', NULL, NULL, '0.08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6227, '202107190001', '00', NULL, NULL, '蒙A25022', '11', '2.42', '2021-07-19 17:33:19', '系统管理员', '1.64', '2021-07-19 17:33:43', '系统管理员', '0.78', '2021-07-19 17:33:19', NULL, NULL, '0.78', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6228, '202107190002', '222', NULL, NULL, '蒙A25022', '11', '5.74', '2021-07-19 17:34:47', '系统管理员', '1.46', '2021-07-19 17:35:19', '系统管理员', '4.28', '2021-07-19 17:35:19', NULL, NULL, '4.28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6229, '202107210001', NULL, NULL, NULL, '鲁G22221', NULL, '93.74', '2021-07-21 18:06:45', '系统管理员', '63.26', '2021-07-21 14:55:41', '系统管理员', '30.48', '2021-07-21 18:06:45', NULL, NULL, '30.48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6230, '202107210002', NULL, NULL, NULL, '沪B35051', NULL, '63.06', '2021-07-21 15:01:46', '系统管理员', '63.04', '2021-07-21 15:18:07', '系统管理员', '0.02', '2021-07-21 15:18:07', NULL, NULL, '0.02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6231, '202107210003', NULL, NULL, NULL, '吉B35051', NULL, '63.32', '2021-07-21 15:22:15', '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 0, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6232, '202107210004', NULL, NULL, NULL, '沪B35051', NULL, '63.38', '2021-07-21 15:22:30', '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 0, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6233, '202107260001', NULL, NULL, NULL, '0100', NULL, '0.12', '2021-07-26 16:55:20', '系统管理员', NULL, '2021-07-26 16:55:20', '系统管理员', '0.12', '2021-07-26 16:55:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6234, '202107260002', NULL, NULL, NULL, '454', NULL, '0.12', '2021-07-26 16:55:45', '系统管理员', NULL, '2021-07-26 16:55:45', '系统管理员', '0.12', '2021-07-26 16:55:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6235, '202107260003', NULL, NULL, NULL, '4545433', NULL, '0.12', '2021-07-26 16:56:19', '系统管理员', NULL, '2021-07-26 16:56:19', '系统管理员', '0.12', '2021-07-26 16:56:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6236, '202107260004', NULL, NULL, NULL, '45454', NULL, '0.12', '2021-07-26 16:56:58', '系统管理员', NULL, '2021-07-26 16:56:58', '系统管理员', '0.12', '2021-07-26 16:56:58', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6237, '202107260005', NULL, NULL, NULL, '蒙A25021', NULL, '1.34', '2021-07-26 16:57:13', '系统管理员', NULL, '2021-07-26 16:57:13', '系统管理员', '1.34', '2021-07-26 16:57:13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6238, '202107260006', NULL, NULL, NULL, '京A0006警', NULL, '92.90', '2021-07-26 17:00:33', '系统管理员', NULL, '2021-07-26 17:00:33', '系统管理员', '92.90', '2021-07-26 17:00:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6239, '202107260007', NULL, NULL, NULL, '沪AD12345', NULL, '92.58', '2021-07-26 17:01:02', '系统管理员', NULL, '2021-07-26 17:01:02', '系统管理员', '92.58', '2021-07-26 17:01:02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6240, '202107260008', NULL, NULL, NULL, '蒙A25021', NULL, '92.94', '2021-07-26 17:03:36', '系统管理员', NULL, '2021-07-26 17:03:36', '系统管理员', '92.94', '2021-07-26 17:03:36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6241, '202107260009', NULL, NULL, NULL, '蒙A25021', NULL, '93.02', '2021-07-26 17:04:22', '系统管理员', NULL, '2021-07-26 17:04:22', '系统管理员', '93.02', '2021-07-26 17:04:22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6242, '202107260010', NULL, NULL, NULL, '蒙A25021', NULL, '60.38', '2021-07-26 17:04:45', '系统管理员', NULL, '2021-07-26 17:04:45', '系统管理员', '60.38', '2021-07-26 17:04:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6243, '202107260011', NULL, NULL, NULL, '蒙A25021', NULL, '62.22', '2021-07-26 17:05:08', '系统管理员', NULL, '2021-07-26 17:05:08', '系统管理员', '62.22', '2021-07-26 17:05:08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6244, '202107260012', NULL, NULL, NULL, '蒙A25021', NULL, '63.82', '2021-07-26 17:05:46', '系统管理员', NULL, '2021-07-26 17:05:46', '系统管理员', '63.82', '2021-07-26 17:05:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6245, '202107260013', NULL, NULL, NULL, '蒙A25021', NULL, '1.54', '2021-07-26 17:20:30', '系统管理员', NULL, '2021-07-26 17:20:30', '系统管理员', '1.54', '2021-07-26 17:20:30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6246, '202107260014', NULL, NULL, NULL, '蒙A25021', NULL, '2.06', '2021-07-26 17:29:33', '系统管理员', NULL, '2021-07-26 17:29:33', '系统管理员', '2.06', '2021-07-26 17:29:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 1, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6247, '202107260015', NULL, NULL, NULL, '蒙A25021', NULL, '1.06', '2021-07-26 17:32:01', '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 0, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6248, '202107260016', NULL, NULL, NULL, '蒙A25022', NULL, '1.20', '2021-07-26 17:36:53', '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 0, 1, 'kg');
INSERT INTO "WeighingRecord" VALUES (6249, '202107260017', NULL, NULL, NULL, '鲁G22221', NULL, '2.20', '2021-07-26 17:37:00', '系统管理员', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '1', 0, 1, 'kg');

-- ----------------------------
-- Auto increment value for WeighingRecord
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 6250 WHERE name = 'WeighingRecord';

PRAGMA foreign_keys = true;
