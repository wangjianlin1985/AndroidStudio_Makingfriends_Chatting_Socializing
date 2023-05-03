/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50620
 Source Host           : localhost:3306
 Source Schema         : weiboinfoluntanfriendkebiao_ssm2

 Target Server Type    : MySQL
 Target Server Version : 50620
 File Encoding         : 65001

 Date: 05/05/2021 16:03:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for wct_bill
-- ----------------------------
DROP TABLE IF EXISTS `wct_bill`;
CREATE TABLE `wct_bill`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gids` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `shop` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bill` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `total` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `way` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gnames` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statecn` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cuidan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qid` int(11) NULL DEFAULT NULL,
  `qusername` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qtel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for wct_blog
-- ----------------------------
DROP TABLE IF EXISTS `wct_blog`;
CREATE TABLE `wct_blog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `btype` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `typeid` int(11) NULL DEFAULT NULL,
  `typecn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` int(11) NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `favcount` int(11) NULL DEFAULT NULL,
  `zan` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nm` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_blog
-- ----------------------------
INSERT INTO `wct_blog` VALUES (48, '测试会议通知', '<p><span style=\"font-weight: bold;\">这里是详细的会议通知的详细内容 这里是详细的会议通知的详细内容&nbsp;</span></p>', '2021-04-16 14:34:54', '1', 'ce7b31f3-b2e2-4790-93fa-8681f0e9c814.jpg', '', 71, '会议通知', 1, 'admin', NULL, NULL, '', NULL);
INSERT INTO `wct_blog` VALUES (49, '期中监考通知', '<p><span style=\"font-weight: bold;\">这里自己编辑通知内容</span></p><p><span style=\"font-weight: bold;\">这里是一个编辑器,自己可以任意编辑的,上传文件视频都是可以的</span></p><p><img src=\"upload/e013f8f3-16e6-443b-b379-1ec3f9239ac2.jpg\" style=\"max-width:100%;\"><span style=\"font-weight: bold;\"><br></span></p>', '2021-04-16 14:50:57', '1', 'ff84925d-8dff-4216-8303-2898538ce1b0.jpg', '', 69, '监考通知', 1, 'admin', 2, NULL, '', NULL);

-- ----------------------------
-- Table structure for wct_choose
-- ----------------------------
DROP TABLE IF EXISTS `wct_choose`;
CREATE TABLE `wct_choose`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `daan` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `opa` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `opb` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `opc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `opd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fenxi` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `typeid` int(11) NULL DEFAULT NULL,
  `img` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `leixing` int(11) NULL DEFAULT NULL,
  `rc` int(11) NULL DEFAULT NULL,
  `wc` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for wct_daka
-- ----------------------------
DROP TABLE IF EXISTS `wct_daka`;
CREATE TABLE `wct_daka`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for wct_hobby
-- ----------------------------
DROP TABLE IF EXISTS `wct_hobby`;
CREATE TABLE `wct_hobby`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_hobby
-- ----------------------------
INSERT INTO `wct_hobby` VALUES (7, '运动');
INSERT INTO `wct_hobby` VALUES (8, '阅读');
INSERT INTO `wct_hobby` VALUES (9, '音乐');

-- ----------------------------
-- Table structure for wct_hobbysub
-- ----------------------------
DROP TABLE IF EXISTS `wct_hobbysub`;
CREATE TABLE `wct_hobbysub`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hobbyid` int(11) NULL DEFAULT NULL,
  `hobbyname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_hobbysub
-- ----------------------------
INSERT INTO `wct_hobbysub` VALUES (4, '篮球', 7, '\n\n                运动');
INSERT INTO `wct_hobbysub` VALUES (5, '足球', 7, '\n\n                运动');
INSERT INTO `wct_hobbysub` VALUES (6, '排球', 7, '\n\n                运动');
INSERT INTO `wct_hobbysub` VALUES (7, '羽毛球', 7, '\n\n                运动');
INSERT INTO `wct_hobbysub` VALUES (8, '跑步', 7, '\n\n                运动');
INSERT INTO `wct_hobbysub` VALUES (9, '军事类', 8, '\n\n                阅读');
INSERT INTO `wct_hobbysub` VALUES (10, '网文类', 8, '\n\n                阅读');
INSERT INTO `wct_hobbysub` VALUES (11, '国外文学', 8, '\n\n                阅读');
INSERT INTO `wct_hobbysub` VALUES (12, '古典', 9, '\n\n                音乐');
INSERT INTO `wct_hobbysub` VALUES (13, '流行', 9, '\n\n                音乐');
INSERT INTO `wct_hobbysub` VALUES (14, 'DJ', 9, '\n\n                音乐');
INSERT INTO `wct_hobbysub` VALUES (15, '蓝调', 9, '\n\n                音乐');

