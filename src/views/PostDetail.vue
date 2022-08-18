<template>
  <div class="post-detail">
    <router-link class="post-nav" to="/">На главную</router-link>
    <div class="post-info">
      <div class="post-content">
        <h1>{{ post.title | capitalize}}</h1>
        <div>{{ post.body | capitalize }}</div>
        <tt>POST ID:{{ post.id }}<br>POST USERID:{{ post.userId }}</tt>
      </div>
      <div class="post-autor">
        <h3>Autor</h3>
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
        <tt>USER ID:{{ user.id }}</tt>
      </div>
    </div>
    <div class="comments">
      <h2>Comments</h2>
      
      <p class="add-comment">
        <b>Your email:</b>
        <input v-model="newVisitor"><br>
        <b>Your comment:</b>
        <input v-model="newComment"><br>
        <button @click="addVisitor">Publish</button>
      </p>
      <p
        v-for="(visitor, n) in visitors"
        :key="visitor.index"
        class="your-comment"
      >
        <span v-if="n%2==0">User(you):</span> {{ visitor }}
        <button v-if="n%2==0" @click="removeVisitor(n)">Delete</button>
      </p>

        <div
        class="comment"
        v-for="comment in commentsFilter"
        :key="comment.id"
        >
          <h3>User: <span>{{ comment.email }}</span></h3>
          <p>{{ comment.body | capitalize }}</p>
          <tt>COMMENT POSTID:{{ comment.postId }}</tt>
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
      comments,
      visitors: [],
      newVisitor: null,
      newComment: null
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
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  mounted() {
    if (localStorage.getItem(`visitors${this.post.id}`)) {
      try {
        this.visitors = JSON.parse(localStorage.getItem(`visitors${this.post.id}`));
        console.log('mointed')
      } catch(e) {
        localStorage.removeItem(`visitors${this.post.id}`);
      }
    }
  },
  methods: {
    addVisitor() {
      if (!this.newVisitor || !this.newComment) return

      this.visitors.unshift(this.newComment)
      this.newComment = ''
      this.visitors.unshift(this.newVisitor)
      this.newVisitor = ''
      this.saveVisitor()
    },
    removeVisitor(el) {
      this.visitors.splice(el, 2)
      this.saveVisitor()
    },
    saveVisitor() {
      const parsed = JSON.stringify(this.visitors)
      localStorage.setItem(`visitors${this.post.id}`, parsed)
      console.log(parsed)
    }
  }
}
</script>