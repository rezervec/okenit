<template>
  <div class="post-detail" v-if="post">
    <h2>{{ post.title }}</h2>
    <div>{{ post.body }}</div>
    <div>
      <h2>{{ user.username }}</h2>
      <h4>{{ user.name }}</h4>
      <h4>{{ user.email }}</h4>
    </div>
  </div>
</template>

<script>
import posts from '@/placeholder/posts'
import users from '@/placeholder/users'

export default {
  data() {
    return {
      posts: null,
      user: null
    }
  },
  created() {
    const post = posts.find(post => post.id == this.$route.params.id)
    if (post) {
      this.post = post
    }
      this.user = users[post.userId - 1]
    // const user = users.find(user => user.id == this.$route.params.id)
    // if (user) {
    //   this.user = user
    // }
  }
}
</script>