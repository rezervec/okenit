<template>
  <div class="site-body">
    <div class="users">
      <div
        class="user"
        v-on:click="activeUser = 0"
        :class="{_active: activeUser == 0}"
      >
        <b>All posts</b>
      </div>
      <div
        v-for="user in USERS"
        :key="user.id"
        class="user"
        v-on:click="activeUser = user.id"
        :class="{_active: user.id == activeUser}"
      >
        <p>{{ user.name }}</p>
        <tt>USER ID:{{ user.id }}</tt>
      </div>
    </div>
    <div class="posts">
      <router-link
        v-for="post in postFilter"
        :key="post.id"
        :post="post"
        tag="div"
        class="post"
        :to="{ name: 'post', params: { id: post.id } }"
      >
        <tt>POST ID:{{ post.id }} - POST USERID:{{ post.userId }}</tt>
        <p>{{ post.title | capitalize}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeUser: 0
    }
  },
  computed: {
    ...mapGetters([
      'USERS',
      'POSTS'
    ]),
    postFilter: function () {
      if(this.activeUser)
        return this.POSTS.filter(post => post.userId == this.activeUser)
      else return this.POSTS
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    ...mapActions([
      'GET_USERS',
      'GET_POSTS'
    ])
  },
  mounted() {
    this.GET_USERS()
    this.GET_POSTS()
  }
}
</script>