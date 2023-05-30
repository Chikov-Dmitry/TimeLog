import {ITheme} from "@/views/layout/composables/layout";

interface LocalStorageSchema {
    token: string
    deviceId: string
    theme: ITheme
}

export const setTypedLStorageItem = <T extends keyof LocalStorageSchema>(key: T, value: LocalStorageSchema[T]): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const getTypedLStorageItem = <T extends keyof LocalStorageSchema>(key: T): LocalStorageSchema[T] | null => {
    const value = window.localStorage.getItem(key)
    if(!value) return null
    else return JSON.parse(value) as LocalStorageSchema[T];
}

export const removeTypedLStorageItem = <T extends keyof LocalStorageSchema>(key: T): void => {
    window.localStorage.removeItem(key)
}