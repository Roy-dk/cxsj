<template>
  <div id="app" ref="app">
    <div
      :class="{ 'header-fullScreen': isFullScreen }"
      ref="header"
      class="app-header"
      style="
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        background: white;
      "
    >
      <my-header />
    </div>
    <div
      ref="video"
      class="video"
      style="display: flex; margin-top: 30px"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <a-card
        size="small"
        title="摄像头选择"
        style="width: 300px; margin: 20px"
      >
        <a slot="extra" href="#">添加</a>
        <div style="min-width: 250px; padding: 30px">
          <a-tree
            :show-line="showLine"
            :show-icon="showIcon"
            :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
            @select="onSelect"
          >
            <a-icon slot="icon" />
            <a-tree-node key="0">
              <a-icon slot="icon" type="camera" />
              <span slot="title" style="color: #1890ff">全部摄像头</span>
              <a-tree-node key="0-0" title="南京">
                <a-icon slot="icon" />
                <a-tree-node key="0-0-0" title="浦口大道">
                  <a-icon slot="icon" type="camera" />
                  <a-tree-node key="0-0-0-0" title="1号摄像头">
                    <a-icon slot="switcherIcon" type="camera" />
                  </a-tree-node>
                  <a-tree-node key="0-0-0-2" title="2号摄像头">
                    <a-icon slot="switcherIcon" type="camera" />
                  </a-tree-node>
                  <a-tree-node key="0-0-0-3" title="3号摄像头">
                    <a-icon slot="switcherIcon" type="camera" />
                  </a-tree-node>
                </a-tree-node>
              </a-tree-node>
              <a-tree-node key="0-1" title="北京">
                <a-icon slot="icon" type="camera" />
                <a-tree-node key="0-1-0" title="浦口大道">
                  <a-icon slot="icon" type="camera" />
                  <a-tree-node key="0-1-0-0" title="1号摄像头">
                    <a-icon slot="switcherIcon" type="camera" /> </a-tree-node
                ></a-tree-node>
              </a-tree-node>
              <a-tree-node key="0-0-2" title="上海">
                <a-tree-node key="0-2-0" title="浦口大道">
                  <a-icon slot="icon" type="camera" />
                  <a-tree-node key="0-2-0-0" title="1号摄像头">
                    <a-icon slot="switcherIcon" type="camera" /> </a-tree-node
                ></a-tree-node>
              </a-tree-node>
            </a-tree-node>
          </a-tree>
        </div>
      </a-card>
      <div>
        <a-card size="small" title="摄像头位置" style="margin: 20px">
          <a-button type="primary" @click="openFile"> 打开文件 </a-button>
          <div style="width: 600px">
            <my-video />
            <div
              :class="{ 'footer-fullScreen': isFullScreen }"
              ref="footer"
              class="app-footer"
            >
              <my-footer />
            </div></div
        ></a-card>
        <a-card size="small" title="信息" style="margin: 20px">
          <a-descriptions bordered>
            <a-descriptions-item label="摄像头ID："> 000 </a-descriptions-item>
            <a-descriptions-item label="所在地区：">
              上海A
            </a-descriptions-item>
            <a-descriptions-item label="正确朝向："> 左 </a-descriptions-item>
            <a-descriptions-item label="最大限速：">
              80km/h
            </a-descriptions-item>
          </a-descriptions>

          <div class="redesign_item" style="display: block;margin:20px">
            <a-checkbox @change="onChange"> 车辆记录 </a-checkbox>
            <a-checkbox @change="onChange"> 违章记录 </a-checkbox>
            <div style="display:flex;white-space:nowrap;overflow:auto;width:600px">
              <a-card v-for="i in [1,8,1,1,1,1,1,1]" :key="i" style="min-width:200px;height:250px;margin:10px"> 
                信息 
                <div style="">状态:{{i == 2?"正常":"超速"}}</div>
                </a-card>
            </div>
          </div>
        </a-card>
      </div>
      <div>
        <a-card size="small" title="车流量统计" style="margin: 20px">
          <a-table
            :columns="columns"
            :data-source="datasets"
            :pagination="false"
            style="width: 600px"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table></a-card
        >

        <a-card size="small" title="图形化显示" style="margin: 20px">
          <a-radio-group v-model="size">
      <a-radio-button value="large">
        年
      </a-radio-button>
      <a-radio-button value="default">
        月
      </a-radio-button>
      <a-radio-button value="small">
        日
      </a-radio-button>
    </a-radio-group>
          <canvas id="myChart2"></canvas>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { client, reg } from "./api/util";
import connect from "./api/bus.js";
import { mapGetters, mapMutations } from "vuex";
import Mousetrap from "mousetrap";
import path from "path";
import fs from "fs";
import Chart from "chart.js";

import OpenDialog from "./api/OpenDialog";
import WindowUtil from "./api/window";
const openDialog = new OpenDialog();
const winUtil = new WindowUtil();
const { ipcRenderer } = require("electron");
const jilu = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 4",
  },
];
const columns = [
  {
    title: "类型",
    dataIndex: "l1",
    key: "l1",
  },
  {
    title: "当前画面车辆数",
    dataIndex: "l2",
    key: "l2",
  },
  {
    title: "驶入区域累计车辆数",
    dataIndex: "l3",
    key: "l3",
  },
  {
    title: "驶出区域累计车辆数",
    dataIndex: "l4",
    key: "l4",
  },
];

