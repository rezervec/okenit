<template v-for="post in posts" :key="post.id" :post="post">
      <div
      v-if="post.id == 1"
      class="post"
      :to="{ name: 'post', params: { id: post.id } }"
      >
      <p>{{ post.title }}</p>
      </div>
</template>

<script>
import users from '@/placeholder/users'
import posts from '@/placeholder/posts'

export default {
  data() {
    return {
      users,
      posts
    }
  }
}
</script>