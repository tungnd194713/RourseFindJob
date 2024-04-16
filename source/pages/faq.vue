<template>
    <main class="container-maintain"
          :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
    >
        <div class="container">
            <div class="inner-container">
                <div class="container tab-container">
                    <div class="row">
                        <h3 class="title-page text-center fw-bold">
                            {{$t('faq_page.title')}}
                        </h3>
                    </div>
                </div>

                <div v-if="$i18n.locale === 'vi'" class="container text-center faq-con">
                    <div
                            v-for="data in datas"
                            :key="data.value"
                            class="row m-4 question-button"
                    >
                        <div class="p-con">
                            <p>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#' + data.class"
                                        aria-expanded="false"
                                        :aria-controls="data.class"
                                        :class="{'shown': data.isShown, 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja'}"
                                        @click="shownClass(data)">
                                    <div class="row">
                                        <div
                                                class="col-10 button-title fw-bold"
                                                style="text-align: start; padding-left: 30px"
                                        >
                                            {{ data.title }}
                                        </div>
                                        <div
                                                class="col-2 mid"
                                                style="text-align: end; padding-right: 30px"
                                        >
                                            <img
                                                    src="../assets/images/users/draft/plus.svg"
                                                    alt=""
                                                    :class="{ rotated: data.isShown }"
                                            />
                                        </div>
                                    </div>
                                </button>
                            </p>
                            <div :id="data.class" class="collapse">
                                <div class="card card-body text-start">
                                    <div v-for="(content, index) in data.content" :key="index">{{ content }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  v-else class="container text-center faq-con">
                    <div
                            v-for="data in datasJa"
                            :key="data.value"
                            class="row m-4 question-button"
                    >
                        <div class="p-con">
                            <p>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#' + data.class"
                                        aria-expanded="false"
                                        :aria-controls="data.class"
                                        :class="{'shown': data.isShown, 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja'}"
                                        @click="shownClass(data)">
                                    <div class="row">
                                        <!-- eslint-disable vue/no-v-html -->
                                        <div
                                                class="col-10 button-title fw-bold"
                                                style="text-align: start; padding-left: 30px"
                                                v-html="data.title"
                                        >
                                        </div>
                                        <!--eslint-enable-->
                                        <div
                                                class="col-2 mid"
                                                style="text-align: end; padding-right: 30px"
                                        >
                                            <img
                                                    src="../assets/images/users/draft/plus.svg"
                                                    alt=""
                                                    :class="{ rotated: data.isShown }"
                                            />
                                        </div>
                                    </div>
                                </button>
                            </p>
                            <div :id="data.class" class="collapse">
                                <div class="card card-body text-start">
                                    <div v-for="(content, index) in data.content" :key="index">{{ content }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'

    export default {
        name: 'Faq',
        layout: 'authUnrequired',
        data() {
            return {
                icon_click: '',
                datas: [
                    {
                        value: 1,
                        title: '1. Sử dụng "Shuu Navi" có mất phí gì không?',
                        class: 'about-company',
                        isShown: false,
                        content: [
                            'Bạn sẽ không mất bất kì chi phí nào cả. Bạn có thể tìm kiếm công việc miễn phí trên Shuu Navi.'
                        ],
                    },
                    {
                        value: 2,
                        title: '2. Tôi có thể thay đổi tư cách lưu trú của mình từ kỹ năng thực tập sang kỹ năng đặc định được không?',
                        class: 'about-cv',
                        isShown: false,
                        content: [
                            'Nếu bạn đã hoàn thành chương trình thực tập sinh kỹ năng số 2 hoặc số 3 thì bạn có thể chuyển sang kỹ năng đặc định.',
                            'Ngoài ra cũng có một lộ trình để bạn đổi tư cách lưu trú đó là sau khi được tạm thời cấp phép hoạt động đặc định 4 tháng thì có thể chuyển đổi sang tư cách lưu trú kỹ năng đặc định.'
                        ]
                    },
                    {
                        value: 3,
                        title: '3. Tôi muốn làm việc trong một lĩnh vực khác với lĩnh vực đào tạo thực tập sinh kỹ năng. Tôi có phải làm bài kiểm tra kỹ năng không?',
                        class: 'about-ai-match',
                        isShown: false,
                        content: [
                            'Bạn có thể làm việc sau khi được cho phép hoạt động đặc định (1 năm). Tuy nhiên, bạn phải vượt 	qua kỳ thi kỹ năng đặc định của nghề nghiệp mà bạn làm việc trong 1 năm đó. Sau khi vượt qua kỳ thi, bạn có thể chuyển sang kỹ năng đặc định.',
                            'Nếu bạn đỗ kỳ thi kỹ năng đặc định, bạn có thể đổi sang kỹ năng đặc định ngay lập tức.'
                        ]
                    },
                    {
                        value: 4,
                        title: '4. Tôi đang làm việc với tư cách lưu trú kỹ năng đặc định. Vậy tôi có thể làm việc cho một công ty khác không?',
                        class: 'about-vietnam-companies',
                        isShown: false,
                        content: [
                            'Trong trường hợp bạn muốn chuyển việc với tư cách lưu trú kỹ năng đặc định, bạn cần phải làm đơn xin chuyển đổi kỹ năng đặc định. Bạn có thể làm việc sau khi được cấp phép.'
                        ]
                    },
                    {
                        value: 5,
                        title: '5. Tôi có tư cách lưu trú ngành nghề Kỹ thuật - Nhân văn - Quốc tế. Vậy tôi có thể làm những công việc gì?',
                        class: 'about-visa',
                        isShown: false,
                        content: [
                            'Bạn có thể làm các công việc như lập trình viên, thông dịch viên, kỹ sư cơ khí,...'
                        ]
                    },
                    {
                        value: 6,
                        title: '6. Tư cách lưu trú của tôi có cần trùng khớp với tư cách lưu trú được nêu trong yêu cầu tuyển dụng hay không?',
                        class: 'about-what',
                        isShown: false,
                        content: [
                            'Nếu tư cách lưu trú của bạn không trùng với tư cách lưu trú được nêu trong yêu cầu tuyển dụng thì bạn cần làm đơn xin chuyển đổi tư cách lưu trú.'
                        ]
                    },
                    {
                        value: 7,
                        title: '7. Tôi không nhận được phản hồi từ phía nhà tuyển dụng. Vậy tôi nên làm gì?',
                        class: 'about-which',
                        isShown: false,
                        content: [
                            'Chúng tôi thành thật xin lỗi tuy nhiên chúng tôi không thể nắm bắt được tình hình tuyển chọn của các công ty. Vì vậy xin vui lòng chủ động liên hệ với phía nhà tuyển dụng.'
                        ]
                    },
                    {
                        value: 8,
                        title: '8. Có thể hủy đơn đăng ký xin việc không?',
                        class: 'about-none',
                        isShown: false,
                        content: [
                            'Chúng tôi không thể hủy đơn đăng ký xin việc của bạn.',
                            'Nếu bạn muốn hủy đơn đăng ký xin việc, vui lòng liên hệ trực tiếp với nhà tuyển dụng.'
                        ]
                    },
                ],

                datasJa: [
                    {
                        value: 1,
                        title: '1.『Shuuナビ』を使うのに、お金が掛かりますか？',
                        class: 'about-company',
                        isShown: false,
                        content: [
                            '一切お金はかかりません。無料でお仕事を探すことが出来ます。'
                        ],
                    },
                    {
                        value: 2,
                        title: '2. 技能実習から在留資格を、特定技能に変えられますか？',
                        class: 'about-cv',
                        isShown: false,
                        content: [
                            '技能実習2号もしくは3号を修了していれば特定技能に変更できます。',
                            '一時的に特定活動4か月を申請許可後、特定技能への変更というルートもございます。'
                        ]
                    },
                    {
                        value: 3,
                        title: '3. 技能実習と違う分野でお仕事がしたいです。技能試験を受けないといけないですか？',
                        class: 'about-ai-match',
                        isShown: false,
                        content: [
                            '特定活動(1年)にて許可後に就業できます。ただし、その1年以内に働く職種の特定技能の試験に合格する必要があります。合格後、特定技能に変更できます。',
                            '特定技能の試験に合格していればすぐに特定技能へ変更できます。'
                        ]
                    },
                    {
                        value: 4,
                        title: '4. 特定技能の在留資格で働いています。別の会社で働くことが出来ますか？',
                        class: 'about-vietnam-companies',
                        isShown: false,
                        content: [
                            '特定技能では転職する場合、特定技能変更申請が必要です。許可後に就業できます。'
                        ]
                    },
                    {
                        value: 5,
                        title: '5. 技術・人文・国際業務の在留資格を取得しておりますが、どんなお仕事ができますか？',
                        class: 'about-visa',
                        isShown: false,
                        content: [
                            'プログラマー、通訳、機械オペレータなどの仕事ができます。'
                        ]
                    },
                    {
                        value: 6,
                        title: '6. 求人要件に在留資格の内容が記載されていますが、私が取得している在留資格と<br />一致しないといけないですか？',
                        class: 'about-what',
                        isShown: false,
                        content: [
                            '一致しない場合、在留資格変更申請をする必要があります。'
                        ]
                    },
                    {
                        value: 7,
                        title: '7. 応募先から連絡が無いのですが、どうしたらいいですか？',
                        class: 'about-which',
                        isShown: false,
                        content: [
                            '恐れ入りますが弊社では企業の選考状況は把握することができませんので、応募者様ご自身で応募先に連絡するようお願いいたします。'
                        ]
                    },
                    {
                        value: 8,
                        title: '8. 求人情報の応募キャンセルはできますか？',
                        class: 'about-none',
                        isShown: false,
                        content: [
                            '応募頂いた内容のキャンセルは弊社で対応することができません。',
                            '応募を取り消される場合は、直接応募先に連絡をお願いいたします。'
                        ]
                    },
                ],
            }
        },
        head() {
            return {title: `${ this.$t('general.qa') }`}
        },
        methods: {
            shownClass(data) {
                data.isShown = !data.isShown
//        console.log(data.isShown)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/users/faq.scss';
</style>
>
