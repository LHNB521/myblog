/*
 Navicat MySQL Data Transfer

 Source Server         : li
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : lhblog

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 26/12/2022 14:34:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `article_id` bigint NOT NULL AUTO_INCREMENT COMMENT '博文ID',
  `push_data` datetime DEFAULT NULL COMMENT '发布日期',
  `article_user` varchar(32) DEFAULT NULL COMMENT '发表用户',
  `title` varchar(1024) DEFAULT NULL COMMENT '博文标题',
  `like_count` int DEFAULT NULL COMMENT '点赞数',
  `comment_count` int DEFAULT NULL COMMENT '评论数',
  `read_count` int DEFAULT NULL COMMENT '浏览量',
  `top_flag` varchar(1) DEFAULT NULL COMMENT '是否置顶',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `article_summary` varchar(1024) DEFAULT NULL COMMENT '文章摘要',
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章 ';

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` (`article_id`, `push_data`, `article_user`, `title`, `like_count`, `comment_count`, `read_count`, `top_flag`, `create_time`, `article_summary`) VALUES (123, '2022-12-26 14:28:13', '李浩', 'render原理', 99, 22, 444, '0', '2022-12-26 14:29:07', '文章摘要');
COMMIT;

-- ----------------------------
-- Table structure for article_category_referenced
-- ----------------------------
DROP TABLE IF EXISTS `article_category_referenced`;
CREATE TABLE `article_category_referenced` (
  `acr_id` bigint NOT NULL AUTO_INCREMENT COMMENT '引用id',
  `article_id` bigint DEFAULT NULL COMMENT '文章id',
  `category_id` bigint DEFAULT NULL COMMENT '类目id',
  PRIMARY KEY (`acr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章分类 ';

-- ----------------------------
-- Records of article_category_referenced
-- ----------------------------
BEGIN;
INSERT INTO `article_category_referenced` (`acr_id`, `article_id`, `category_id`) VALUES (2, 123, 3);
COMMIT;

-- ----------------------------
-- Table structure for article_detail
-- ----------------------------
DROP TABLE IF EXISTS `article_detail`;
CREATE TABLE `article_detail` (
  `article_detail_id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章详情id',
  `content_md` text COMMENT '文章markdown内容',
  `content_html` text COMMENT '文章html内容',
  `article_id` bigint DEFAULT NULL COMMENT '文章id',
  PRIMARY KEY (`article_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章详情 ';

-- ----------------------------
-- Records of article_detail
-- ----------------------------
BEGIN;
INSERT INTO `article_detail` (`article_detail_id`, `content_md`, `content_html`, `article_id`) VALUES (1, '# render\nVue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node。它的定义在 src/core/instance/render.js 文件中：\n```javascript\nVue.prototype._render = function (): VNode {\n  const vm: Component = this\n  const { render, _parentVnode } = vm.$options\n\n  // reset _rendered flag on slots for duplicate slot check\n  if (process.env.NODE_ENV !== \'production\') {\n    for (const key in vm.$slots) {\n      // $flow-disable-line\n      vm.$slots[key]._rendered = false\n    }\n  }\n\n  if (_parentVnode) {\n    vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject\n  }\n\n  // set parent vnode. this allows render functions to have access\n  // to the data on the placeholder node.\n  vm.$vnode = _parentVnode\n  // render self\n  let vnode\n  try {\n    vnode = render.call(vm._renderProxy, vm.$createElement)\n  } catch (e) {\n    handleError(e, vm, `render`)\n    // return error render result,\n    // or previous vnode to prevent render error causing blank component\n    /* istanbul ignore else */\n    if (process.env.NODE_ENV !== \'production\') {\n      if (vm.$options.renderError) {\n        try {\n          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)\n        } catch (e) {\n          handleError(e, vm, `renderError`)\n          vnode = vm._vnode\n        }\n      } else {\n        vnode = vm._vnode\n      }\n    } else {\n      vnode = vm._vnode\n    }\n  }\n  // return empty vnode in case the render function errored out\n  if (!(vnode instanceof VNode)) {\n    if (process.env.NODE_ENV !== \'production\' && Array.isArray(vnode)) {\n      warn(\n        \'Multiple root nodes returned from render function. Render function \' +\n        \'should return a single root node.\',\n        vm\n      )\n    }\n    vnode = createEmptyVNode()\n  }\n  // set parent\n  vnode.parent = _parentVnode\n  return vnode\n}\n```\n这段代码最关键的是 render 方法的调用，我们在平时的开发工作中手写 render 方法的场景比较少，而写的比较多的是 template 模板，在之前的 mounted 方法的实现中，会把 template 编译成 render 方法，但这个编译过程是非常复杂的，我们不打算在这里展开讲，之后会专门花一个章节来分析 Vue 的编译过程。\n\n在 Vue 的官方文档中介绍了 render 函数的第一个参数是 createElement，那么结合之前的例子：\n```javascript\n<div id=\"app\">\n  {{ message }}\n</div>\n```\n相当于我们编写如下render函数：\n```javascript\nrender: function (createElement) {\n  return createElement(\'div\', {\n     attrs: {\n        id: \'app\'\n      },\n  }, this.message)\n}\n```\n再回到 _render 函数中的 render 方法的调用：\n```javascript\nvnode = render.call(vm._renderProxy, vm.$createElement)\n```\n可以看到，render 函数中的 createElement 方法就是 vm.$createElement 方法：\n```javascript\nexport function initRender (vm: Component) {\n  // ...\n  // bind the createElement fn to this instance\n  // so that we get proper render context inside it.\n  // args order: tag, data, children, normalizationType, alwaysNormalize\n  // internal version is used by render functions compiled from templates\n  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)\n  // normalization is always applied for the public version, used in\n  // user-written render functions.\n  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)\n}\n```\n实际上，vm.$createElement 方法定义是在执行 initRender 方法的时候，可以看到除了 vm.$createElement 方法，还有一个 vm._c 方法，它是被模板编译成的 render 函数使用，而 vm.$createElement 是用户手写 render 方法使用的， 这俩个方法支持的参数相同，并且内部都调用了 createElement 方法。\n\n# 总结\nvm._render 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node。Vue 2.0 相比 Vue 1.0 最大的升级就是利用了 Virtual DOM。因此在分析 createElement 的实现前，我们先了解一下 Virtual DOM 的概念。', NULL, 123);
COMMIT;

