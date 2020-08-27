<template>
  <div id="scrollup" class="my-back-top" title="回到顶部" @click="goUp">
    <i class="el-icon-caret-top" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  filters: {},
  data() {
    return {
      // 从vuex设置值
      scrollVal: 0,
      // 从vuex触发滚动
      scrollState: 0,
    };
  },
  mounted() {
    this.contentOnScroll();
  },
  destroy() {
    // 组件销毁后，关闭滚动监听
    const $content = document.getElementById("content");
    $content.onscroll = null;
  },

  methods: {
    // 容器滚动监听
    // 必须要等content容器加载完成后才初始化滚动监听
    contentOnScroll() {
      const $content = document.getElementById("content");
      $content.onscroll = function(e) {
        //变量t是滚动条滚动时，距离顶部的距离
        const t = $content.scrollTop,
          height = window.screen.availHeight;
        const $scrollup = document.getElementById("scrollup");
        //当滚动到距离顶部200px时，返回顶部的锚点显示
        if (t >= height) {
          $scrollup.style.display = "block";
        } else {
          //恢复正常
          $scrollup.style.display = "none";
        }
      };
    },

    // 回到顶部
    goUp() {
      const elTop = 0;
      this.scrollFunc(elTop, "linner");
    },

    /**
     * 滚动函数
     * @param elTop Number 目标元素的scrollTop
     * @param type String 滚动类型 默认为slow : 减速滚动  quicken : 加速滚动  linner : 匀速滚动
     */
    scrollFunc(elTop, type) {
      // 获取目标元素的scrollTop
      var docuTop = document.getElementById("content").scrollTop;
      // 计算目标元素scrollTop与当前文档scrollTop差值
      var diff = elTop - docuTop;
      // 速度 定时器滚动的最小距离
      var speed = 1;
      // 时间 定时器滚动的时间
      var timer = 10;

      // 获取差值数组
      var speedList = this.getNumList(diff, speed, 5);

      if (type === "quicken") {
        speedList = speedList.reverse();
      } else if (type === "slow") {
        speedList;
      } else if (type === "linner") {
        speedList = speedList.map((item) => Math.abs(diff) / speedList.length);
      }

      var i = 0;

      scroll(docuTop, i);

      // 滚动函数
      function scroll(docuTop, i) {
        setTimeout(function() {
          if (diff > 0) {
            // 最后一次滚动的距离判定
            if (i < speedList.length) {
              document.getElementById("content").scrollTop =
                docuTop + speedList[i];
              i++;
              scroll(document.getElementById("content").scrollTop, i);
            } else {
              document.getElementById("content").scrollTop = elTop;
            }
          } else {
            // 最后一次滚动的距离判定
            if (i < speedList.length) {
              document.getElementById("content").scrollTop =
                docuTop - speedList[i];
              i++;
              scroll(document.getElementById("content").scrollTop, i);
            } else {
              document.getElementById("content").scrollTop = elTop;
            }
          }
        }, timer);
      }
    },

    /**
     * 获取差值数组
     * @params Num Number 差值目标
     * @params Min Number 差值目标最小范围值
     * @params Dvalue Number 差值比例
     * */
    getNumList(Num, Min, Dvalue) {
      var NumList = [];

      except(Math.abs(Num), Min);
      // 除以二
      function except(nowNum, Min) {
        if (nowNum > Min) {
          NumList.push(nowNum / Dvalue);
          var remainder = nowNum - nowNum / Dvalue;
          except(remainder, Min);
        } else {
          NumList.push(nowNum);
        }
      }
      return NumList;
    },
  },
};
</script>

<style lang="less" scope>
.my-back-top {
  position: fixed;
  display: none;
  right: 24px;
  bottom: 24px;
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1890ff;
  color: #fff;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.8;

  &:active {
    opacity: 0.7;
  }
}
</style>
