<template>
  <main class="container-maintain">
    <div class="container">
      <div class="card">
        <h3 class="mb-4 pb-4" style="border-bottom: 2px solid gray">
          {{ userRoadmap.title }} > {{ course.title }} > {{ modules.name }}
        </h3>
        <div class="video-container">
          <video id="video-player" ref="videoPlayer" :class="{'no-pointer': isStop}" class="video-js vjs-default-skin" height="400"></video>
          <div v-if="isStop" class="quizzes-container">
            <h2>Please answer the quizz before continue watching</h2>
            <div v-for="(quizz, index) in modules.check_point_quizzes" :key="index">
              <div v-if="quizzShown == index">
                <h2>{{quizz.question}}</h2>
                <div v-for="(option, ind) in quizz.answers" :key="ind">
                  <label :for="option.text">
                    <input type="radio" :name="quizz.question" :value="option.value" v-model="selectedOption">
                    {{ option.text }}
                  </label>
                </div>
                <button @click="chooseAnswer(index)">Choose</button>
              </div>
            </div>
          </div>
        </div>
        <el-tabs type="card" v-model="activeName" class="discussion-section">
          <el-tab-pane label="Note" name="note">
            <el-card>
              <div slot="header" class="note-header">Notes</div>
              <!-- <el-list>
                <el-list-item v-for="note in notes" :key="note.id">
                  <el-button type="info" round @click="toVideoTime(note.noted_video_time)">{{ formattedCurrentTime(note.noted_video_time) }}</el-button>
                  <div class="note-content">{{ note.content }}</div>
                </el-list-item>
              </el-list> -->
              <el-form v-if="player" class="note-form">
                <el-button type="info" round>{{ formattedCurrentTime(player.currentTime()) }}</el-button>
                <el-form-item>
                  <el-input
                    v-model="newNoteContent"
                    placeholder="Enter your note"
                    type="textarea"
                    rows="3"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" @click="takeNote">{{noteButton}}</el-button> -->
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Discussion" name="discussion">
            <div class="discussion-list" v-if="currentDiscussionIndex === -1">
              <div v-for="(discussion, index) in discussionList" :key="discussion.id" class="discussion-item">
                <div class="left-section">
                  <div class="avatar">
                    <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
                  </div>
                </div>
                <div class="right-section">
                  <div class="title-container">
                    <div class="q-title" @click="toReplies(index)">{{discussion.title}}</div>
                    <div class="reply-section">
                      <div class="upvote">{{discussion.upvoted_by.length}} upvoted</div>
                      <div class="reply">{{discussion.discussionReplies.length || 0}} replies</div>
                    </div>
                  </div>
                  <div class="discussion-footer">
                    <div class="asked-by"><a href="">{{discussion.user_id.name}}</a></div>
                    <div class="asked-video-time"><el-button type="info" round>{{ formattedCurrentTime(discussion.noted_video_time) }}</el-button></div>
                    <div class="asked-date">Just now</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reply-list" v-if="currentDiscussionIndex !== -1">
              <el-button type="primary" @click="currentDiscussionIndex = -1">Back to discussion channel</el-button>
              <div class="discussion-item">
                <div class="left-section">
                  <div class="avatar">
                    <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
                  </div>
                </div>
                <div class="right-section">
                  <div class="title-container">
                    <div class="q-title">
                      <div class="title">
                        {{currentDiscussion.title}}
                      </div>
                      <div class="content">
                        {{currentDiscussion.content}}
                      </div>
                    </div>
                    <div class="reply-section">
                      <div class="upvote">{{currentDiscussion.upvoted_by.length}} upvoted</div>
                    </div>
                  </div>
                  <div class="discussion-footer">
                    <div class="asked-by"><a href="">{{currentDiscussion.user_id.name}}</a></div>
                    <div class="asked-video-time"><el-button type="info" round>{{ formattedCurrentTime(currentDiscussion.noted_video_time) }}</el-button></div>
                    <div class="asked-date">Just now</div>
                  </div>
                </div>
              </div>
              <div style="display: flex; margin-bottom: 25px; font-weight: bold; padding-left: 15px">
                <div>{{currentDiscussion.discussionReplies.length}} replies</div>
              </div>
              <div class="reply-section" style="margin-left: 30px">
                <div class="reply-item" style="padding: 0 1.5rem; margin-bottom: 25px" v-for="(reply, r_index) in currentDiscussion.discussionReplies" :key="r_index">
                  <div style="display: flex">
                    <div class="avatar">
                      <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
                    </div>
                    <div style="flex: 1">
                      <div style="margin-bottom: 30px">
                        <div style="display:flex; justify-content: space-between; margin-bottom: 10px">
                          <el-col :span="22" style="font-size: 20px; font-weight: bold"><a href="">{{reply.user_id.name}}</a></el-col>
                          <el-col :span="2"><div class="upvote">{{reply.upvoted_by.length}} upvoted</div></el-col>
                        </div>
                        <div style="font-size: 12px">Just now</div>
                      </div>
                      <div>{{reply.content}}</div>
                    </div>
                  </div>
                </div>
                <div class="reply-add" style="padding: 0 1.5rem">
                  <div style="display: flex">
                    <div class="avatar">
                      <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
                    </div>
                    <div style="flex: 1">
                      <div>
                        <textarea v-model="replyText" style="width: 100%; margin-bottom: 15px; resize: none" name="" id="" rows="5"></textarea>
                        <el-button type="info" style="float: right" @click="addReply">
                          Add reply
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import videojs from 'video.js';

