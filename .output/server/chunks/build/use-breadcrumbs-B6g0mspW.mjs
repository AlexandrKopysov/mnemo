globalThis.__timing__.logStart('Load chunks/build/use-breadcrumbs-B6g0mspW');import { k as useState } from '../virtual/entry.mjs';

//#region app/composables/use-breadcrumbs.ts
var useBreadcrumbs = () => {
	const breadcrumbs = useState("breadcrumbs", () => []);
	const setBreadcrumbs = (items) => {
		breadcrumbs.value = items;
	};
	const clearBreadcrumbs = () => {
		breadcrumbs.value = [];
	};
	const setToForLastCrumb = (to) => {
		let lastItem = breadcrumbs.value[breadcrumbs.value.length - 1];
		if (!lastItem) return;
		breadcrumbs.value[breadcrumbs.value.length - 1] = {
			...lastItem,
			to
		};
	};
	const setLastCrumb = (item) => {
		breadcrumbs.value.push(item);
	};
	const setLastBreadcrumbs = (to, item) => {
		setToForLastCrumb(to);
		setLastCrumb(item);
	};
	return {
		breadcrumbs,
		setBreadcrumbs,
		clearBreadcrumbs,
		setLastBreadcrumbs
	};
};

export { useBreadcrumbs as u };;globalThis.__timing__.logEnd('Load chunks/build/use-breadcrumbs-B6g0mspW');
//# sourceMappingURL=use-breadcrumbs-B6g0mspW.mjs.map
