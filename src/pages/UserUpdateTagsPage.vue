<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

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
      {text: '男', id: '男'},
      {text: '女', id: '女'},
      {text: '保密', id: '保密'}
    ],
  },
  {
    text: '年级',
    children: [
      {text: '高一', id: '高一'},
      {text: '高二', id: '高二'},
      {text: '高三', id: '高三'},
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '研究生', id: '研究生'},
      {text: '已工作', id: '已工作'},
    ],
  },
  {
    text: "编程",
    children: [
      {text: "Java", id: "Java"},
      {text: "Python", id: "Python"},
      {text: "C++", id: "C++"},
      {text: "JavaScript", id: "JavaScript"},
      {text: "Ruby", id: "Ruby"},
      {text: "PHP", id: "PHP"},
      {text: "Swift", id: "Swift"},
      {text: "Objective-C", id: "Objective-C"},
      {text: "C#", id: "C#"},
      {text: "Go", id: "Go"},
      {text: "Kotlin", id: "Kotlin"},
      {text: "TypeScript", id: "TypeScript"},
      {text: "Rust", id: "Rust"},
      {text: "Lua", id: "Lua"},
      {text: "Perl", id: "Perl"},
      {text: "Scala", id: "Scala"},
      {text: "Dart", id: "Dart"},
      {text: "R", id: "R"},
      {text: "MATLAB", id: "MATLAB"},
      {text: "Haskell", id: "Haskell"},
      {text: "Julia", id: "Julia"},
      {text: "Groovy", id: "Groovy"},
      {text: "Shell", id: "Shell"},
      {text: "Assembly", id: "Assembly"},
      {text: "F#", id: "F#"},
      {text: "Clojure", id: "Clojure"},
      {text: "Erlang", id: "Erlang"},
      {text: "Lisp", id: "Lisp"},
      {text: "Prolog", id: "Prolog"},
      {text: "Smalltalk", id: "Smalltalk"}
    ]
  },
  {
    text: '兴趣爱好',
    children: [
      {text: '阅读', id: '阅读'},
      {text: '旅游', id: '旅游'},
      {text: '游戏', id: '游戏'},
      {text: '音乐', id: '音乐'},
      {text: '电影', id: '电影'},
      {text: '美食', id: '美食'},
      {text: '健身', id: '健身'},
      {text: '编程', id: '编程'},
      {text: '摄影', id: '摄影'},
      {text: '绘画', id: '绘画'},
      {text: '写作', id: '写作'},
      {text: '手工', id: '手工'},
      {text: '园艺', id: '园艺'},
      {text: '钓鱼', id: '钓鱼'},
      {text: '篮球', id: '篮球'},
      {text: '足球', id: '足球'},
      {text: '棒球', id: '棒球'},
      {text: '乒乓球', id: '乒乓球'},
      {text: '羽毛球', id: '羽毛球'},
      {text: '网球', id: '网球'}
    ]
  }
];
// 标签列表,封装成响应式对象
let tagList = ref(originTagList);

//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}
const router = useRouter()
/**
 * 选择tag确认后跳转
 */
const doUpdateTags = async () => {
  let res = await myAxios.put("/user/update/tags", activeIds.value);
  if (res) {
    await router.replace("/user")
  } else {
    Toast.fail("Tag修改错误");
  }

}
</script>

<template>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
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
    <van-button block type="primary" @click="doUpdateTags">更新标签</van-button>
  </div>


</template>

<style scoped>

</style>