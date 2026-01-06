export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  const apiUrl = config.apiUrl;
  return [
    apiUrl,
  ];
});
