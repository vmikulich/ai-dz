<template>
  <div :class="$style.container">
    <div :class="$style.title">Users</div>
    <table :class="$style.table">
      <thead :class="$style.thead">
        <tr>
          <th :class="$style.th">NAME / EMAIL</th>
          <th :class="$style.th">ADDRESS</th>
          <th :class="$style.th">PHONE</th>
          <th :class="$style.th">WEBSITE</th>
          <th :class="$style.th">COMPANY</th>
          <th :class="$style.th">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          :class="$style.tr"
          @click="openModal(user)"
        >
          <td :class="$style.td">
            <div :class="$style.name">{{ user.name }}</div>
            <div :class="$style.email">{{ user.email }}</div>
          </td>
          <td :class="$style.td">
            {{ user.address.city }}, {{ user.address.street }}
          </td>
          <td :class="$style.td">{{ user.phone }}</td>
          <td :class="$style.td">
            <a
              :href="`http://${user.website}`"
              :class="$style.link"
              target="_blank"
              @click.stop
              >{{ user.website }}</a
            >
          </td>
          <td :class="$style.td">{{ user.company.name }}</td>
          <td :class="$style.action" @click.stop="deleteUser(user.id)">✕</td>
        </tr>
      </tbody>
    </table>
    <UserModal
      v-if="selectedUser"
      :user="selectedUser"
      :visible="modalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { User } from "../types/user"
import UserModal from "./UserModal.vue"
import styles from "./UserTable.module.css"

const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const modalVisible = ref(false)

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  users.value = await res.json()
}

const deleteUser = (id: number) => {
  users.value = users.value.filter((u) => u.id !== id)
  if (selectedUser.value?.id === id) {
    closeModal()
  }
}

const openModal = (user: User) => {
  selectedUser.value = user
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
  selectedUser.value = null
}

onMounted(fetchUsers)
</script>

<style module src="./UserTable.module.css" />
