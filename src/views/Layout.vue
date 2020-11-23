<template>
  <el-container class="container">
    <el-aside class="aside">
      <el-menu
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="menu"
        router
        text-color="#fff"
      >
        <el-menu-item index="/page/a">/page/a</el-menu-item>
        <el-menu-item index="/page/b">/page/b</el-menu-item>
        <el-menu-item index="/page/x">/page/x</el-menu-item>
        <el-menu-item index="/page/x1">/page/x1</el-menu-item>
        <el-menu-item index="/page/c">/page/c</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header"></el-header>
      <el-main>
        <transition mode="out-in" name="el-fade-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  $bgClr: #545c64;

  background: #ccc;

  .aside {
    background: $bgClr;
    width: 200px;
  }

  .menu {
    border: 0;
  }

  .header {
    background: #eee;
  }
}
</style>
