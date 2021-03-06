export const isFalsy = (value: unknown) => value === 0 ? false : !value
export const isVoid = (val: unknown) => val == null || val === ''

export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = {...object}
    Object.keys(result).forEach((key) => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}