-- ----------------------------
-- Table structure for wct_hobbysub_search
-- ----------------------------
DROP TABLE IF EXISTS `wct_hobbysub_search`;
CREATE TABLE `wct_hobbysub_search`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `hobbysubid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_hobbysub_search
-- ----------------------------
INSERT INTO `wct_hobbysub_search` VALUES (1, 38, 12);
INSERT INTO `wct_hobbysub_search` VALUES (2, 38, 13);
INSERT INTO `wct_hobbysub_search` VALUES (3, 38, 12);
INSERT INTO `wct_hobbysub_search` VALUES (4, 38, 12);
INSERT INTO `wct_hobbysub_search` VALUES (5, 38, 13);
INSERT INTO `wct_hobbysub_search` VALUES (6, 38, 12);
INSERT INTO `wct_hobbysub_search` VALUES (7, 38, 13);
INSERT INTO `wct_hobbysub_search` VALUES (8, 38, 14);
INSERT INTO `wct_hobbysub_search` VALUES (9, 38, 12);
INSERT INTO `wct_hobbysub_search` VALUES (10, 38, 12);
INSERT INTO `wct_hobbysub_search` VALUES (11, 38, 13);
INSERT INTO `wct_hobbysub_search` VALUES (12, 38, 14);
INSERT INTO `wct_hobbysub_search` VALUES (13, 38, 13);
INSERT INTO `wct_hobbysub_search` VALUES (14, 38, 13);
INSERT INTO `wct_hobbysub_search` VALUES (15, 39, 12);
INSERT INTO `wct_hobbysub_search` VALUES (16, 39, 13);
INSERT INTO `wct_hobbysub_search` VALUES (17, 39, 14);
INSERT INTO `wct_hobbysub_search` VALUES (18, 39, 12);
INSERT INTO `wct_hobbysub_search` VALUES (19, 39, 13);
INSERT INTO `wct_hobbysub_search` VALUES (20, 39, 14);
INSERT INTO `wct_hobbysub_search` VALUES (21, 39, 15);
INSERT INTO `wct_hobbysub_search` VALUES (22, 39, 4);
INSERT INTO `wct_hobbysub_search` VALUES (23, 39, 5);

-- ----------------------------
-- Table structure for wct_message
-- ----------------------------
DROP TABLE IF EXISTS `wct_message`;
CREATE TABLE `wct_message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NULL DEFAULT NULL,
  `fid` int(11) NULL DEFAULT NULL,
  `qid` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `zan` int(11) NULL DEFAULT 0,
  `note` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fusername` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `attach` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `attachname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_message
-- ----------------------------
INSERT INTO `wct_message` VALUES (9, 43, 38, NULL, 1, NULL, '这里可以聊天', '2021-04-16 14:49:30', '小风老师', '小新老师', '', '', 'fc7d8db7-521a-4e2c-a100-3dd9f5307c9c.jpg');
INSERT INTO `wct_message` VALUES (10, 43, 38, NULL, 1, NULL, '呵呵呵', '2021-04-16 14:49:32', '小风老师', '小新老师', '', '', 'fc7d8db7-521a-4e2c-a100-3dd9f5307c9c.jpg');
INSERT INTO `wct_message` VALUES (11, 43, 38, NULL, 3, NULL, '', '2021-04-16 14:49:44', '小风老师', '小新老师', 'e429bc7e-fc33-4a1c-9cd8-6fd5486624ef.jpg', '', 'fc7d8db7-521a-4e2c-a100-3dd9f5307c9c.jpg');
INSERT INTO `wct_message` VALUES (12, 38, 43, NULL, 1, NULL, '阿萨德发送地方', '2021-04-16 14:50:24', '小新老师', '小风老师', '', '', '3cae1547-3447-48eb-9ae6-4571e68f9ace.jpg');

-- ----------------------------
-- Table structure for wct_notice
-- ----------------------------
DROP TABLE IF EXISTS `wct_notice`;
CREATE TABLE `wct_notice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jnote` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pf` int(11) NULL DEFAULT NULL,
  `typeid` int(11) NULL DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` int(11) NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_notice
-- ----------------------------
INSERT INTO `wct_notice` VALUES (43, '测试资讯新闻', '<p>这里是详细的资讯新闻的性详细内容</p><p><img src=\"upload/d94fb2de-a7e0-48a4-bfa8-e954914ae53c.jpg\" style=\"max-width:100%;\"><br></p><p><br></p>', '2021-04-16 14:35:30', '', 'b9fd9f93-9649-48dd-b55d-9fa58923493b.jpg', '', NULL, NULL, '', NULL, '');

-- ----------------------------
-- Table structure for wct_posts
-- ----------------------------
DROP TABLE IF EXISTS `wct_posts`;
CREATE TABLE `wct_posts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note2` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statecn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_posts
-- ----------------------------
INSERT INTO `wct_posts` VALUES (1, '测试讨论', '这里是要交流讨论信息', '', '39', '小美老师', '2021-04-16 14:41:21', '', '交流', '');
INSERT INTO `wct_posts` VALUES (2, '可以发帖相互讨论', '阿斯顿发送到发的阿萨德阿萨德发送到发送到发斯蒂芬阿斯顿发送到', '', '43', '小风老师', '2021-04-16 14:49:20', '', '交流', '');

