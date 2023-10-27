<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";


const searchText = ref('');

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

};
const onCancel = () => {
  searchText.value = '';
  //取消时一般搜过了，所以要重新给一份数据
  tagList.value = originTagList;
};

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
 * 执行搜索后跳转
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags:activeIds.value
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
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
  <van-button block type="primary" @click="doSearchResult">搜索</van-button>
</div>


</template>

<style scoped>

</style>