/*
 Navicat MySQL Data Transfer

 Source Server         : li
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 27/12/2022 10:52:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` (`id`, `username`, `password`) VALUES (1, 'lihao', '521129');
COMMIT;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `article_id` bigint NOT NULL AUTO_INCREMENT COMMENT '博文ID',
  `user_id` bigint NOT NULL COMMENT '发表用户ID',
  `article_title` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '博文标题',
  `article_content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '博文内容',
  `article_views` bigint NOT NULL COMMENT '浏览量',
  `article_comment_count` bigint NOT NULL COMMENT '评论总数',
  `article_date` datetime DEFAULT NULL COMMENT '发表时间',
  `article_like_count` bigint NOT NULL,
  PRIMARY KEY (`article_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of articles
-- ----------------------------
BEGIN;
INSERT INTO `articles` (`article_id`, `user_id`, `article_title`, `article_content`, `article_views`, `article_comment_count`, `article_date`, `article_like_count`) VALUES (1, 521, 'Vue揭秘-render', '# render\nVue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node。它的定义在 src/core/instance/render.js 文件中：\n```javascript\nVue.prototype._render = function (): VNode {\n  const vm: Component = this\n  const { render, _parentVnode } = vm.$options\n\n  // reset _rendered flag on slots for duplicate slot check\n  if (process.env.NODE_ENV !== \'production\') {\n    for (const key in vm.$slots) {\n      // $flow-disable-line\n      vm.$slots[key]._rendered = false\n    }\n  }\n\n  if (_parentVnode) {\n    vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject\n  }\n\n  // set parent vnode. this allows render functions to have access\n  // to the data on the placeholder node.\n  vm.$vnode = _parentVnode\n  // render self\n  let vnode\n  try {\n    vnode = render.call(vm._renderProxy, vm.$createElement)\n  } catch (e) {\n    handleError(e, vm, `render`)\n    // return error render result,\n    // or previous vnode to prevent render error causing blank component\n    /* istanbul ignore else */\n    if (process.env.NODE_ENV !== \'production\') {\n      if (vm.$options.renderError) {\n        try {\n          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)\n        } catch (e) {\n          handleError(e, vm, `renderError`)\n          vnode = vm._vnode\n        }\n      } else {\n        vnode = vm._vnode\n      }\n    } else {\n      vnode = vm._vnode\n    }\n  }\n  // return empty vnode in case the render function errored out\n  if (!(vnode instanceof VNode)) {\n    if (process.env.NODE_ENV !== \'production\' && Array.isArray(vnode)) {\n      warn(\n        \'Multiple root nodes returned from render function. Render function \' +\n        \'should return a single root node.\',\n        vm\n      )\n    }\n    vnode = createEmptyVNode()\n  }\n  // set parent\n  vnode.parent = _parentVnode\n  return vnode\n}\n```\n这段代码最关键的是 render 方法的调用，我们在平时的开发工作中手写 render 方法的场景比较少，而写的比较多的是 template 模板，在之前的 mounted 方法的实现中，会把 template 编译成 render 方法，但这个编译过程是非常复杂的，我们不打算在这里展开讲，之后会专门花一个章节来分析 Vue 的编译过程。\n\n在 Vue 的官方文档中介绍了 render 函数的第一个参数是 createElement，那么结合之前的例子：\n```javascript\n<div id=\"app\">\n  {{ message }}\n</div>\n```\n相当于我们编写如下render函数：\n```javascript\nrender: function (createElement) {\n  return createElement(\'div\', {\n     attrs: {\n        id: \'app\'\n      },\n  }, this.message)\n}\n```\n再回到 _render 函数中的 render 方法的调用：\n```javascript\nvnode = render.call(vm._renderProxy, vm.$createElement)\n```\n可以看到，render 函数中的 createElement 方法就是 vm.$createElement 方法：\n```javascript\nexport function initRender (vm: Component) {\n  // ...\n  // bind the createElement fn to this instance\n  // so that we get proper render context inside it.\n  // args order: tag, data, children, normalizationType, alwaysNormalize\n  // internal version is used by render functions compiled from templates\n  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)\n  // normalization is always applied for the public version, used in\n  // user-written render functions.\n  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)\n}\n```\n实际上，vm.$createElement 方法定义是在执行 initRender 方法的时候，可以看到除了 vm.$createElement 方法，还有一个 vm._c 方法，它是被模板编译成的 render 函数使用，而 vm.$createElement 是用户手写 render 方法使用的， 这俩个方法支持的参数相同，并且内部都调用了 createElement 方法。\n\n# 总结\nvm._render 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node。Vue 2.0 相比 Vue 1.0 最大的升级就是利用了 Virtual DOM。因此在分析 createElement 的实现前，我们先了解一下 Virtual DOM 的概念。', 999, 666, '2022-12-26 15:08:45', 666);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `category_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '分类名称',
  `category_alias` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '分类别名',
  `category_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci COMMENT '分类描述',
  `parent_category_id` bigint DEFAULT NULL COMMENT '父分类ID',
  PRIMARY KEY (`category_id`) USING BTREE,
  KEY `sort_name` (`category_name`) USING BTREE,
  KEY `sort_alias` (`category_alias`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` (`category_id`, `category_name`, `category_alias`, `category_description`, `parent_category_id`) VALUES (1, 'Vue', '别名', '这是Vue', 2);
INSERT INTO `category` (`category_id`, `category_name`, `category_alias`, `category_description`, `parent_category_id`) VALUES (2, 'react', NULL, '这是react', NULL);
INSERT INTO `category` (`category_id`, `category_name`, `category_alias`, `category_description`, `parent_category_id`) VALUES (3, 'Css', NULL, '这是Css', NULL);
INSERT INTO `category` (`category_id`, `category_name`, `category_alias`, `category_description`, `parent_category_id`) VALUES (4, 'HTML', NULL, '这是HTML', NULL);
COMMIT;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `user_id` bigint NOT NULL COMMENT '发表用户ID',
  `article_id` bigint NOT NULL COMMENT '评论博文ID',
  `comment_like_count` bigint NOT NULL COMMENT '点赞数',
  `comment_date` datetime DEFAULT NULL COMMENT '评论日期',
  `comment_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '评论内容',
  `parent_comment_id` bigint NOT NULL COMMENT '父评论ID',
  PRIMARY KEY (`comment_id`) USING BTREE,
  KEY `article_id` (`article_id`) USING BTREE,
  KEY `comment_date` (`comment_date`) USING BTREE,
  KEY `parent_comment_id` (`parent_comment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for labels
-- ----------------------------
DROP TABLE IF EXISTS `labels`;
CREATE TABLE `labels` (
  `label_id` bigint NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `label_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '标签名称',
  `label_alias` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '标签别名',
  `label_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '标签描述',
  PRIMARY KEY (`label_id`) USING BTREE,
  KEY `label_name` (`label_name`) USING BTREE,
  KEY `label_alias` (`label_alias`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of labels
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for set_artitle_category
-- ----------------------------
DROP TABLE IF EXISTS `set_artitle_category`;
CREATE TABLE `set_artitle_category` (
  `article_id` bigint NOT NULL COMMENT '文章ID',
  `category_id` bigint NOT NULL COMMENT '分类ID',
  PRIMARY KEY (`article_id`,`category_id`) USING BTREE,
  KEY `sort_id` (`category_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of set_artitle_category
-- ----------------------------
BEGIN;
INSERT INTO `set_artitle_category` (`article_id`, `category_id`) VALUES (1, 1);
COMMIT;

-- ----------------------------
-- Table structure for set_artitle_label
-- ----------------------------
DROP TABLE IF EXISTS `set_artitle_label`;
CREATE TABLE `set_artitle_label` (
  `article_id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `label_id` bigint NOT NULL,
  PRIMARY KEY (`article_id`) USING BTREE,
  KEY `label_id` (`label_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of set_artitle_label
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user_friends
-- ----------------------------
DROP TABLE IF EXISTS `user_friends`;
CREATE TABLE `user_friends` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '标识ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `user_friends_id` bigint NOT NULL COMMENT '好友ID',
  `user_note` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '好友备注',
  `user_status` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '好友状态',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_friends
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_ip` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户IP',
  `user_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名',
  `user_password` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户密码',
  `user_email` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户邮箱',
  `user_profile_photo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户头像',
  `user_registration_time` datetime DEFAULT NULL COMMENT '注册时间',
  `user_birthday` date DEFAULT NULL COMMENT '用户生日',
  `user_age` tinyint DEFAULT NULL COMMENT '用户年龄',
  `user_telephone_number` int NOT NULL COMMENT '用户手机号',
  `user_nickname` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户昵称',
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `user_name` (`user_name`) USING BTREE,
  KEY `user_nickname` (`user_nickname`) USING BTREE,
  KEY `user_email` (`user_email`) USING BTREE,
  KEY `user_telephone_number` (`user_telephone_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`user_id`, `user_ip`, `user_name`, `user_password`, `user_email`, `user_profile_photo`, `user_registration_time`, `user_birthday`, `user_age`, `user_telephone_number`, `user_nickname`) VALUES (521, 'ip', 'lihao', '521129', '1767359165@qq.com', '13700822724', '2022-12-26 15:06:16', '2022-12-26', 18, 123456789, '会飞的鱼');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
