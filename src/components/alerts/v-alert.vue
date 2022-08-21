<template>
  <div class="v-alert">
    <transition-group
      name="v-animate"
      class="messages_list"
    >
      <div
        class="v-alert-content"
        v-for="message in messages"
        :key="message.id"
      >
        <div class="content-text">
          <span>{{ message.name }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "v-alert",
    props: {
      messages: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      hideAlert() {
        let vm = this;
        if(this.messages.length) {
          setTimeout( () => {
            if(!this.messages.length) return
            console.log('GO')
            vm.messages.splice(vm.messages.length - 1, 1)
          }, 2000)
        }
      }
    },
    watch: {
      messages() {
        this.hideAlert()
      }
    },
    mounted() {
        this.hideAlert()
    }

  }
</script>

<style lang="scss">
  .v-alert {
    position: fixed;
    top: 50px;
    right: 15px;
    z-index: 1;

    .messages_list {
      display: flex;
      flex-direction: column;
    }

    &-content {
      padding: 15px;
      color: aliceblue;
      height: 50px;
      border-radius: 10px;
      margin-bottom: 15px;
      background-color: rgba(80, 160, 175, 0.8);

      .content-text {
        transform: translate(0, 80%);
      }
    }

    .v-animate {
      &-enter {
        transform: translateX(120px);
        opacity: 0;
      }

      &-enter-active {
        transition: .6s ease;
      }

      &-enter-to {
        opacity: 1;
      }

      &-leave {
        height: 50px;
        opacity: 1;
      }

      &-leave-active {
        transition: transform .6s ease, opacity .6s, height .6s .2s;
      }

      &-leave-to {
        height: 0;
        transform: translateX(120px);
        opacity: 0;
      }

      &-move {
        transition: transform .6s ease;
      }
    }
  }
</style>