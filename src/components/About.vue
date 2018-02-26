<template>
  <div class="about">
    <h1>{{ header }}</h1>
    <ul>
      <li><router-link to="/news">News</router-link></li>
    </ul>
    <h2>References</h2>
    <ul>
      <li v-for="ref in refs"><a :href="ref.urlToRef" target="_new">{{ ref.name }}</a></li>
    </ul>
    <h2>{{ contact.name }}</h2>
    <ul>
      <li><a href="mailto:lizoya2011@gmail.com">lizoya2011@gmail.com</a></li>
      <li>021 0728 723</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      header: 'About',
      refs: [
        {
          name: 'Vue.js',
          urlToRef: 'https://vuejs.org/'
        },
        {
          name: 'HTML',
          urlToRef: 'https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol'
        },
        {
          name: 'CSS',
          urlToRef: 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets'
        }
      ],
      contact: {
        name: 'John Li',
        email: 'lizoya2011@gmail.com',
        mobile: {
          display: '021 072 8723',
          dial: '+64 (021) 072 8723'
        },
        address: 'Auckland'
      }
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
  color: #42b983;
}

a {
  text-decoration: none;
  color: #42b983;
}
</style>