const datasets = [
  {
    key: "l1",
    l1: "卡车",
    l2: 32,
    l3: 2,
    l4: 1,
  },
  {
    key: "l2",
    l1: "小汽车",
    l2: 32,
    l3: 11,
    l4: 0,
  },
  {
    key: "l3",
    l1: "摩托车",
    l2: 32,
    l3: 5,
    l4: 8,
  },
  {
    key: "l4",
    l1: "巴士",
    l2: 32,
    l3: 7,
    l4: 7,
  },
];

export default {
  name: "player",
  data() {
    return {
      isShowArrow: false,
      playListHeight: null,
      showLine: true,
      showIcon: false,
      columns,
      datasets,
      jilu,
      size: '年',
    };
  },
  mounted() {
    this.count = 0;
    this.initPlayListHeight();
    this.mouseMoveTimer = null;
    this.FullScreenTimer = null;
    window.addEventListener("resize", this.initPlayListHeight);
    this.initGlobalShortcut();
    let video = this.$refs.video;
    video.ondragenter = video.ondragover = video.ondragleave = function () {
      // 阻止默认事件
      return false;
    };
    // 释放文件
    video.addEventListener("drop", this.onDrop);

    this.$nextTick(() => {
      ipcRenderer.send("update");
    });

    var ctx2 = document.getElementById("myChart2");
    var myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            label: "车流量统计结果",
            backgroundColor: "rgba(225,10,10,0.3)",
            borderColor: "rgba(225,225,110,1)",
            borderWidth: 3,
            pointStrokeColor: "#fff",
            pointStyle: "crossRot",
            data: [65, 59, 0, 81, 56, 10, 40, 22, 32, 54, 10, 30],
            cubicInterpolationMode: "monotone",
            spanGaps: "false",
            fill: "true",
          },
        ],
      } 
    });
  },
  methods: {
    ...mapMutations([
      "setCurrentTime",
      "setInWidth",
      "setIsVolumeOn",
      "setSpeed",
    ]),
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },

    onMouseEnter() {
      this.isShowArrow = true;
    },
    onMouseLeave() {
      this.isShowArrow = false;
    },
    // 初始化播放列表高度
    initPlayListHeight() {
      let footerHeight = this.$refs.footer.getBoundingClientRect().height;
      let headerHeight = this.$refs.header.getBoundingClientRect().height;
      this.playListHeight = client().height - footerHeight - headerHeight;
    },
    // 显示头部和脚部
    showFooterAndHeader() {
      this.$refs.footer.style.height = "auto";
      this.$refs.header.style.height = "auto";
      this.initPlayListHeight();
    },
    // 隐藏头部和脚部
    hideFooterAndHeader() {
      this.$refs.footer.click();
      this.$refs.footer.style.height = "0";
      this.$refs.header.style.height = "0";
      this.initPlayListHeight();
    },
    onMouseMove(e) {
      if (!this.isFullScreen) {
        return;
      }
      if (this.mouseMoveTimer) {
        clearTimeout(this.mouseMoveTimer);
      }
      if (this.FullScreenTimer) {
        clearTimeout(this.FullScreenTimer);
      }
      this.mouseMoveTimer = setTimeout(() => {
        // 计算鼠标是否移动到头部或者是脚部的位置
        if (e.screenY <= 36 || client().height - e.screenY <= 85) {
          this.showFooterAndHeader();
          connect.$emit("showFooterAndHeader");
        } else {
          this.FullScreenTimer = setTimeout(() => {
            this.hideFooterAndHeader();
            connect.$emit("hideFooterAndHeader");
            clearTimeout(this.FullScreenTimer);
          }, 2000);
        }
      }, 50);
    },
    // 初始化快捷键
    initGlobalShortcut() {
      // 监听快捷键
      Mousetrap.bind("up", () => {
        //增大音量
        let w = this.inWidth + 5;
        if (w >= 62) {
          //音量上限
          this.setInWidth(62);
        } else {
          this.setInWidth(w);
        }
        return false;
      });
      Mousetrap.bind("down", () => {
        //减小音量
        let w = this.inWidth - 5;
        if (w <= 0) {
          //音量下限
          // this.setIsVolumeOn(false); //音量为0时需要显示静音图标
          this.setInWidth(0);
        } else {
          this.setInWidth(w);
        }
        return false;
      });
      Mousetrap.bind("left", () => {
        //快进
        if (this.currentVideo) {
          this.setCurrentTime(this.currentTime - 4);
          connect.$emit("setCurrentTime");
        }
        return false;
      });
      Mousetrap.bind("right", () => {
        //回退
        if (this.currentVideo) {
          this.setCurrentTime(this.currentTime + 4);
          connect.$emit("setCurrentTime");
        }
        return false;
      });
      Mousetrap.bind("ctrl+up", () => {
        //增大播放速度
        if (this.speed == 2 || !this.currentVideo) {
          return false;
        }
        let speed = parseFloat(
          ((this.speed * 10 + 1) / 10).toString().substring(0, 3)
        );
        this.setSpeed(speed);
        return false;
      });

      Mousetrap.bind("ctrl+down", () => {
        //增大播放速度
        if (this.speed == 0.1 || !this.currentVideo) {
          return false;
        }
        let speed = parseFloat(
          ((this.speed * 10 - 1) / 10).toString().substring(0, 3)
        );
        this.setSpeed(speed);
        return false;
      });
    },
    onDrop(e) {
      e.preventDefault();
      let files = e.dataTransfer.files;
      files = Array.prototype.slice.call(files);
      let arr = [];

      files.forEach((item) => {
        const stat = fs.statSync(item.path).isDirectory();
        if (!stat) {
          let extname = path.extname(item.path);
          let flag = reg.test(extname);
          if (flag) {
            arr.push(item.path);
          }
        } else {
          arr.push(...this.readFileFromFolder([item.path]));
          this.count = 0;
        }
      });
      if (arr.length == 0) {
        return;
      }
      let arrs = openDialog.getFileStatFromLocal(arr);
      openDialog.changeStore(arrs);
    },
    openFile() {
      openDialog.openFile();
    },
    // 从文件夹中读取文件
    readFileFromFolder(paths) {
      this.count++;
      let arr = [];
      if (this.count > 3) {
        return [];
      }
      for (let i = 0; i < paths.length; i++) {
        const p = paths[i];
        const stat = fs.statSync(p);
        if (stat.isDirectory() == true) {
          let result = fs.readdirSync(p);
          for (let j = 0; j < result.length; j++) {
            result[j] = path.join(p, result[j]);
          }
          arr.push(...this.readFileFromFolder(result));
        } else {
          if (reg.test(p)) {
            arr.push(p);
          }
        }
      }
      return arr;
    },
  },
  computed: {
    ...mapGetters([
      "currentVideo",
      "isFullScreen",
      "videoList",
      "isPlaying",
      "currentTime",
      "inWidth",
      "speed",
      "isAlwaysOnTop",
      "theme",
    ]),
  },
  watch: {
    isAlwaysOnTop: {
      immediate: true,
      handler: function (newVal) {
        winUtil.setAlwaysOnTop(newVal);
      },
    },
    isPlaying() {
      // 播放的时候脚部的高度会发生变化，所以需要重新计算播放列表的高度
      this.$nextTick(() => {
        this.initPlayListHeight();
      });
    },
    isFullScreen(newVal) {
      // 全屏的时候
      if (newVal) {
        this.$refs.app.addEventListener("mousemove", this.onMouseMove);
        if (this.FullScreenTimer) {
          clearTimeout(this.FullScreenTimer);
        }
        this.FullScreenTimer = setTimeout(() => {
          this.hideFooterAndHeader();
          connect.$emit("hideFooterAndHeader");
          clearTimeout(this.FullScreenTimer);
        }, 2000);
      } else {
        if (this.FullScreenTimer) {
          clearTimeout(this.FullScreenTimer);
        }
        this.$refs.app.removeEventListener("mousemove", this.onMouseMove);
        this.showFooterAndHeader();
      }
    },
  },
  beforeDestroy() {
    if (this.mouseMoveTimer) {
      clearTimeout(this.mouseMoveTimer);
    }
    if (this.FullScreenTimer) {
      clearTimeout(this.FullScreenTimer);
    }
    window.removeEventListener("resize", this.initialInputHeight);
    this.$refs.app.removeEventListener("mousemove", this.onMouseMove);
  },
};
</script>