-- ----------------------------
-- Table structure for article_tag_referenced
-- ----------------------------
DROP TABLE IF EXISTS `article_tag_referenced`;
CREATE TABLE `article_tag_referenced` (
  `atr_Id` bigint NOT NULL AUTO_INCREMENT COMMENT '引用id',
  `article_id` bigint DEFAULT NULL COMMENT '文章id',
  `tag_id` bigint DEFAULT NULL COMMENT '标签id',
  PRIMARY KEY (`atr_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章标签 ';

-- ----------------------------
-- Records of article_tag_referenced
-- ----------------------------
BEGIN;
INSERT INTO `article_tag_referenced` (`atr_Id`, `article_id`, `tag_id`) VALUES (1, 123, 2);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `category_name` varchar(64) DEFAULT NULL COMMENT '分类名称',
  `alias_name` varchar(64) DEFAULT NULL COMMENT '分类别名',
  `description` varchar(128) DEFAULT NULL COMMENT '分类描述',
  `parennt_id` bigint DEFAULT NULL COMMENT '父分类ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='分类 ';

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` (`category_id`, `category_name`, `alias_name`, `description`, `parennt_id`, `create_time`) VALUES (3, 'Vue', 'Vue揭秘', '这是Vue相关', 456, '2022-12-26 14:33:18');
COMMIT;

-- ----------------------------
-- Table structure for discuss
-- ----------------------------
DROP TABLE IF EXISTS `discuss`;
CREATE TABLE `discuss` (
  `discuss_id` bigint NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `create_time` datetime DEFAULT NULL COMMENT '评论日期',
  `like_count` int DEFAULT NULL COMMENT '点赞数',
  `discuss_user` bigint DEFAULT NULL COMMENT '发表用户',
  `article_id` bigint DEFAULT NULL COMMENT '评论文章ID',
  `content` varchar(3072) DEFAULT NULL COMMENT '评论内容',
  `parent_id` bigint DEFAULT NULL COMMENT '父评论ID',
  PRIMARY KEY (`discuss_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='评论 ';

-- ----------------------------
-- Records of discuss
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `tag_id` bigint NOT NULL AUTO_INCREMENT COMMENT '标签ID',
  `tag_name` varchar(64) DEFAULT NULL COMMENT '标签名称',
  `alias_name` varchar(64) DEFAULT NULL COMMENT '标签别名',
  `description` varchar(128) DEFAULT NULL COMMENT '标签描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='标签 ';

-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag` (`tag_id`, `tag_name`, `alias_name`, `description`, `create_time`) VALUES (2, 'Vue源码', 'Vue源码', '这是Vue源码', '2022-12-26 14:34:21');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_Id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(128) DEFAULT NULL COMMENT '用户名',
  `user_nickname` varchar(128) DEFAULT NULL COMMENT '用户昵称',
  `pwd` varchar(64) DEFAULT NULL COMMENT '用户密码',
  `email` varchar(64) DEFAULT NULL COMMENT '用户邮箱',
  `avatar` varchar(128) DEFAULT NULL COMMENT '用户头像',
  `create_time` datetime DEFAULT NULL COMMENT '注册时间',
  `birthday` date DEFAULT NULL COMMENT '用户生日',
  `age` int DEFAULT NULL COMMENT '用户年龄',
  `moble_phone` varchar(32) DEFAULT NULL COMMENT '用户手机号',
  PRIMARY KEY (`user_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户 ';

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`user_Id`, `user_name`, `user_nickname`, `pwd`, `email`, `avatar`, `create_time`, `birthday`, `age`, `moble_phone`) VALUES (123, '李浩', '会飞的鱼', '123456', '1767359165@qq.com', '头像', '2022-12-26 14:25:49', '2022-12-26', 18, '123456789');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
