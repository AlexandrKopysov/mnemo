globalThis.__timing__.logStart('Load chunks/build/forwardRefs-BQag-fAc');import { A as isObject, N as onlyDefinedProps, p as propsFactory } from '../virtual/entry.mjs';
import { TransitionGroup, Transition, mergeProps, h } from 'vue';

//#region node_modules/vuetify/lib/util/box.js
var Box = class {
	constructor(args) {
		const pageScale = (void 0).body.currentCSSZoom ?? 1;
		const isElement = args instanceof Element;
		const factor = isElement ? 1 + (1 - pageScale) / pageScale : 1;
		const { x, y, width, height } = isElement ? args.getBoundingClientRect() : args;
		this.x = x * factor;
		this.y = y * factor;
		this.width = width * factor;
		this.height = height * factor;
	}
	get top() {
		return this.y;
	}
	get bottom() {
		return this.y + this.height;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.width;
	}
};
function getOverflow(a, b) {
	return {
		x: {
			before: Math.max(0, b.left - a.left),
			after: Math.max(0, a.right - b.right)
		},
		y: {
			before: Math.max(0, b.top - a.top),
			after: Math.max(0, a.bottom - b.bottom)
		}
	};
}
function getTargetBox(target) {
	if (Array.isArray(target)) {
		const pageScale = (void 0).body.currentCSSZoom ?? 1;
		const factor = 1 + (1 - pageScale) / pageScale;
		return new Box({
			x: target[0] * factor,
			y: target[1] * factor,
			width: 0 * factor,
			height: 0 * factor
		});
	} else return new Box(target);
}
function getElementBox(el) {
	if (el === (void 0).documentElement) if (!visualViewport) return new Box({
		x: 0,
		y: 0,
		width: (void 0).documentElement.clientWidth,
		height: (void 0).documentElement.clientHeight
	});
	else {
		const pageScale = (void 0).body.currentCSSZoom ?? 1;
		return new Box({
			x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
			y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
			width: visualViewport.width * visualViewport.scale / pageScale,
			height: visualViewport.height * visualViewport.scale / pageScale
		});
	}
	else return new Box(el);
}
//#endregion
//#region node_modules/vuetify/lib/util/animation.js
/** @see https://stackoverflow.com/a/57876601/2074736 */
function nullifyTransforms(el) {
	const rect = new Box(el);
	const style = getComputedStyle(el);
	const tx = style.transform;
	if (tx) {
		let ta, sx, sy, dx, dy;
		if (tx.startsWith("matrix3d(")) {
			ta = tx.slice(9, -1).split(/, /);
			sx = Number(ta[0]);
			sy = Number(ta[5]);
			dx = Number(ta[12]);
			dy = Number(ta[13]);
		} else if (tx.startsWith("matrix(")) {
			ta = tx.slice(7, -1).split(/, /);
			sx = Number(ta[0]);
			sy = Number(ta[3]);
			dx = Number(ta[4]);
			dy = Number(ta[5]);
		} else return new Box(rect);
		const to = style.transformOrigin;
		return new Box({
			x: rect.x - dx - (1 - sx) * parseFloat(to),
			y: rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1)),
			width: sx ? rect.width / sx : el.offsetWidth + 1,
			height: sy ? rect.height / sy : el.offsetHeight + 1
		});
	} else return new Box(rect);
}
function animate(el, keyframes, options) {
	if (typeof el.animate === "undefined") return { finished: Promise.resolve() };
	let animation;
	try {
		animation = el.animate(keyframes, options);
	} catch (err) {
		return { finished: Promise.resolve() };
	}
	if (typeof animation.finished === "undefined") animation.finished = new Promise((resolve) => {
		animation.onfinish = () => {
			resolve(animation);
		};
	});
	return animation;
}
//#endregion
//#region node_modules/vuetify/lib/composables/transition.js
var makeTransitionProps = propsFactory({ transition: {
	type: null,
	default: "fade-transition",
	validator: (val) => val !== true
} }, "transition");
var MaybeTransition = (props, { slots }) => {
	const { transition, disabled, group, ...rest } = props;
	const { component = group ? TransitionGroup : Transition, ...customProps } = isObject(transition) ? transition : {};
	let transitionProps;
	if (isObject(transition)) transitionProps = mergeProps(customProps, onlyDefinedProps({
		disabled,
		group
	}), rest);
	else transitionProps = mergeProps({ name: disabled || !transition ? "" : transition }, rest);
	return h(component, transitionProps, slots);
};
//#endregion
//#region node_modules/vuetify/lib/directives/intersect/index.js
function mounted(el, binding) {}
function unmounted(el, binding) {
	const observe = el._observe?.[binding.instance.$.uid];
	if (!observe) return;
	observe.observer.unobserve(el);
	delete el._observe[binding.instance.$.uid];
}
var Intersect = {
	mounted,
	unmounted,
	updated: (el, binding) => {
		if (el._observe?.[binding.instance.$.uid]) unmounted(el, binding);
	}
};
//#endregion
//#region node_modules/vuetify/lib/composables/forwardRefs.js
var Refs = Symbol("Forwarded refs");
/** Omit properties starting with P */
/** Omit keyof $props from T */
function getDescriptor(obj, key) {
	let currentObj = obj;
	while (currentObj) {
		const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
		if (descriptor) return descriptor;
		currentObj = Object.getPrototypeOf(currentObj);
	}
}
function forwardRefs(target, ...refs) {
	target[Refs] = refs;
	return new Proxy(target, {
		get(target, key) {
			if (Reflect.has(target, key)) return Reflect.get(target, key);
			if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) {
				const val = Reflect.get(ref.value, key);
				return typeof val === "function" ? val.bind(ref.value) : val;
			}
		},
		has(target, key) {
			if (Reflect.has(target, key)) return true;
			if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) return true;
			return false;
		},
		set(target, key, value) {
			if (Reflect.has(target, key)) return Reflect.set(target, key, value);
			if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
			for (const ref of refs) if (ref.value && Reflect.has(ref.value, key)) return Reflect.set(ref.value, key, value);
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
			if (descriptor) return descriptor;
			if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
			for (const ref of refs) {
				if (!ref.value) continue;
				const descriptor = getDescriptor(ref.value, key) ?? ("_" in ref.value ? getDescriptor(ref.value._?.setupState, key) : void 0);
				if (descriptor) return descriptor;
			}
			for (const ref of refs) {
				const childRefs = ref.value && ref.value[Refs];
				if (!childRefs) continue;
				const queue = childRefs.slice();
				while (queue.length) {
					const ref = queue.shift();
					const descriptor = getDescriptor(ref.value, key);
					if (descriptor) return descriptor;
					const childRefs = ref.value && ref.value[Refs];
					if (childRefs) queue.push(...childRefs);
				}
			}
		}
	});
}

export { Box as B, Intersect as I, MaybeTransition as M, animate as a, getElementBox as b, getOverflow as c, forwardRefs as f, getTargetBox as g, makeTransitionProps as m, nullifyTransforms as n };;globalThis.__timing__.logEnd('Load chunks/build/forwardRefs-BQag-fAc');
//# sourceMappingURL=forwardRefs-BQag-fAc.mjs.map
