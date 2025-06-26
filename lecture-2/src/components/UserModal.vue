<template>
  <div v-if="visible" :class="$style.overlay" @click.self="onClose">
    <div :class="$style.modal">
      <button :class="$style.close" @click="onClose">×</button>
      <div :class="$style.header">{{ user.name }}</div>
      <a :href="`mailto:${user.email}`" :class="$style.email">{{
        user.email
      }}</a>
      <hr :class="$style.divider" />
      <div :class="$style.section">
        <div :class="$style.sectionTitle">Address</div>
        <div>{{ user.address.street }}, {{ user.address.suite }}</div>
        <div>{{ user.address.city }}, {{ user.address.zipcode }}</div>
        <a :href="mapUrl" target="_blank" :class="$style.mapLink"
          >📍 View on map</a
        >
      </div>
      <div :class="$style.section">
        <div :class="$style.sectionTitle">Contact</div>
        <div>
          <span :class="$style.fieldName">Phone:</span> {{ user.phone }}
        </div>
        <div>
          <span :class="$style.fieldName">Website:</span>
          <a
            :href="`http://${user.website}`"
            target="_blank"
            :class="$style.mapLink"
            >{{ user.website }}</a
          >
        </div>
      </div>
      <div :class="$style.section">
        <div :class="$style.sectionTitle">Company</div>
        <div>
          <span :class="$style.fieldName">Name:</span> {{ user.company.name }}
        </div>
        <div>
          <span :class="$style.fieldName">Catchphrase:</span>
          {{ user.company.catchPhrase }}
        </div>
        <div>
          <span :class="$style.fieldName">Business:</span> {{ user.company.bs }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "../types/user"
import { defineProps, defineEmits, computed } from "vue"
import styles from "./UserModal.module.css"

const props = defineProps<{
  user: User
  visible: boolean
}>()
const emit = defineEmits(["close"])

const onClose = () => emit("close")
const mapUrl = computed(
  () =>
    `https://www.google.com/maps?q=${props.user.address.geo.lat},${props.user.address.geo.lng}`
)
</script>

<style module src="./UserModal.module.css" />
