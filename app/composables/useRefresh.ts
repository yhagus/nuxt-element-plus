import { ref } from 'vue';

const session = ref<string>('');
export function useRefresh() {
  const refresh = () => {
    session.value = Date.now().toString();
  };

  return {
    session,
    refresh,
  };
}
