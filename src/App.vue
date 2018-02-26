<template>
  <div id="app">
    <div class="sidenav">
      <router-link to="/" id="about">About</router-link>
      <router-link to="/news" id="news">News</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'SPA News',
    titleTemplate: '%s - John!',
    htmlAttrs: {
      lang: 'en',
      amp: undefined,
      viewport: 'width=device-width, initial-scale=1.0'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* side nav starts */
.sidenav {
  position: fixed;
  top: 30px;
}
.sidenav  a {
    position: absolute;
    left: -120px;
    transition: 0.3s;
    padding: 15px;
    width: 100px;
    text-decoration: none;
    font-size: 20px;
    color: white;
    border-radius: 0 5px 5px 0;
}

.sidenav a:hover {
    left: -20px;
}

#about {
    top: 20px;
    background-color: #4CAF50;
}

#news {
    top: 80px;
    background-color: #2196F3;
}
/* side nav ends */
</style>
