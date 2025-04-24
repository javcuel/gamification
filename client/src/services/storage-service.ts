/**
 * StorageService
 * @description Handles interactions with localStorage for storing and retrieving data.
 */
const StorageService = {
  /**
   * Saves an item in localStorage.
   * @param {string} key - The key under which the value will be stored.
   * @param {string} value - The value to store.
   */
  setItem: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  },

  /**
   * Retrieves an item from localStorage.
   * @param {string} key - The key of the value to retrieve.
   * @returns {string | null} The retrieved value, or null if the key does not exist.
   */
  getItem: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  /**
   * Removes an item from localStorage.
   * @param {string} key - The key of the value to remove.
   */
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  /**
   * Clears all data from localStorage.
   */
  clear: (): void => {
    localStorage.clear();
  },
};

export default StorageService;
