import type { IBreadcrumb } from "@shared/types/breadcrumbs"

export const useBreadcrumbs = () => {
    const breadcrumbs = useState<IBreadcrumb[]>('breadcrumbs', () => [])

    const setBreadcrumbs = (items: IBreadcrumb[]) => {
        breadcrumbs.value = items
    }

    const clearBreadcrumbs = () => {
        breadcrumbs.value = []
    }

    const setToForLastCrumb = (to: string) => {
        let lastItem = breadcrumbs.value[breadcrumbs.value.length - 1] 
        if (!lastItem) return
        breadcrumbs.value[breadcrumbs.value.length - 1]  = {
            ...lastItem,
            to
        }
    }

    const setLastCrumb = (item: IBreadcrumb) => {
        breadcrumbs.value.push(item)
    }

    const setLastBreadcrumbs = (to: string, item: IBreadcrumb) => {
        setToForLastCrumb(to);
        setLastCrumb(item);
    }

    return {
        breadcrumbs,
        setBreadcrumbs,
        clearBreadcrumbs,
        setLastBreadcrumbs
    }
}
