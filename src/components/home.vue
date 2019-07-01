<template>
    <div class="home">
        <div class="log_box">
            <img src="../common/image/logo.png" class="logo" alt="">
        </div>
        <div class="input_box">
            <span class="tag">
                信誉情报11
            </span>
            <input type="text" v-model="search.indicator" placeholder="请输入IP、URL、域名、HASH" class="search_input">
            <button class="input_btn" @click="search_btn">
                <!-- <img src="../common/image/search_icon.png" alt=""> -->
            </button>
        </div>
        <div class="swiper_box">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in news_array" @click="silder_click(item)">
                        <div class="swiper_img">
                            <img :src="item.raw_picture" alt="">
                        </div>
                        <p class="swiper_p_tilte">
                            {{item.title}}
                        </p>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <el-button :plain="true" @click="open4" v-if="false">错误</el-button>
    </div>
</template>
<style  lang="less">
.home {
  color: #000;
  background: rgb(248, 248, 248);
  padding-top: 100px;
  padding-bottom: 100px;
  .log_box {
    height: 82px;
    margin: 0px 0 72px 0;
    .log {
      width: 242px;
      height: 82px;
    }
  }

  .input_box {
    position: relative;
    height: 64px;
    width: 820px;
    margin: 0 auto;
    .tag {
      position: absolute;
      top: -40px;
      display: block;
      width: 98px;
      height: 42px;
      background: #0070ff;
      border-radius: 4px 4px 0 0;
      border: 2px;
      color: #fff;
      line-height: 42px;
      font-size: 14px;
    }
    .search_input {
      height: 64px;
      width: 748px;
      background: #fff;
      border: 2px solid #0070ff;
      border-radius: 4px 0 0 4px;
      float: left;
      font-size: 16px;
      padding-left: 12px;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #bbb;
    }
    .input_btn {
      width: 72px;
      height: 64px;
      background: #0070ff;
      float: left;
      margin-left: -2px;
      border: 2px;
      cursor: pointer;
      border-radius: 0 3px 3px 0;
    }
  }
  .swiper_box {
    width: 100%;
    height: 300px;
    margin-top: 72px;
  }
  .swiper-container {
    padding-top: 10px;
    width: 1272px;
    height: 280px;
    margin: 0 auto;
  }
  .swiper-slide {
    cursor: pointer;
    width: 288px;
    height: 210px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    .swiper_img {
      height: 142px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px 6px 0 0;
      }
    }
    .swiper_p_tilte {
      padding: 15px;
      font-size: 14px;
      color: #333333;
      text-align: left;
    }
  }
}
</style>
<script>
import Swiper from 'swiper';
export default {
    name: 'home',
    data() {
        return {
            search: {
                indicator: ''
            },
            news_array: []
        }
    },
    created() {
        console.log(this.$route.query.name);
    },
    mounted() {
        console.log(this.$route.query.name);
        this.get_new();
    },
    methods: {
        get_new() {
            // this.$axios.get('https://47.105.196.251/site/safety-news')
            this.$axios.get('/site/safety-news')
                .then(response => {
                    if (response.data.status == 'success') {
                        this.news_array = response.data.data;
                        this.initSwiper();
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        },
        initSwiper() {
            this.$nextTick(() => {
                var swiper = new Swiper(".swiper-container", {
                    autoplay: {
                        disableOnInteraction: false
                    },//可选选项，自动滑动
                    loop: true,
                    speed: 1000,
                    spaceBetween: 30,
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        dragSize: 30,
                        // type: 'progress',
                    },
                });
            })
        },
        silder_click(item) {
            console.log(item);
            this.$router.push({ path: '/news', query: { shopid: JSON.stringify(item) } })
        },
        open4() {
            this.$message.error('没有搜索到信誉情报详情');
        },
        search_btn() {
            if (this.search.indicator == '') {
            } else {
                // this.$axios.get('https://47.105.196.251/site/reputation', {
                this.$axios.get('/site/reputation', {
                    params: {
                        indicator: this.search.indicator
                        // indicator: '185.234.217.139'
                    },
                }
                )
                    .then(response => {
                        console.log(response);
                        if (response.data.status == "success") {
                            if (response.data.data.result == null) {
                                this.open4();
                            } else {
                                this.$router.push({ path: '/detail', query: { shopid: JSON.stringify(response.data.data.result) } })
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
}
</script>


