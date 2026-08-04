globalThis.__timing__.logStart('Load chunks/build/VMenu-5yZPJeqd');import { g as genericComponent, a as useProxiedModel, v as useRtl, U as isClickInsideElement, r as getCurrentInstance$1, V as focusChild, p as propsFactory, o as omit, f as filterInputAttrs, c as convertToUnit, x as makeThemeProps, W as acceleratedEasing, T as standardEasing, X as deceleratedEasing, l as provideTheme, A as isObject, w as destructComputed, Y as consoleError, e as clamp, R as useLocale, m as useTheme, Z as pickWithRest, I as IconValue, a0 as CircularBuffer, C as useToggleScope, D as templateRef, a1 as getNextElement, a2 as focusableChildren, a3 as matchesSelector, a4 as defer } from '../virtual/entry.mjs';
import { u as useRender, g as useBackgroundColor, f as useRounded, l as makeDimensionProps, k as makeComponentProps, d as useDimension, m as makeRoundedProps, o as useBorder, p as useVariant, c as useDensity, q as useSize, a as VIcon, i as VDefaultsProvider, r as genOverlays, s as parseAnchor, t as flipSide, v as flipAlign, w as flipCorner, x as deepEqual, y as getAxis, h as useTextColor, z as useLocation, A as makeVariantProps, B as makeTagProps, C as makeSizeProps, n as makeDensityProps, D as makeBorderProps, E as makeLocationProps, F as useRouter } from './VBtn-BK5zdqJr.mjs';
import { f as forwardRefs, I as Intersect, m as makeTransitionProps, M as MaybeTransition, a as animate, B as Box, g as getTargetBox, b as getElementBox, c as getOverflow, n as nullifyTransforms } from './forwardRefs-BQag-fAc.mjs';
import { useId, toRef, ref, inject, shallowRef, provide, watch, computed, mergeProps, nextTick, withDirectives, createVNode, createElementVNode, Fragment, Transition, normalizeStyle, normalizeClass, vShow, onScopeDispose, h, capitalize, camelize, reactive, Teleport, toValue, toRaw, watchEffect, readonly } from 'vue';

