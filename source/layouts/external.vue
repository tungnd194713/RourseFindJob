<template>
  <div :class="{ 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja' }">
    <HeaderLang/>
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
</style>

<style lang="scss">
  .toasted-container.top-right {
    font-family: 'M PLUS 1p', sans-serif;
  }

  .toasted-container.top-right .info{
    background-color: #f3c63d !important;
  }
</style>
