<template>
<main class="container-maintain">
    <div class="container">
      <div class="card">
        <h3 class="mb-4 pb-4" style="border-bottom: 2px solid gray">
					<router-link :to="localePath(`/educations/${userRoadmap.id || userRoadmap._id}`, $i18n.locale)">{{ userRoadmap.title }}</router-link>
           > <router-link :to="localePath(`/educations/${userRoadmap.id || userRoadmap._id}?course=${course.id || course._id}`, $i18n.locale)"> {{ course.title }} </router-link>
					 > {{ test ? test.name : 'Test' }}
        </h3>
        <el-container>
        <loading-screen v-if="isLoading" :loading="isLoading" />
        <div v-else style="width: 100%">
          <div v-if="answerSheet">
            <test-doing-area :answers="answers" :test="test" :answer-sheet="answerSheet"></test-doing-area>
          </div>
          <div v-else>
            <el-card v-if="test" class="cool-card">
              <div slot="header" class="header">
                <h3>{{ test.name }}</h3>
              </div>
							<el-alert
								v-if="!testAvailable"
								title="Vui lòng hoàn thành tất cả module của khóa học trước khi thực hiện bài test"
								type="error"
								:closable="false">
							</el-alert>
              <el-row :gutter="20" class="body">
                <el-col :span="24">
                  <el-descriptions title="Chi tiết bài test" column={1}>
                    <el-descriptions-item label="Số câu hỏi">
                      {{ test.questions ? test.questions.length : 0 }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Thời gian">
                      {{ test.time }} phút
                    </el-descriptions-item>
                  </el-descriptions>
									<el-alert
										v-if="testAvailable"
										title="Bạn chỉ có thể làm bài test 1 lần duy nhất, hãy chắc chắn đã ôn kỹ trước khi làm bài"
										type="warning"
										:closable="false">
									</el-alert>
                </el-col>
                <el-col v-if="testAvailable" :span="24" class="actions">
                  <el-button
                    :loading="isLoading"
										:disabled="!testAvailable"
										:type="testAvailable ? 'primary' : 'info'"
										icon="el-icon-play"
                    class="start-button"
                    @click="startTest"
                  >
                    Bắt đầu bài test
                  </el-button>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
      </el-container>
      </div>
    </div>
</main>
</template>

<script>
import LoadingScreen from '@/components/LoadingScreen.vue';
import TestDoingArea from '@/components/TestDoingArea.vue';

export default {
  name: 'TestDetail',
  components: {
    LoadingScreen,
    TestDoingArea,
  },
  layout: 'auth',
  data() {
    return {
      test: null,
      answerSheet: null,
      isLoading: false,
      id: this.$route.params.id,
      userRoadmap: {},
      course: {},
      answers: [],
			testAvailable: false,
    };
  },
  created() {
    this.getTest();
  },

  methods: {
    async getTest() {
      try {
        const { data } = await this.$repositories.candidatesApply.getTestById(this.$route.params.educationId, this.$route.params.courseId, this.$route.params.testId);
        this.test = data.test;
        this.userRoadmap = data.userRoadmap;
        this.course = data.course
        this.testAvailable = data.testAvailable
        if (this.test.isSorted) {
          this.test.questions.sort((a, b) => a.level - b.level);
        }
        if (this.test.isShuffled) {
          this.test.questions = this.shuffleByGroup(this.test.questions, 'level');
        }
        if (data.answerSheet) {
          this.answerSheet = data.answerSheet
          if (this.answerSheet.isFinished && data.testKey) {
            this.answers = data.testKey
          }
        }
        this.isLoading = false
      } catch (err) {
        this.$toast.error(err.message)
      }
    },
    async getAnswerSheet() {
      if (!this.test) return;
      try {
        const { data } = await this.$repositories.candidatesApply.createAnswerSheet(this.$route.params.testId, {});
        this.answerSheet = data;
      } catch (err) {
        this.$toast.error(err.message)
      }
    },
    async startTest() {
      this.isLoading = true;
      await this.getAnswerSheet()
      this.isLoading = false;
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    shuffleByGroup(array, key) {
      const grouped = array.reduce((acc, item) => {
        (acc[item[key]] = acc[item[key]] || []).push(item);
        return acc;
      }, {});

      const shuffledGroups = Object.values(grouped).map(group => this.shuffle(group));
      return [].concat(...shuffledGroups);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/pages/users/applied-job.scss';
@import '@/styles/pages/users/video-player.scss';
.cool-card {
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  background-color: #f5f7fa;
  padding: 10px 0;
  border-bottom: 1px solid #e4e7ed;
  border-radius: 10px 10px 0 0;
}

.body {
  padding: 20px;
}

.actions {
  text-align: center;
  margin-top: 20px;
}

a {
	color: unset !important;
	text-decoration: unset !important;
}
</style>
