<template>
  <div class="wrapper">
    <Table @openForm="openModal" />
    <Form @closeForm="closeModal" :isVisible="isVisible" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Form from "./components/Form.vue";
import Table from "./components/Table.vue";

const isVisible = ref(false);

const openModal = () => {
  isVisible.value = true;
};

const closeModal = () => {
  isVisible.value = false;
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 100px;
}
</style>
