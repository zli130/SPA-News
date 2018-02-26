<template>
  <div class="sources">
    <!-- loader -->
    <div v-if="loading" class="loader">
      <div class="spinner"></div>
    </div>
    <!-- modal -->
    <div v-if="hasErrors" class="modal">
      <div class="modal__content">
        <span class="modal__close" v-on:click="modalClose">&times;</span>
        <p>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
      </div>
    </div>
    <!-- source list -->
    <div class="layout__row">
      <div class="list__filter">
        <select v-model="articlesParams.source"  @change="getArticles">
          <option value="">-- Choose a source --</option>
          <option v-for="source in sources" v-bind:value="source.id">{{ source.name }}</option>
        </select>
      </div>
    </div>
    <!-- selected source -->

    <!-- articles -->
    <div v-if="hasArticles" class="layout__row">
      <div class="list__item" v-for="article in articles">
        <div class="item__image inline">
          <a :href="article.url" target="_new">
            <img v-if="article.urlToImage" :src="article.urlToImage">
            <img v-if="!article.urlToImage" src="/assets/no_images_news.png">
          </a>
        </div>
        <div class="item__content inline">
          <a class="title" :href="article.url" target="_new">
            <div class="title fixed__line" :title="article.title">{{ article.title }}</div>
          </a>
          <div class="description fixed__line">{{ article.description }}</div>
          <div v-if="article.publishedAt" class="published">{{ article.publishedAt | moment("from", "now") }}</div>
          <div v-if="!article.publishedAt" class="published">Recently published</div>
        </div>
      </div>
    </div>

    <!-- blank -->
    <div v-if="!hasArticles" class="blank">
      News &amp; Coffee
    </div>
  </div>
</template>

<script>

import {SOURCE,ARTICLE} from '../rest'

const GENERAL_ERROR_MESSAGE = 'Oops, there was an error pulling news, please try again later.'

export default {
  name: 'source',
  data () {
    return {
      loading: true,
      sources: [],
      errors:[],
      articles: [],
      articlesParams: {
        apiKey: 'd2779aa7f9f44c2794e7818f3bf60aae',
        source: ''
      }
    }
  },
  methods: {
    // get news source list
    getSources: function() {
      SOURCE.get()
      .then(response => {
        if (response.data.sources && response.data.sources.length > 0) {
          this.sources = response.data.sources
        } else {
          this.errors.push(GENERAL_ERROR_MESSAGE)
        }
      })
      .catch(e => {
        this.errors.push(GENERAL_ERROR_MESSAGE)
      });
      this.clearLoading()
    },
    getArticles: function () {
      if (this.articlesParams.source != '') {
        this.loading = true;
        ARTICLE.get('articles', {params: this.articlesParams})
        .then(response => {
          if (response.status == '200' && response.data.articles && response.data.articles.length > 0) {
            this.articles = response.data.articles
          } else {
            this.errors.push(GENERAL_ERROR_MESSAGE)
          }
        })
        .catch(e => {
          this.errors.push(GENERAL_ERROR_MESSAGE)
        });
      } else {
        this.articles = ''
      }
      this.clearLoading()
    },
    clearLoading: function () {
      this.loading = false
    },
    modalClose: function () {
      this.errors = []
    }
  },
  created() {
    this.getSources()
  },
  computed: {
    hasErrors: function () {
      return this.errors.length > 0
    },
    hasArticles: function () {
      return this.articles.length > 0
    }
  }
}
</script>

<style scoped>
/* layout starts*/
.layout__row {
  display: block;
  margin: auto;
  width: 100%;
  min-width: 400px;
  min-height: 50px;
}
/* layout ends */
/*loader starts*/
.loader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.9);
  overflow-x: hidden;
  transition: 0.5s;
  opacity: 0.8;
}

.loader .spinner {
  position: relative;
  top: calc(50% - 30px);
  margin: auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid blue;
  border-right: 16px solid green;
  border-bottom: 16px solid red;
  border-left: 16px solid wheat;
  width: 80px;
  height: 80px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  z-index: 999;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
/*loader ends */

/* modal starts */
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

.modal__content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 30px;
    border: 1px solid #888;
    width: 80%;
    text-align: left;
}

.modal__content li {
  list-style: none;
}

.modal__close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.modal__close:hover,
.modal__close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
/* modal ends */

/* source list starts */
.list__item {
  display: flex;
  padding: 10px;
  box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2);
  margin: 10px;
  width: calc(100% - 40px);
  text-align: left;
  min-height: 120px;
  align-items: center;
}

.list__item .inline {
  display: inline-block;
  padding: 10px;
}

.item__image {
  max-width: 220px;
  width: 30%;
  height: 94px;
}

.item__image img {
  display: block;
  margin: auto;
  width: 50%;
}

.item__content {
  width: 60%;
  min-width: 240px;
}

.list__filter {
  margin-right: 20px;
  float: right;
  width: 80%;
  max-width: 240px;
}

.list__filter select {
  display: block;
  width: calc(100% - 20px);
  max-width: 300px;
  padding: 10px 10px;
  font-size: 14px;
  box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2);
  line-height: 18px;
  font-size: 16px;
  border-radius: 5px;
}

.fixed__line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}

.title {
  height: 34px;
  -webkit-line-clamp: 2;
  line-height: 18px;
  max-height: 34px;
  text-decoration: none;
  color: #2196F3;
  font-weight: bold;
}

.description {
  line-height: 28px;
  -webkit-line-clamp: 2;
  line-height: 14px;
  max-height: 28px;
}

.published {
  font-size: 12px;
  color: #4CAF50;
}
/* source list ends */

.blank {
  height: 300px;
  min-width: 400px;
  background-position: center;
  background-size: cover;
  position: relative;
  color: #5f5f5f;
  font-family: "Courier New", Courier, monospace;
  font-size: 36px;
  font-weight: bold;
  line-height: 300px;
}

@media screen and (max-width: 800px) {
  .item__image {
    width: 30%;
  }

  .item__image img {
    width: 120px;
  }
}
</style>
