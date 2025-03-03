export interface User {
    id: number
    avatar: null
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
    phone_number: string
    phoneVerified: boolean
    role: number
    gender: number
    birth_of_date: string
    age: number
    status: boolean
    is_superuser: boolean
    is_staff: boolean
    is_customer: boolean
    in_app_messaging: boolean
    company: number
    company_type:number
}

export type AuthState = {
    user: User | null
    token: string
}

