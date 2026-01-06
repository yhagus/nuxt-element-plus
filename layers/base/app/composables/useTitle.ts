const nuxtApp = useNuxtApp();
const title = ref<string>(nuxtApp.$config.public.appTitle ?? '');
export function useTitle() {
  const getTitle = () => {
    return title.value;
  };
  const setTitle = (value: string) => {
    title.value = value;
    useHead({
      title: title.value,
    });
  };
  const resetTitle = () => {
    title.value = nuxtApp.$config.public.appTitle;
    useHead({
      title: title.value,
    });
  };

  return {
    title: readonly(title),
    getTitle,
    setTitle,
    resetTitle,
  };
}
