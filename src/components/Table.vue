<template>
  <div class="table">
    <button @click="openForm" class="table__add">Добавить</button>
    <div class="table__head">
      <span class="table__head-item">Имя</span>
      <span class="table__head-item">Телефон</span>
    </div>

    <div class="table__body">
      <UserList v-for="(user, index) in usersList" :key="index" :user="user" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import UserList from "./UserList.vue";
import { useUserStore } from "@/store/userStore";

const store = useUserStore();
const usersList = computed(() => store.users);

onMounted(() => {
  store.loadFromLocalStorage();
});

const emit = defineEmits(["openForm"]);

const openForm = () => {
  emit("openForm");
};
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  width: 500px;

  &__head {
    display: flex;
    align-items: center;

    &-item {
      padding: 10px;
      width: 100%;
      border: 1px solid black;
      &:nth-child(1) {
        border-right: none;
      }
    }
  }

  &__add {
    top: -100px;
    right: 0;
    position: absolute;
    background: rgb(207, 206, 206);
    width: max-content;
    padding: 15px 25px;
    border-radius: 10px;
  }
}
</style>
