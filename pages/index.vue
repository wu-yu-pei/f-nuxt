<template>
  <h4 v-if="!data" class="text-center pt-150">加载中...</h4>

  <h4 v-if="!data && code === 401" class="text-center pt-150">抱歉,由于某些原因你无法查看网站内容。</h4>

  <div v-if="data && code !== 401" class="w-[100vw] h-[100vh] pa-20!">
    <ul class="app">
      <template v-for="(item, index) in data">
        <li @click.stop="() => to(item.book_id)">
          <img v-lazy="`${baseURL}/images/${item.book_id}.png`" src="../assets/load2.png" alt="" />
          <div class="content">
            <h3 class="singe-line">{{ item.book_name }}</h3>
            <p class="double-line">{{ item.book_summary }}</p>
            <div class="bottom">
              <div class="bottom-price">
                ¥{{ Math.floor(item.book_price / 100 / 7) }}.99
                <sub class="fs-8 c-blue absolute">最低</sub>
              </div>
              <div class="bottom-button" @click.stop="() => submit(item.book_name)">获取</div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>

  <div class="tips w-400" v-if="show && data">
    <h3>声明</h3>
    <p>1. 所有小册均以md的形式交付</p>
    <p>2. <span class="c-red">ctrl + f 搜索</span></p>
    <p>3. 若长时间没有回复请, <span class="c-red">请耐心等待</span></p>
    <p>4. 本网站资源仅用于学习,小册均收集于网络,如有侵权请联系删除</p>
    <p class="c-red text-right">声明时间: 2023-12-11 12:00:00</p>
    <div class="close" @click="close">[关闭]</div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '掘金小册',
  link: [{ rel: 'shortcut icon', href: '/vue.svg' }],
  meta: [
    { name: 'description', content: '掘金下册,掘金小册破解,掘金小册爬虫' },
    {
      name: 'description',
      content:
        '前端工程体验优化实战,Next.js 开发指南,Web 动画之旅,前端可视化入门与实战,WebGL Shader 魔法指南：创意图形编程入门,通关 Sentinel 流量治理框架,TypeScript 框架开发实战,Android 应用稳定性剖析与优化,QuickJS 引擎源码解析与实践,HTML5 入门教程,Node.js 入门教程,从 0 带你写 Netty,基于 Python 的数据分析与可视化,JavaScript 语言编程进阶,Nest 通关秘籍,深入浅出微前端,CSS 技术揭秘与实战通关,前端依赖治理：代码分析工具开发实战,JavaScript 函数式编程实践指南,趣学 Node.js,程序员的必修课,从 0 打造通用型低代码产品,TypeScript 全面进阶指南,基于 Vite 的 SSG 框架开发实战,现代 CSS,Java 应用安全性必知必会,大前端跨端开发指南,玩转 React Hooks,图解网络协议,Flutter 实战：ChatGPT 客户端开发,防御式 CSS 精讲,人人都能看懂的 ChatGPT 原理课,技术人求职指南,Nacos 核心源码精讲,技术写作指南,前端开发者的现代 C++ 课,Flutter 跨平台开发实战,Vue 3 技术揭秘,深入剖析 Node.js 底层原理,WebRTC：实现私有化会议直播系统,现代 Web 布局,Android 性能优化,RocketMQ 核心原理解析,Electron + Vue 3 桌面应用开发,说透 Redis 7,IntelliJ IDE 插件开发指南,前端调试通关秘籍,深度剖析 ZooKeeper 核心原理,分布式服务面试精讲,SkyWalking：应用监控和链路跟踪,Java 并发编程,Webpack5 核心原理与应用实践,NestJS 项目实战,CEF 桌面软件开发实战,从 0 到 1 落地前端工程化,深入浅出 Vite,',
    },
    {
      name: 'keywords',
      content:
        '前端工程体验优化实战,Next.js 开发指南,Web 动画之旅,前端可视化入门与实战,WebGL Shader 魔法指南：创意图形编程入门,通关 Sentinel 流量治理框架,TypeScript 框架开发实战,Android 应用稳定性剖析与优化,QuickJS 引擎源码解析与实践,HTML5 入门教程,Node.js 入门教程,从 0 带你写 Netty,基于 Python 的数据分析与可视化,JavaScript 语言编程进阶,Nest 通关秘籍,深入浅出微前端,CSS 技术揭秘与实战通关,前端依赖治理：代码分析工具开发实战,JavaScript 函数式编程实践指南,趣学 Node.js,程序员的必修课,从 0 打造通用型低代码产品,TypeScript 全面进阶指南,基于 Vite 的 SSG 框架开发实战,现代 CSS,Java 应用安全性必知必会,大前端跨端开发指南,玩转 React Hooks,图解网络协议,Flutter 实战：ChatGPT 客户端开发,防御式 CSS 精讲,人人都能看懂的 ChatGPT 原理课,技术人求职指南,Nacos 核心源码精讲,技术写作指南,前端开发者的现代 C++ 课,Flutter 跨平台开发实战,Vue 3 技术揭秘,深入剖析 Node.js 底层原理,WebRTC：实现私有化会议直播系统,现代 Web 布局,Android 性能优化,RocketMQ 核心原理解析,Electron + Vue 3 桌面应用开发,说透 Redis 7,IntelliJ IDE 插件开发指南,前端调试通关秘籍,深度剖析 ZooKeeper 核心原理,分布式服务面试精讲,SkyWalking：应用监控和链路跟踪,Java 并发编程,Webpack5 核心原理与应用实践,NestJS 项目实战,CEF 桌面软件开发实战,从 0 到 1 落地前端工程化,深入浅出 Vite,',
    },
    {
      name: 'description',
      content:
        '基于 Stencil 构建 Web Components 组件库,Neovim 配置实战：从0到1打造自己的IDE,Java开发者的RPC实战课,Elasticsearch 从入门到实践,TypeScript 类型体操通关秘籍,践行DevOps: 打造容器化时代的研发管理平台,高并发秒杀的设计精要与实现,微信小程序底层框架实现原理,深入剖析 Dubbo 架构设计和实现原理,DDD 案例实战课,MySQL 性能调优必知必会,玩转Vue3：升级你的前端框架,Babel 插件通关秘籍,分布式IM原理与实战: 从0到1打造即时通讯云,前端算法与数据结构面试：底层逻辑解读与大厂真题训练,JavaScript 设计模式核心原理与应用实践,Java 入门教程,TypeScript 入门教程,Flutter 入门教程,Netty 网络编程之道,Qt + CEF + Node.js 桌面开发实战,Nuxt 3.0 全栈开发,Flutter 实战：正则匹配应用,从零开发企业级 Go 应用,前端自动化测试精讲,源码共读第一期｜掘金会员专属活动,SpringBoot 场景开发多面手成长手册,SSR 实战：官网开发指南,Flutter 语言基础 - 梦始之地,从前端到全栈,稀土开发者大会2022,玩转 CSS 的艺术之美,React 进阶实践指南,Spring Cloud Alibaba 大型微服务项目实战,推荐系统完全指南,Flutter 渲染机制 - 聚沙成塔,零基础通关 Go 语言,Flutter 布局探索 - 薪火相传,Flutter 滑动探索 - 珠联璧合,Kubernetes 安全原理与实践,深入浅出 DDD,Go 组件设计与实现,Kafka 源码精讲,Go 工程实践,可视化入门：从 0 到 1 开发一个图表库,Hello，分布式锁,Go 语言原理与实践,基于 Kafka Connect 的异构数据流式同步平台实战,前端缓存技术与方案解析,从 0 开始深入学习 Spring,计算机是怎样运行的：从根儿上理解计算机,Node + React 实战：从 0 到 1 实现记账本 ,Flutter 动画探索 - 流光幻影,Electron + React 从 0 到 1 实现简历平台实战,Python 异步网络编程实战,基于 Node 的 DevOps 实战,Flutter 手势探索 - 执掌天下,HTML5 游戏开发快速提升,玩转 MyBatis：深度解析与定制,从零开发H5可视化搭建项目,SpringBoot 中间件设计和开发,Vue3 企业级项目实战,从 0 到 1 实现一套 CI/CD 流程,写给普通人看的网页开发课,小程序云开发入门到实践,智能化测试入门课,前端工程师进阶 10 日谈,Flutter 绘制指南 - 妙笔生花 ,MySQL 是怎样运行的：从根儿上理解 MySQL,MySQL 是怎样使用的：从零蛋开始学习 MySQL,Kubernetes 从上手到实践,详解 Laravel 源码中优秀的设计模式,图解 Kafka 之核心原理,前端性能优化原理与实践,深入理解 TCP 协议：从原理到实战,JVM 字节码从入门到精通,SpringCloudNetflix 源码解读与原理分析,SpringBoot 源码解读与原理分析,React Hooks 与 Immutable 数据流实战,WebGL 入门与实践,你不知道的 Chrome 调试技巧,从 0 到 1 开发一款高性能 RPC 框架,Uniapp 从入门到进阶,',
    },
    {
      name: 'keywords',
      content:
        '基于 Stencil 构建 Web Components 组件库,Neovim 配置实战：从0到1打造自己的IDE,Java开发者的RPC实战课,Elasticsearch 从入门到实践,TypeScript 类型体操通关秘籍,践行DevOps: 打造容器化时代的研发管理平台,高并发秒杀的设计精要与实现,微信小程序底层框架实现原理,深入剖析 Dubbo 架构设计和实现原理,DDD 案例实战课,MySQL 性能调优必知必会,玩转Vue3：升级你的前端框架,Babel 插件通关秘籍,分布式IM原理与实战: 从0到1打造即时通讯云,前端算法与数据结构面试：底层逻辑解读与大厂真题训练,JavaScript 设计模式核心原理与应用实践,Java 入门教程,TypeScript 入门教程,Flutter 入门教程,Netty 网络编程之道,Qt + CEF + Node.js 桌面开发实战,Nuxt 3.0 全栈开发,Flutter 实战：正则匹配应用,从零开发企业级 Go 应用,前端自动化测试精讲,源码共读第一期｜掘金会员专属活动,SpringBoot 场景开发多面手成长手册,SSR 实战：官网开发指南,Flutter 语言基础 - 梦始之地,从前端到全栈,稀土开发者大会2022,玩转 CSS 的艺术之美,React 进阶实践指南,Spring Cloud Alibaba 大型微服务项目实战,推荐系统完全指南,Flutter 渲染机制 - 聚沙成塔,零基础通关 Go 语言,Flutter 布局探索 - 薪火相传,Flutter 滑动探索 - 珠联璧合,Kubernetes 安全原理与实践,深入浅出 DDD,Go 组件设计与实现,Kafka 源码精讲,Go 工程实践,可视化入门：从 0 到 1 开发一个图表库,Hello，分布式锁,Go 语言原理与实践,基于 Kafka Connect 的异构数据流式同步平台实战,前端缓存技术与方案解析,从 0 开始深入学习 Spring,计算机是怎样运行的：从根儿上理解计算机,Node + React 实战：从 0 到 1 实现记账本 ,Flutter 动画探索 - 流光幻影,Electron + React 从 0 到 1 实现简历平台实战,Python 异步网络编程实战,基于 Node 的 DevOps 实战,Flutter 手势探索 - 执掌天下,HTML5 游戏开发快速提升,玩转 MyBatis：深度解析与定制,从零开发H5可视化搭建项目,SpringBoot 中间件设计和开发,Vue3 企业级项目实战,从 0 到 1 实现一套 CI/CD 流程,写给普通人看的网页开发课,小程序云开发入门到实践,智能化测试入门课,前端工程师进阶 10 日谈,Flutter 绘制指南 - 妙笔生花 ,MySQL 是怎样运行的：从根儿上理解 MySQL,MySQL 是怎样使用的：从零蛋开始学习 MySQL,Kubernetes 从上手到实践,详解 Laravel 源码中优秀的设计模式,图解 Kafka 之核心原理,前端性能优化原理与实践,深入理解 TCP 协议：从原理到实战,JVM 字节码从入门到精通,SpringCloudNetflix 源码解读与原理分析,SpringBoot 源码解读与原理分析,React Hooks 与 Immutable 数据流实战,WebGL 入门与实践,你不知道的 Chrome 调试技巧,从 0 到 1 开发一款高性能 RPC 框架,Uniapp 从入门到进阶,',
    },
    {
      name: 'description',
      content:
        ' 优秀的前端团队是如何炼成的,Spring Boot 大型线上商城项目实战教程,Vue 3 +Spring Boot 大型前后端分离项目实战,基于 ThreeJS 框架的魔方微信小游戏实践,漫画 Go 语言 纯手绘版,图解 Kafka 之实战指南,基于 Python 轻松自建 App 服务器,Python数据分析实战：构建股票量化交易系统,Git 原理详解及实用指南,区块链开发入门：从 0 到 1 构建基于以太坊智能合约的 ICO DApp,响应式编程 —— RxJava 高阶指南,Vue.js 组件精讲,剖析 Vue.js 内部运行机制,Netty 入门与实战：仿写微信 IM 即时通讯系统,React 实战：设计模式和最佳实践,程序员职业小白书 —— 如何规划和经营你的职业,基于 hapi 的 Node.js 小程序后端开发实践指南,开发者必备的 Docker 实践指南,深入理解 NLP 的中文分词：从原理到实践,SVG 动画开发实战手册,Vue 项目构建与开发入门,基于 JavaScript 开发灵活的数据应用,React SSR 服务端渲染原理解析与同构实践,用 npm script 打造超溜的前端工作流,深入浅出 PWA,基于 Swoole 的联机对战游戏实践,如何写一本掘金小册,如何使用掘金社区',
    },
    {
      name: 'keywords',
      content:
        ' 优秀的前端团队是如何炼成的,Spring Boot 大型线上商城项目实战教程,Vue 3 +Spring Boot 大型前后端分离项目实战,基于 ThreeJS 框架的魔方微信小游戏实践,漫画 Go 语言 纯手绘版,图解 Kafka 之实战指南,基于 Python 轻松自建 App 服务器,Python数据分析实战：构建股票量化交易系统,Git 原理详解及实用指南,区块链开发入门：从 0 到 1 构建基于以太坊智能合约的 ICO DApp,响应式编程 —— RxJava 高阶指南,Vue.js 组件精讲,剖析 Vue.js 内部运行机制,Netty 入门与实战：仿写微信 IM 即时通讯系统,React 实战：设计模式和最佳实践,程序员职业小白书 —— 如何规划和经营你的职业,基于 hapi 的 Node.js 小程序后端开发实践指南,开发者必备的 Docker 实践指南,深入理解 NLP 的中文分词：从原理到实践,SVG 动画开发实战手册,Vue 项目构建与开发入门,基于 JavaScript 开发灵活的数据应用,React SSR 服务端渲染原理解析与同构实践,用 npm script 打造超溜的前端工作流,深入浅出 PWA,基于 Swoole 的联机对战游戏实践,如何写一本掘金小册,如何使用掘金社区',
    },
  ],
});
import axios from 'axios';
const startDate = +new Date();
const data = ref();
const code = ref();
const baseURL = 'http://192.210.232.179:7899';
// const baseURL = 'http://127.0.0.1:7899';
useFetch(`${baseURL}/books`, { method: 'get' }).then((res: any) => {
  data.value = res.data.value.data;
  code.value = res.data.value.code;
});

