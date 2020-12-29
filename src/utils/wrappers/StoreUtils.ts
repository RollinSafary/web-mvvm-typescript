import store from 'store';
import {
  StorageKeys,
  storageNamespace,
} from '../../constants/StorageConstants';
const storage: StoreJsAPI = store.namespace(storageNamespace);

export function saveToStorage(key: StorageKeys, value: any = null): void {
  storage.set(key, value);
}
export function removeFromStorage(key: StorageKeys): void {
  storage.remove(key);
}
export function readFromStorage(key: StorageKeys): any {
  return storage.get(key, null);
}
