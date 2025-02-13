<template>
  <div>
    <Header />
  
      <router-view />
    <Footer/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Layout from './components/Layout.vue';
import Footer from './components/Footer.vue';

</script>