//#endregion
//#region node_modules/vuetify/lib/util/createSimpleFunctional.js
function createSimpleFunctional(klass, tag = "div", name) {
	return genericComponent()({
		name: capitalize(camelize(klass.replace(/__/g, "-"))),
		props: {
			tag: {
				type: String,
				default: tag
			},
			...makeComponentProps()
		},
		setup(props, { slots }) {
			return () => {
				return h(props.tag, {
					class: [klass, props.class],
					style: props.style
				}, slots.default?.());
			};
		}
	});
}
//#endregion
//#region node_modules/vuetify/lib/util/dom.js
/**
* Returns:
*  - 'null' if the node is not attached to the DOM
*  - the root node (HTMLDocument | ShadowRoot) otherwise
*/
function attachedRoot(node) {
	/* istanbul ignore next */
	if (typeof node.getRootNode !== "function") {
		while (node.parentNode) node = node.parentNode;
		if (node !== void 0) return null;
		return;
	}
	const root = node.getRootNode();
	if (root !== void 0 && root.getRootNode({ composed: true }) !== void 0) return null;
	return root;
}
//#endregion
//#region node_modules/vuetify/lib/util/getScrollParent.js
function getScrollParent(el, includeHidden = false) {
	while (el) {
		if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
		el = el.parentElement;
	}
	return (void 0).scrollingElement;
}
function getScrollParents(el, stopAt) {
	const elements = [];
	if (stopAt && el && !stopAt.contains(el)) return elements;
	while (el) {
		if (hasScrollbar(el)) elements.push(el);
		if (el === stopAt) break;
		el = el.parentElement;
	}
	return elements;
}
function hasScrollbar(el) {
	if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
	const style = (void 0).getComputedStyle(el);
	const hasVerticalScrollbar = style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
	const hasHorizontalScrollbar = style.overflowX === "scroll" || style.overflowX === "auto" && el.scrollWidth > el.clientWidth;
	return hasVerticalScrollbar || hasHorizontalScrollbar;
}
function isPotentiallyScrollable(el) {
	if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
	const style = (void 0).getComputedStyle(el);
	return ["scroll", "auto"].includes(style.overflowY);
}
//#endregion
//#region node_modules/vuetify/lib/util/isFixedPosition.js
function isFixedPosition(el) {
	while (el) {
		if ((void 0).getComputedStyle(el).position === "fixed") return true;
		el = el.offsetParent;
	}
	return false;
}
//#endregion
//#region node_modules/vuetify/lib/components/VBadge/VBadge.js
var makeVBadgeProps = propsFactory({
	bordered: Boolean,
	color: String,
	content: [Number, String],
	dot: Boolean,
	dotSize: [Number, String],
	floating: Boolean,
	icon: IconValue,
	inline: Boolean,
	label: {
		type: String,
		default: "$vuetify.badge"
	},
	max: [Number, String],
	modelValue: {
		type: Boolean,
		default: true
	},
	offsetX: [Number, String],
	offsetY: [Number, String],
	textColor: String,
	...makeComponentProps(),
	...makeLocationProps({ location: "top end" }),
	...makeRoundedProps(),
	...makeTagProps(),
	...makeThemeProps(),
	...makeTransitionProps({ transition: "scale-rotate-transition" }),
	...makeDimensionProps()
}, "VBadge");
var VBadge = genericComponent()({
	name: "VBadge",
	inheritAttrs: false,
	props: makeVBadgeProps(),
	setup(props, ctx) {
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color);
		const { roundedClasses } = useRounded(props);
		const { t } = useLocale();
		const { textColorClasses, textColorStyles } = useTextColor(() => props.textColor);
		const { themeClasses } = useTheme();
		const { locationStyles } = useLocation(props, true, (side) => {
			return (props.floating ? props.dot ? 2 : 4 : props.dot ? Number(props.dotSize ?? 8) : 12) + (["top", "bottom"].includes(side) ? Number(props.offsetY ?? 0) : ["left", "right"].includes(side) ? Number(props.offsetX ?? 0) : 0);
		});
		const { dimensionStyles } = useDimension(props);
		useRender(() => {
			const value = Number(props.content);
			const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
			const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, [
				"aria-atomic",
				"aria-label",
				"aria-live",
				"role",
				"title"
			]);
			return createVNode(props.tag, mergeProps({ "class": [
				"v-badge",
				{
					"v-badge--bordered": props.bordered,
					"v-badge--dot": props.dot,
					"v-badge--floating": props.floating,
					"v-badge--inline": props.inline
				},
				props.class
			] }, attrs, { "style": props.style }), { default: () => [createElementVNode("div", { "class": "v-badge__wrapper" }, [ctx.slots.default?.(), createVNode(MaybeTransition, { "transition": props.transition }, { default: () => [withDirectives(createElementVNode("span", mergeProps({
				"class": [
					"v-badge__badge",
					themeClasses.value,
					backgroundColorClasses.value,
					roundedClasses.value,
					textColorClasses.value
				],
				"style": [
					backgroundColorStyles.value,
					textColorStyles.value,
					dimensionStyles.value,
					props.inline ? {} : locationStyles.value,
					props.dot && props.dotSize ? {
						width: convertToUnit(props.dotSize),
						height: convertToUnit(props.dotSize)
					} : {}
				],
				"aria-atomic": "true",
				"aria-label": t(props.label, value),
				"aria-live": "polite",
				"role": "status"
			}, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? ctx.slots.badge?.() : props.icon ? createVNode(VIcon, { "icon": props.icon }, null) : content]), [[vShow, props.modelValue]])] })])] });
		});
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VResponsive/VResponsive.js
function useAspectStyles(props) {
	return { aspectStyles: computed(() => {
		const ratio = Number(props.aspectRatio);
		return ratio ? { paddingBottom: String(1 / ratio * 100) + "%" } : void 0;
	}) };
}
var makeVResponsiveProps = propsFactory({
	aspectRatio: [String, Number],
	contentClass: null,
	inline: Boolean,
	...makeComponentProps(),
	...makeDimensionProps()
}, "VResponsive");
var VResponsive = genericComponent()({
	name: "VResponsive",
	props: makeVResponsiveProps(),
	setup(props, { slots }) {
		const { aspectStyles } = useAspectStyles(props);
		const { dimensionStyles } = useDimension(props);
		useRender(() => createElementVNode("div", {
			"class": normalizeClass([
				"v-responsive",
				{ "v-responsive--inline": props.inline },
				props.class
			]),
			"style": normalizeStyle([dimensionStyles.value, props.style])
		}, [
			createElementVNode("div", {
				"class": "v-responsive__sizer",
				"style": normalizeStyle(aspectStyles.value)
			}, null),
			slots.additional?.(),
			slots.default && createElementVNode("div", { "class": normalizeClass(["v-responsive__content", props.contentClass]) }, [slots.default()])
		]));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VImg/VImg.js
var makeVImgProps = propsFactory({
	absolute: Boolean,
	alt: String,
	cover: Boolean,
	color: String,
	draggable: {
		type: [Boolean, String],
		default: void 0
	},
	eager: Boolean,
	gradient: String,
	imageClass: null,
	lazySrc: String,
	options: {
		type: Object,
		default: () => ({
			root: void 0,
			rootMargin: void 0,
			threshold: void 0
		})
	},
	sizes: String,
	src: {
		type: [String, Object],
		default: ""
	},
	crossorigin: String,
	referrerpolicy: String,
	srcset: String,
	position: String,
	...makeVResponsiveProps(),
	...makeComponentProps(),
	...makeRoundedProps(),
	...makeTransitionProps()
}, "VImg");
var VImg = genericComponent()({
	name: "VImg",
	directives: { vIntersect: Intersect },
	inheritAttrs: false,
	props: makeVImgProps(),
	emits: {
		loadstart: (value) => true,
		load: (value) => true,
		error: (value) => true
	},
	setup(props, { attrs, emit, slots }) {
		const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color);
		const { roundedClasses } = useRounded(props);
		const vm = getCurrentInstance$1("VImg");
		const currentSrc = shallowRef("");
		const image = ref();
		const state = shallowRef(props.eager ? "loading" : "idle");
		const naturalWidth = shallowRef();
		const naturalHeight = shallowRef();
		const normalisedSrc = computed(() => {
			return props.src && typeof props.src === "object" ? {
				src: props.src.src,
				srcset: props.srcset || props.src.srcset,
				lazySrc: props.lazySrc || props.src.lazySrc,
				aspect: Number(props.aspectRatio || props.src.aspect || 0)
			} : {
				src: props.src,
				srcset: props.srcset,
				lazySrc: props.lazySrc,
				aspect: Number(props.aspectRatio || 0)
			};
		});
		const aspectRatio = computed(() => {
			return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
		});
		watch(() => props.src, () => {
			init(state.value !== "idle");
		});
		watch(aspectRatio, (val, oldVal) => {
			if (!val && oldVal && image.value) pollForSize(image.value);
		});
		function init(isIntersecting) {
			if (props.eager && isIntersecting) return;
			state.value = "loading";
			if (normalisedSrc.value.lazySrc) {
				const lazyImg = new Image();
				lazyImg.src = normalisedSrc.value.lazySrc;
				pollForSize(lazyImg, null);
			}
			if (!normalisedSrc.value.src) return;
			nextTick(() => {
				emit("loadstart", image.value?.currentSrc || normalisedSrc.value.src);
				setTimeout(() => {
					if (vm.isUnmounted) return;
					if (image.value?.complete) {
						if (!image.value.naturalWidth) onError();
						if (state.value === "error") return;
						if (!aspectRatio.value) pollForSize(image.value, null);
						if (state.value === "loading") onLoad();
					} else {
						if (!aspectRatio.value) pollForSize(image.value);
						getSrc();
					}
				});
			});
		}
		function onLoad() {
			if (vm.isUnmounted) return;
			getSrc();
			pollForSize(image.value);
			state.value = "loaded";
			emit("load", image.value?.currentSrc || normalisedSrc.value.src);
		}
		function onError() {
			if (vm.isUnmounted) return;
			state.value = "error";
			emit("error", image.value?.currentSrc || normalisedSrc.value.src);
		}
		function getSrc() {
			const img = image.value;
			if (img) currentSrc.value = img.currentSrc || img.src;
		}
		let timer = -1;
		function pollForSize(img, timeout = 100) {
			const poll = () => {
				clearTimeout(timer);
				if (vm.isUnmounted) return;
				const { naturalHeight: imgHeight, naturalWidth: imgWidth } = img;
				if (imgHeight || imgWidth) {
					naturalWidth.value = imgWidth;
					naturalHeight.value = imgHeight;
				} else if (!img.complete && state.value === "loading" && timeout != null) timer = (void 0).setTimeout(poll, timeout);
				else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
					naturalWidth.value = 1;
					naturalHeight.value = 1;
				}
			};
			poll();
		}
		const containClasses = toRef(() => ({
			"v-img__img--cover": props.cover,
			"v-img__img--contain": !props.cover
		}));
		const __image = () => {
			if (!normalisedSrc.value.src || state.value === "idle") return null;
			const img = createElementVNode("img", {
				"class": normalizeClass([
					"v-img__img",
					containClasses.value,
					props.imageClass
				]),
				"style": { objectPosition: props.position },
				"crossorigin": props.crossorigin,
				"src": normalisedSrc.value.src,
				"srcset": normalisedSrc.value.srcset,
				"alt": props.alt,
				"referrerpolicy": props.referrerpolicy,
				"draggable": props.draggable,
				"sizes": props.sizes,
				"ref": image,
				"onLoad": onLoad,
				"onError": onError
			}, null);
			const sources = slots.sources?.();
			return createVNode(MaybeTransition, {
				"transition": props.transition,
				"appear": true
			}, { default: () => [withDirectives(sources ? createElementVNode("picture", { "class": "v-img__picture" }, [sources, img]) : img, [[vShow, state.value === "loaded"]])] });
		};
		const __preloadImage = () => createVNode(MaybeTransition, { "transition": props.transition }, { default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createElementVNode("img", {
			"class": normalizeClass([
				"v-img__img",
				"v-img__img--preload",
				containClasses.value
			]),
			"style": { objectPosition: props.position },
			"crossorigin": props.crossorigin,
			"src": normalisedSrc.value.lazySrc,
			"alt": props.alt,
			"referrerpolicy": props.referrerpolicy,
			"draggable": props.draggable
		}, null)] });
		const __placeholder = () => {
			if (!slots.placeholder) return null;
			return createVNode(MaybeTransition, {
				"transition": props.transition,
				"appear": true
			}, { default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createElementVNode("div", { "class": "v-img__placeholder" }, [slots.placeholder()])] });
		};
		const __error = () => {
			if (!slots.error) return null;
			return createVNode(MaybeTransition, {
				"transition": props.transition,
				"appear": true
			}, { default: () => [state.value === "error" && createElementVNode("div", { "class": "v-img__error" }, [slots.error()])] });
		};
		const __gradient = () => {
			if (!props.gradient) return null;
			return createElementVNode("div", {
				"class": "v-img__gradient",
				"style": { backgroundImage: `linear-gradient(${props.gradient})` }
			}, null);
		};
		const isBooted = shallowRef(false);
		{
			const stop = watch(aspectRatio, (val) => {
				if (val) {
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							isBooted.value = true;
						});
					});
					stop();
				}
			});
		}
		useRender(() => {
			const responsiveProps = VResponsive.filterProps(props);
			const [rootAttrs, imageAttrs] = filterInputAttrs(attrs);
			return withDirectives(createVNode(VResponsive, mergeProps({
				"class": [
					"v-img",
					{
						"v-img--absolute": props.absolute,
						"v-img--booting": !isBooted.value,
						"v-img--fit-content": props.width === "fit-content"
					},
					backgroundColorClasses.value,
					roundedClasses.value,
					props.class
				],
				"style": [
					{ width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width) },
					backgroundColorStyles.value,
					props.style
				]
			}, responsiveProps, rootAttrs, {
				"aspectRatio": aspectRatio.value,
				"aria-label": props.alt,
				"role": props.alt ? "img" : void 0
			}), {
				additional: () => createElementVNode(Fragment, null, [
					createVNode(__image, imageAttrs, null),
					createVNode(__preloadImage, null, null),
					createVNode(__gradient, null, null),
					createVNode(__placeholder, null, null),
					createVNode(__error, null, null)
				]),
				default: slots.default
			}), [[
				Intersect,
				{
					handler: init,
					options: props.options
				},
				null,
				{ once: true }
			]]);
		});
		return {
			currentSrc,
			image,
			state,
			naturalWidth,
			naturalHeight
		};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VAvatar/VAvatar.js
