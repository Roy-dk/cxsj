<template>
  <div :style="{ color: theme.textColor }" class="header">
    智慧交通监控数据可视化平台v1.0
    <div class="middle" v-if="!isFullScreen"></div>
    <div class="right" v-if="!isFullScreen">
      <span
        @click="minWindow"
        :title="$t('header.minimize')"
        class="fa fa-window-minimize"
      ></span>
      <span
        v-if="!isMaxed"
        @click="maxWindow"
        :title="$t('header.Maximization')"
        class="fa fa-window-maximize"
      ></span>
      <span
        v-else
        @click="maxWindow"
        :title="$t('header.reset')"
        class="fa fa-window-restore"
      ></span>
      <span
        @click="close"
        :title="$t('header.close')"
        class="fa fa-close"
      ></span>
    </div>
    <div v-if="isFullScreen" class="fullScreen-title">
      {{ currentVideo.filename }}
    </div>
    <div class="flexbetween" v-if="isFullScreen">
      <span class="fullScreen-title">{{ time }}</span>
      <span
        class="fullScreen-title exit-fullScreen"
        @click="setFullScreen(false)"
        >退出全屏</span
      >
    </div>
  </div>
</template>

<script>
import WindowUtil from "../api/window";
import { mapGetters, mapMutations } from "vuex";
import { remote, shell } from "electron";
import { themes } from "../api/util";

const winUtil = new WindowUtil();

export default {
  name: "my-header",
  data() {
    return {
      // 是否显示最大化
      isMaxed: false,
      // 是否显示左上角的菜单
      isShowMenu: false,
      // 当前时间
      time: null,
      // 是否显示历史记录
      isShowHistory: false,
      // 主题颜色
      themes,
      // 是否显示主题
      isShowTheme: false,
      // 是否显示关于页面
      showAbout: false,
    };
  },
  mounted() {
    this.timer = null;
    this.initListener();
  },
  methods: {
    ...mapMutations([
      "setFullScreen",
      "clearHistoricalRecords",
      "setAlwaysOnTop",
      "setTheme",
    ]),
    // 初始化监听器
    initListener() {
      remote.getCurrentWindow().addListener("maximize", this.maximize);
      remote.getCurrentWindow().addListener("unmaximize", this.unmaximize);
      window.addEventListener("click", this.onClick);
    },
    // 清空监听器
    removeListener() {
      window.removeEventListener("click", this.onClick);
      remote.getCurrentWindow().removeAllListeners();
    },
    maximize() {
      this.isMaxed = true;
    },
    unmaximize() {
      this.isMaxed = false;
    },
    // 最小化窗口
    minWindow() {
      winUtil.minWindow();
    },
    // 最大化或者还原窗口
    maxWindow() {
      winUtil.maxWindow();
    },
    // 关闭窗口
    close() {
      winUtil.close();
    },
    // 点击左上角播放器文字后显示或者隐藏菜单
  },
  computed: {
    ...mapGetters([
      "isFullScreen",
      "currentVideo",
      "historicalRecords",
      "isAlwaysOnTop",
      "theme",
    ]),
  },
  watch: {
    isFullScreen(newVal) {
      winUtil.setFullScreen(newVal);
      if (newVal) {
        this.timer = setInterval(this.getTime, 1000);
      } else {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.removeListener();
  },
};
</script>

<style lang="less" scoped>
.header {
  /*设置可以拖拽导航栏移动窗口*/
  /*-webkit-app-region: drag;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 0 10px;
  .middle {
    -webkit-app-region: drag;
    flex: 1;
    height: 100%;
    margin: 0 10px;
  }
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    .my-menu {
      padding: 5px 0;
      position: absolute;
      font-size: 13px;
      top: 38px;
      left: 5px;
      color: #b4b4b4;
      z-index: 11;
      width: 150px;
      border-radius: 5px;
      &:before {
        position: absolute;
        top: -10px;
        left: 10px;
        content: "";
        height: 0;
        width: 0;
        border: 5px solid transparent;
        border-bottom-color: #e8e8e8;
      }
      > li {
        cursor: pointer;
        padding: 10px 15px;
        color: #878788;
        position: relative;
        &.set:before {
          content: "";
          height: 1px;
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          background-color: #878788;
        }
        &:hover {
          color: #e8e8e8;
        }
      }
    }
    > span:nth-child(1) {
      color: #e8e8e8;
      font-size: 16px;
    }
    > div {
      position: relative;
      cursor: pointer;
      .title {
        font-size: 16px;
        padding: 0 5px;
      }
      .my-angle-down {
        font-size: 16px;
      }
      &:hover {
        > span {
          color: #ffffff;
        }
      }
    }
  }
  .toggleLang {
    margin-left: 20px;
    cursor: pointer;
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    span {
      height: 36px;
      width: 36px;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      &:hover {
        color: #e8e8e8;
      }
    }
    .history {
      max-height: 200px;
      width: 300px;
      border-radius: 5px;
      overflow: auto;
      color: #b4b4b4;
    }
  }
}

.filename {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #b0b0b0;
  font-size: 14px;
  padding: 0 10px;
  max-width: 200px;
  cursor: default;
}
.fullScreen-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #b0b0b0;
  font-size: 14px;
  padding: 0 10px;
  cursor: default;
}
.exit-fullScreen {
  cursor: pointer;
  &:hover {
    color: #e8e8e8;
  }
}

.m-history {
  position: absolute;
  top: 37px;
  right: -8px;
  z-index: 20;
  border-radius: 5px;
  &:before {
    position: absolute;
    top: -15px;
    left: 160px;
    width: 0;
    height: 0;
    content: "";
    border: 7px solid transparent;
    border-bottom-color: e8e8e8;
  }
}
.clear-history,
.no-history {
  text-align: center;
  font-size: 12px;
  padding: 10px;
}
.clear-history {
  cursor: pointer;
  &:hover {
    color: #e8e8e8;
  }
}

.change-skin {
  width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
  top: 38px;
  z-index: 2;
  right: 0;
  border-radius: 5px;
  &:before {
    position: absolute;
    top: -14px;
    left: 230px;
    width: 0;
    height: 0;
    content: "";
    border: 7px solid transparent;
    border-bottom-color: e8e8e8;
  }
  > li {
    width: 113px;
    height: 80px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>