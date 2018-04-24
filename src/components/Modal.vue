/* eslint-disable */
<template>
  <transition name="fade">
    <div class="modal-mask" @click="close" v-show="show">
      <div class="modal-container" @click.stop>
        <md-button class="md-icon-button modal-header" @click="close">
          <md-icon>close</md-icon>
        </md-button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['show'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.show && e.keyCode === 27) {
        this.close();
      }
    });
  },
};
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}
.modal-header{
  position:absolute;
  margin-top:0;
  display:flex;
}
.modal-container {
    width: 700px;
    margin: 20px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 10px 12px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}
.modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
