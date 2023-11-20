<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";

const show = ref(true);
const close = () => {
  show.value = false;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

//原始数组
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
  {
    text: '编程语言',
    children: [
      { text: 'java', id: 'java' },
      { text: 'cpp', id: 'cpp' },
      { text: 'python', id: 'python' },
      { text: 'go', id: 'go' },
      { text: 'php', id: 'php' },
    ],
  },

];
// 标签列表,封装成响应式对象
let tagList = ref(originTagList);

//移除标签
const doClose = (tag)=>{
 activeIds.value = activeIds.value.filter(item =>{
   return  item !== tag;
  })
}
const router = useRouter()
/**
 * 选择tag确认后跳转
 */
const doSelectTags = () => {
  router.push({
    path: '/user/register',
    query: {
      tags:activeIds.value
    }
  })
}
</script>

<template>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row gutter="16" style="padding: 0 16px" >
      <van-col v-for="tag in activeIds">
        <van-tag  closeable size="small" type="primary" @close="doClose(tag)">
          {{ tag }}
        </van-tag>
      </van-col>
    </van-row>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
<div style="padding: 12px">
  <van-button block type="primary" @click="doSelectTags">选好了</van-button>
</div>


</template>

<style scoped>

</style>