function submit(book_id: any) {
  const phone = prompt('请输入你的微信 我会立即联系你');
  if (!phone?.trim()) {
    return;
  }
  axios.post(`${baseURL}/submit`, { book_id, phone }).then((res) => {
    alert('提交成功,请注意微信信息');
  });
}

function to(id: any) {
  window.open(`https://juejin.cn/book/${id}`, '_blank');
}

const show = ref(true);
setTimeout(() => {
  show.value = false;
}, 10000);
function close() {
  show.value = false;
}

// lazy load
const vLazy = {
  mounted(el: HTMLImageElement, binding: any) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.src = binding.value;
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
  },
};

// 离开
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    const time = (+new Date() - startDate) / 1000;
    console.log(time);
    fetch(`${baseURL}/leave?time=${time}`, {
      method: 'GET',
      keepalive: true,
    });
  });
});
</script>

<style scoped>
.tips {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 10px 10px;
  padding-bottom: 20px;
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #6c6969;
  border-radius: 10px;
  color: #fff;
}
.tips .close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}
.tips .close:hover {
  color: red;
}
.tips p {
  font-size: 12px;
}
.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}
.double-line {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  padding: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
}

ul li {
  display: flex;
  cursor: help;
  list-style: none;
  width: 300px;
  max-width: 100%;
  aspect-ratio: 2/1;
}
ul li img {
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  overflow: hidden;
}

.content p {
  font-size: 14px;
  color: #2d2c2c;
}
.bottom {
  display: flex;
  justify-content: space-between;
}
.bottom-price {
  color: red;
  font-weight: 800;
  font-size: 20px;
}
.bottom-button {
  text-align: center;
  line-height: 30px;
  width: 60px;
  height: 30px;
  color: #fff;
  letter-spacing: 5px;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.5;
  background-color: red;
}
.bottom-button:hover {
  opacity: 0.8;
  background-color: red;
}
</style>
