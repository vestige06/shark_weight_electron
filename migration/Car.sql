/*
 Navicat Premium Data Transfer

 Source Server         : AWS
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 29/07/2021 16:04:09
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for Car
-- ----------------------------
DROP TABLE IF EXISTS "Car";
CREATE TABLE "Car" (
  "AutoNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "PlateNo" VARCHAR NOT NULL,
  "VehicleWeight" VARCHAR,
  "CarOwner" INTEGER,
  "Comment" VARCHAR,
  "Valid" BOOLEAN DEFAULT (1),
  "WeightUnit" VARCHAR,
  FOREIGN KEY ("CarOwner") REFERENCES "Customer" ("Id") ON DELETE NO ACTION ON UPDATE CASCADE,
  UNIQUE ("AutoNo" ASC),
  UNIQUE ("PlateNo" ASC)
);

-- ----------------------------
-- Records of Car
-- ----------------------------
INSERT INTO "Car" VALUES (1, '蒙A25021', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (2, '蒙A25022', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (3, '鲁G22221', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (4, '沪B35051', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (5, '吉B35051', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (6, '0100', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (7, '454', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (8, '4545433', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (9, '45454', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (10, '京A0006警', NULL, NULL, NULL, 1, 'kg');
INSERT INTO "Car" VALUES (11, '沪AD12345', NULL, NULL, NULL, 1, 'kg');

-- ----------------------------
-- Auto increment value for Car
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 11 WHERE name = 'Car';

PRAGMA foreign_keys = true;
