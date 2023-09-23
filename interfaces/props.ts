export interface Route {
    id: string
    state: boolean
    isNew: boolean
    icon: string // mdi-office-building"
    name: string
    background_color: string
    to: string
    acl: string
}

export interface DashboardContextItems {
    to: string
    title: string
    icon: string
    disabled: boolean
}

export interface DashboardItems {
    id: string
    title: string
    icon: string
    subtitle: string
    link: string
    acl: string
    is_attention?: boolean
    animation?: boolean
    context_menu?: DashboardContextItems[]
}

