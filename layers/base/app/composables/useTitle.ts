export function useTitle() {
  const nuxtApp = useNuxtApp();
  const title = ref<string>(nuxtApp.$config.public.appTitle ?? '');
  const getTitle = (): string => {
    return title.value;
  };
  const setTitle = (value: string): void => {
    title.value = value;
    useHead({
      title: title.value,
    });
  };
  const resetTitle = (): void => {
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
