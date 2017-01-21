import { STORAGE_KEY } from './mutations';

const localStoragePlugin = (store) => {
  store.subscribe((mutation, { pssts }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pssts));
  });
};

export default localStoragePlugin;
