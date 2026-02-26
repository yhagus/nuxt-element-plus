<script setup lang="ts">
</script>

<template>
  <p class="footer-copyright">
    &#169; Copyright {{ new Date().getFullYear() }} Nomaden TV. All Rights Reserved. All other trademarks belong to their respective owners.
  </p>
</template>

<style scoped lang="scss">
.footer-copyright {
  position: fixed;
  left: 50%;
  bottom: 1.25rem;
  z-index: 9999;
  width: calc(100% - 1.5rem);
  max-width: 840px;
  transform: translateX(-50%);
  text-align: center;
  font-size: 0.75rem;
  color: rgb(31 41 55 / 0.86);
}
</style>
