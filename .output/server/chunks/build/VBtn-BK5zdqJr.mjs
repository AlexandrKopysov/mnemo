globalThis.__timing__.logStart('Load chunks/build/VBtn-BK5zdqJr');import { g as genericComponent, l as provideTheme, m as useTheme, q as useIcon, c as convertToUnit, r as getCurrentInstance$1, s as getCurrentInstanceName, t as hasEvent, v as useRtl, w as destructComputed, p as propsFactory, I as IconValue, x as makeThemeProps, y as includes, z as provideDefaults, A as isObject, B as isPrimitive, a as useProxiedModel, e as clamp, C as useToggleScope, D as templateRef, E as isCssColor, F as isParsableColor, G as parseColor, H as hasLightForeground, J as flattenFragments, P as PREFERS_REDUCED_MOTION, K as wrapInArray, L as findChildrenWithProvide, M as consoleWarn } from '../virtual/entry.mjs';
import { computed, toRef, shallowRef, isRef, resolveDynamicComponent, reactive, toValue, useId, provide, inject, watch, nextTick, createElementVNode, normalizeClass, createVNode, toRefs, ref, watchEffect, normalizeStyle, Transition, Fragment, readonly, Text, mergeProps, withDirectives, toDisplayString, unref } from 'vue';

//#region node_modules/vuetify/lib/util/anchor.js
var block = ["top", "bottom"];
var inline = [
	"start",
	"end",
	"left",
	"right"
];
/** Parse a raw anchor string into an object */
function parseAnchor(anchor, isRtl) {
	let [side, align] = anchor.split(" ");
	if (!align) align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
	return {
		side: toPhysical(side, isRtl),
		align: toPhysical(align, isRtl)
	};
}
function toPhysical(str, isRtl) {
	if (str === "start") return isRtl ? "right" : "left";
	if (str === "end") return isRtl ? "left" : "right";
	return str;
}
function flipSide(anchor) {
	return {
		side: {
			center: "center",
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		}[anchor.side],
		align: anchor.align
	};
}
function flipAlign(anchor) {
	return {
		side: anchor.side,
		align: {
			center: "center",
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		}[anchor.align]
	};
}
function flipCorner(anchor) {
	return {
		side: anchor.align,
		align: anchor.side
	};
}
function getAxis(anchor) {
	return includes(block, anchor.side) ? "y" : "x";
}
//#endregion
//#region node_modules/vuetify/lib/composables/component.js
var makeComponentProps = propsFactory({
	class: [
		String,
		Array,
		Object
	],
	style: {
		type: [
			String,
			Array,
			Object
		],
		default: null
	}
}, "component");
//#endregion
//#region node_modules/vuetify/lib/util/deepEqual.js
function updateRecursionCache(a, b, cache, result) {
	if (!cache || isPrimitive(a) || isPrimitive(b)) return;
	const visitedObject = cache.get(a);
	if (visitedObject) visitedObject.set(b, result);
	else {
		const newCacheItem = /* @__PURE__ */ new WeakMap();
		newCacheItem.set(b, result);
		cache.set(a, newCacheItem);
	}
}
function findCachedComparison(a, b, cache) {
	if (!cache || isPrimitive(a) || isPrimitive(b)) return null;
	const r1 = cache.get(a)?.get(b);
	if (typeof r1 === "boolean") return r1;
	const r2 = cache.get(b)?.get(a);
	if (typeof r2 === "boolean") return r2;
	return null;
}
function deepEqual(a, b, recursionCache = /* @__PURE__ */ new WeakMap()) {
	if (a === b) return true;
	if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) return false;
	if (a !== Object(a) || b !== Object(b)) return false;
	const props = Object.keys(a);
	if (props.length !== Object.keys(b).length) return false;
	const cachedComparisonResult = findCachedComparison(a, b, recursionCache);
	if (cachedComparisonResult) return cachedComparisonResult;
	updateRecursionCache(a, b, recursionCache, true);
	return props.every((p) => deepEqual(a[p], b[p], recursionCache));
}
//#endregion
//#region node_modules/vuetify/lib/util/useRender.js
function useRender(render) {
	const vm = getCurrentInstance$1("useRender");
	vm.render = render;
}
//#endregion
//#region node_modules/vuetify/lib/composables/resizeObserver.js
function useResizeObserver(callback, box = "content") {
	return {
		resizeRef: templateRef(),
		contentRect: readonly(ref())
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/color.js
function useColor(colors) {
	return destructComputed(() => {
		const { class: colorClasses, style: colorStyles } = computeColor(colors);
		return {
			colorClasses,
			colorStyles
		};
	});
}
function useTextColor(color) {
	const { colorClasses: textColorClasses, colorStyles: textColorStyles } = useColor(() => ({ text: toValue(color) }));
	return {
		textColorClasses,
		textColorStyles
	};
}
function useBackgroundColor(color) {
	const { colorClasses: backgroundColorClasses, colorStyles: backgroundColorStyles } = useColor(() => ({ background: toValue(color) }));
	return {
		backgroundColorClasses,
		backgroundColorStyles
	};
}
function normalizeColors(colors) {
	return {
		text: typeof colors.text === "string" ? colors.text.replace(/^text-/, "") : colors.text,
		background: typeof colors.background === "string" ? colors.background.replace(/^bg-/, "") : colors.background
	};
}
function computeColor(colors) {
	const _colors = normalizeColors(toValue(colors));
	const classes = [];
	const styles = {};
	if (_colors.background) if (isCssColor(_colors.background)) {
		styles.backgroundColor = _colors.background;
		if (!_colors.text && isParsableColor(_colors.background)) {
			const backgroundColor = parseColor(_colors.background);
			if (backgroundColor.a == null || backgroundColor.a === 1) classes.push(hasLightForeground(backgroundColor) ? "v-theme-on-dark" : "v-theme-on-light");
		}
	} else classes.push(`bg-${_colors.background}`);
	if (_colors.text) if (isCssColor(_colors.text)) {
		styles.color = _colors.text;
		styles.caretColor = _colors.text;
	} else classes.push(`text-${_colors.text}`);
	return {
		class: classes,
		style: styles
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/size.js
var predefinedSizes = [
	"x-small",
	"small",
	"default",
	"large",
	"x-large"
];
var makeSizeProps = propsFactory({ size: {
	type: [String, Number],
	default: "default"
} }, "size");
function useSize(props, name = getCurrentInstanceName()) {
	return destructComputed(() => {
		const size = props.size;
		let sizeClasses;
		let sizeStyles;
		if (includes(predefinedSizes, size)) sizeClasses = `${name}--size-${size}`;
		else if (size) sizeStyles = {
			width: convertToUnit(size),
			height: convertToUnit(size)
		};
		return {
			sizeClasses,
			sizeStyles
		};
	});
}
//#endregion
//#region node_modules/vuetify/lib/composables/tag.js
var makeTagProps = propsFactory({ tag: {
	type: [
		String,
		Object,
		Function
	],
	default: "div"
} }, "tag");
//#endregion
//#region node_modules/vuetify/lib/components/VIcon/VIcon.js
var makeVIconProps = propsFactory({
	color: String,
	disabled: Boolean,
	start: Boolean,
	end: Boolean,
	icon: IconValue,
	opacity: [String, Number],
	...makeComponentProps(),
	...makeSizeProps(),
	...makeTagProps({ tag: "i" }),
	...makeThemeProps()
}, "VIcon");
var VIcon = genericComponent()({
	name: "VIcon",
	props: makeVIconProps(),
	setup(props, { attrs, slots }) {
		const slotIcon = shallowRef();
		const { themeClasses } = useTheme();
		const { iconData } = useIcon(() => slotIcon.value || props.icon);
		const { sizeClasses } = useSize(props);
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		useRender(() => {
			const slotValue = slots.default?.();
			if (slotValue) slotIcon.value = flattenFragments(slotValue).filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]?.children;
			const hasClick = !!(attrs.onClick || attrs.onClickOnce);
			return createVNode(iconData.value.component, {
				"tag": props.tag,
				"icon": iconData.value.icon,
				"class": normalizeClass([
					"v-icon",
					"notranslate",
					themeClasses.value,
					sizeClasses.value,
					textColorClasses.value,
					{
						"v-icon--clickable": hasClick,
						"v-icon--disabled": props.disabled,
						"v-icon--start": props.start,
						"v-icon--end": props.end
					},
					props.class
				]),
				"style": normalizeStyle([
					{ "--v-icon-opacity": props.opacity },
					!sizeClasses.value ? {
						fontSize: convertToUnit(props.size),
						height: convertToUnit(props.size),
						width: convertToUnit(props.size)
					} : void 0,
					textColorStyles.value,
					props.style
				]),
				"role": hasClick ? "button" : void 0,
				"aria-hidden": !hasClick,
				"tabindex": hasClick ? props.disabled ? -1 : 0 : void 0
			}, { default: () => [slotValue] });
		});
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/composables/dimensions.js
var makeDimensionProps = propsFactory({
	height: [Number, String],
	maxHeight: [Number, String],
	maxWidth: [Number, String],
	minHeight: [Number, String],
	minWidth: [Number, String],
	width: [Number, String]
}, "dimension");
function useDimension(props) {
	return { dimensionStyles: computed(() => {
		const styles = {};
		const height = convertToUnit(props.height);
		const maxHeight = convertToUnit(props.maxHeight);
		const maxWidth = convertToUnit(props.maxWidth);
		const minHeight = convertToUnit(props.minHeight);
		const minWidth = convertToUnit(props.minWidth);
		const width = convertToUnit(props.width);
		if (height != null) styles.height = height;
		if (maxHeight != null) styles.maxHeight = maxHeight;
		if (maxWidth != null) styles.maxWidth = maxWidth;
		if (minHeight != null) styles.minHeight = minHeight;
		if (minWidth != null) styles.minWidth = minWidth;
		if (width != null) styles.width = width;
		return styles;
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/composables/location.js
var oppositeMap = {
	center: "center",
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
var makeLocationProps = propsFactory({ location: String }, "location");
function useLocation(props, opposite = false, offset) {
	const { isRtl } = useRtl();
	return { locationStyles: computed(() => {
		if (!props.location) return {};
		const { side, align } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
		function getOffset(side) {
			return offset ? offset(side) : 0;
		}
		const styles = {};
		if (side !== "center") if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`;
		else styles[side] = 0;
		if (align !== "center") if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`;
		else styles[align] = 0;
		else {
			if (side === "center") styles.top = styles.left = "50%";
			else styles[{
				top: "left",
				bottom: "left",
				left: "top",
				right: "top"
			}[side]] = "50%";
			styles.transform = {
				top: "translateX(-50%)",
				bottom: "translateX(-50%)",
				left: "translateY(-50%)",
				right: "translateY(-50%)",
				center: "translate(-50%, -50%)"
			}[side];
		}
		return styles;
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/composables/rounded.js
var makeRoundedProps = propsFactory({
	rounded: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	tile: Boolean
}, "rounded");
function useRounded(props, name = getCurrentInstanceName()) {
	return { roundedClasses: computed(() => {
		const rounded = isRef(props) ? props.value : props.rounded;
		const tile = isRef(props) ? false : props.tile;
		const classes = [];
		if (tile || rounded === false) classes.push("rounded-0");
		else if (rounded === true || rounded === "") classes.push(`${name}--rounded`);
		else if (typeof rounded === "string" || rounded === 0) for (const value of String(rounded).split(" ")) classes.push(`rounded-${value}`);
		return classes;
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/components/VDefaultsProvider/VDefaultsProvider.js
var makeVDefaultsProviderProps = propsFactory({
	defaults: Object,
	disabled: Boolean,
	reset: [Number, String],
	root: [Boolean, String],
	scoped: Boolean
}, "VDefaultsProvider");
var VDefaultsProvider = genericComponent(false)({
	name: "VDefaultsProvider",
	props: makeVDefaultsProviderProps(),
	setup(props, { slots }) {
		const { defaults, disabled, reset, root, scoped } = toRefs(props);
		provideDefaults(defaults, {
			reset,
			root,
			scoped,
			disabled
		});
		return () => slots.default?.();
	}
});
//#endregion
//#region node_modules/vuetify/lib/composables/border.js
var makeBorderProps = propsFactory({ border: [
	Boolean,
	Number,
	String
] }, "border");
function useBorder(props, name = getCurrentInstanceName()) {
	return { borderClasses: computed(() => {
		const border = props.border;
		if (border === true || border === "") return `${name}--border`;
		else if (typeof border === "string" || border === 0) return String(border).split(" ").map((v) => `border-${v}`);
		return [];
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/composables/density.js
var allowedDensities = [
	null,
	"default",
	"comfortable",
	"compact"
];
var makeDensityProps = propsFactory({ density: {
	type: String,
	default: "default",
	validator: (v) => allowedDensities.includes(v)
} }, "density");
function useDensity(props, name = getCurrentInstanceName()) {
	return { densityClasses: toRef(() => {
		return `${name}--density-${props.density}`;
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/composables/variant.js
var allowedVariants = [
	"elevated",
	"flat",
	"tonal",
	"outlined",
	"text",
	"plain"
];
function genOverlays(isClickable, name) {
	return createElementVNode(Fragment, null, [isClickable && createElementVNode("span", {
		"key": "overlay",
		"class": normalizeClass(`${name}__overlay`)
	}, null), createElementVNode("span", {
		"key": "underlay",
		"class": normalizeClass(`${name}__underlay`)
	}, null)]);
}
var makeVariantProps = propsFactory({
	color: String,
	variant: {
		type: String,
		default: "elevated",
		validator: (v) => allowedVariants.includes(v)
	}
}, "variant");
function useVariant(props, name = getCurrentInstanceName()) {
	const variantClasses = toRef(() => {
		const { variant } = toValue(props);
		return `${name}--variant-${variant}`;
	});
	const { colorClasses, colorStyles } = useColor(() => {
		const { variant, color } = toValue(props);
		return { [["elevated", "flat"].includes(variant) ? "background" : "text"]: color };
	});
	return {
		colorClasses,
		colorStyles,
		variantClasses
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/elevation.js
var makeElevationProps = propsFactory({ elevation: {
	type: [Number, String],
	validator: (value) => parseInt(value) >= 0
} }, "elevation");
function useElevation(props) {
	return { elevationClasses: toRef(() => {
		const elevation = isRef(props) ? props.value : props.elevation;
		if (elevation == null) return [];
		return [`elevation-${parseInt(elevation)}`];
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/components/VBtnGroup/VBtnGroup.js
var makeVBtnGroupProps = propsFactory({
	baseColor: String,
	divided: Boolean,
	direction: {
		type: String,
		default: "horizontal"
	},
	...makeBorderProps(),
	...makeComponentProps(),
	...makeDensityProps(),
	...makeElevationProps(),
	...makeRoundedProps(),
	...makeTagProps(),
	...makeThemeProps(),
	...makeVariantProps()
}, "VBtnGroup");
var VBtnGroup = genericComponent()({
	name: "VBtnGroup",
	props: makeVBtnGroupProps(),
	setup(props, { slots }) {
		const { themeClasses } = provideTheme(props);
		const { densityClasses } = useDensity(props);
		const { borderClasses } = useBorder(props);
		const { elevationClasses } = useElevation(props);
		const { roundedClasses } = useRounded(props);
		provideDefaults({ VBtn: {
			height: toRef(() => props.direction === "horizontal" ? "auto" : null),
			baseColor: toRef(() => props.baseColor),
			color: toRef(() => props.color),
			density: toRef(() => props.density),
			flat: true,
			variant: toRef(() => props.variant)
		} });
		useRender(() => {
			return createVNode(props.tag, {
				"class": normalizeClass([
					"v-btn-group",
					`v-btn-group--${props.direction}`,
					{ "v-btn-group--divided": props.divided },
					themeClasses.value,
					borderClasses.value,
					densityClasses.value,
					elevationClasses.value,
					roundedClasses.value,
					props.class
				]),
				"style": normalizeStyle(props.style)
			}, slots);
		});
	}
});
//#endregion
//#region node_modules/vuetify/lib/composables/group.js
var makeGroupProps = propsFactory({
	modelValue: {
		type: null,
		default: void 0
	},
	multiple: Boolean,
	mandatory: [Boolean, String],
	max: Number,
	selectedClass: String,
	disabled: Boolean
}, "group");
var makeGroupItemProps = propsFactory({
	value: null,
	disabled: Boolean,
	selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey, required = true) {
	const vm = getCurrentInstance$1("useGroupItem");
	if (!vm) throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
	const id = useId();
	provide(Symbol.for(`${injectKey.description}:id`), id);
	const group = inject(injectKey, null);
	if (!group) {
		if (!required) return group;
		throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
	}
	const value = toRef(() => props.value);
	const disabled = computed(() => !!(group.disabled.value || props.disabled));
	function register() {
		group?.register({
			id,
			value,
			disabled
		}, vm);
	}
	function unregister() {
		group?.unregister(id);
	}
	register();
	const isSelected = computed(() => {
		return group.isSelected(id);
	});
	const isFirst = computed(() => {
		return group.items.value[0].id === id;
	});
	const isLast = computed(() => {
		return group.items.value[group.items.value.length - 1].id === id;
	});
	const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
	watch(isSelected, (value) => {
		vm.emit("group:selected", { value });
	}, { flush: "sync" });
	return {
		id,
		isSelected,
		isFirst,
		isLast,
		toggle: () => group.select(id, !isSelected.value),
		select: (value) => group.select(id, value),
		selectedClass,
		value,
		disabled,
		group,
		register,
		unregister
	};
}
function useGroup(props, injectKey) {
	const items = reactive([]);
	const selected = useProxiedModel(props, "modelValue", [], (v) => {
		if (v === void 0) return [];
		return getIds(items, v === null ? [null] : wrapInArray(v));
	}, (v) => {
		const arr = getValues(items, v);
		return props.multiple ? arr : arr[0];
	});
	const groupVm = getCurrentInstance$1("useGroup");
	function register(item, vm) {
		const unwrapped = item;
		const index = findChildrenWithProvide(Symbol.for(`${injectKey.description}:id`), groupVm?.vnode).indexOf(vm);
		if (unref(unwrapped.value) === void 0) {
			unwrapped.value = index;
			unwrapped.useIndexAsValue = true;
		}
		if (index > -1) items.splice(index, 0, unwrapped);
		else items.push(unwrapped);
	}
	function unregister(id) {
		forceMandatoryValue();
		const index = items.findIndex((item) => item.id === id);
		items.splice(index, 1);
	}
	function forceMandatoryValue() {
		const item = items.find((item) => !item.disabled);
		if (item && props.mandatory === "force" && !selected.value.length) selected.value = [item.id];
	}
	function select(id, value) {
		const item = items.find((item) => item.id === id);
		if (value && item?.disabled) return;
		if (props.multiple) {
			const internalValue = selected.value.slice();
			const index = internalValue.findIndex((v) => v === id);
			const isSelected = ~index;
			value = value ?? !isSelected;
			if (isSelected && props.mandatory && internalValue.length <= 1) return;
			if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
			if (index < 0 && value) internalValue.push(id);
			else if (index >= 0 && !value) internalValue.splice(index, 1);
			selected.value = internalValue;
		} else {
			const isSelected = selected.value.includes(id);
			if (props.mandatory && isSelected) return;
			if (!isSelected && !value) return;
			selected.value = value ?? !isSelected ? [id] : [];
		}
	}
	function step(offset) {
		if (props.multiple) consoleWarn("This method is not supported when using \"multiple\" prop");
		if (!selected.value.length) {
			const item = items.find((item) => !item.disabled);
			item && (selected.value = [item.id]);
		} else {
			const currentId = selected.value[0];
			const currentIndex = items.findIndex((i) => i.id === currentId);
			let newIndex = (currentIndex + offset) % items.length;
			let newItem = items[newIndex];
			while (newItem.disabled && newIndex !== currentIndex) {
				newIndex = (newIndex + offset) % items.length;
				newItem = items[newIndex];
			}
			if (newItem.disabled) return;
			selected.value = [items[newIndex].id];
		}
	}
	const state = {
		register,
		unregister,
		selected,
		select,
		disabled: toRef(() => props.disabled),
		prev: () => step(items.length - 1),
		next: () => step(1),
		isSelected: (id) => selected.value.includes(id),
		selectedClass: toRef(() => props.selectedClass),
		items: toRef(() => items),
		getItemIndex: (value) => getItemIndex(items, value)
	};
	provide(injectKey, state);
	return state;
}
function getItemIndex(items, value) {
	const ids = getIds(items, [value]);
	if (!ids.length) return -1;
	return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
	const ids = [];
	modelValue.forEach((value) => {
		const item = items.find((item) => deepEqual(value, item.value));
		const itemByIndex = items[value];
		if (item?.value !== void 0) ids.push(item.id);
		else if (itemByIndex?.useIndexAsValue) ids.push(itemByIndex.id);
	});
	return ids;
}
function getValues(items, ids) {
	const values = [];
	ids.forEach((id) => {
		const itemIndex = items.findIndex((item) => item.id === id);
		if (~itemIndex) {
			const item = items[itemIndex];
			values.push(item.value !== void 0 ? item.value : itemIndex);
		}
	});
	return values;
}
//#endregion
//#region node_modules/vuetify/lib/components/VBtnToggle/VBtnToggle.js
var VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
var makeVBtnToggleProps = propsFactory({
	...makeVBtnGroupProps(),
	...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
	name: "VBtnToggle",
	props: makeVBtnToggleProps(),
	emits: { "update:modelValue": (value) => true },
	setup(props, { slots }) {
		const { isSelected, next, prev, select, selected } = useGroup(props, VBtnToggleSymbol);
		useRender(() => {
			const btnGroupProps = VBtnGroup.filterProps(props);
			return createVNode(VBtnGroup, mergeProps({ "class": ["v-btn-toggle", props.class] }, btnGroupProps, { "style": props.style }), { default: () => [slots.default?.({
				isSelected,
				next,
				prev,
				select,
				selected
			})] });
		});
		return {
			next,
			prev,
			select
		};
	}
});
//#endregion
//#region node_modules/vuetify/lib/composables/intersectionObserver.js
function useIntersectionObserver(callback, options) {
	return {
		intersectionRef: ref(),
		isIntersecting: shallowRef(false)
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/reveal.js
var makeRevealProps = propsFactory({ reveal: {
	type: [Boolean, Object],
	default: false
} }, "reveal");
function useReveal(props) {
	const defaultDuration = 900;
	return {
		duration: toRef(() => typeof props.reveal === "object" ? Math.max(0, Number(props.reveal.duration ?? defaultDuration)) : defaultDuration),
		state: shallowRef(props.reveal ? "initial" : "disabled")
	};
}
//#endregion
//#region node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var makeVProgressCircularProps = propsFactory({
	bgColor: String,
	color: String,
	indeterminate: [Boolean, String],
	rounded: Boolean,
	modelValue: {
		type: [Number, String],
		default: 0
	},
	rotate: {
		type: [Number, String],
		default: 0
	},
	width: {
		type: [Number, String],
		default: 4
	},
	...makeComponentProps(),
	...makeRevealProps(),
	...makeSizeProps(),
	...makeTagProps({ tag: "div" }),
	...makeThemeProps()
}, "VProgressCircular");
var VProgressCircular = genericComponent()({
	name: "VProgressCircular",
	props: makeVProgressCircularProps(),
	setup(props, { slots }) {
		const MAGIC_RADIUS_CONSTANT = 20;
		const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
		const root = ref();
		const { themeClasses } = provideTheme(props);
		const { sizeClasses, sizeStyles } = useSize(props);
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		const { textColorClasses: underlayColorClasses, textColorStyles: underlayColorStyles } = useTextColor(() => props.bgColor);
		const { intersectionRef, isIntersecting } = useIntersectionObserver();
		const { resizeRef, contentRect } = useResizeObserver();
		const { state: revealState, duration: revealDuration } = useReveal(props);
		const normalizedValue = toRef(() => revealState.value === "initial" ? 0 : clamp(parseFloat(props.modelValue), 0, 100));
		const width = toRef(() => Number(props.width));
		const size = toRef(() => {
			return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
		});
		const diameter = toRef(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
		const strokeWidth = toRef(() => width.value / size.value * diameter.value);
		const strokeDashOffset = toRef(() => {
			const baseLength = (100 - normalizedValue.value) / 100 * CIRCUMFERENCE;
			return props.rounded && normalizedValue.value > 0 && normalizedValue.value < 100 ? convertToUnit(Math.min(CIRCUMFERENCE - .01, baseLength + strokeWidth.value)) : convertToUnit(baseLength);
		});
		const startAngle = computed(() => {
			const baseAngle = Number(props.rotate);
			return props.rounded ? baseAngle + strokeWidth.value / 2 / CIRCUMFERENCE * 360 : baseAngle;
		});
		watchEffect(() => {
			intersectionRef.value = root.value;
			resizeRef.value = root.value;
		});
		useRender(() => createVNode(props.tag, {
			"ref": root,
			"class": normalizeClass([
				"v-progress-circular",
				{
					"v-progress-circular--indeterminate": !!props.indeterminate,
					"v-progress-circular--visible": isIntersecting.value,
					"v-progress-circular--disable-shrink": props.indeterminate && (props.indeterminate === "disable-shrink" || PREFERS_REDUCED_MOTION()),
					"v-progress-circular--revealing": ["initial", "pending"].includes(revealState.value)
				},
				themeClasses.value,
				sizeClasses.value,
				textColorClasses.value,
				props.class
			]),
			"style": normalizeStyle([
				sizeStyles.value,
				textColorStyles.value,
				{ "--progress-reveal-duration": `${revealDuration.value}ms` },
				props.style
			]),
			"role": "progressbar",
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
		}, { default: () => [createElementVNode("svg", {
			"style": { transform: `rotate(calc(-90deg + ${startAngle.value}deg))` },
			"xmlns": "http://www.w3.org/2000/svg",
			"viewBox": `0 0 ${diameter.value} ${diameter.value}`
		}, [createElementVNode("circle", {
			"class": normalizeClass(["v-progress-circular__underlay", underlayColorClasses.value]),
			"style": normalizeStyle(underlayColorStyles.value),
			"fill": "transparent",
			"cx": "50%",
			"cy": "50%",
			"r": MAGIC_RADIUS_CONSTANT,
			"stroke-width": strokeWidth.value,
			"stroke-dasharray": CIRCUMFERENCE,
			"stroke-dashoffset": 0
		}, null), createElementVNode("circle", {
			"class": "v-progress-circular__overlay",
			"fill": "transparent",
			"cx": "50%",
			"cy": "50%",
			"r": MAGIC_RADIUS_CONSTANT,
			"stroke-width": strokeWidth.value,
			"stroke-dasharray": CIRCUMFERENCE,
			"stroke-dashoffset": strokeDashOffset.value,
			"stroke-linecap": props.rounded ? "round" : void 0
		}, null)]), slots.default && createElementVNode("div", { "class": "v-progress-circular__content" }, [slots.default({ value: normalizedValue.value })])] }));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VProgressLinear/chunks.js
var makeChunksProps = propsFactory({
	chunkCount: {
		type: [Number, String],
		default: null
	},
	chunkWidth: {
		type: [Number, String],
		default: null
	},
	chunkGap: {
		type: [Number, String],
		default: 4
	}
}, "chunks");
function useChunks(props, containerWidth) {
	const hasChunks = toRef(() => !!props.chunkCount || !!props.chunkWidth);
	const chunkWidth = computed(() => {
		const containerSize = toValue(containerWidth);
		if (!containerSize) return 0;
		if (!props.chunkCount) return Number(props.chunkWidth);
		const count = Number(props.chunkCount);
		return (containerSize - Number(props.chunkGap) * (count - 1)) / count;
	});
	const chunkGap = toRef(() => Number(props.chunkGap));
	const chunksMaskStyles = computed(() => {
		if (!hasChunks.value) return {};
		const chunkGapPx = convertToUnit(chunkGap.value);
		const chunkWidthPx = convertToUnit(chunkWidth.value);
		return {
			maskRepeat: "repeat-x",
			maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
			maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`
		};
	});
	function snapValueToChunk(val) {
		const containerSize = toValue(containerWidth);
		if (!containerSize) return val;
		const gapRelativeSize = 100 * chunkGap.value / containerSize;
		const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize;
		return clamp(0, Math.floor((val + gapRelativeSize) / chunkRelativeSize) * chunkRelativeSize - gapRelativeSize / 2, 100);
	}
	return {
		hasChunks,
		chunksMaskStyles,
		snapValueToChunk
	};
}
//#endregion
//#region node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
var makeVProgressLinearProps = propsFactory({
	absolute: Boolean,
	active: {
		type: Boolean,
		default: true
	},
	bgColor: String,
	bgOpacity: [Number, String],
	bufferValue: {
		type: [Number, String],
		default: 0
	},
	bufferColor: String,
	bufferOpacity: [Number, String],
	clickable: Boolean,
	color: String,
	height: {
		type: [Number, String],
		default: 4
	},
	indeterminate: Boolean,
	max: {
		type: [Number, String],
		default: 100
	},
	modelValue: {
		type: [Number, String],
		default: 0
	},
	opacity: [Number, String],
	reverse: Boolean,
	stream: Boolean,
	striped: Boolean,
	roundedBar: Boolean,
	...makeChunksProps(),
	...makeComponentProps(),
	...makeLocationProps({ location: "top" }),
	...makeRoundedProps(),
	...makeTagProps(),
	...makeThemeProps()
}, "VProgressLinear");
var VProgressLinear = genericComponent()({
	name: "VProgressLinear",
	props: makeVProgressLinearProps(),
	emits: { "update:modelValue": (value) => true },
	setup(props, { slots }) {
		const root = ref();
		const progress = useProxiedModel(props, "modelValue");
		const { isRtl, rtlClasses } = useRtl();
		const { themeClasses } = provideTheme(props);
		const { locationStyles } = useLocation(props);
		const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor || props.color);
		const { backgroundColorClasses: bufferColorClasses, backgroundColorStyles: bufferColorStyles } = useBackgroundColor(() => props.bufferColor || props.bgColor || props.color);
		const { backgroundColorClasses: barColorClasses, backgroundColorStyles: barColorStyles } = useBackgroundColor(() => props.color);
		const { roundedClasses } = useRounded(props);
		const { intersectionRef, isIntersecting } = useIntersectionObserver();
		const max = computed(() => parseFloat(props.max));
		const height = computed(() => parseFloat(props.height));
		const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
		const normalizedValue = computed(() => clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
		const isReversed = computed(() => isRtl.value !== props.reverse);
		const transition = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
		const containerWidth = shallowRef(0);
		const { hasChunks, chunksMaskStyles, snapValueToChunk } = useChunks(props, containerWidth);
		useToggleScope(hasChunks, () => {
			const { resizeRef } = useResizeObserver();
			watchEffect(() => resizeRef.value = root.value);
		});
		const bufferWidth = computed(() => {
			return hasChunks.value ? snapValueToChunk(normalizedBuffer.value) : normalizedBuffer.value;
		});
		const barWidth = computed(() => {
			return hasChunks.value ? snapValueToChunk(normalizedValue.value) : normalizedValue.value;
		});
		function handleClick(e) {
			if (!intersectionRef.value) return;
			const { left, right, width } = intersectionRef.value.getBoundingClientRect();
			const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
			progress.value = Math.round(value / width * max.value);
		}
		watchEffect(() => {
			intersectionRef.value = root.value;
		});
		useRender(() => createVNode(props.tag, {
			"ref": root,
			"class": normalizeClass([
				"v-progress-linear",
				{
					"v-progress-linear--absolute": props.absolute,
					"v-progress-linear--active": props.active && isIntersecting.value,
					"v-progress-linear--reverse": isReversed.value,
					"v-progress-linear--rounded": props.rounded,
					"v-progress-linear--rounded-bar": props.roundedBar,
					"v-progress-linear--striped": props.striped,
					"v-progress-linear--clickable": props.clickable
				},
				roundedClasses.value,
				themeClasses.value,
				rtlClasses.value,
				props.class
			]),
			"style": normalizeStyle([
				{
					bottom: props.location === "bottom" ? 0 : void 0,
					top: props.location === "top" ? 0 : void 0,
					height: props.active ? convertToUnit(height.value) : 0,
					"--v-progress-linear-height": convertToUnit(height.value),
					...props.absolute ? locationStyles.value : {}
				},
				chunksMaskStyles.value,
				props.style
			]),
			"role": "progressbar",
			"aria-hidden": props.active ? "false" : "true",
			"aria-valuemin": "0",
			"aria-valuemax": props.max,
			"aria-valuenow": props.indeterminate ? void 0 : Math.min(parseFloat(progress.value), max.value),
			"onClick": props.clickable && handleClick
		}, { default: () => [
			props.stream && createElementVNode("div", {
				"key": "stream",
				"class": normalizeClass(["v-progress-linear__stream", textColorClasses.value]),
				"style": {
					...textColorStyles.value,
					[isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
					borderTop: `${convertToUnit(height.value / 2)} dotted`,
					opacity: parseFloat(props.bufferOpacity),
					top: `calc(50% - ${convertToUnit(height.value / 4)})`,
					width: convertToUnit(100 - normalizedBuffer.value, "%"),
					"--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
				}
			}, null),
			createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__background", backgroundColorClasses.value]),
				"style": normalizeStyle([backgroundColorStyles.value, {
					opacity: parseFloat(props.bgOpacity),
					width: props.stream ? 0 : void 0
				}])
			}, null),
			createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__buffer", bufferColorClasses.value]),
				"style": normalizeStyle([bufferColorStyles.value, {
					opacity: parseFloat(props.bufferOpacity),
					width: convertToUnit(bufferWidth.value, "%")
				}])
			}, null),
			createVNode(Transition, { "name": transition.value }, { default: () => [!props.indeterminate ? createElementVNode("div", {
				"class": normalizeClass(["v-progress-linear__determinate", barColorClasses.value]),
				"style": normalizeStyle([barColorStyles.value, { width: convertToUnit(barWidth.value, "%") }])
			}, null) : createElementVNode("div", { "class": "v-progress-linear__indeterminate" }, [["long", "short"].map((bar) => createElementVNode("div", {
				"key": bar,
				"class": normalizeClass([
					"v-progress-linear__indeterminate",
					bar,
					barColorClasses.value
				]),
				"style": normalizeStyle(barColorStyles.value)
			}, null))])] }),
			slots.default && createElementVNode("div", { "class": "v-progress-linear__content" }, [slots.default({
				value: normalizedValue.value,
				buffer: normalizedBuffer.value
			})])
		] }));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/composables/loader.js
var makeLoaderProps = propsFactory({ loading: [Boolean, String] }, "loader");
function useLoader(props, name = getCurrentInstanceName()) {
	return { loaderClasses: toRef(() => ({ [`${name}--loading`]: props.loading })) };
}
function LoaderSlot(props, { slots }) {
	return createElementVNode("div", { "class": normalizeClass(`${props.name}__loader`) }, [slots.default?.({
		color: props.color,
		isActive: props.active
	}) || createVNode(VProgressLinear, {
		"absolute": props.absolute,
		"active": props.active,
		"color": props.color,
		"height": "2",
		"indeterminate": true
	}, null)]);
}
//#endregion
//#region node_modules/vuetify/lib/composables/position.js
var positionValues = [
	"static",
	"relative",
	"fixed",
	"absolute",
	"sticky"
];
var makePositionProps = propsFactory({ position: {
	type: String,
	validator: (v) => positionValues.includes(v)
} }, "position");
function usePosition(props, name = getCurrentInstanceName()) {
	return { positionClasses: toRef(() => {
		return props.position ? `${name}--${props.position}` : void 0;
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/composables/router.js
function useRoute() {
	const vm = getCurrentInstance$1("useRoute");
	return computed(() => vm?.proxy?.$route);
}
function useRouter() {
	return getCurrentInstance$1("useRouter")?.proxy?.$router;
}
function useLink(props, attrs) {
	const RouterLink = resolveDynamicComponent("RouterLink");
	const isLink = toRef(() => !!(props.href || props.to));
	const isClickable = computed(() => {
		return isLink?.value || hasEvent(attrs, "click") || hasEvent(props, "click");
	});
	if (typeof RouterLink === "string" || !("useLink" in RouterLink)) {
		const href = toRef(() => props.href);
		return {
			isLink,
			isRouterLink: toRef(() => false),
			isClickable,
			href,
			linkProps: reactive({ href }),
			route: toRef(() => void 0),
			navigate: toRef(() => void 0)
		};
	}
	const routerLink = RouterLink.useLink({
		to: toRef(() => props.to || ""),
		replace: toRef(() => props.replace)
	});
	const link = computed(() => props.to ? routerLink : void 0);
	const route = useRoute();
	const isActive = computed(() => {
		if (!link.value) return false;
		if (!props.exact) return link.value.isActive?.value ?? false;
		if (!route.value) return link.value.isExactActive?.value ?? false;
		return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query);
	});
	const href = computed(() => props.to ? link.value?.route.value.href : props.href);
	return {
		isLink,
		isRouterLink: toRef(() => !!props.to),
		isClickable,
		isActive,
		route: toRef(() => link.value?.route.value),
		navigate: toRef(() => link.value?.navigate),
		href,
		linkProps: reactive({
			href,
			"aria-current": toRef(() => isActive.value ? "page" : void 0),
			"aria-disabled": toRef(() => props.disabled && isLink.value ? "true" : void 0),
			tabindex: toRef(() => props.disabled && isLink.value ? "-1" : void 0)
		})
	};
}
var makeRouterProps = propsFactory({
	href: String,
	replace: Boolean,
	to: [String, Object],
	exact: Boolean
}, "router");
//#endregion
//#region node_modules/vuetify/lib/composables/selectLink.js
function useSelectLink(link, select) {
	watch(() => link.isActive?.value, (isActive) => {
		if (link.isLink.value && isActive != null && select) nextTick(() => {
			select(isActive);
		});
	}, { immediate: true });
}
//#endregion
//#region node_modules/vuetify/lib/directives/ripple/index.js
var stopSymbol = Symbol("rippleStop");
var DELAY_RIPPLE = 80;
function transform(el, value) {
	el.style.transform = value;
	el.style.webkitTransform = value;
}
function isTouchEvent(e) {
	return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
	return e.constructor.name === "KeyboardEvent";
}
var calculate = (e, el, value = {}) => {
	let localX = 0;
	let localY = 0;
	if (!isKeyboardEvent(e)) {
		const offset = el.getBoundingClientRect();
		const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
		localX = target.clientX - offset.left;
		localY = target.clientY - offset.top;
	}
	let radius = 0;
	let scale = .3;
	if (el._ripple?.circle) {
		scale = .15;
		radius = el.clientWidth / 2;
		radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
	} else radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
	const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
	const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
	const x = value.center ? centerX : `${localX - radius}px`;
	const y = value.center ? centerY : `${localY - radius}px`;
	return {
		radius,
		scale,
		x,
		y,
		centerX,
		centerY
	};
};
var ripples = {
	show(e, el, value = {}) {
		if (!el?._ripple?.enabled) return;
		const container = (void 0).createElement("span");
		const animation = (void 0).createElement("span");
		container.appendChild(animation);
		container.className = "v-ripple__container";
		if (value.class) container.className += ` ${value.class}`;
		const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value);
		const size = `${radius * 2}px`;
		animation.className = "v-ripple__animation";
		animation.style.width = size;
		animation.style.height = size;
		el.appendChild(container);
		const computed = (void 0).getComputedStyle(el);
		if (computed && computed.position === "static") {
			el.style.position = "relative";
			el.dataset.previousPosition = "static";
		}
		animation.classList.add("v-ripple__animation--enter");
		animation.classList.add("v-ripple__animation--visible");
		transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
		animation.dataset.activated = String(performance.now());
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				animation.classList.remove("v-ripple__animation--enter");
				animation.classList.add("v-ripple__animation--in");
				transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
			});
		});
	},
	hide(el) {
		if (!el?._ripple?.enabled) return;
		const ripples = el.getElementsByClassName("v-ripple__animation");
		if (ripples.length === 0) return;
		const animation = Array.from(ripples).findLast((ripple) => !ripple.dataset.isHiding);
		if (!animation) return;
		else animation.dataset.isHiding = "true";
		const diff = performance.now() - Number(animation.dataset.activated);
		const delay = Math.max(250 - diff, 0);
		setTimeout(() => {
			animation.classList.remove("v-ripple__animation--in");
			animation.classList.add("v-ripple__animation--out");
			setTimeout(() => {
				if (el.getElementsByClassName("v-ripple__animation").length === 1 && el.dataset.previousPosition) {
					el.style.position = el.dataset.previousPosition;
					delete el.dataset.previousPosition;
				}
				if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode);
			}, 300);
		}, delay);
	}
};
function isRippleEnabled(value) {
	return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
	const value = {};
	const element = e.currentTarget;
	if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return;
	e[stopSymbol] = true;
	if (isTouchEvent(e)) {
		element._ripple.touched = true;
		element._ripple.isTouch = true;
	} else if (element._ripple.isTouch) return;
	value.center = element._ripple.centered || isKeyboardEvent(e);
	if (element._ripple.class) value.class = element._ripple.class;
	if (isTouchEvent(e)) {
		if (element._ripple.showTimerCommit) return;
		element._ripple.showTimerCommit = () => {
			ripples.show(e, element, value);
		};
		element._ripple.showTimer = (void 0).setTimeout(() => {
			if (element?._ripple?.showTimerCommit) {
				element._ripple.showTimerCommit();
				element._ripple.showTimerCommit = null;
			}
		}, DELAY_RIPPLE);
	} else ripples.show(e, element, value);
}
function rippleStop(e) {
	e[stopSymbol] = true;
}
function rippleHide(e) {
	const element = e.currentTarget;
	if (!element?._ripple) return;
	(void 0).clearTimeout(element._ripple.showTimer);
	if (e.type === "touchend" && element._ripple.showTimerCommit) {
		element._ripple.showTimerCommit();
		element._ripple.showTimerCommit = null;
		element._ripple.showTimer = (void 0).setTimeout(() => {
			rippleHide(e);
		});
		return;
	}
	(void 0).setTimeout(() => {
		if (element._ripple) element._ripple.touched = false;
	});
	ripples.hide(element);
}
function rippleCancelShow(e) {
	const element = e.currentTarget;
	if (!element?._ripple) return;
	if (element._ripple.showTimerCommit) element._ripple.showTimerCommit = null;
	(void 0).clearTimeout(element._ripple.showTimer);
}
var keyboardRipple = false;
function keyboardRippleShow(e, keys) {
	if (!keyboardRipple && keys.includes(e.key)) {
		keyboardRipple = true;
		rippleShow(e);
	}
}
function keyboardRippleHide(e) {
	keyboardRipple = false;
	rippleHide(e);
}
function focusRippleHide(e) {
	if (keyboardRipple) {
		keyboardRipple = false;
		rippleHide(e);
	}
}
function updateRipple(el, binding, wasEnabled) {
	const { value, modifiers } = binding;
	const enabled = isRippleEnabled(value);
	if (!enabled) ripples.hide(el);
	el._ripple = el._ripple ?? {};
	el._ripple.enabled = enabled;
	el._ripple.centered = modifiers.center;
	el._ripple.circle = modifiers.circle;
	const bindingValue = isObject(value) ? value : {};
	if (bindingValue.class) el._ripple.class = bindingValue.class;
	const allowedKeys = bindingValue.keys ?? ["Enter", "Space"];
	el._ripple.keyDownHandler = (e) => keyboardRippleShow(e, allowedKeys);
	if (enabled && !wasEnabled) {
		if (modifiers.stop) {
			el.addEventListener("touchstart", rippleStop, { passive: true });
			el.addEventListener("mousedown", rippleStop);
			return;
		}
		el.addEventListener("touchstart", rippleShow, { passive: true });
		el.addEventListener("touchend", rippleHide, { passive: true });
		el.addEventListener("touchmove", rippleCancelShow, { passive: true });
		el.addEventListener("touchcancel", rippleHide);
		el.addEventListener("mousedown", rippleShow);
		el.addEventListener("mouseup", rippleHide);
		el.addEventListener("mouseleave", rippleHide);
		el.addEventListener("keydown", el._ripple.keyDownHandler);
		el.addEventListener("keyup", keyboardRippleHide);
		el.addEventListener("blur", focusRippleHide);
		el.addEventListener("dragstart", rippleHide, { passive: true });
	} else if (!enabled && wasEnabled) removeListeners(el);
}
function removeListeners(el) {
	el.removeEventListener("touchstart", rippleStop);
	el.removeEventListener("mousedown", rippleStop);
	el.removeEventListener("touchstart", rippleShow);
	el.removeEventListener("touchend", rippleHide);
	el.removeEventListener("touchmove", rippleCancelShow);
	el.removeEventListener("touchcancel", rippleHide);
	el.removeEventListener("mousedown", rippleShow);
	el.removeEventListener("mouseup", rippleHide);
	el.removeEventListener("mouseleave", rippleHide);
	if (el._ripple?.keyDownHandler) el.removeEventListener("keydown", el._ripple.keyDownHandler);
	el.removeEventListener("keyup", keyboardRippleHide);
	el.removeEventListener("blur", focusRippleHide);
	el.removeEventListener("dragstart", rippleHide);
}
function mounted(el, binding) {
	updateRipple(el, binding, false);
}
function unmounted(el) {
	removeListeners(el);
	delete el._ripple;
}
function updated(el, binding) {
	if (binding.value === binding.oldValue) return;
	updateRipple(el, binding, isRippleEnabled(binding.oldValue));
}
var Ripple = {
	mounted,
	unmounted,
	updated
};
//#endregion
//#region node_modules/vuetify/lib/components/VBtn/VBtn.js
var makeVBtnProps = propsFactory({
	active: {
		type: Boolean,
		default: void 0
	},
	activeColor: String,
	baseColor: String,
	symbol: {
		type: null,
		default: VBtnToggleSymbol
	},
	flat: Boolean,
	icon: [
		Boolean,
		String,
		Function,
		Object
	],
	prependIcon: IconValue,
	appendIcon: IconValue,
	block: Boolean,
	readonly: Boolean,
	slim: Boolean,
	stacked: Boolean,
	spaced: String,
	ripple: {
		type: [Boolean, Object],
		default: true
	},
	text: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	...makeBorderProps(),
	...makeComponentProps(),
	...makeDensityProps(),
	...makeDimensionProps(),
	...makeElevationProps(),
	...makeGroupItemProps(),
	...makeLoaderProps(),
	...makeLocationProps(),
	...makePositionProps(),
	...makeRoundedProps(),
	...makeRouterProps(),
	...makeSizeProps(),
	...makeTagProps({ tag: "button" }),
	...makeThemeProps(),
	...makeVariantProps({ variant: "elevated" })
}, "VBtn");
var VBtn = genericComponent()({
	name: "VBtn",
	props: makeVBtnProps(),
	emits: { "group:selected": (val) => true },
	setup(props, { attrs, slots }) {
		const { themeClasses } = provideTheme(props);
		const { borderClasses } = useBorder(props);
		const { densityClasses } = useDensity(props);
		const { dimensionStyles } = useDimension(props);
		const { elevationClasses } = useElevation(props);
		const { loaderClasses } = useLoader(props);
		const { locationStyles } = useLocation(props);
		const { positionClasses } = usePosition(props);
		const { roundedClasses } = useRounded(props);
		const { sizeClasses, sizeStyles } = useSize(props);
		const group = useGroupItem(props, props.symbol, false);
		const link = useLink(props, attrs);
		const isActive = computed(() => {
			if (props.active !== void 0) return props.active;
			if (link.isRouterLink.value) return link.isActive?.value;
			return group?.isSelected.value;
		});
		const color = toRef(() => isActive.value ? props.activeColor ?? props.color : props.color);
		const { colorClasses, colorStyles, variantClasses } = useVariant(computed(() => {
			return {
				color: group?.isSelected.value && (!link.isLink.value || link.isActive?.value) || !group || link.isActive?.value ? color.value ?? props.baseColor : props.baseColor,
				variant: props.variant
			};
		}));
		const isDisabled = computed(() => group?.disabled.value || props.disabled);
		const isElevated = toRef(() => {
			return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
		});
		const valueAttr = computed(() => {
			if (props.value === void 0 || typeof props.value === "symbol") return void 0;
			return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
		});
		function onClick(e) {
			if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank")) return;
			if (link.isRouterLink.value) link.navigate.value?.(e);
			else group?.toggle();
		}
		useSelectLink(link, group?.select);
		useRender(() => {
			const Tag = link.isLink.value ? "a" : props.tag;
			const hasPrepend = !!(props.prependIcon || slots.prepend);
			const hasAppend = !!(props.appendIcon || slots.append);
			const hasIcon = !!(props.icon && props.icon !== true);
			return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
				"type": Tag === "a" ? void 0 : "button",
				"class": [
					"v-btn",
					group?.selectedClass.value,
					{
						"v-btn--active": isActive.value,
						"v-btn--block": props.block,
						"v-btn--disabled": isDisabled.value,
						"v-btn--elevated": isElevated.value,
						"v-btn--flat": props.flat,
						"v-btn--icon": !!props.icon,
						"v-btn--loading": props.loading,
						"v-btn--readonly": props.readonly,
						"v-btn--slim": props.slim,
						"v-btn--stacked": props.stacked
					},
					props.spaced ? ["v-btn--spaced", `v-btn--spaced-${props.spaced}`] : [],
					themeClasses.value,
					borderClasses.value,
					colorClasses.value,
					densityClasses.value,
					elevationClasses.value,
					loaderClasses.value,
					positionClasses.value,
					roundedClasses.value,
					sizeClasses.value,
					variantClasses.value,
					props.class
				],
				"style": [
					colorStyles.value,
					dimensionStyles.value,
					locationStyles.value,
					sizeStyles.value,
					props.style
				],
				"aria-busy": props.loading ? true : void 0,
				"disabled": isDisabled.value && Tag !== "a" || void 0,
				"tabindex": props.loading || props.readonly ? -1 : void 0,
				"onClick": onClick,
				"value": valueAttr.value
			}), { default: () => [
				genOverlays(true, "v-btn"),
				!props.icon && hasPrepend && createElementVNode("span", {
					"key": "prepend",
					"class": "v-btn__prepend"
				}, [!slots.prepend ? createVNode(VIcon, {
					"key": "prepend-icon",
					"icon": props.prependIcon
				}, null) : createVNode(VDefaultsProvider, {
					"key": "prepend-defaults",
					"disabled": !props.prependIcon,
					"defaults": { VIcon: { icon: props.prependIcon } }
				}, slots.prepend)]),
				createElementVNode("span", {
					"class": "v-btn__content",
					"data-no-activator": ""
				}, [!slots.default && hasIcon ? createVNode(VIcon, {
					"key": "content-icon",
					"icon": props.icon
				}, null) : createVNode(VDefaultsProvider, {
					"key": "content-defaults",
					"disabled": !hasIcon,
					"defaults": { VIcon: { icon: props.icon } }
				}, { default: () => [slots.default?.() ?? toDisplayString(props.text)] })]),
				!props.icon && hasAppend && createElementVNode("span", {
					"key": "append",
					"class": "v-btn__append"
				}, [!slots.append ? createVNode(VIcon, {
					"key": "append-icon",
					"icon": props.appendIcon
				}, null) : createVNode(VDefaultsProvider, {
					"key": "append-defaults",
					"disabled": !props.appendIcon,
					"defaults": { VIcon: { icon: props.appendIcon } }
				}, slots.append)]),
				!!props.loading && createElementVNode("span", {
					"key": "loader",
					"class": "v-btn__loader"
				}, [slots.loader?.() ?? createVNode(VProgressCircular, {
					"color": typeof props.loading === "boolean" ? void 0 : props.loading,
					"indeterminate": true,
					"width": "2"
				}, null)])
			] }), [[
				Ripple,
				!isDisabled.value && props.ripple,
				"",
				{ center: !!props.icon }
			]]);
		});
		return { group };
	}
});

export { makeVariantProps as A, makeTagProps as B, makeSizeProps as C, makeBorderProps as D, makeLocationProps as E, useRouter as F, useElevation as G, useLink as H, makeElevationProps as I, makeRouterProps as J, usePosition as K, LoaderSlot as L, makePositionProps as M, Ripple as R, VBtn as V, VIcon as a, VProgressLinear as b, useDensity as c, useDimension as d, useLoader as e, useRounded as f, useBackgroundColor as g, useTextColor as h, VDefaultsProvider as i, makeLoaderProps as j, makeComponentProps as k, makeDimensionProps as l, makeRoundedProps as m, makeDensityProps as n, useBorder as o, useVariant as p, useSize as q, genOverlays as r, parseAnchor as s, flipSide as t, useRender as u, flipAlign as v, flipCorner as w, deepEqual as x, getAxis as y, useLocation as z };;globalThis.__timing__.logEnd('Load chunks/build/VBtn-BK5zdqJr');
//# sourceMappingURL=VBtn-BK5zdqJr.mjs.map