<style lang="less" scoped>
#app {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .app-header {
    border-bottom: 1px solid #2f2f31;
  }
  .video {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .app-footer {
    border-top: 1px solid #2f2f31;
  }
  .small {
    width: 500px;
    height: 500px;
  }
  .header-fullScreen {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .footer-fullScreen {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

.redesign_input {
  height: 20px;
  line-height: 16px;
  background-color: rgb(60, 60, 60);

  display: inline-block;
  box-sizing: border-box;
  border: none;
  resize: none;
  padding: 4px;
  text-overflow: ellipsis;
  padding: 2px 2px;
  outline-color: #007fd4;
}

.redesign_item {
  margin-top: 8px;
  font-size: 14px;
  display: flex;
  .label {
    width: 80px;
  }
}
.redesign_item:hover {
  outline: 1px solid rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0.12);
}

.redesign_select {
  background-color: rgb(60, 60, 60);
  //color: rgb(240, 240, 240);
  border-color: rgb(60, 60, 60);
  outline-color: #007fd4;
  width: 180px;
  option {
    outline-color: #007fd4;
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }
}
.redesign_select:focus {
  outline-color: #007fd4;
}
.redesign_button {
  display: inline-block;
  margin-top: 4px;
  margin-right: 4px;
  width: auto;
  padding: 2px 14px;
  //color: rgb(255, 255, 255);
  background-color: rgb(14, 99, 156);
}

.ant-row {
  display: flex !important;
}
</style>