-- ----------------------------
-- Table structure for wct_replay
-- ----------------------------
DROP TABLE IF EXISTS `wct_replay`;
CREATE TABLE `wct_replay`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `ttype` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `hot` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_replay
-- ----------------------------
INSERT INTO `wct_replay` VALUES (50, '1', '回复交流讨论', '', '', '2021-04-16 14:46:14', NULL, '', NULL);
INSERT INTO `wct_replay` VALUES (51, '49', '下面可以评论', '39', '小美老师', '2021-04-16 14:48:37', 1, '', 0);
INSERT INTO `wct_replay` VALUES (52, '1', '交流讨论', '43', '小风老师', '2021-04-16 14:49:06', 2, '', 0);

-- ----------------------------
-- Table structure for wct_tiaokuan
-- ----------------------------
DROP TABLE IF EXISTS `wct_tiaokuan`;
CREATE TABLE `wct_tiaokuan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `note` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ndate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jnote` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `typeid` int(11) NULL DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for wct_type
-- ----------------------------
DROP TABLE IF EXISTS `wct_type`;
CREATE TABLE `wct_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pid` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_type
-- ----------------------------
INSERT INTO `wct_type` VALUES (69, '监考通知', '');
INSERT INTO `wct_type` VALUES (70, '课程通知', '');
INSERT INTO `wct_type` VALUES (71, '会议通知', '');
INSERT INTO `wct_type` VALUES (72, '其他', '');

-- ----------------------------
-- Table structure for wct_user
-- ----------------------------
DROP TABLE IF EXISTS `wct_user`;
CREATE TABLE `wct_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `passwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roletype` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qq` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wechat` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birth` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sid` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tags` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fids` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `statecn` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `favs` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `qd` int(11) NULL DEFAULT NULL,
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fs` int(11) NULL DEFAULT NULL,
  `money` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_user
-- ----------------------------
INSERT INTO `wct_user` VALUES (1, 'admin', 'admin', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '19,20,18', NULL, NULL, NULL, NULL);
INSERT INTO `wct_user` VALUES (38, '小新老师', '111111', '2', '', '15123385885', '', '', '男', '', '3cae1547-3447-48eb-9ae6-4571e68f9ace.jpg', '', '重庆', '', '39,42,43,49', '', '18,20,23,22,28,33,31,41,49', 900, '美丽的少年', 3, 200);
INSERT INTO `wct_user` VALUES (39, '小美老师', '111111', '2', '', '15123385885', '', '', '男', '', '57dd6cc9-a8bd-4dc2-8cbf-5761d1c92d6c.jpg', '', '6-12', '', '38', '', '19,21,17,24,33,38,49', 1899, '时尚美女', NULL, NULL);
INSERT INTO `wct_user` VALUES (42, '小李老师', '111111', '2', '', '15123385885', '', '', '男', '', '5f7c1610-e0c6-433a-ac9a-34f56edcd8f5.jpg', '', '6-123', '', '38', '', '38', NULL, '爱旅游的vomen', NULL, NULL);
INSERT INTO `wct_user` VALUES (43, '小风老师', '111111', '2', '', '16123393931', '', '', '男', '', 'fc7d8db7-521a-4e2c-a100-3dd9f5307c9c.jpg', '', '6-230', '', '38', '', '45', NULL, '风一样的美男子', NULL, NULL);
INSERT INTO `wct_user` VALUES (49, '小王', '111111', '2', '', '13222334455', '', '', '男', '', '3cae1547-3447-48eb-9ae6-4571e68f9ace.jpg', '', '', '', '38', '', '', NULL, '', 1, NULL);
INSERT INTO `wct_user` VALUES (50, '小刘', '111111', '2', '', '13213231234', '', '', '男', '', '3cae1547-3447-48eb-9ae6-4571e68f9ace.jpg', '', '', '', '', '', '', NULL, '', NULL, NULL);

-- ----------------------------
-- Table structure for wct_user_hobbysub
-- ----------------------------
DROP TABLE IF EXISTS `wct_user_hobbysub`;
CREATE TABLE `wct_user_hobbysub`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `hobbysubid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of wct_user_hobbysub
-- ----------------------------
INSERT INTO `wct_user_hobbysub` VALUES (1, 48, 1);
INSERT INTO `wct_user_hobbysub` VALUES (4, 50, 13);
INSERT INTO `wct_user_hobbysub` VALUES (5, 50, 14);
INSERT INTO `wct_user_hobbysub` VALUES (6, 48, 10);
INSERT INTO `wct_user_hobbysub` VALUES (7, 48, 11);
INSERT INTO `wct_user_hobbysub` VALUES (13, 38, 4);
INSERT INTO `wct_user_hobbysub` VALUES (14, 38, 5);
INSERT INTO `wct_user_hobbysub` VALUES (15, 38, 10);

SET FOREIGN_KEY_CHECKS = 1;
