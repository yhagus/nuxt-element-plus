<script setup lang="ts">
const config = useRuntimeConfig();
const notification = useNotification();
const { isNewVersionAvailable } = useVersionUpdater();

const hasShownUpdateNotification = ref(false);
const showUpdateNotice = ref(false);

useHead({
  titleTemplate: (title) => {
    return `${title} | ${config.public.appTitle}`;
  },
});

watch(isNewVersionAvailable, (newVersion) => {
  if (!newVersion || hasShownUpdateNotification.value) {
    return;
  }

  hasShownUpdateNotification.value = true;
  showUpdateNotice.value = true;
});

async function handleReloadApp() {
  const confirmed = await notification.confirm(
    'Perubahan yang belum disimpan akan hilang. Lanjutkan memuat ulang aplikasi?',
    'Konfirmasi Update',
    {
      confirmButtonText: 'Update',
      cancelButtonText: 'Batal',
      type: 'warning',
    },
  );

  if (!confirmed) {
    return;
  }

  reloadNuxtApp({force: true});
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator :height="2" color="#FFD332" />

    <div v-if="showUpdateNotice" class="update-notice" role="status" aria-live="polite">
      <span class="update-notice__text">
        Versi baru aplikasi tersedia. Muat ulang untuk mendapatkan pembaruan terbaru.
      </span>
      <UiButton type="button" size="small" variant="primary" @click="handleReloadApp">
        Update
      </UiButton>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.update-notice {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 420px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #fde68a;
  background: #fffbeb;
  box-shadow: 0 8px 24px rgb(15 23 42 / 12%);
}

.update-notice__text {
  color: #92400e;
  font-size: 13px;
  line-height: 1.35;
}

@media (max-width: 640px) {
  .update-notice {
    left: 12px;
    right: 12px;
    max-width: none;
  }
}
</style>
