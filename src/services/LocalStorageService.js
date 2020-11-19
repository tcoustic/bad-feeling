export const CHARACTER_STORAGE_KEY = 'characters'

export const BACKGROUNDS_STORAGE_KEY = 'backgrounds'


export const StorageService = {
    fetchBackgrounds() {
        return LocalStorageHandler.getItem(BACKGROUNDS_STORAGE_KEY)
    },

    storeBackgrounds(backgrounds) {
        LocalStorageHandler.setItem(BACKGROUNDS_STORAGE_KEY, backgrounds)
    },

    clearBackgroundsStorage() {
        LocalStorageHandler.removeItem(BACKGROUNDS_STORAGE_KEY)
    }
}

const LocalStorageHandler = {

    getItem(key) {
        try {
            return window.JSON.parse(window.localStorage.getItem(key))
        } catch (e) {
            return null
        }
    },

    setItem(key, value = {}) {
        window.localStorage.setItem(key, window.JSON.stringify(value))
    },

    removeItem(key) {
        window.localStorage.removeItem(key)
    },

    purgeStorage() {
        window.localStorage.clear()
    }
}