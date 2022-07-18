export type UserProp = {
    id: number,
    name: string,
    personId?: number,
    token?: string
}
export type ProjectProp = {
    id: number,
    name: string,
    organization: string,
    personId: number | null,
    created: number
}

export interface loginInfoProps {
    username: string,
    password: string | number,
    cPassword?: string | number,
}