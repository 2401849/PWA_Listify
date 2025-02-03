<script lang="ts">
import { differenceInDays, isToday, isTomorrow, startOfToday } from 'date-fns';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeLeftComputed() {
      return this.timeLeft(this.item.dueDate);
    }
  },
  methods: {
    openForm(isEdit) {
      this.$emit('open-form', { isEdit, item: this.item });
    },
    deleteItem() {
      this.$emit('delete-item', this.item);
    },
    timeLeft(dueDate) {
      if (!dueDate) return { diff: '', left: 'Expired' };
      if (isToday(dueDate)) return { diff: '', left: 'Expires today' }
      if (isTomorrow(dueDate)) return { diff: '', left: 'Expires tomorrow' };

      const now = startOfToday()
      const days = differenceInDays(dueDate, now);
      return { diff: days, left: 'days left' };

    }
  }
};
</script>

<template>
  <v-row :key="item._id">
    <v-col cols="12">
      <v-card>
        <v-card-title :class="{ 'completed-task': item.isCompleted }">
          {{ item.title }}
          <v-checkbox label="Mark Complete"
                      class="checkbox-top-right rounded-checkbox"
                      :model-value="item.isCompleted"
                      @change="$emit('toggle-completed', item)"
          ></v-checkbox>
        </v-card-title>
        <v-card-subtitle :class="{ 'completed-task': item.isCompleted }">
          {{ timeLeftComputed.diff }} {{ timeLeftComputed.left }}
        </v-card-subtitle>
        <v-card-text :class="{ 'completed-task': item.isCompleted }">
          {{ item.description }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-pencil" @click="openForm(true)"></v-btn>
          <v-btn icon="mdi-trash-can" @click="deleteItem"></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style>
.completed-task {
  text-decoration: line-through;
}

.checkbox-top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
}
</style>
