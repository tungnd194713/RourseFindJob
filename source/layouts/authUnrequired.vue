<template>
  <div :class="{ 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja' }">
    <Header/>
    <Nuxt :class="{ 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja' }"/>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700;800&display=swap');
  @import "../styles/layout/main.scss";
  @import '../styles/components/modal/_mapInfor.scss';
</style>
