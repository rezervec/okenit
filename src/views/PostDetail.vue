<template>
  <div class="post-detail" v-if="post">
    <h2>POST ID:{{ post.id }} POST USERID:{{ post.userId }}</h2>
    <div>{{ post.body }}</div>
    <div>
      <h2>USER ID:{{ user.id }}</h2>
      <h4>{{ user.name }}</h4>
      <h4>{{ user.email }}</h4>
    </div>
    <div>
      <h2>Comments</h2>
        <div
        v-for="comment in commentsFilter"
        :key="comment.id"
        >
          <p>{{ comment.postId }}</p>
          <p>User: {{ comment.email }}</p>
          <p>{{ comment.body }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import posts from '@/placeholder/posts'
import users from '@/placeholder/users'
import comments from '@/placeholder/comments'

export default {
  data() {
    return {
      posts: null,
      user: null,
      comments
    }
  },
  created() {
    const post = posts.find(post => post.id == this.$route.params.id)
    if (post) {
      this.post = post
      this.user = users[post.userId - 1]
    }
  },
  computed: {
    commentsFilter: function () {
      const result = comments.filter(comment => comment.postId == this.post.id)
      return result
    }
  }
}
</script>