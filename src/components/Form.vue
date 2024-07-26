<template>
  <form v-if="isVisible" class="form" @submit.prevent="saveUser">
    <button @click="closeForm" class="form__close">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 1L1 15M15 15L1 1"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <h2 class="form__title">Добавление пользователя</h2>

    <div class="form__wrapper">
      <div class="form__wrapper-item">
        <span>Имя</span>
        <input v-model="name" placeholder="Имя" type="text" />
      </div>
      <div class="form__wrapper-item">
        <span>Телефон</span>
        <input v-model="phone" placeholder="Телефон" type="text" />
      </div>

      <div
        v-if="flattenedUsers && flattenedUsers.length"
        class="form__wrapper-item"
      >
        <span>Начальник</span>
        <select v-model="selectedUser">
          <option value="">-- Нет начальника --</option>
          <option
            v-for="(user, index) in flattenedUsers"
            :key="index"
            :value="user.name"
          >
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>

    <button class="form__save">Сохранить</button>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/store/userStore";

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});

const store = useUserStore();

const name = ref("");
const phone = ref("");
const selectedUser = ref("");

const flattenUsers = (users) => {
  let result = [];
  for (const user of users) {
    result.push({ name: user.name });
    if (user.adduser && user.adduser.length > 0) {
      result = result.concat(flattenUsers(user.adduser));
    }
  }
  return result;
};

const flattenedUsers = computed(() => flattenUsers(store.users));

const saveUser = () => {
  const newUser = { name: name.value, phone: phone.value, adduser: [] };
  if (selectedUser.value) {
    const user = findUserByName(selectedUser.value, store.users);
    if (user) {
      user.adduser.push(newUser);
      store.saveToLocalStorage();
    }
  } else {
    store.addUser(newUser);
  }
  name.value = "";
  phone.value = "";
  selectedUser.value = "";
};

const findUserByName = (name, users) => {
  for (const user of users) {
    if (user.name === name) return user;
    if (user.adduser) {
      const found = findUserByName(name, user.adduser);
      if (found) return found;
    }
  }
  return null;
};

const emit = defineEmits(["closeForm"]);

const closeForm = () => {
  emit("closeForm");
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  width: 500px;
  border: 1px solid black;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    & svg {
      width: 16px;
      height: 16px;
      stroke: black;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & input {
        padding: 10px;
        width: 300px;
        height: 30px;
      }

      & select {
        padding: 10px;
        width: 300px;
        height: auto;
      }
    }
  }

  &__save {
    background: rgb(207, 206, 206);
    width: max-content;
    padding: 15px 25px;
    border-radius: 10px;
  }
}
</style>
