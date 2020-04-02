<template>
  <div>
    <h2>日報レビュー担当を割り振ります</h2>
    <div class="-select-number">
      <h3 class="-select-number-title">人数を選択するんだなも</h3>
      <el-select v-model="reviewersNumber">
        <el-option
          v-for="reviewer in reviewers"
          :key="reviewer.id"
          :label="reviewer.id + '人'"
          :value="reviewer.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="-select-members">
      <h3 class="-select-members-title">レビュアー を選択するんだなも</h3>
      <div v-for="n in reviewersNumber" :key="n" class="-reviewer">
        <select-reviewer
          :reviewers="reviewers"
          @reviewer-selected="reviewerSelectedEvent($event, n)"
        >
        </select-reviewer>
      </div>
    </div>
    <el-button @click="shuffleReviewees">確定</el-button>
    <div>{{pairs}}</div>
  </div>
</template>

<script>
import SelectReviewer from '@/components/SelectReviewer.vue'

export default {
  name: 'App',
  components: {
    SelectReviewer
  },
  data() {
    return {
      reviewers: [
        {
          id: 1,
          name: '安西 巧'
        },
        {
          id: 2,
          name: '池田 孫武'
        },
        {
          id: 3,
          name: '井上 和穂'
        },
        {
          id: 4,
          name: '大貫 駿介'
        },
        {
          id: 5,
          name: '海外 慎太郎'
        },
        {
          id: 6,
          name: '神谷 有梨菜'
        },
        {
          id: 7,
          name: '岸 駿太郎'
        },
        {
          id: 8,
          name: '工藤 杏奈'
        },
        {
          id: 9,
          name: '藤原 咲花'
        },
        {
          id: 10,
          name: '丸山 貴也'
        },
        {
          id: 11,
          name: '御園生 春妃'
        },
        {
          id: 12,
          name: '村上 嘉奈子'
        },
        {
          id: 13,
          name: '山下 純'
        },
        {
          id: 14,
          name: '若林 美紅'
        },
      ],
      reviewersNumber: 0,
      todayReviewers: [],
      reviewees: ['石田 雄仁', '上野 奈於', '岡崎 悠', '岡田 真夏斗', '小澤 洸太', '梶 尚洋', '河岡 真愛', '岸田 芽依', '工藤 泰斗', '斉藤 はるか', '坂元 友里乃', '佐藤 暖', '下原口 莉貴', '須田 瑞季', '関口 佳那', '多岐 正行', '竹崎 岳人', '羽田野 裕人', '早志 栄亮', '林 尚也', '廣嶋 美甫', '福飯 雄太', '松縄 竜弥', '籾山瑞希','山岡 敬汰'],
      pairs: []
    }
  },
  watch:{
    reviewersNumber: function() {
      this.todayReviewers = []
    }
  },
  methods: {
    reviewerSelectedEvent(name, n) {
      this.todayReviewers[n-1] = name
    },
    shuffleReviewees() {
      this.todayReviewers.forEach((reviewer) => {
        const pair = {
          reviewerName: reviewer,
          revieweesName: []
        }
        this.pairs.push(pair)
      });
      let i = 0
      let reviewerIndex = 0
      while(i < this.reviewees.length) {
        reviewerIndex = Math.floor( Math.random() * this.todayReviewers.length )
        if (this.pairs[reviewerIndex].revieweesName.length > this.reviewees.length / this.todayReviewers.length) {
          continue
        }
        this.pairs[reviewerIndex].revieweesName.push(this.reviewees[i])
        i += 1
      }
    }
  }
}
</script>

<style scoped>
</style>
