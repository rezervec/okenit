<template>
  <div class="site-body">
    <div class="users">
      <div
      v-for="user in users"
      :key="user.id"
      class="user"
      >
      <p>{{ user.name }}</p>
      </div>
    </div>
    <div class="posts">
      <router-link
      v-for="post in posts"
      :key="post.id"
      :post="post"
      tag="div"
      class="post"
      :to="{ name: 'post', params: { id: post.id } }"
      >
      <p>{{ post.title }}</p>
      </router-link>
    </div>
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