<template>
  <div
    id="app"
    ref="app"
    style="background-attachment: fixed;overflow:hidden;background-color:#080a20;width:100%;height:100%;"
  >
    <!--background-image:url('./assets/bc.jpg');-->

    <div
      ref="header"
      class="app-header frostedGlass"
      style="position: fixed;top: 0;width: 100%;z-index: 100;
      "
    >
      <my-header />
    </div>
    <div
      ref="video"
      class="video"
      style="display: flex;"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div
        id="geo"
        style="width:100%;height: 100%;position:fixed!important;z-index:0;"
      ></div>
      <div class="title" style="width:250px;margin: 60px;">0</div>
      <div
        class="panelm frostedGlass"
        style="margin:20px;margin-top: 50px;width:250px;z-index:100;position:fixed;margin-bottom:0px;min-height:600px"
      >
        <div class="title">
          <div style="font-size:15px">摄像头选择</div>
        </div>
        <div class="content">
          <div @click="choose_camera(1)" class="camera_item">
            江北--浦口--龙华路
          </div>
          <div @click="choose_camera(2)" class="camera_item">
            江北--浦口--浦珠南路
          </div>
          <div @click="choose_camera(3)" class="camera_item">
            江北--浦口--浦口大道
          </div>
          <div @click="choose_camera(4)" class="camera_item">
            江北--浦口--龙华路
          </div>
          <div @click="choose_camera(5)" class="camera_item">
            江北--浦口--龙华路
          </div>
        </div>
        <div class="content">
          <span @click="show_info = !show_info">
            地图显示
          </span>
        </div>
      </div>
      <div
        v-if="show_info"
        style="position:fixed;width:100%;height:100%;display:flex;margin-top:30px;left:270px;overflow:auto;margin-left:10px;margin-right:10px"
      >
        <!--div
        class="frostedGlass panel"
        size="small"
        title="摄像头选择"
        style="width: 200px; margin: 20px;background-color: #101129;"
      >
        <a slot="extra" href="#">添加</a>
        <div style="min-width: 260px; padding: 10px" class="">
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
                  <a-icon slot="icon" type="camera"/>
                  <a-tree-node key="0-1-0-0" title="1号摄像头">
                    <a-icon slot="switcherIcon" type="camera" /> </a-tree-node
                ></a-tree-node>
              </a-tree-node>
              <a-tree-node key="0-0-2" title="上海">
                <a-tree-node key="0-2-0" title="浦口大道">
                  <a-icon slot="icon" type="camera"/>
                  <a-tree-node key="0-2-0-0" title="1号摄像头">
                    <a-icon slot="switcherIcon" type="camera" /> </a-tree-node
                ></a-tree-node>
              </a-tree-node>
            </a-tree-node>
          </a-tree>
        </div>
      </div-->

        <div style="height:100%;over-flow:hidden">
          <div
            class="panelm frostedGlass"
            size="small"
            title="摄像头位置"
            style="margin: 20px"
          >
            <div class="title">摄像头</div>

            <!--a-button type="primary" @click="openFile"> 打开文件 </a-button-->
            <div class="content" style="width: 500px">
              <img :src="camera_url" style="width:500px;height:300px" />
              <!--my-video /-->
              <!--div
              :class="{ 'footer-fullScreen': isFullScreen }"
              ref="footer"
              class="app-footer"
            >
              <my-footer /> 
            </div-->
            </div>
          </div>
          <div
            class="panelm frostedGlass"
            size="small"
            title="信息"
            style="margin: 20px"
          >
            <div class="title">信息</div>
            <div class="redesign_item content" style="display: block;">
              <!--a-checkbox @change="onChange"> 车辆记录 </a-checkbox>
            <a-checkbox @change="onChange"> 违章记录 </a-checkbox-->
              <div
                style="display:flex;white-space:nowrap;overflow:auto;width:500px"
              >
                <div
                :class="{'redfrostedGlass':item.state=='超速','frostedGlass2':item.state=='正常'}"
                  class="panelm  animated bounce fadeInUp"
                  v-for="item in state_list"
                  :key="item.index"
                  style="min-width:200px;height:220px;margin:10px"
                  
                  
                >
                  <div class="title">状态:{{ item.state }}</div>
                  <div class="content">
                    <div>
                      <img 
                        style="width:160px;height:130px;"
                        :src="item.img"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div style="min-width:200px;height:220px;margin:10px">
                  <div style="width:160px;height:130px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="panelm frostedGlass"
            size="small"
            title="信息"
            style="margin: 20px"
          >
            <div class="title">信息</div>
            <div class="content">
              <a-descriptions bordered>
                <a-descriptions-item label="摄像头ID：">
                  {{ camera_info.camera_id }}
                </a-descriptions-item>
                <a-descriptions-item label="所在地区：">
                  {{ camera_info.area }}
                </a-descriptions-item>
                <a-descriptions-item label="正确朝向：">
                  {{ camera_info.side }}
                </a-descriptions-item>
                <a-descriptions-item label="最大限速：">
                  {{ camera_info.max_speed }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </div>
          <div
            class="panelm frostedGlass"
            size="small"
            title="车流量统计"
            style="margin: 20px"
          >
            <div class="title">车流量统计</div>
            <div class="content">
              <a-table
                size="small"
                :rowClassName="
                  (record, index) => (index % 2 === 1 ? 'table-striped' : null)
                "
                :columns="columns"
                :data-source="datasets"
                :pagination="false"
                style="width: 600px"
              >
                <a slot="name" slot-scope="text">{{ text }}</a>
              </a-table>
            </div>
          </div>

          <div
            class="panelm frostedGlass"
            size="small"
            title="图形化显示"
            style="margin: 20px"
          >
            <div class="title">图形统计</div>
            <div class="content">
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
            </div>
          </div>
        </div>
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
import * as echarts from "echarts";
import "./urls";
//import "echarts/map/js/china";
import {chi} from "./china"
import Map, { optionm } from "./mymap";
import $ from "jquery";
import OpenDialog from "./api/OpenDialog";
import WindowUtil from "./api/window";
import { log } from "util";
import { Axis } from "echarts";
import Axios from "axios";
import { get_camera_info, get_car_statistics, get_state_list } from "./urls";
const openDialog = new OpenDialog();
const winUtil = new WindowUtil();
const { ipcRenderer } = require("electron");
chi(echarts);
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

export default {
  name: "player",
  data() {
    return {
      camera_url_native: "http://127.0.0.1:5000/video_feed",
      camera_url: "http://127.0.0.1:5000/video_feed?camera_id=1",
      show_info: true,
      isShowArrow: false,
      playListHeight: null,
      showLine: true,
      state_list: [],
      showIcon: false,
      camera_info: {},
      timer: null,
      columns,
      datasets: [
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
      ],
      jilu,
      size: "年",
    };
  },
  mounted() {
    //console.log($(".map .geo"));
    console.log(echarts);

    var ctx1 = document.getElementById("geo");
    var myecharts = echarts.init(ctx1);
    myecharts.setOption(optionm);
    this.choose_camera("2");
    var ctx2 = document.getElementById("myChart2");
    var myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
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
      },
    });
    //this.WebSocketTest();
    this.count = 0;
    this.initPlayListHeight();
    this.mouseMoveTimer = null;
    this.FullScreenTimer = null;
    window.addEventListener("resize", this.initPlayListHeight);
    this.initGlobalShortcut();

    let video = this.$refs.video;
    video.ondragenter = video.ondragover = video.ondragleave = function() {
      // 阻止默认事件
      return false;
    };
    // 释放文件
    video.addEventListener("drop", this.onDrop);

    this.$nextTick(() => {
      ipcRenderer.send("update");
    });
  },
  methods: {
    ...mapMutations([
      "setCurrentTime",
      "setInWidth",
      "setIsVolumeOn",
      "setSpeed",
    ]),
    WebSocketTest() {
      if ("WebSocket" in window) {
        alert("您的浏览器支持 WebSocket!");
        // 打开一个 web socket
        var ws = new WebSocket("ws://localhost:5000/chat");
        ws.onopen = function() {
          ws.send("发送数据");
        };
        ws.onmessage = function(evt) {
          var received_msg = evt.data;
          alert("数据已接收...");
        };
        ws.onclose = function() {
          alert("连接已关闭...");
        };
      } else {
        alert("您的浏览器不支持 WebSocket!");
      }
    },
    async choose_camera(camera_id) {
      this.show_info = true;
      this.camera_url = this.camera_url_native + "?camera_id=" + camera_id;
      let res = await get_camera_info({ camera_id: camera_id });
      this.camera_info = res.data;
      let that = this;
      that.state_list = [];
      function fn() {
        get_car_statistics({ camera_id: camera_id }).then((res) => {
          res.data.forEach((element, index) => {
            that.datasets[index].l1 = element[0];
            that.datasets[index].l2 = element[1];
            that.datasets[index].l3 = element[2];
            that.datasets[index].l4 = element[3];
          });
        });
        get_state_list({ camera_id: camera_id }).then((res) => {
          if (res.data["code"] == 0) {
            res.data["img"] =
              "data:image/jpg;base64," + res.data["img"].slice(2, -1);
            that.state_list.unshift(res.data);
          }
        });
      }
      if (!this.timer) this.timer = setInterval(fn, 1500);
    },
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
      handler: function(newVal) {
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

<style>
.ant-table-striped :deep(.table-striped) {
  background-color: #fafafa;
}
.ant-table {
  color: #007fd4 !important;
}
.ant-table-thead > tr > th {
  color: #007fd4 !important;
}
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
}
.frostedGlass {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(10px);
  background-color: #101129;
  background: rgba(10, 11, 29, 0.48);
  
}

.redfrostedGlass {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(10px);
  background-color: #101129;
  background:rgba(253, 10, 51, 0.48)
  
}
.frostedGlass2 {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.18);
}

