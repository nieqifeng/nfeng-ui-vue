<template>
  <div class="img-preview" v-if="imgState.show">
    <div class="img-preview-content">
      <img
        width="32"
        :src="loadingSvg"
        class="img-preview-image"
        v-show="imgState.status === 'loading'"
      />
      <img
        class="img-preview-image"
        :style="getImageStyle"
        :src="imgState.currentUrl"
        v-show="imgState.status === 'done'"
      />
      <div class="img-preview__close" @click="handleClose">
        <a-icon class="img-preview__close-icon" type="close" />
      </div>
      <div class="img-preview__index">
        {{ imgState.currentIndex + 1 }} / {{ imageList.length }}
      </div>
      <div class="img-preview__controller">
        <div class="img-preview__controller-item" @click="scaleFunc(-0.15)">
          <img :src="unScaleSvg" />
        </div>
        <div class="img-preview__controller-item" @click="scaleFunc(0.15)">
          <img :src="scaleSvg" />
        </div>
        <div class="img-preview__controller-item" @click="resume">
          <img :src="resumeSvg" />
        </div>
        <div class="img-preview__controller-item" @click="rotateFunc(-90)">
          <img :src="unRotateSvg" />
        </div>
        <div class="img-preview__controller-item" @click="rotateFunc(90)">
          <img :src="rotateSvg" />
        </div>
      </div>
      <div class="img-preview__arrow left" @click="handleChange('left')">
        <img :src="left" width="50" />
      </div>
      <div class="img-preview__arrow right" @click="handleChange('right')">
        <img :src="right" width="50" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import left from "@/assets/images/left.png";
import right from "@/assets/images/right.png";
import resumeSvg from "@/assets/svg/preview/resume.svg";
import rotateSvg from "@/assets/svg/preview/p-rotate.svg";
import scaleSvg from "@/assets/svg/preview/scale.svg";
import unScaleSvg from "@/assets/svg/preview/unscale.svg";
import loadingSvg from "@/assets/images/loading.svg";
import unRotateSvg from "@/assets/svg/preview/unrotate.svg";

interface ImgState {
  currentUrl: string;
  imgScale: number;
  imgRotate: number;
  imgTop: number;
  imgLeft: number;
  currentIndex: number;
  status: string;
  moveX: number;
  moveY: number;
  show: boolean;
}

@Component<Preview>({
  watch: {
    show(val: boolean) {
      this.imgState.show = val;
      if (val) {
        this.init();
      }
    },
    index(val: number) {
      this.imgState.currentIndex = val;
    },
  },
})
export default class Preview extends Vue {
  @Prop({ default: () => [], type: Array })
  imageList;
  @Prop({ default: false, type: Boolean })
  show;
  @Prop({ default: 0, type: Number })
  index;

  left = left;
  right = right;
  resumeSvg = resumeSvg;
  rotateSvg = rotateSvg;
  scaleSvg = scaleSvg;
  unScaleSvg = unScaleSvg;
  loadingSvg = loadingSvg;
  unRotateSvg = unRotateSvg;
  imgState: ImgState = {
    currentUrl: "",
    imgScale: 1,
    imgRotate: 0,
    imgTop: 0,
    imgLeft: 0,
    status: "loading",
    currentIndex: 0,
    moveX: 0,
    moveY: 0,
    show: false,
  };

  // 获取图片样式
  get getImageStyle() {
    const { imgScale, imgRotate, imgTop, imgLeft } = this.imgState;
    return {
      transform: `scale(${imgScale}) rotate(${imgRotate}deg)`,
      marginTop: `${imgTop}px`,
      marginLeft: `${imgLeft}px`,
    };
  }

  // 初始化
  init() {
    const { index, imageList } = this;
    this.imgState.currentIndex = index;
    this.handleIChangeImage(imageList[index]);
  }

  // 重置
  initState() {
    this.imgState.imgScale = 1;
    this.imgState.imgRotate = 0;
    this.imgState.imgTop = 0;
    this.imgState.imgLeft = 0;
  }

  // 缩放函数
  scaleFunc(num: number) {
    if (this.imgState.imgScale <= 0.2 && num < 0) return;
    this.imgState.imgScale += num;
  }

  // 旋转图片
  rotateFunc(deg: number) {
    this.imgState.imgRotate += deg;
  }

  // 更换图片
  handleIChangeImage(url: string) {
    this.imgState.status = "loading";
    this.imgState.currentUrl = url;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      this.imgState.status = "done";
    };
    img.onerror = () => {
      this.imgState.status = "fail";
    };
  }

  // 关闭
  handleClose(e: MouseEvent) {
    e && e.stopPropagation();
    // this.imgState.show = false;
    this.$emit("update:show", false);
    // 移除火狐浏览器下的鼠标滚动事件
    // document.body.removeEventListener('DOMMouseScroll', scrollFunc);
    // 恢复火狐及Safari浏览器下的图片拖拽
    document.ondragstart = null;
  }

  // 图片复原
  resume() {
    this.initState();
  }

  // 上一页下一页
  handleChange(direction: "left" | "right") {
    const { currentIndex } = this.imgState;
    const { imageList } = this;
    if (direction === "left") {
      this.imgState.currentIndex--;
      if (currentIndex <= 0) {
        this.imgState.currentIndex = imageList.length - 1;
      }
    }
    if (direction === "right") {
      this.imgState.currentIndex++;
      if (currentIndex >= imageList.length - 1) {
        this.imgState.currentIndex = 0;
      }
    }
    this.handleIChangeImage(imageList[this.imgState.currentIndex]);
  }
}
</script>

<style lang="less" scoped>
.img-preview {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  user-select: none;

  &-content {
    display: flex;
    width: 100%;
    height: 100%;
    color: #fff;
    justify-content: center;
    align-items: center;
  }

  &-image {
    cursor: pointer;
    transition: transform 0.3s;
  }

  &__close {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 80px;
    height: 80px;
    overflow: hidden;
    color: #fff;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: all 0.2s;

    &-icon {
      position: absolute;
      top: 46px;
      left: 16px;
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  &__index {
    position: absolute;
    bottom: 5%;
    left: 50%;
    padding: 0 22px;
    font-size: 16px;
    background: rgba(109, 109, 109, 0.6);
    border-radius: 15px;
    transform: translateX(-50%);
  }

  &__controller {
    position: absolute;
    bottom: 10%;
    left: 50%;
    display: flex;
    width: 260px;
    height: 44px;
    padding: 0 22px;
    margin-left: -139px;
    background: rgba(109, 109, 109, 0.6);
    border-radius: 22px;
    justify-content: center;

    &-item {
      display: flex;
      height: 100%;
      padding: 0 9px;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.2);
      }

      img {
        width: 1em;
      }
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    font-size: 28px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    &.left {
      left: 50px;
    }

    &.right {
      right: 50px;
    }
  }
}
.nf-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  filter: alpha(opacity=50);
  .nf-modal {
    position: relative;
    top: 100px;
    width: 800px;
    margin: 0 auto;
    padding-bottom: 24px;
  }
  .nf-modal-body {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 24px;
  }
  .left {
    position: absolute;
    top: 50%;
    left: 50px;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .right {
    position: absolute;
    top: calc(50% - 40px);
    right: 40px;
    width: 80px;
    height: 80px;
    // background-image: url('./right.png');
    background-size: cover;
    cursor: pointer;
  }
  .total {
    position: absolute;
    width: 100%;
    bottom: 40px;
    text-align: center;
    color: #fff;
  }
}

.example {
  text-align: center;
  // background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>
