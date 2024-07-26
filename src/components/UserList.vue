<template>
  <div class="user">
    <div class="user__info">
      <span class="user__info-item">{{ user.name }}</span>
      <span class="user__info-item">{{ user.phone }}</span>
    </div>
    <div class="user__add">
      <UserList
        v-for="(subordinate, index) in user.adduser"
        :key="index"
        :user="subordinate"
      />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  user: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.user {
  &__info {
    display: flex;
    align-items: center;

    &-item {
      width: 100%;
      border: 1px solid black;
      border-top: none;
     &:nth-child(1) {
      border-right:none ;
     }
    }
  }

  &__add {
    margin-left: 10px;
  }
}
</style>
