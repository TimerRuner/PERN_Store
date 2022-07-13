//! модуль для функцій реєсрації, логіна і провірки токена
import { $authHost, $host } from "./index"

export const createType = async (type) => {
    const { data } = await $authHost.post("api/type", type) //? щоб створити тип потрібно мати доступ, він перевіряється в роутері, тому потрібно робити запит із токеном
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get("api/type")
    return data
}

//? методи для роботи із брендами
export const createBrand = async (brand) => {
    const { data } = await $authHost.post("api/brand", brand) //? щоб створити бренд потрібно мати доступ, він перевіряється в роутері, тому потрібно робити запит із токеном
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get("api/brand")
    return data
}

//? методи для роботи із девайсами
export const createDevice = async (device) => {
    const { data } = await $authHost.post("api/device", device) //? щоб створити бренд потрібно мати доступ, він перевіряється в роутері, тому потрібно робити запит із токеном
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get("api/device", {
        params: {
            typeId,
            brandId,
            page,
            limit,
        },
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get("api/device/" + id)
    return data
}