export default {
  name: 'DetailModule',
  layout: 'auth',

  data() {
    return {
      activeName: 'discussion',
      player: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              type: 'video/mp4'
          }
        ]
      },
      userRoadmap: {},
      course: {},
      modules: {},
			selectedOption: 0,
      videoMarker: 0,
      isStop: false,
      quizzShown: -1,
      remainedQuizzes: [],
      websocket: null,
      moduleProgress: {},
      newNoteContent: '',
      notes: [],
      discussionList: [],
      currentDiscussionIndex: -1,
      currentDiscussion: {},
      replyText: '',
      videoDuration: 0,
      currentInterval: 0,
      isModuleWatched: false,
      logId: '',
      intervalId: null,
    }
  },
  computed: {
    noteButton () {
      return this.notes.findIndex(item => parseInt(item.noted_video_time) === parseInt(this.player?.currentTime())) > -1 ? 'Edit note' : 'Add note';
    }
  },
  watch: {
    isStop(val) {
      if (val) {
        // this.player.controls(false)
        this.player.pause();
      } else {
        // this.player.controls(true)
        this.player.play();
      }
    }
  },
  async mounted() {
    await this.getCourse()
    const vm = this
    // eslint-disable-next-line array-callback-return
    this.remainedQuizzes = this.modules.check_point_quizzes?.map((items) => {
      if (items.check_time > vm.videoMarker)
        return {...items, is_answered: false};
    })
		// const quizzSet = [...this.modules.content[0].check_point_quizzes]
    const myVideo = document.getElementById("video-player");
    if (myVideo) {
      myVideo.onloadedmetadata = function() {
        vm.videoDuration = this.duration
      };
    }
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, () => {
      this.player.log('onPlayerReady', this);

      // this.player.markers({
      //   markers: [
      //     ...this.notes.map(item => {
      //       return {
      //         time: item.noted_video_time,
      //         text: item.content,
      //       }
      //     }),
      //     { id: 'currentPlaying', time: vm.videoMarker, text: 'Current playing' },
      //   ]
      // })
      let currentTime = 0;
      let markedTime = vm.videoMarker
      this.player?.currentTime(vm.videoMarker)
			const self = this
      this.player.on('seeking', function(){
        if(self.player?.currentTime() > currentTime && self.player?.currentTime() > markedTime) {
          self.player?.currentTime(currentTime);
        }
        self.player.pause();
      });

      // function updateProgress() {
      //   const updateData = {
      //     module_id: vm.modules._id,
      //     module_progress: {
      //       video_played_time: currentTime,
      //       user_id: vm.$store.getters.authUser.id,
      //     },
      //     video_duration: vm.videoDuration,
      //   };
      //   vm.websocket.send(JSON.stringify(updateData));
      // }

      this.player.on('play', function() {
        // updateProgress();
        // this.updateIntervalId = setInterval(updateProgress, 2000);
        if (!vm.isModuleWatched) {
          vm.watchedModule()
        }
        vm.logId = vm.generateLogId()
        vm.moduleLog(self.player.currentTime());
        vm.intervalId = setInterval(async () => {
          const currentVideoTime = self.player.currentTime()
          await vm.moduleLog(currentVideoTime);
        }, 3000)
      });
      this.player.on('pause', function() {
        // clearInterval(this.updateIntervalId);
        clearInterval(vm.intervalId)
      });

      this.player.on('timeupdate', function() {
        // if (self.player.currentTime() > markedTime) {
        //   const updateData = {
        //     progress_id: vm.moduleProgress.id,
        //     module_progress: {
        //       video_played_time: self.player.currentTime(),
        //     },
        //   }
        //   vm.websocket.send(JSON.stringify(updateData))
        // }
        vm.remainedQuizzes.forEach((items, index) => {
          if (currentTime > items?.check_time && currentTime < items?.check_time + 1 && !items.is_answered) {
            vm.isStop = true
            vm.quizzShown = index
            vm.selectedOption = 0
          }
        })
      })
			vm.currentInterval = setInterval(() => {
				currentTime = self.player?.currentTime();
        if (currentTime > markedTime && currentTime) {
          self.player.markers.removeAll();
          self.player.markers.add([{ time: currentTime, text: 'Current playing' }]);
          markedTime = currentTime
        }
			}, 1000);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  destroyed() {
    clearInterval(this.currentInterval)
  },
  methods: {
    generateLogId() {
      // Generate timestamp part (8 characters)
      const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');

      // Generate random part (16 characters)
      const randomPart = [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

      // Concatenate timestamp and random part
      return timestamp + randomPart;
    },
    async moduleLog(currentTime) {
      const body = {
        logId: this.logId,
        module: this.modules.id || this.modules._id,
        course: this.$route.params.courseId,
        video_start_time: currentTime,
        video_update_time: currentTime,
      }
      await this.$repositories.candidatesApply.updateModuleLog(body);
    },
    formattedCurrentTime(value) {
      const pad = function(input) {return (input < 10) ? "0" + input : input;};
      return [
          pad(Math.floor(value % 3600 / 60)),
          pad(Math.floor(value % 60)),
      ].join(':');
    },
    toVideoTime(time) {
      this.player.currentTime(time);
    },
    chooseAnswer(index) {
      if (this.selectedOption) {
        this.isStop = false
        this.quizzShown = -1
        this.remainedQuizzes[index].is_answered = true
      }
    },
    async getCourse() {
      const { data } = await this.$repositories.candidatesApply.getUserModule(this.$route.params.courseId, this.$route.params.moduleId)
      this.modules = {...data.moduleData};
      this.notes = [...data.noteList];
      this.discussionList = [...data.discussion];
      // this.videoMarker = this.modules.video_played_time;
      this.videoOptions.sources[0].src = this.modules.video;
      this.userRoadmap = data.userRoadmap;
      this.course = data.course
      const currentCourse = this.userRoadmap?.roadmap_milestone.find((item) => item.course === this.$route.params.courseId)
      if (currentCourse) {
        if(currentCourse.done_modules.includes(this.$route.params.moduleId)) {
          this.isModuleWatched = true;
        }
      }
    },
    async watchedModule() {
      const { data } = await this.$repositories.candidatesApply.watchedModule(this.$route.params.courseId, this.$route.params.moduleId);
      if (data) {
        this.isModuleWatched = true;
        this.$toast.error(data)
      }
    },
    // async takeNote() {
    //   const body = {
    //     noted_video_time: this.player.currentTime(),
    //     content: this.newNoteContent,
    //   }
    //   const currentNoteIndex = this.notes.findIndex(item => item.noted_video_time === this.player.currentTime());
    //   if (currentNoteIndex > -1) {
    //     const { data } = await CourseService.editNote(this.modules._id, body);
    //     if (data) {
    //       this.notes[currentNoteIndex] = {...data}
    //       this.newNoteContent = ''
    //     }
    //   } else {
    //     const { data } = await CourseService.takeNote(this.modules._id, body);
    //     if (data) {
    //       this.notes.push(data)
    //       this.newNoteContent = ''
    //     }
    //   }
    // },
    // async addReply() {
    //   const body = {
    //     upvoted_by: [],
    //     content: this.replyText,
    //   }
    //   if (this.currentDiscussionIndex > -1) {
    //     const { data } = await CourseService.addReply(this.modules._id, this.currentDiscussion.id, body);
    //     console.log(data)
    //     if (data) {
    //       this.currentDiscussion.discussionReplies.push({...data, user_id: {name: 'tungnd'}});
    //       this.replyText = ''
    //     }
    //   }
    // },
    toReplies(index) {
      this.currentDiscussionIndex = index
      this.currentDiscussion = {...this.discussionList[index]}
    },
    // connectWebsocket() {
    //   // Establish WebSocket connection
    //   this.websocket = new WebSocket('ws://localhost:3000/websockets');

    //   this.websocket.onopen = () => {
    //     console.log('WebSocket connection established');
    //   };

    //   this.websocket.onclose = () => {
    //     console.log('WebSocket connection closed');
    //   };

    //   this.websocket.onerror = (error) => {
    //     console.error('WebSocket error:', error);
    //   };
    // }
  },

}
</script>

<style lang="scss" scoped>
@import '@/styles/pages/users/applied-job.scss';
@import '@/styles/pages/users/video-player.scss';

</style>
