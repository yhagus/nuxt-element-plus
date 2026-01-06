<script setup lang="ts">
interface ConfirmationDialogProps {
  type?: 'delete';
  title?: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  messageType?: 'warning' | 'info' | 'success' | 'error';
  itemLabel?: string;
}

const props = defineProps<ConfirmationDialogProps>();
const emit = defineEmits<{
  (e: 'confirmed'): void;
  (e: 'cancelled'): void;
}>();
computed<ConfirmationDialogProps>(() => {
  switch (props.type) {
    case 'delete':
      return {
        title: 'Delete Confirmation', // Changed from 'Confirm Deletion'
        message: 'Are you sure you want to permanently delete this item? This action cannot be undone.', // More user-friendly
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        messageType: 'warning',
      };
    default:
      return {
        title: 'Delete Confirmation', // Changed from 'Confirm Deletion'
        message: 'Are you sure you want to permanently delete this item? This action cannot be undone.', // More user-friendly
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        messageType: 'warning',
      };
  }
});

async function open() {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(() => {
      emit('confirmed');
    })
    .catch(() => {
      emit('cancelled');
    });
}

defineExpose({
  open,
});
</script>

<template>
  <div class="confirmation-trigger-body" @click="open">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.confirmation-trigger-body {
  display: flex;
  align-items: center;
}
</style>
