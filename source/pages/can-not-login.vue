<template>
  <div
    class="form-body"
    :class="{
      'font-vi': $i18n.locale === 'vi',
      'font-ja': $i18n.locale === 'ja',
    }"
  >
    <main class="p-2 p-lg-0 form-login">
      <img
        class="background"
        src="../assets/images/users/bg-homepage.jpg"
        alt=""
      />
      <div class="logo">
        <NuxtLink :to="localePath('/', $i18n.locale)"
          ><img src="../assets/images/logo.svg" alt="" class="logo-unauth"
        /></NuxtLink>
      </div>
      <div v-if="$i18n.locale === 'ja'" class="container">
        <div class="row">
          <div class="col-md-12 main_content">
            <h2 class="heading text-center mb-3">Shuuナビにログインできません</h2>
            <p class="mb-3">Shuuナビにログインできない場合は、以下の原因が考えられます。</p>
            <ul>
              <li>
                <b class="mb-2"><span class="dot"></span>入力したメールアドレス、パスワードが誤っている</b>
                <p>入力しているメールアドレス・パスワードをご確認ください。</p>
              </li>
              <li>
                <b class="mb-2"><span class="dot"></span>ご利用のアカウントは無効になっている</b>
                <p>システム管理者に問い合わせてください。</p>
              </li>
              <li>
                <b class="mb-2"><span class="dot"></span>迷惑メールフォルダやゴミ箱に自動振り分けされている</b>
                <p>迷惑メールフォルダやゴミ箱をご確認ください。</p>
              </li>
              <li>
                <b class="mb-2"><span class="dot"></span>迷惑メール設定によって、受信が拒否されている</b>
                <p>&lt;@shuu-navi.com&gt;からのメールが受信できるように、迷惑メールの設定を確認してください。</p>
                <p>また、広告メール対策などでPC（パソコン）からのメールや、メール文中にURLリンクが記載されたメールが受信できない設定になっている可能性がありますので、設定を確認してください。</p>
              </li>
              <li>
                <b class="mb-2"><span class="dot"></span>ドメイン設定によって、受信が拒否されている</b>
                <p>メールソフトのフィルター設定、差出人セーフティリストなどから、&lt;@shuu-navi.com&gt;からのメールを受信できるようにドメイン受信拒否設定の解除をしてください。</p>
              </li>
              <hr>
              <li>
                <b class="mb-2 d-inline">確認メールのリンクをクリックしていない為、アカウントがまだ認証されていない。</b><br/>
                <NuxtLink :to="localePath('/verify', $i18n.locale)" >確認メール再送信はこちら</NuxtLink>
              </li>
              <li class="mt-4">
                <NuxtLink :to="localePath('/login', $i18n.locale)" class="btn-back">ログインに戻る</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="$i18n.locale === 'vi'" class="container">
        <div class="row">
          <div class="col-md-12 main_content">
            <h2 class="heading text-center mb-3">Không đăng nhập được Shuu Navi?</h2>
            <p class="mb-3">Các nguyên nhân chính khiến không thể đăng nhập được Shuu Navi như sau:</p>
            <ul>
              <li>
                <b class="mb-2">1. Nhập sai địa chỉ email hoặc mật khẩu </b>
                <p>Hãy kiểm tra lại xem bạn đã nhập đúng địa chỉ email và mật khẩu hay chưa.</p>
              </li>
              <li>
                <b class="mb-2">2. Tài khoản của bạn đã bị vô hiệu hóa</b>
                <p>Hãy liên hệ với admin để mở khóa tài khoản của bạn.</p>
              </li>
              <li>
                <b class="mb-2">3. Thư đến bị chuyển vào thư mục Spam hoặc Thư rác</b>
                <p>
                  Hãy kiểm tra thư mục Spam hoặc Thư rác của bạn.
                </p>
              </li>
              <li>
                <b class="mb-2">4. Thư đến bị chặn do thiết đặt email rác</b>
                <p>
                  Hãy kiểm tra thiết đặt email rác để xem bạn có đang chặn nhận email từ &lt;@shuu-navi.com&gt; không.
                </p>
                <p>
                  Ngoài ra, có thể do bạn đang thiết đặt từ chối nhận email có chứa liên kết hay email quảng cáo trên thiết bị của mình, vì vậy vui lòng kiểm tra các thiết đặt thư của bạn.
                </p>
              </li>
              <li>
                <b class="mb-2">5. Thư đến bị chặn do thiết lập miền</b>
                <p>
                  Hãy kiểm tra và hủy thiết lập từ chối nhận miền trong thiết lập chế độ lọc thư, danh sách người gửi an toàn để nhận email từ &lt;@shuu-navi.com&gt;.
                </p>
              </li>
              <hr>
              <li>
                <b class="mb-2 d-inline">Tài khoản của bạn chưa được xác thực vì bạn chưa click vào liên kết trong email xác nhận.</b><br/>
                <NuxtLink :to="localePath('/verify', $i18n.locale)" >Gửi lại email xác nhận</NuxtLink>
              </li>
              <li class="mt-4">
                <NuxtLink :to="localePath('/login', $i18n.locale)" class="btn-back">Quay lại đăng nhập</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
  layout: 'external',
  middleware: ['redirectToHomeIfIsAuthenticated'],

  head() {
    return { title: `${this.$t('general.verify')}` }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/users/can-not-login.scss';
</style>
