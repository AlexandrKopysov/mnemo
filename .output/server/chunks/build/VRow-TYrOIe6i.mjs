globalThis.__timing__.logStart('Load chunks/build/VRow-TYrOIe6i');import { g as genericComponent, v as useRtl, a7 as deprecate, c as convertToUnit, p as propsFactory } from '../virtual/entry.mjs';
import { d as useDimension, u as useRender, B as makeTagProps, l as makeDimensionProps, k as makeComponentProps, n as makeDensityProps } from './VBtn-BK5zdqJr.mjs';
import { computed, h, createVNode, normalizeStyle, normalizeClass } from 'vue';

//#region node_modules/vuetify/lib/components/VGrid/VContainer.js
var makeVContainerProps = propsFactory({
	fluid: {
		type: Boolean,
		default: false
	},
	...makeComponentProps(),
	...makeDimensionProps(),
	...makeTagProps()
}, "VContainer");
var VContainer = genericComponent()({
	name: "VContainer",
	props: makeVContainerProps(),
	setup(props, { slots }) {
		const { rtlClasses } = useRtl();
		const { dimensionStyles } = useDimension(props);
		useRender(() => createVNode(props.tag, {
			"class": normalizeClass([
				"v-container",
				{ "v-container--fluid": props.fluid },
				rtlClasses.value,
				props.class
			]),
			"style": normalizeStyle([dimensionStyles.value, props.style])
		}, slots));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VGrid/VRow.js
var ALIGNMENT = [
	"start",
	"end",
	"center"
];
var SPACE = [
	"space-between",
	"space-around",
	"space-evenly"
];
var ALIGN_VALUES = [
	...ALIGNMENT,
	"baseline",
	"stretch"
];
var alignValidator = (str) => ALIGN_VALUES.includes(str);
var JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
var justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
var ALIGN_CONTENT_VALUES = [
	...ALIGNMENT,
	...SPACE,
	"stretch"
];
var alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
var propMap = {
	align: [
		"align",
		"alignSm",
		"alignMd",
		"alignLg",
		"alignXl",
		"alignXxl"
	],
	justify: [
		"justify",
		"justifySm",
		"justifyMd",
		"justifyLg",
		"justifyXl",
		"justifyXxl"
	],
	alignContent: [
		"alignContent",
		"alignContentSm",
		"alignContentMd",
		"alignContentLg",
		"alignContentXl",
		"alignContentXxl"
	]
};
var classMap = {
	align: "align",
	justify: "justify",
	alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
	let className = classMap[type];
	if (val == null) return;
	if (prop) {
		const breakpoint = prop.replace(type, "");
		className += `-${breakpoint}`;
	}
	className += `-${val}`;
	return className.toLowerCase();
}
var makeVRowProps = propsFactory({
	/** @deprecated use density="compact" instead */
	dense: Boolean,
	/** @deprecated use align-* class instead */
	align: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-sm-* class instead */
	alignSm: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-md-* class instead */
	alignMd: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-lg-* class instead */
	alignLg: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-xl-* class instead */
	alignXl: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use align-xxl-* class instead */
	alignXxl: {
		type: String,
		default: null,
		validator: alignValidator
	},
	/** @deprecated use justify-* class instead */
	justify: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-sm-* class instead */
	justifySm: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-md-* class instead */
	justifyMd: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-lg-* class instead */
	justifyLg: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-xl-* class instead */
	justifyXl: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use justify-xxl-* class instead */
	justifyXxl: {
		type: String,
		default: null,
		validator: justifyValidator
	},
	/** @deprecated use align-content-* class instead */
	alignContent: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-sm-* class instead */
	alignContentSm: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-md-* class instead */
	alignContentMd: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-lg-* class instead */
	alignContentLg: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-xl-* class instead */
	alignContentXl: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	/** @deprecated use align-content-xxl-* class instead */
	alignContentXxl: {
		type: String,
		default: null,
		validator: alignContentValidator
	},
	noGutters: Boolean,
	gap: [
		Number,
		String,
		Array
	],
	size: [Number, String],
	...makeComponentProps(),
	...makeDensityProps(),
	...makeTagProps()
}, "VRow");
var VRow = genericComponent()({
	name: "VRow",
	props: makeVRowProps(),
	setup(props, { slots }) {
		if (props.dense) deprecate("dense", "density=\"comfortable\"");
		if (props.noGutters) deprecate("noGutters", "density=\"compact\"");
		const classes = computed(() => {
			const classList = [];
			let type;
			for (type in propMap) propMap[type].forEach((prop) => {
				const value = props[prop];
				const className = breakpointClass(type, prop, value);
				if (className) classList.push(className);
			});
			classList.push({
				"v-row--density-default": props.density === "default" && !props.noGutters && !props.dense,
				"v-row--density-compact": props.density === "compact" || props.noGutters,
				"v-row--density-comfortable": props.density === "comfortable" || props.dense,
				[`align-${props.align}`]: props.align,
				[`justify-${props.justify}`]: props.justify,
				[`align-content-${props.alignContent}`]: props.alignContent
			});
			return classList;
		});
		const horizontalGap = computed(() => {
			return Array.isArray(props.gap) ? convertToUnit(props.gap[0] || 0) : convertToUnit(props.gap);
		});
		const verticalGap = computed(() => {
			return Array.isArray(props.gap) ? convertToUnit(props.gap[1] || 0) : horizontalGap.value;
		});
		return () => h(props.tag, {
			class: [
				"v-row",
				classes.value,
				props.class
			],
			style: [{
				"--v-col-gap-x": horizontalGap.value,
				"--v-col-gap-y": verticalGap.value,
				"--v-row-columns": props.size
			}, props.style]
		}, slots.default?.());
	}
});

export { VContainer as V, VRow as a };;globalThis.__timing__.logEnd('Load chunks/build/VRow-TYrOIe6i');
//# sourceMappingURL=VRow-TYrOIe6i.mjs.map
