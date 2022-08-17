<template>
  <div class="site-body">

    <v-alert
      :messages="messages"
    />

    <div class="users">
      <div
      class="user"
      v-on:click="activeUser = 0"
      :class="{_active: activeUser == 0}"
      >
        <b>All posts</b>
      </div>
      <div
      v-for="user in users"
      :key="user.id"
      class="user"
      v-on:click="activeUser = user.id; showAlert()"
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
import users from '@/placeholder/users'
import posts from '@/placeholder/posts'
import vAlert from '@/components/alerts/v-alert'

export default {
  data() {
    return {
      users,
      posts,
      activeUser: 0,
      messages: []
    }
  },
  computed: {
    postFilter: function () {
      if(this.activeUser)
        return this.posts.filter(post => post.userId == this.activeUser)
      else return posts
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  components: {
    vAlert
  },
  methods: {
    showAlert() {
      this.messages.unshift(
        {name: `User Articles #${this.activeUser}`, id: Date.now().toLocaleString()}
      )
    }
  }
}
</script>