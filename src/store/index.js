import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comments: [],
    users: [],
    posts: []

  },
  getters: {
    COMMENTS(state) {
      return state.comments
    },
    USERS(state) {
      return state.users
    },
    POSTS(state) {
      return state.posts
    }
  },
  mutations: {
    SET_COMMENTS_TO_VUEX: (state, comments) => {
      state.comments = comments
    },
    SET_USERS_TO_VUEX: (state, users) => {
      state.users = users
    },
    SET_POSTS_TO_VUEX: (state, posts) => {
      state.posts = posts
    }
  },
  actions: {
    GET_COMMENTS({commit}) {
      return axios('https://jsonplaceholder.typicode.com/comments', {
        method: 'GET'
      })
      .then((response) => {
        commit('SET_COMMENTS_TO_VUEX', response.data)
      })
    },
    GET_USERS({commit}) {
      return axios('https://jsonplaceholder.typicode.com/users', {
        method: 'GET'
      })
      .then((response) => {
        commit('SET_USERS_TO_VUEX', response.data)
      })
    },
    GET_POSTS({commit}) {
      return axios('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET'
      })
      .then((response) => {
        commit('SET_POSTS_TO_VUEX', response.data)
      })
    }
  },
  modules: {
  }
})