input[type="checkbox"]:after {
  position: absolute;
  width: 10px;
  height: 15px;
  top: 0;
  content: " ";
  background-color: #ff0000;
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 3px;
}

.frostedGlass3 {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.78);
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
  font-size: 13px;
  display: flex;
  .label {
    width: 80px;
  }
}
/*.redesign_item:hover {
  outline: 1px solid rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0.12);
}*/
.ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: inherit !important;
  color: #007fd4 !important;
}
.ant-descriptions-item-content {
  color: #007fd4 !important;
}
.ant-checkbox-wrapper {
  color: #007fd4 !important;
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
.camera_item {
  cursor: pointer;
}
.camera_item:hover {
  background-color: rgba(68, 61, 61, 0.82);
}
.ant-row {
  display: flex !important;
}

.panelm {
  /* 边框 */
  color: white;
  box-sizing: border-box;
  border: 2px solid red;
  border-image: url(./assets/border.png) 51 38 21 132;
  border-width: 2.125rem 1.583rem 0.875rem 5.5rem;
  position: relative;
  margin-bottom: 0.833rem;
}
.panelm:hover {
  outline: 1px solid rgba(34, 28, 28, 0.12);
  background-color: rgba(44, 39, 39, 0.82);
}
.panelm .title {
  /* 装内容 */
  /* height: 60px; */
  margin-top: -2.125rem;
  margin-right: -1.583rem;
  margin-bottom: 5px;
  margin-left: -5.5rem;
  padding: 1rem 1.5rem;
  color: white;
  border-bottom: #0164a7 2px solid;
}
.panelm .content {
  /* 装内容 */
  /* height: 60px; */
  margin-right: -1.583rem;
  margin-bottom: -0.875rem;
  margin-left: -5.5rem;
  padding: 1rem 1.5rem;
  color: #007fd4;
}

</style>