var makeVAvatarProps = propsFactory({
	badge: {
		type: [Boolean, Object],
		default: false
	},
	start: Boolean,
	end: Boolean,
	icon: IconValue,
	image: String,
	text: String,
	...makeBorderProps(),
	...makeComponentProps(),
	...makeDensityProps(),
	...makeRoundedProps(),
	...makeSizeProps(),
	...makeTagProps(),
	...makeThemeProps(),
	...makeVariantProps({ variant: "flat" })
}, "VAvatar");
var VAvatar = genericComponent()({
	name: "VAvatar",
	props: makeVAvatarProps(),
	setup(props, { slots }) {
		const { themeClasses } = provideTheme(props);
		const { borderClasses } = useBorder(props);
		const { colorClasses, colorStyles, variantClasses } = useVariant(props);
		const { densityClasses } = useDensity(props);
		const { roundedClasses } = useRounded(props);
		const { sizeClasses, sizeStyles } = useSize(props);
		const badgeDotSize = computed(() => {
			switch (props.size) {
				case "x-small": return 8;
				case "small": return 10;
				case "large": return 14;
				case "x-large": return 16;
				default: return 12;
			}
		});
		const badgeOffset = computed(() => {
			const { floating } = isObject(props.badge) ? props.badge : {};
			return (floating ? badgeDotSize.value / 2 : 0) - 1.5;
		});
		const badgeProps = computed(() => {
			return {
				bordered: true,
				dot: !slots.badge,
				dotSize: badgeDotSize.value,
				offsetX: badgeOffset.value,
				offsetY: badgeOffset.value,
				color: typeof props.badge === "string" ? props.badge : "primary",
				...isObject(props.badge) ? props.badge : {}
			};
		});
		useRender(() => {
			const avatar = createVNode(props.tag, {
				"class": normalizeClass([
					"v-avatar",
					{
						"v-avatar--start": props.start,
						"v-avatar--end": props.end
					},
					themeClasses.value,
					borderClasses.value,
					colorClasses.value,
					densityClasses.value,
					roundedClasses.value,
					sizeClasses.value,
					variantClasses.value,
					props.class
				]),
				"style": normalizeStyle([
					colorStyles.value,
					sizeStyles.value,
					props.style
				])
			}, { default: () => [!slots.default ? props.image ? createVNode(VImg, {
				"key": "image",
				"src": props.image,
				"alt": "",
				"cover": true
			}, null) : props.icon ? createVNode(VIcon, {
				"key": "icon",
				"icon": props.icon
			}, null) : props.text : createVNode(VDefaultsProvider, {
				"key": "content-defaults",
				"defaults": {
					VImg: {
						cover: true,
						src: props.image
					},
					VIcon: { icon: props.icon }
				}
			}, { default: () => [slots.default()] }), genOverlays(false, "v-avatar")] });
			return props.badge ? createVNode(VBadge, badgeProps.value, {
				default: () => avatar,
				badge: slots.badge
			}) : avatar;
		});
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/transitions/dialog-transition.js
var makeVDialogTransitionProps = propsFactory({ target: [Object, Array] }, "v-dialog-transition");
var saved = /* @__PURE__ */ new WeakMap();
var VDialogTransition = genericComponent()({
	name: "VDialogTransition",
	props: makeVDialogTransitionProps(),
	setup(props, { slots }) {
		const functions = {
			onBeforeEnter(el) {
				el.style.pointerEvents = "none";
				el.style.visibility = "hidden";
			},
			async onEnter(el, done) {
				await new Promise((resolve) => requestAnimationFrame(resolve));
				await new Promise((resolve) => requestAnimationFrame(resolve));
				el.style.visibility = "";
				const dimensions = getDimensions(props.target, el);
				const { x, y, sx, sy, speed } = dimensions;
				saved.set(el, dimensions);
				{
					const animation = animate(el, [{
						transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
						opacity: 0
					}, {}], {
						duration: 225 * speed,
						easing: deceleratedEasing
					});
					getChildren(el)?.forEach((el) => {
						animate(el, [
							{ opacity: 0 },
							{
								opacity: 0,
								offset: .33
							},
							{}
						], {
							duration: 450 * speed,
							easing: standardEasing
						});
					});
					animation.finished.then(() => done());
				}
			},
			onAfterEnter(el) {
				el.style.removeProperty("pointer-events");
			},
			onBeforeLeave(el) {
				el.style.pointerEvents = "none";
			},
			async onLeave(el, done) {
				await new Promise((resolve) => requestAnimationFrame(resolve));
				let dimensions;
				if (!saved.has(el) || Array.isArray(props.target) || props.target.offsetParent || props.target.getClientRects().length) dimensions = getDimensions(props.target, el);
				else dimensions = saved.get(el);
				const { x, y, sx, sy, speed } = dimensions;
				{
					animate(el, [{}, {
						transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
						opacity: 0
					}], {
						duration: 125 * speed,
						easing: acceleratedEasing
					}).finished.then(() => done());
					getChildren(el)?.forEach((el) => {
						animate(el, [
							{},
							{
								opacity: 0,
								offset: .2
							},
							{ opacity: 0 }
						], {
							duration: 250 * speed,
							easing: standardEasing
						});
					});
				}
			},
			onAfterLeave(el) {
				el.style.removeProperty("pointer-events");
			}
		};
		return () => {
			return props.target ? createVNode(Transition, mergeProps({ "name": "dialog-transition" }, functions, { "css": false }), slots) : createVNode(Transition, { "name": "dialog-transition" }, slots);
		};
	}
});
/** Animatable children (card, sheet, list) */
function getChildren(el) {
	const els = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children;
	return els && [...els];
}
function getDimensions(target, el) {
	const targetBox = getTargetBox(target);
	const elBox = nullifyTransforms(el);
	const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
	const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
	let offsetX = targetBox.left + targetBox.width / 2;
	if (anchorSide === "left" || anchorOffset === "left") offsetX -= targetBox.width / 2;
	else if (anchorSide === "right" || anchorOffset === "right") offsetX += targetBox.width / 2;
	let offsetY = targetBox.top + targetBox.height / 2;
	if (anchorSide === "top" || anchorOffset === "top") offsetY -= targetBox.height / 2;
	else if (anchorSide === "bottom" || anchorOffset === "bottom") offsetY += targetBox.height / 2;
	const tsx = targetBox.width / elBox.width;
	const tsy = targetBox.height / elBox.height;
	const maxs = Math.max(1, tsx, tsy);
	const sx = tsx / maxs || 0;
	const sy = tsy / maxs || 0;
	const asa = elBox.width * elBox.height / ((void 0).innerWidth * (void 0).innerHeight);
	const speed = asa > .12 ? Math.min(1.5, (asa - .12) * 10 + 1) : 1;
	return {
		x: offsetX - (originX + elBox.left),
		y: offsetY - (originY + elBox.top),
		sx,
		sy,
		speed
	};
}
//#endregion
//#region node_modules/vuetify/lib/components/VOverlay/util/point.js
/** Convert a point in local space to viewport space */
function elementToViewport(point, offset) {
	return {
		x: point.x + offset.x,
		y: point.y + offset.y
	};
}
/** Get the difference between two points */
function getOffset(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
/** Convert an anchor object to a point in local space */
function anchorToPoint(anchor, box) {
	if (anchor.side === "top" || anchor.side === "bottom") {
		const { side, align } = anchor;
		return elementToViewport({
			x: align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align,
			y: side === "top" ? 0 : side === "bottom" ? box.height : side
		}, box);
	} else if (anchor.side === "left" || anchor.side === "right") {
		const { side, align } = anchor;
		return elementToViewport({
			x: side === "left" ? 0 : side === "right" ? box.width : side,
			y: align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align
		}, box);
	}
	return elementToViewport({
		x: box.width / 2,
		y: box.height / 2
	}, box);
}
//#endregion
//#region node_modules/vuetify/lib/components/VOverlay/locationStrategies.js
var locationStrategies = {
	static: staticLocationStrategy,
	connected: connectedLocationStrategy
};
var makeLocationStrategyProps = propsFactory({
	locationStrategy: {
		type: [String, Function],
		default: "static",
		validator: (val) => typeof val === "function" || val in locationStrategies
	},
	location: {
		type: String,
		default: "bottom"
	},
	origin: {
		type: String,
		default: "auto"
	},
	offset: [
		Number,
		String,
		Array
	],
	stickToTarget: Boolean,
	viewportMargin: {
		type: [Number, String],
		default: 12
	}
}, "VOverlay-location-strategies");
function useLocationStrategies(props, data) {
	return {
		contentStyles: ref({}),
		updateLocation: ref()
	};
}
function staticLocationStrategy() {}
/** Get size of element ignoring max-width/max-height */
function getIntrinsicSize(el, isRtl) {
	const contentBox = nullifyTransforms(el);
	if (isRtl) contentBox.x += parseFloat(el.style.right || 0);
	else contentBox.x -= parseFloat(el.style.left || 0);
	contentBox.y -= parseFloat(el.style.top || 0);
	return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
	if (Array.isArray(data.target.value) || isFixedPosition(data.target.value)) Object.assign(contentStyles.value, {
		position: "fixed",
		top: 0,
		[data.isRtl.value ? "right" : "left"]: 0
	});
	const { preferredAnchor, preferredOrigin } = destructComputed(() => {
		const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
		const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
		if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) return {
			preferredAnchor: flipCorner(parsedAnchor),
			preferredOrigin: flipCorner(parsedOrigin)
		};
		else return {
			preferredAnchor: parsedAnchor,
			preferredOrigin: parsedOrigin
		};
	});
	const [minWidth, minHeight, maxWidth, maxHeight] = [
		"minWidth",
		"minHeight",
		"maxWidth",
		"maxHeight"
	].map((key) => {
		return computed(() => {
			const val = parseFloat(props[key]);
			return isNaN(val) ? Infinity : val;
		});
	});
	const offset = computed(() => {
		if (Array.isArray(props.offset)) return props.offset;
		if (typeof props.offset === "string") {
			const offset = props.offset.split(" ").map(parseFloat);
			if (offset.length < 2) offset.push(0);
			return offset;
		}
		return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
	});
	let observe = false;
	let lastFrame = -1;
	const flipped = new CircularBuffer(4);
	const observer = new ResizeObserver(() => {
		if (!observe) return;
		requestAnimationFrame((newTime) => {
			if (newTime !== lastFrame) flipped.clear();
			requestAnimationFrame((newNewTime) => {
				lastFrame = newNewTime;
			});
		});
		if (flipped.isFull) {
			const values = flipped.values();
			if (deepEqual(values.at(-1), values.at(-3)) && !deepEqual(values.at(-1), values.at(-2))) return;
		}
		const result = updateLocation();
		if (result) flipped.push(result.flipped);
	});
	let targetBox = new Box({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	watch(data.target, (newTarget, oldTarget) => {
		if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
		if (!Array.isArray(newTarget)) {
			if (newTarget) observer.observe(newTarget);
		} else if (!deepEqual(newTarget, oldTarget)) updateLocation();
	}, { immediate: true });
	watch(data.contentEl, (newContentEl, oldContentEl) => {
		if (oldContentEl) observer.unobserve(oldContentEl);
		if (newContentEl) observer.observe(newContentEl);
	}, { immediate: true });
	onScopeDispose(() => {
		observer.disconnect();
	});
	function updateLocation() {
		observe = false;
		requestAnimationFrame(() => observe = true);
		if (!data.target.value || !data.contentEl.value) return;
		if (Array.isArray(data.target.value) || data.target.value.offsetParent || data.target.value.getClientRects().length) targetBox = getTargetBox(data.target.value);
		const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
		const scrollParents = getScrollParents(data.contentEl.value);
		const viewportMargin = Number(props.viewportMargin);
		if (!scrollParents.length) {
			scrollParents.push((void 0).documentElement);
			if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
				contentBox.x -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
				contentBox.y -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
			}
		}
		const viewport = scrollParents.reduce((box, el) => {
			const scrollBox = getElementBox(el);
			if (box) return new Box({
				x: Math.max(box.left, scrollBox.left),
				y: Math.max(box.top, scrollBox.top),
				width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
				height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
			});
			return scrollBox;
		}, void 0);
		if (props.stickToTarget) {
			viewport.x += Math.min(viewportMargin, targetBox.x);
			viewport.y += Math.min(viewportMargin, targetBox.y);
			viewport.width = Math.max(viewport.width - viewportMargin * 2, targetBox.x + targetBox.width - viewportMargin);
			viewport.height = Math.max(viewport.height - viewportMargin * 2, targetBox.y + targetBox.height - viewportMargin);
		} else {
			viewport.x += viewportMargin;
			viewport.y += viewportMargin;
			viewport.width -= viewportMargin * 2;
			viewport.height -= viewportMargin * 2;
		}
		let placement = {
			anchor: preferredAnchor.value,
			origin: preferredOrigin.value
		};
		function checkOverflow(_placement) {
			const box = new Box(contentBox);
			let { x, y } = getOffset(anchorToPoint(_placement.anchor, targetBox), anchorToPoint(_placement.origin, box));
			switch (_placement.anchor.side) {
				case "top":
					y -= offset.value[0];
					break;
				case "bottom":
					y += offset.value[0];
					break;
				case "left":
					x -= offset.value[0];
					break;
				case "right":
					x += offset.value[0];
					break;
			}
			switch (_placement.anchor.align) {
				case "top":
					y -= offset.value[1];
					break;
				case "bottom":
					y += offset.value[1];
					break;
				case "left":
					x -= offset.value[1];
					break;
				case "right":
					x += offset.value[1];
					break;
			}
			box.x += x;
			box.y += y;
			box.width = Math.min(box.width, maxWidth.value);
			box.height = Math.min(box.height, maxHeight.value);
			return {
				overflows: getOverflow(box, viewport),
				x,
				y
			};
		}
		let x = 0;
		let y = 0;
		const available = {
			x: 0,
			y: 0
		};
		const flipped = {
			x: false,
			y: false
		};
		let resets = -1;
		while (true) {
			if (resets++ > 10) {
				consoleError("Infinite loop detected in connectedLocationStrategy");
				break;
			}
			const { x: _x, y: _y, overflows } = checkOverflow(placement);
			x += _x;
			y += _y;
			contentBox.x += _x;
			contentBox.y += _y;
			{
				const axis = getAxis(placement.anchor);
				const hasOverflowX = overflows.x.before || overflows.x.after;
				const hasOverflowY = overflows.y.before || overflows.y.after;
				let reset = false;
				["x", "y"].forEach((key) => {
					if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
						const newPlacement = {
							anchor: { ...placement.anchor },
							origin: { ...placement.origin }
						};
						const flip = key === "x" ? axis === "y" ? flipAlign : flipSide : axis === "y" ? flipSide : flipAlign;
						newPlacement.anchor = flip(newPlacement.anchor);
						newPlacement.origin = flip(newPlacement.origin);
						const { overflows: newOverflows } = checkOverflow(newPlacement);
						if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
							placement = newPlacement;
							reset = flipped[key] = true;
						}
					}
				});
				if (reset) continue;
			}
			if (overflows.x.before) {
				x += overflows.x.before;
				contentBox.x += overflows.x.before;
			}
			if (overflows.x.after) {
				x -= overflows.x.after;
				contentBox.x -= overflows.x.after;
			}
			if (overflows.y.before) {
				y += overflows.y.before;
				contentBox.y += overflows.y.before;
			}
			if (overflows.y.after) {
				y -= overflows.y.after;
				contentBox.y -= overflows.y.after;
			}
			{
				const overflows = getOverflow(contentBox, viewport);
				available.x = viewport.width - overflows.x.before - overflows.x.after;
				available.y = viewport.height - overflows.y.before - overflows.y.after;
				x += overflows.x.before;
				contentBox.x += overflows.x.before;
				y += overflows.y.before;
				contentBox.y += overflows.y.before;
			}
			break;
		}
		const axis = getAxis(placement.anchor);
		Object.assign(contentStyles.value, {
			"--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
			transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
			top: convertToUnit(pixelRound(y)),
			left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
			right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
			minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
			maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
			maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
		});
		return {
			available,
			contentBox,
			flipped
		};
	}
	watch(() => [
		preferredAnchor.value,
		preferredOrigin.value,
		props.offset,
		props.minWidth,
		props.minHeight,
		props.maxWidth,
		props.maxHeight
	], () => updateLocation());
	nextTick(() => {
		const result = updateLocation();
		if (!result) return;
		const { available, contentBox } = result;
		if (contentBox.height > available.y) requestAnimationFrame(() => {
			updateLocation();
			requestAnimationFrame(() => {
				updateLocation();
			});
		});
	});
	return { updateLocation };
}
function pixelRound(val) {
	return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
	return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
//#endregion
//#region node_modules/vuetify/lib/components/VOverlay/requestNewFrame.js
var clean = true;
var frames = [];
/**
* Schedule a task to run in an animation frame on its own
* This is useful for heavy tasks that may cause jank if all ran together
*/
function requestNewFrame(cb) {
	if (!clean || frames.length) {
		frames.push(cb);
		run();
	} else {
		clean = false;
		cb();
		run();
	}
}
var raf = -1;
function run() {
	cancelAnimationFrame(raf);
	raf = requestAnimationFrame(() => {
		const frame = frames.shift();
		if (frame) frame();
		if (frames.length) run();
		else clean = true;
	});
}
//#endregion
//#region node_modules/vuetify/lib/components/VOverlay/scrollStrategies.js
var scrollStrategies = {
	none: null,
	close: closeScrollStrategy,
	block: blockScrollStrategy,
	reposition: repositionScrollStrategy
};
var makeScrollStrategyProps = propsFactory({ scrollStrategy: {
	type: [String, Function],
	default: "block",
	validator: (val) => typeof val === "function" || val in scrollStrategies
} }, "VOverlay-scroll-strategies");
function closeScrollStrategy(data) {
	function onScroll(e) {
		data.isActive.value = false;
	}
	bindScroll(getTargetEl(data.target.value, data.contentEl.value), onScroll);
}
function blockScrollStrategy(data, props) {
	const offsetParent = data.root.value?.offsetParent;
	const target = getTargetEl(data.target.value, data.contentEl.value);
	const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(target, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
	const scrollbarWidth = (void 0).innerWidth - (void 0).documentElement.offsetWidth;
	const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || (void 0).documentElement);
	if (scrollableParent) data.root.value.classList.add("v-overlay--scroll-blocked");
	scrollElements.forEach((el, i) => {
		el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
		el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
		if (el !== (void 0).documentElement || getComputedStyle(el).overflowY !== "scroll") el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
		el.classList.add("v-overlay-scroll-blocked");
	});
	onScopeDispose(() => {
		scrollElements.forEach((el, i) => {
			const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
			const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
			const scrollBehavior = el.style.scrollBehavior;
			el.style.scrollBehavior = "auto";
			el.style.removeProperty("--v-body-scroll-x");
			el.style.removeProperty("--v-body-scroll-y");
			el.style.removeProperty("--v-scrollbar-offset");
			el.classList.remove("v-overlay-scroll-blocked");
			el.scrollLeft = -x;
			el.scrollTop = -y;
			el.style.scrollBehavior = scrollBehavior;
		});
		if (scrollableParent) data.root.value.classList.remove("v-overlay--scroll-blocked");
	});
}
function repositionScrollStrategy(data, props, scope) {
	let slow = false;
	let raf = -1;
	let ric = -1;
	function update(e) {
		requestNewFrame(() => {
			const start = performance.now();
			data.updateLocation.value?.(e);
			slow = (performance.now() - start) / (1e3 / 60) > 2;
		});
	}
	ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
		scope.run(() => {
			bindScroll(getTargetEl(data.target.value, data.contentEl.value), (e) => {
				if (slow) {
					cancelAnimationFrame(raf);
					raf = requestAnimationFrame(() => {
						raf = requestAnimationFrame(() => {
							update(e);
						});
					});
				} else update(e);
			});
		});
	});
	onScopeDispose(() => {
		typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
		cancelAnimationFrame(raf);
	});
}
function getTargetEl(target, contentEl) {
	return Array.isArray(target) ? (void 0).elementsFromPoint(...target).find((el) => !contentEl?.contains(el)) : target ?? contentEl;
}
function bindScroll(el, onScroll) {
	const scrollElements = [void 0, ...getScrollParents(el)];
	scrollElements.forEach((el) => {
		el.addEventListener("scroll", onScroll, { passive: true });
	});
	onScopeDispose(() => {
		scrollElements.forEach((el) => {
			el.removeEventListener("scroll", onScroll);
		});
	});
}
//#endregion
//#region node_modules/vuetify/lib/components/VMenu/shared.js
var VMenuSymbol = Symbol.for("vuetify:v-menu");
//#endregion
//#region node_modules/vuetify/lib/composables/delay.js
var makeDelayProps = propsFactory({
	closeDelay: [Number, String],
	openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
	let clearDelay = () => {};
	function runDelay(isOpening, options) {
		clearDelay?.();
		const delay = isOpening ? props.openDelay : props.closeDelay;
		const normalizedDelay = Math.max(options?.minDelay ?? 0, Number(delay ?? 0));
		return new Promise((resolve) => {
			clearDelay = defer(normalizedDelay, () => {
				cb?.(isOpening);
				resolve(isOpening);
			});
		});
	}
	function runOpenDelay() {
		return runDelay(true);
	}
	function runCloseDelay(options) {
		return runDelay(false, options);
	}
	return {
		clearDelay,
		runOpenDelay,
		runCloseDelay
	};
}
//#endregion
//#region node_modules/vuetify/lib/components/VOverlay/useActivator.js
var makeActivatorProps = propsFactory({
	target: [String, Object],
	activator: [String, Object],
	activatorProps: {
		type: Object,
		default: () => ({})
	},
	openOnClick: {
		type: Boolean,
		default: void 0
	},
	openOnHover: Boolean,
	openOnFocus: {
		type: Boolean,
		default: void 0
	},
	closeOnContentClick: Boolean,
	...makeDelayProps()
}, "VOverlay-activator");
function useActivator(props, { isActive, isTop, contentEl }) {
	const vm = getCurrentInstance$1("useActivator");
	const activatorEl = ref();
	let isHovered = false;
	let isFocused = false;
	let firstEnter = true;
	const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
	const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
	const { runOpenDelay, runCloseDelay } = useDelay(props, (value) => {
		if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
			if (isActive.value !== value) firstEnter = true;
			isActive.value = value;
		}
	});
	const cursorTarget = ref();
	const availableEvents = {
		onClick: (e) => {
			e.stopPropagation();
			activatorEl.value = e.currentTarget || e.target;
			if (!isActive.value) cursorTarget.value = [e.clientX, e.clientY];
			isActive.value = !isActive.value;
		},
		onMouseenter: (e) => {
			isHovered = true;
			activatorEl.value = e.currentTarget || e.target;
			runOpenDelay();
		},
		onMouseleave: (e) => {
			isHovered = false;
			runCloseDelay();
		},
		onFocus: (e) => {
			if (matchesSelector(e.target) === false) ;
			isFocused = true;
			e.stopPropagation();
			activatorEl.value = e.currentTarget || e.target;
			runOpenDelay();
		},
		onBlur: (e) => {
			isFocused = false;
			e.stopPropagation();
			runCloseDelay({ minDelay: 1 });
		}
	};
	const activatorEvents = computed(() => {
		const events = {};
		if (openOnClick.value) events.onClick = availableEvents.onClick;
		if (props.openOnHover) {
			events.onMouseenter = availableEvents.onMouseenter;
			events.onMouseleave = availableEvents.onMouseleave;
		}
		if (openOnFocus.value) {
			events.onFocus = availableEvents.onFocus;
			events.onBlur = availableEvents.onBlur;
		}
		return events;
	});
	const contentEvents = computed(() => {
		const events = {};
		if (props.openOnHover) {
			events.onMouseenter = () => {
				isHovered = true;
				runOpenDelay();
			};
			events.onMouseleave = () => {
				isHovered = false;
				runCloseDelay();
			};
		}
		if (openOnFocus.value) {
			events.onFocusin = (e) => {
				if (!e.target.matches(":focus-visible")) return;
				isFocused = true;
				runOpenDelay();
			};
			events.onFocusout = () => {
				isFocused = false;
				runCloseDelay({ minDelay: 1 });
			};
		}
		if (props.closeOnContentClick) {
			const menu = inject(VMenuSymbol, null);
			events.onClick = () => {
				isActive.value = false;
				menu?.closeParents();
			};
		}
		return events;
	});
	const scrimEvents = computed(() => {
		const events = {};
		if (props.openOnHover) {
			events.onMouseenter = () => {
				if (firstEnter) {
					isHovered = true;
					firstEnter = false;
					runOpenDelay();
				}
			};
			events.onMouseleave = () => {
				isHovered = false;
				runCloseDelay();
			};
		}
		return events;
	});
	watch(isTop, (val) => {
		if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered)) && !contentEl.value?.contains((void 0).activeElement)) isActive.value = false;
	});
	watch(isActive, (val) => {
		if (!val) setTimeout(() => {
			cursorTarget.value = void 0;
		});
	}, { flush: "post" });
	const activatorRef = templateRef();
	watchEffect(() => {
		if (!activatorRef.value) return;
		nextTick(() => {
			activatorEl.value = activatorRef.el;
		});
	});
	const targetRef = templateRef();
	const target = computed(() => {
		if (props.target === "cursor" && cursorTarget.value) return cursorTarget.value;
		if (targetRef.value) return targetRef.el;
		return getTarget(props.target, vm) || activatorEl.value;
	});
	const targetEl = computed(() => {
		return Array.isArray(target.value) ? void 0 : target.value;
	});
	watch(() => !!props.activator, (val) => {}, {
		flush: "post",
		immediate: true
	});
	onScopeDispose(() => {});
	return {
		activatorEl,
		activatorRef,
		target,
		targetEl,
		targetRef,
		activatorEvents,
		contentEvents,
		scrimEvents
	};
}
function getTarget(selector, vm) {
	if (!selector) return;
	let target;
	if (selector === "parent") {
		let el = vm?.proxy?.$el?.parentNode;
		while (el?.hasAttribute("data-no-activator")) el = el.parentNode;
		target = el;
	} else if (typeof selector === "string") target = (void 0).querySelector(selector);
	else if ("$el" in selector) target = selector.$el;
	else target = selector;
	return target;
}
//#endregion
//#region node_modules/vuetify/lib/composables/focusTrap.js
var makeFocusTrapProps = propsFactory({
	retainFocus: Boolean,
	captureFocus: Boolean,
	/** @deprecated */
	disableInitialFocus: Boolean
}, "focusTrap");
var registry = /* @__PURE__ */ new Map();
var subscribers = 0;
function onKeydown(e) {
	const activeElement = (void 0).activeElement;
	if (e.key !== "Tab" || !activeElement) return;
	const parentTraps = Array.from(registry.values()).filter(({ isActive, contentEl }) => isActive.value && contentEl.value?.contains(activeElement)).map((x) => x.contentEl.value);
	let closestTrap;
	let currentParent = activeElement.parentElement;
	while (currentParent) {
		if (parentTraps.includes(currentParent)) {
			closestTrap = currentParent;
			break;
		}
		currentParent = currentParent.parentElement;
	}
	if (!closestTrap) return;
	const focusable = focusableChildren(closestTrap).filter((x) => x.tabIndex >= 0);
	if (!focusable.length) return;
	const active = (void 0).activeElement;
	if (focusable.length === 1 && focusable[0].classList.contains("v-list") && focusable[0].contains(active)) {
		e.preventDefault();
		return;
	}
	const firstElement = focusable[0];
	const lastElement = focusable[focusable.length - 1];
	if (e.shiftKey && (active === firstElement || firstElement.classList.contains("v-list") && firstElement.contains(active))) {
		e.preventDefault();
		lastElement.focus();
	}
	if (!e.shiftKey && (active === lastElement || lastElement.classList.contains("v-list") && lastElement.contains(active))) {
		e.preventDefault();
		firstElement.focus();
	}
}
function useFocusTrap(props, { isActive, localTop, activatorEl, contentEl }) {
	const trapId = Symbol("trap");
	let focusTrapSuppressed = false;
	let focusTrapSuppressionTimeout = -1;
	async function onPointerdown() {
		focusTrapSuppressed = true;
		focusTrapSuppressionTimeout = (void 0).setTimeout(() => {
			focusTrapSuppressed = false;
		}, 100);
	}
	async function captureOnFocus(e) {
		const before = e.relatedTarget;
		const after = e.target;
		(void 0).removeEventListener("pointerdown", onPointerdown);
		(void 0).removeEventListener("keydown", captureOnKeydown);
		await nextTick();
		if (isActive.value && !focusTrapSuppressed && before !== after && contentEl.value && toValue(localTop) && ![void 0, contentEl.value].includes(after) && !contentEl.value.contains(after)) focusableChildren(contentEl.value)[0]?.focus();
	}
	function captureOnKeydown(e) {
		if (e.key !== "Tab") return;
		(void 0).removeEventListener("keydown", captureOnKeydown);
		if (isActive.value && contentEl.value && e.target && !contentEl.value.contains(e.target)) {
			const allFocusableElements = focusableChildren((void 0).documentElement);
			if (e.shiftKey && e.target === allFocusableElements.at(0) || !e.shiftKey && e.target === allFocusableElements.at(-1)) {
				const focusable = focusableChildren(contentEl.value);
				if (focusable.length > 0) {
					e.preventDefault();
					focusable[0].focus();
				}
			}
		}
	}
	toRef(() => isActive.value && props.captureFocus && !props.disableInitialFocus);
	onScopeDispose(() => {
		registry.delete(trapId);
		clearTimeout(focusTrapSuppressionTimeout);
		(void 0).removeEventListener("pointerdown", onPointerdown);
		(void 0).removeEventListener("focusin", captureOnFocus);
		(void 0).removeEventListener("keydown", captureOnKeydown);
		if (--subscribers < 1) (void 0).removeEventListener("keydown", onKeydown);
	});
}
//#endregion
//#region node_modules/vuetify/lib/composables/hydration.js
function useHydration() {
	return shallowRef(false);
}
//#endregion
//#region node_modules/vuetify/lib/composables/lazy.js
var makeLazyProps = propsFactory({ eager: Boolean }, "lazy");
function useLazy(props, active) {
	const isBooted = shallowRef(false);
	const hasContent = toRef(() => isBooted.value || props.eager || active.value);
	watch(active, () => isBooted.value = true);
	function onAfterLeave() {
		if (!props.eager) isBooted.value = false;
	}
	return {
		isBooted,
		hasContent,
		onAfterLeave
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/scopeId.js
function useScopeId() {
	const scopeId = getCurrentInstance$1("useScopeId").vnode.scopeId;
	return { scopeId: scopeId ? { [scopeId]: "" } : void 0 };
}
//#endregion
//#region node_modules/vuetify/lib/composables/stack.js
var StackSymbol = Symbol.for("vuetify:stack");
var globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
	const vm = getCurrentInstance$1("useStack");
	const createStackEntry = !disableGlobalStack;
	const parent = inject(StackSymbol, void 0);
	const stack = reactive({ activeChildren: /* @__PURE__ */ new Set() });
	provide(StackSymbol, stack);
	const _zIndex = shallowRef(Number(toValue(zIndex)));
	useToggleScope(isActive, () => {
		const lastZIndex = globalStack.at(-1)?.[1];
		_zIndex.value = lastZIndex ? lastZIndex + 10 : Number(toValue(zIndex));
		if (createStackEntry) globalStack.push([vm.uid, _zIndex.value]);
		parent?.activeChildren.add(vm.uid);
		onScopeDispose(() => {
			if (createStackEntry) {
				const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
				globalStack.splice(idx, 1);
			}
			parent?.activeChildren.delete(vm.uid);
		});
	});
	const globalTop = shallowRef(true);
	if (createStackEntry) watchEffect(() => {
		const _isTop = globalStack.at(-1)?.[0] === vm.uid;
		setTimeout(() => globalTop.value = _isTop);
	});
	const localTop = toRef(() => !stack.activeChildren.size);
	return {
		globalTop: readonly(globalTop),
		localTop,
		stackStyles: toRef(() => ({ zIndex: _zIndex.value }))
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/teleport.js
function useTeleport(target) {
	return { teleportTarget: computed(() => {
		target();
	}) };
}
//#endregion
//#region node_modules/vuetify/lib/directives/click-outside/index.js
function defaultConditional() {
	return true;
}
function checkEvent(e, el, binding) {
	if (!e || checkIsActive(e, binding) === false) return false;
	const root = attachedRoot(el);
	if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target) return false;
	const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
	elements.push(el);
	return !elements.some((el) => el?.contains(e.target));
}
function checkIsActive(e, binding) {
	return (typeof binding.value === "object" && binding.value.closeConditional || defaultConditional)(e);
}
function directive(e, el, binding) {
	const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
	e.shadowTarget = e.target;
	el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
		checkIsActive(e, binding) && handler && handler(e);
	}, 0);
}
function handleShadow(el, callback) {
	const root = attachedRoot(el);
	callback(void 0);
	if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) callback(root);
}
var ClickOutside = {
	mounted(el, binding) {
		const onClick = (e) => directive(e, el, binding);
		const onMousedown = (e) => {
			el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
		};
		handleShadow(el, (app) => {
			app.addEventListener("click", onClick, true);
			app.addEventListener("mousedown", onMousedown, true);
		});
		if (!el._clickOutside) el._clickOutside = { lastMousedownWasOutside: false };
		el._clickOutside[binding.instance.$.uid] = {
			onClick,
			onMousedown
		};
	},
	beforeUnmount(el, binding) {
		if (!el._clickOutside) return;
		handleShadow(el, (app) => {
			if (!app || !el._clickOutside?.[binding.instance.$.uid]) return;
			const { onClick, onMousedown } = el._clickOutside[binding.instance.$.uid];
			app.removeEventListener("click", onClick, true);
			app.removeEventListener("mousedown", onMousedown, true);
		});
		delete el._clickOutside[binding.instance.$.uid];
	}
};
//#endregion
//#region node_modules/vuetify/lib/components/VOverlay/VOverlay.js
function Scrim(props) {
	const { modelValue, color, ...rest } = props;
	return createVNode(Transition, {
		"name": "fade-transition",
		"appear": true
	}, { default: () => [props.modelValue && createElementVNode("div", mergeProps({
		"class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
		"style": props.color.backgroundColorStyles.value
	}, rest), null)] });
}
var makeVOverlayProps = propsFactory({
	absolute: Boolean,
	attach: [
		Boolean,
		String,
		Object
	],
	closeOnBack: {
		type: Boolean,
		default: true
	},
	contained: Boolean,
	contentClass: null,
	contentProps: null,
	disabled: Boolean,
	opacity: [Number, String],
	noClickAnimation: Boolean,
	modelValue: Boolean,
	persistent: Boolean,
	scrim: {
		type: [Boolean, String],
		default: true
	},
	zIndex: {
		type: [Number, String],
		default: 2e3
	},
	...makeActivatorProps(),
	...makeComponentProps(),
	...makeDimensionProps(),
	...makeLazyProps(),
	...makeLocationStrategyProps(),
	...makeScrollStrategyProps(),
	...makeFocusTrapProps(),
	...makeThemeProps(),
	...makeTransitionProps()
}, "VOverlay");
var VOverlay = genericComponent()({
	name: "VOverlay",
	directives: { vClickOutside: ClickOutside },
	inheritAttrs: false,
	props: {
		_disableGlobalStack: Boolean,
		...omit(makeVOverlayProps(), ["disableInitialFocus"])
	},
	emits: {
		"click:outside": (e) => true,
		"update:modelValue": (value) => true,
		keydown: (e) => true,
		afterEnter: () => true,
		afterLeave: () => true
	},
	setup(props, { slots, attrs, emit }) {
		const vm = getCurrentInstance$1("VOverlay");
		const root = ref();
		const scrimEl = ref();
		const contentEl = ref();
		const model = useProxiedModel(props, "modelValue");
		const isActive = computed({
			get: () => model.value,
			set: (v) => {
				if (!(v && props.disabled)) model.value = v;
			}
		});
		const { themeClasses } = provideTheme(props);
		const { rtlClasses} = useRtl();
		const { hasContent, onAfterLeave: _onAfterLeave } = useLazy(props, isActive);
		const scrimColor = useBackgroundColor(() => {
			return typeof props.scrim === "string" ? props.scrim : null;
		});
		const { globalTop, localTop, stackStyles } = useStack(isActive, () => props.zIndex, props._disableGlobalStack);
		const { activatorEl, activatorRef, target, targetRef, activatorEvents, contentEvents, scrimEvents } = useActivator(props, {
			isActive,
			isTop: localTop,
			contentEl
		});
		const { teleportTarget } = useTeleport(() => {
			const target = props.attach || props.contained;
			if (target) return target;
			const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode();
			if (rootNode instanceof ShadowRoot) return rootNode;
			return false;
		});
		const { dimensionStyles } = useDimension(props);
		const isMounted = useHydration();
		const { scopeId } = useScopeId();
		watch(() => props.disabled, (v) => {
			if (v) isActive.value = false;
		});
		const { contentStyles, updateLocation } = useLocationStrategies();
		function onClickOutside(e) {
			emit("click:outside", e);
			if (!props.persistent) isActive.value = false;
			else animateClick();
		}
		function closeConditional(e) {
			return isActive.value && localTop.value && (!props.scrim || e.target === scrimEl.value || e instanceof MouseEvent && e.shadowTarget === scrimEl.value);
		}
		useFocusTrap(props, {
			isActive,
			localTop,
			contentEl,
			activatorEl
		});
		function onKeydownSelf(e) {
			if (e.key === "Escape" && !globalTop.value) return;
			emit("keydown", e);
		}
		useRouter();
		useToggleScope(() => props.closeOnBack, () => {
		});
		const top = ref();
		watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
			if (val) {
				const scrollParent = getScrollParent(root.value);
				if (scrollParent && scrollParent !== (void 0).scrollingElement) top.value = scrollParent.scrollTop;
			}
		});
		function animateClick() {
			if (props.noClickAnimation) return;
			contentEl.value && animate(contentEl.value, [
				{ transformOrigin: "center" },
				{ transform: "scale(1.03)" },
				{ transformOrigin: "center" }
			], {
				duration: 150,
				easing: "cubic-bezier(0.4, 0, 0.2, 1)"
			});
		}
		function onAfterEnter() {
			emit("afterEnter");
		}
		function onAfterLeave() {
			_onAfterLeave();
			emit("afterLeave");
		}
		useRender(() => createElementVNode(Fragment, null, [slots.activator?.({
			isActive: isActive.value,
			targetRef,
			props: mergeProps({ ref: activatorRef }, activatorEvents.value, props.activatorProps)
		}), isMounted.value && hasContent.value && createVNode(Teleport, {
			"disabled": !teleportTarget.value,
			"to": teleportTarget.value
		}, { default: () => [createElementVNode("div", mergeProps({
			"class": [
				"v-overlay",
				{
					"v-overlay--absolute": props.absolute || props.contained,
					"v-overlay--active": isActive.value,
					"v-overlay--contained": props.contained
				},
				themeClasses.value,
				rtlClasses.value,
				props.class
			],
			"style": [
				stackStyles.value,
				{
					"--v-overlay-opacity": props.opacity,
					top: convertToUnit(top.value)
				},
				props.style
			],
			"ref": root,
			"onKeydown": onKeydownSelf
		}, scopeId, attrs), [createVNode(Scrim, mergeProps({
			"color": scrimColor,
			"modelValue": isActive.value && !!props.scrim,
			"ref": scrimEl
		}, scrimEvents.value), null), createVNode(MaybeTransition, {
			"appear": true,
			"persisted": true,
			"transition": props.transition,
			"target": target.value,
			"onAfterEnter": onAfterEnter,
			"onAfterLeave": onAfterLeave
		}, { default: () => [withDirectives(createElementVNode("div", mergeProps({
			"ref": contentEl,
			"class": ["v-overlay__content", props.contentClass],
			"style": [dimensionStyles.value, contentStyles.value]
		}, contentEvents.value, props.contentProps), [slots.default?.({ isActive })]), [[vShow, isActive.value], [ClickOutside, {
			handler: onClickOutside,
			closeConditional,
			include: () => [activatorEl.value]
		}]])] })])] })]));
		return {
			activatorEl,
			scrimEl,
			target,
			animateClick,
			contentEl,
			rootEl: root,
			globalTop,
			localTop,
			updateLocation
		};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VMenu/VMenu.js
var makeVMenuProps = propsFactory({
	id: String,
	submenu: Boolean,
	...omit(makeVOverlayProps({
		captureFocus: true,
		closeDelay: 250,
		closeOnContentClick: true,
		locationStrategy: "connected",
		location: void 0,
		openDelay: 300,
		scrim: false,
		scrollStrategy: "reposition",
		transition: { component: VDialogTransition }
	}), ["absolute"])
}, "VMenu");
var VMenu = genericComponent()({
	name: "VMenu",
	props: makeVMenuProps(),
	emits: { "update:modelValue": (value) => true },
	setup(props, { slots }) {
		const isActive = useProxiedModel(props, "modelValue");
		const { scopeId } = useScopeId();
		const { isRtl } = useRtl();
		const uid = useId();
		const id = toRef(() => props.id || `v-menu-${uid}`);
		const overlay = ref();
		const parent = inject(VMenuSymbol, null);
		const openChildren = shallowRef(/* @__PURE__ */ new Set());
		provide(VMenuSymbol, {
			register() {
				openChildren.value.add(uid);
			},
			unregister() {
				openChildren.value.delete(uid);
			},
			closeParents(e) {
				setTimeout(() => {
					if (!openChildren.value.size && !props.persistent && (e == null || overlay.value?.contentEl && !isClickInsideElement(e, overlay.value.contentEl))) {
						isActive.value = false;
						parent?.closeParents();
					}
				}, 40);
			}
		});
		watch(isActive, (val) => {
			val ? parent?.register() : parent?.unregister();
		}, { immediate: true });
		function onClickOutside(e) {
			parent?.closeParents(e);
		}
		function onKeydown(e) {
			if (props.disabled) return;
			if (e.key === "Tab" || e.key === "Enter" && !props.closeOnContentClick) {
				if (e.key === "Enter" && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest("form"))) return;
				if (e.key === "Enter") e.preventDefault();
				if (!getNextElement(focusableChildren(overlay.value?.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0) && !props.retainFocus) {
					isActive.value = false;
					overlay.value?.activatorEl?.focus();
				}
			} else if (props.submenu && e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) {
				isActive.value = false;
				overlay.value?.activatorEl?.focus();
			}
		}
		function onActivatorKeydown(e) {
			if (props.disabled) return;
			const el = overlay.value?.contentEl;
			if (el && isActive.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					e.stopImmediatePropagation();
					focusChild(el, "next");
				} else if (e.key === "ArrowUp") {
					e.preventDefault();
					e.stopImmediatePropagation();
					focusChild(el, "prev");
				} else if (props.submenu) {
					if (e.key === (isRtl.value ? "ArrowRight" : "ArrowLeft")) isActive.value = false;
					else if (e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight")) {
						e.preventDefault();
						focusChild(el, "first");
					}
				}
			} else if (props.submenu ? e.key === (isRtl.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(e.key)) {
				isActive.value = true;
				e.preventDefault();
				setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
			}
		}
		const activatorProps = computed(() => mergeProps({
			"aria-haspopup": "menu",
			"aria-expanded": String(isActive.value),
			"aria-controls": id.value,
			"aria-owns": id.value,
			onKeydown: onActivatorKeydown
		}, props.activatorProps));
		useRender(() => {
			const overlayProps = VOverlay.filterProps(props);
			return createVNode(VOverlay, mergeProps({
				"ref": overlay,
				"id": id.value,
				"class": ["v-menu", props.class],
				"style": props.style
			}, overlayProps, {
				"modelValue": isActive.value,
				"onUpdate:modelValue": ($event) => isActive.value = $event,
				"absolute": true,
				"activatorProps": activatorProps.value,
				"location": props.location ?? (props.submenu ? "end" : "bottom"),
				"onClick:outside": onClickOutside,
				"onKeydown": onKeydown
			}, scopeId), {
				activator: slots.activator,
				default: (...args) => createVNode(VDefaultsProvider, { "root": "VMenu" }, { default: () => [slots.default?.(...args)] })
			});
		});
		return forwardRefs({
			id,
			ΨopenChildren: openChildren
		}, overlay);
	}
});

export { VMenu as V, VAvatar as a, VImg as b, createSimpleFunctional as c };;globalThis.__timing__.logEnd('Load chunks/build/VMenu-5yZPJeqd');
//# sourceMappingURL=VMenu-5yZPJeqd.mjs.map
