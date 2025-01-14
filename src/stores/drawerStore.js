import { ref } from 'vue';

export const useDrawerStore = () => {
  const isDrawerOpen = ref(false);

  const openDrawer = () => {
    isDrawerOpen.value = true;
  };

  const closeDrawer = () => {
    isDrawerOpen.value = false;
  };

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };
};