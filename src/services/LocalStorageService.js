export const CHARACTER_STORAGE_KEY = 'characters'

export const BACKGROUNDS_STORAGE_KEY = 'backgrounds'
export const ADJUSTMENTS_STORAGE_KEY = 'adjustments'
export const LIMITS_STORAGE_KEY = 'limits'


export const StorageService = {
    fetchLimits(){
        return LocalStorageHandler.getItem(LIMITS_STORAGE_KEY)
    },

    fetchBackgrounds() {
        return LocalStorageHandler.getItem(BACKGROUNDS_STORAGE_KEY)
    },

    fetchAdjustments() {
        return LocalStorageHandler.getItem(ADJUSTMENTS_STORAGE_KEY)
    },

    storeLimits(limits) {
        LocalStorageHandler.setItem(LIMITS_STORAGE_KEY, limits)
    },

    storeBackgrounds(backgrounds) {
        LocalStorageHandler.setItem(BACKGROUNDS_STORAGE_KEY, backgrounds)
    },

    storeAdjustments(adjustments) {
        LocalStorageHandler.setItem(ADJUSTMENTS_STORAGE_KEY, adjustments)
    },

    clearBackgroundsStorage() {
        LocalStorageHandler.purgeStorage()

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