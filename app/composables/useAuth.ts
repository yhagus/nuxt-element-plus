import { ref } from 'vue';

const user = ref<User>();
export function useAuth() {
  const setUser = (value: User) => {
    user.value = value;
  };
  const getUser = () => {
    return user.value;
  };
  const clearUser = () => {
    user.value = undefined;
  };

  return {
    user,
    setUser,
    getUser,
    clearUser,
  };
}
