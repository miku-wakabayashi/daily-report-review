<template>
  <div class="display-wrapper">
    <div class="-container">
      <h2>日報レビュー担当を割り振ります</h2>
      <div class="-select-number">
        <h3 class="-select-number-title">人数を選択するんだなも</h3>
        <el-select v-model="reviewersNumber" class="-el-select-number">
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
        <h3 class="-select-members-title">レビュアーを選択するんだなも</h3>
        <div v-for="n in reviewersNumber" :key="n" class="-reviewer">
          <select-reviewer
            :reviewers="reviewers"
            @reviewer-selected="reviewerSelectedEvent($event, n)"
          >
          </select-reviewer>
        </div>
      </div>
      <el-button 
        @click="shuffleReviewees"
        :disabled="buttonDisabled"
        class="-shuffle-button"
      >
        レビュアーを確定
      </el-button>
      <div v-if="showResult" class="-show-result">
          <p class="-pairs-reviewer -title">レビュアー</p>
          <p class="-pairs-reviewees -title">担当</p>
        <div v-for="pair in pairs" :key="pair.reviewerName" class="-pairs">
          <p class="-pairs-reviewer -name">{{pair.reviewerName}}</p>
          <p class="-pairs-reviewees -name">{{pair.revieweesName.join(', ')}}</p>
        </div>
      </div>
    </div>
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
      todayReviewers: [''],
      reviewees: ['石田 雄仁', '上野 奈於', '岡崎 悠', '岡田 真夏斗', '小澤 洸太', '梶 尚洋', '河岡 真愛', '岸田 芽依', '工藤 泰斗', '斉藤 はるか', '坂元 友里乃', '佐藤 暖', '下原口 莉貴', '須田 瑞季', '関口 佳那', '多岐 正行', '竹崎 岳人', '羽田野 裕人', '早志 栄亮', '林 尚也', '廣嶋 美甫', '福飯 雄太', '松縄 竜弥', '籾山瑞希','山岡 敬汰'],
      pairs: [],
      buttonDisabled: true,
      showResult: false
    }
  },
  watch: {
    reviewersNumber: function() {
      // レビュアーの人数に配列の長さを合わせる
      while (this.todayReviewers.length !== this.reviewersNumber) {
        if (this.todayReviewers.length < this.reviewersNumber) {
          this.todayReviewers.push('')
        } else if (this.todayReviewers.length > this.reviewersNumber) {
          this.todayReviewers.pop()
        }
      }
      this.showResult = false
      this.checkReviewerSecected()
    }
  },
  methods: {
    reviewerSelectedEvent(name, n) {
      this.todayReviewers[n-1] = name
      this.checkReviewerSecected()
    },
    // ランダムで誰に割り振るかを決める
    shuffleReviewees() {
      // pairsを初期化
      this.pairs = []
      // レビュアーを設定
      this.todayReviewers.forEach((reviewer) => {
        const pair = {
          reviewerName: reviewer,
          revieweesName: []
        }
        this.pairs.push(pair)
      });
      // レビューイの人数
      let revieweesCount = this.reviewees.length
      // レビューイをランダムでを並び替え
      while (revieweesCount) {
        let n = Math.floor( Math.random() * revieweesCount )
        let m = this.reviewees[--revieweesCount]
        this.reviewees[revieweesCount] = this.reviewees[n]
        this.reviewees[n] = m
      }
      // レビューイのカウンター
      let i = 0
      // 何番目から順に割り振るかを決める
      let reviewerIndex = Math.floor( Math.random() * this.todayReviewers.length )
      // 全員が割り振られるまで繰り返す
      while (i < this.reviewees.length) {
        this.pairs[reviewerIndex].revieweesName.push(this.reviewees[i])
        i += 1
        reviewerIndex += 1
        // レビュアーの最後まで行ったら先頭に戻る
        if (reviewerIndex === this.todayReviewers.length) {
          reviewerIndex = 0
        }
      }
      this.showResult = true
    },
    // レビュアーが人数分選択されているかのチェック
    checkReviewerSecected() {
      if (this.todayReviewers.some((name) => name === '')) {
        this.buttonDisabled = true
      } else {
        this.buttonDisabled = false
      }
    }
  }
}
</script>

<style scoped>
.display-wrapper {
  display: grid;
  grid-template-columns: repeat(12,1fr);
}
.-container {
  grid-column: 2/12
}
.-el-select-number {
  width: 200px;
}
.-shuffle-button {
  width: 200px;
  margin-top: 24px;
}
.-show-result {
  display: grid;
  grid-template-columns: repeat(4,1fr);
}
.-pairs {
  display: grid;
  grid-column: 1/5;
  grid-template-columns: repeat(4,1fr);
}
.-pairs-reviewer {
  grid-column: 1/2;
}
.-pairs-reviewees {
  grid-column: 2/5;
}

@media screen and (max-width: 768px) {
  .display-wrapper {
    display: block
  }
  .-container {
    padding: 16px;
  }
}

</style>
