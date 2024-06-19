<template>
  <a-layout>
    <Header />
    <subHeader/>
    <div class="main-content container">
      <router-view />
    </div>
    <Footer />
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { Header, Footer, subHeader } from './index'

export default defineComponent({
  components: {
    Footer,
    Header,
    subHeader
  }
})
</script>

