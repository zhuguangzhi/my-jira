export type UserProp = {
    id?: number | string,
    name: string,
    personId?: string,
    token?: string
}
export type ProjectProp = {
    id: number,
    name: string,
    organization: string,
    personId: number,
    created: number
}

export interface loginInfoProps {
    username: string,
    password: string | number,
    cPassword?: string | number,
}