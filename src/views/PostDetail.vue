<template>
  <div class="post-detail">
    <v-alert
      :messages="messages"
    />
    <router-link class="post-nav" to="/">На главную</router-link>
    <div class="post-info">
      <!-- Контент статьи -->
      <div class="post-content">
        <h1>{{ post.title | capitalize}}</h1>
        <div>{{ post.body | capitalize }}</div>
        <tt>POST ID:{{ post.id }}<br>POST USERID:{{ post.userId }}</tt>
      </div>
      <!-- Автор статьи -->
      <div class="post-autor">
        <h3>Autor</h3>
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
        <tt>USER ID:{{ user.id }}</tt>
      </div>
    </div>
    <div class="comments">
      <h2>Comments</h2>
      <!-- Отправить POST запрос на API -->
      <p class="add-comment">
        <input type="text" placeholder="Your email" v-model="form.yourEmail"><br>
        <input type="text" placeholder="Your comment" v-model="form.yourComment"><br>
        <button @click="postPost">Publish</button>
      </p>
      <!-- Выводим комментарии с API -->
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
import vAlert from '@/components/alerts/v-alert'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        yourEmail: '',
        yourComment: ''
      },
      messages: []
    }
  },
  created() {
    const post = this.POSTS.find(post => post.id == this.$route.params.id)
    if (post) {
      this.post = post
      this.user = this.USERS[post.userId - 1]
    }
  },
  computed: {
    ...mapGetters([
      'COMMENTS',
      'USERS',
      'POSTS'
    ]),
    commentsFilter: function () {
      return this.COMMENTS.filter(comment => comment.postId == this.post.id)
    }
  },
  components: {
    vAlert
  },
  methods: {
    showAlert() {
      this.messages.unshift(
        {name: `${this.form.yourEmail} sent: "${this.form.yourComment}"`, id: Date.now().toLocaleString()}
      )
    },
    ...mapActions([
      'GET_COMMENTS',
    ]),
    postPost : function () {
      const str = JSON.stringify(this.form)
      axios.post('https://jsonplaceholder.typicode.com/comments', str)
      .then((response) => {
        this.showAlert()
        console.log(response);
      })
    }
  },
  mounted() {
    this.GET_COMMENTS()
    this.GET_USERS()
    this.GET_POSTS()
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>