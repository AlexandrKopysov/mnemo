import type { RouteLocationRaw } from "vue-router"

export interface IBreadcrumb {
    title: string, 
    to?: RouteLocationRaw
}