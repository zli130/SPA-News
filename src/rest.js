import axios from 'axios'

// URL and endpoint constants
const SOURCE_API_URL = `https://newsapi.org/v1/sources?language=en`;
const ARTICLE_API_URL = `https://newsapi.org/v1`;

export const SOURCE = axios.create({
  baseURL: SOURCE_API_URL
});

export const ARTICLE = axios.create({
  baseURL: ARTICLE_API_URL
});
