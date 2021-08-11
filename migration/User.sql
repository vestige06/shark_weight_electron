/*
 Navicat Premium Data Transfer

 Source Server         : AWS
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 29/07/2021 15:56:06
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
  "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "UserName" VARCHAR NOT NULL,
  "UserRole" VARCHAR,
  "LoginId" VARCHAR NOT NULL,
  "LoginPwd" VARCHAR,
  "Valid" BOOLEAN DEFAULT (1),
  "isLogging" BOOLEAN,
  FOREIGN KEY ("UserRole") REFERENCES "Role" ("RoleName") ON DELETE NO ACTION ON UPDATE CASCADE,
  UNIQUE ("UserId" ASC),
  UNIQUE ("LoginId" ASC)
);

-- ----------------------------
-- Auto increment value for User
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 1 WHERE name = 'User';

PRAGMA foreign_keys = true;
