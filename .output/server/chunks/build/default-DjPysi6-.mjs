globalThis.__timing__.logStart('Load chunks/build/default-DjPysi6-');import { _ as _plugin_vue_export_helper_default, ab as NuxtLink, a9 as useAuth, g as genericComponent, l as provideTheme, c as convertToUnit, n as navigateTo, z as provideDefaults, p as propsFactory, I as IconValue, x as makeThemeProps } from '../virtual/entry.mjs';
import { a as VIcon, V as VBtn, R as Ripple, o as useBorder, p as useVariant, c as useDensity, d as useDimension, G as useElevation, e as useLoader, z as useLocation, K as usePosition, f as useRounded, H as useLink, u as useRender, i as VDefaultsProvider, L as LoaderSlot, r as genOverlays, A as makeVariantProps, B as makeTagProps, J as makeRouterProps, m as makeRoundedProps, M as makePositionProps, E as makeLocationProps, j as makeLoaderProps, I as makeElevationProps, l as makeDimensionProps, n as makeDensityProps, k as makeComponentProps, D as makeBorderProps } from './VBtn-BK5zdqJr.mjs';
import { b as VImg, V as VMenu, a as VAvatar, c as createSimpleFunctional } from './VMenu-5yZPJeqd.mjs';
import { V as VContainer, a as VRow } from './VRow-TYrOIe6i.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, shallowRef, watch, withDirectives, createElementVNode, normalizeStyle, normalizeClass, Fragment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import '@prisma/adapter-pg';
import '@prisma/client';
import 'next-auth/core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@vue/shared';
import 'requrl';
import 'pinia';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import './forwardRefs-BQag-fAc.mjs';

//#region app/assets/images/logo_2.svg
var logo_2_default = "" + __buildAssetsURL("logo_2.BdSN1lyV.svg");
//#endregion
//#region node_modules/vuetify/lib/components/VCard/VCardActions.js
var makeVCardActionsProps = propsFactory({
	...makeComponentProps(),
	...makeTagProps()
}, "VCardActions");
var VCardActions = genericComponent()({
	name: "VCardActions",
	props: makeVCardActionsProps(),
	setup(props, { slots }) {
		provideDefaults({ VBtn: {
			slim: true,
			variant: "text"
		} });
		useRender(() => createVNode(props.tag, {
			"class": normalizeClass(["v-card-actions", props.class]),
			"style": normalizeStyle(props.style)
		}, slots));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VCard/VCardSubtitle.js
var makeVCardSubtitleProps = propsFactory({
	opacity: [Number, String],
	...makeComponentProps(),
	...makeTagProps()
}, "VCardSubtitle");
var VCardSubtitle = genericComponent()({
	name: "VCardSubtitle",
	props: makeVCardSubtitleProps(),
	setup(props, { slots }) {
		useRender(() => createVNode(props.tag, {
			"class": normalizeClass(["v-card-subtitle", props.class]),
			"style": normalizeStyle([{ "--v-card-subtitle-opacity": props.opacity }, props.style])
		}, slots));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VCard/VCardTitle.js
var VCardTitle = createSimpleFunctional("v-card-title");
//#endregion
//#region node_modules/vuetify/lib/components/VCard/VCardItem.js
var makeCardItemProps = propsFactory({
	appendAvatar: String,
	appendIcon: IconValue,
	prependAvatar: String,
	prependIcon: IconValue,
	subtitle: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	title: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	...makeComponentProps(),
	...makeDensityProps(),
	...makeTagProps()
}, "VCardItem");
var VCardItem = genericComponent()({
	name: "VCardItem",
	props: makeCardItemProps(),
	setup(props, { slots }) {
		useRender(() => {
			const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
			const hasPrepend = !!(hasPrependMedia || slots.prepend);
			const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
			const hasAppend = !!(hasAppendMedia || slots.append);
			const hasTitle = !!(props.title != null || slots.title);
			const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
			return createVNode(props.tag, {
				"class": normalizeClass(["v-card-item", props.class]),
				"style": normalizeStyle(props.style)
			}, { default: () => [
				hasPrepend && createElementVNode("div", {
					"key": "prepend",
					"class": "v-card-item__prepend"
				}, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
					"key": "prepend-avatar",
					"density": props.density,
					"image": props.prependAvatar
				}, null), props.prependIcon && createVNode(VIcon, {
					"key": "prepend-icon",
					"density": props.density,
					"icon": props.prependIcon
				}, null)]) : createVNode(VDefaultsProvider, {
					"key": "prepend-defaults",
					"disabled": !hasPrependMedia,
					"defaults": {
						VAvatar: {
							density: props.density,
							image: props.prependAvatar
						},
						VIcon: {
							density: props.density,
							icon: props.prependIcon
						}
					}
				}, slots.prepend)]),
				createElementVNode("div", { "class": "v-card-item__content" }, [
					hasTitle && createVNode(VCardTitle, { "key": "title" }, { default: () => [slots.title?.() ?? toDisplayString(props.title)] }),
					hasSubtitle && createVNode(VCardSubtitle, { "key": "subtitle" }, { default: () => [slots.subtitle?.() ?? toDisplayString(props.subtitle)] }),
					slots.default?.()
				]),
				hasAppend && createElementVNode("div", {
					"key": "append",
					"class": "v-card-item__append"
				}, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
					"key": "append-icon",
					"density": props.density,
					"icon": props.appendIcon
				}, null), props.appendAvatar && createVNode(VAvatar, {
					"key": "append-avatar",
					"density": props.density,
					"image": props.appendAvatar
				}, null)]) : createVNode(VDefaultsProvider, {
					"key": "append-defaults",
					"disabled": !hasAppendMedia,
					"defaults": {
						VAvatar: {
							density: props.density,
							image: props.appendAvatar
						},
						VIcon: {
							density: props.density,
							icon: props.appendIcon
						}
					}
				}, slots.append)])
			] });
		});
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VCard/VCardText.js
var makeVCardTextProps = propsFactory({
	opacity: [Number, String],
	...makeComponentProps(),
	...makeTagProps()
}, "VCardText");
var VCardText = genericComponent()({
	name: "VCardText",
	props: makeVCardTextProps(),
	setup(props, { slots }) {
		useRender(() => createVNode(props.tag, {
			"class": normalizeClass(["v-card-text", props.class]),
			"style": normalizeStyle([{ "--v-card-text-opacity": props.opacity }, props.style])
		}, slots));
		return {};
	}
});
//#endregion
//#region node_modules/vuetify/lib/components/VCard/VCard.js
var makeVCardProps = propsFactory({
	appendAvatar: String,
	appendIcon: IconValue,
	disabled: Boolean,
	flat: Boolean,
	hover: Boolean,
	image: String,
	link: {
		type: Boolean,
		default: void 0
	},
	prependAvatar: String,
	prependIcon: IconValue,
	ripple: {
		type: [Boolean, Object],
		default: true
	},
	subtitle: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	text: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	title: {
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
	...makeLoaderProps(),
	...makeLocationProps(),
	...makePositionProps(),
	...makeRoundedProps(),
	...makeRouterProps(),
	...makeTagProps(),
	...makeThemeProps(),
	...makeVariantProps({ variant: "elevated" })
}, "VCard");
var VCard = genericComponent()({
	name: "VCard",
	directives: { vRipple: Ripple },
	props: makeVCardProps(),
	setup(props, { attrs, slots }) {
		const { themeClasses } = provideTheme(props);
		const { borderClasses } = useBorder(props);
		const { colorClasses, colorStyles, variantClasses } = useVariant(props);
		const { densityClasses } = useDensity(props);
		const { dimensionStyles } = useDimension(props);
		const { elevationClasses } = useElevation(props);
		const { loaderClasses } = useLoader(props);
		const { locationStyles } = useLocation(props);
		const { positionClasses } = usePosition(props);
		const { roundedClasses } = useRounded(props);
		const link = useLink(props, attrs);
		const loadingColor = shallowRef(void 0);
		watch(() => props.loading, (val, old) => {
			loadingColor.value = !val && typeof old === "string" ? old : typeof val === "boolean" ? void 0 : val;
		}, { immediate: true });
		useRender(() => {
			const isLink = props.link !== false && link.isLink.value;
			const isClickable = !props.disabled && props.link !== false && (props.link || link.isClickable.value);
			const Tag = isLink ? "a" : props.tag;
			const hasTitle = !!(slots.title || props.title != null);
			const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
			const hasHeader = hasTitle || hasSubtitle;
			const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
			const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
			const hasImage = !!(slots.image || props.image);
			const hasCardItem = hasHeader || hasPrepend || hasAppend;
			const hasText = !!(slots.text || props.text != null);
			return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
				"class": [
					"v-card",
					{
						"v-card--disabled": props.disabled,
						"v-card--flat": props.flat,
						"v-card--hover": props.hover && !(props.disabled || props.flat),
						"v-card--link": isClickable
					},
					themeClasses.value,
					borderClasses.value,
					colorClasses.value,
					densityClasses.value,
					elevationClasses.value,
					loaderClasses.value,
					positionClasses.value,
					roundedClasses.value,
					variantClasses.value,
					props.class
				],
				"style": [
					colorStyles.value,
					dimensionStyles.value,
					locationStyles.value,
					{ "--v-card-height": convertToUnit(props.height) },
					props.style
				],
				"onClick": isClickable && link.navigate.value,
				"tabindex": props.disabled ? -1 : void 0
			}), { default: () => [
				hasImage && createElementVNode("div", {
					"key": "image",
					"class": "v-card__image"
				}, [!slots.image ? createVNode(VImg, {
					"key": "image-img",
					"cover": true,
					"src": props.image
				}, null) : createVNode(VDefaultsProvider, {
					"key": "image-defaults",
					"disabled": !props.image,
					"defaults": { VImg: {
						cover: true,
						src: props.image
					} }
				}, slots.image)]),
				createVNode(LoaderSlot, {
					"name": "v-card",
					"active": !!props.loading,
					"color": loadingColor.value
				}, { default: slots.loader }),
				hasCardItem && createVNode(VCardItem, {
					"key": "item",
					"prependAvatar": props.prependAvatar,
					"prependIcon": props.prependIcon,
					"title": props.title,
					"subtitle": props.subtitle,
					"appendAvatar": props.appendAvatar,
					"appendIcon": props.appendIcon
				}, {
					default: slots.item,
					prepend: slots.prepend,
					title: slots.title,
					subtitle: slots.subtitle,
					append: slots.append
				}),
				hasText && createVNode(VCardText, { "key": "text" }, { default: () => [slots.text?.() ?? props.text] }),
				slots.default?.(),
				slots.actions && createVNode(VCardActions, null, { default: slots.actions }),
				genOverlays(isClickable, "v-card")
			] }), [[Ripple, isClickable && props.ripple]]);
		});
		return {};
	}
});
//#endregion
//#region app/components/header/profile.vue?vue&type=script&setup=true&lang.ts
var profile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "profile",
	__ssrInlineRender: true,
	setup(__props) {
		const { data, signOut } = useAuth();
		function onExit() {
			console.log(data.value?.user);
			signOut().then(() => {
				navigateTo("/login");
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VContainer, mergeProps({ class: "p-0 m-0" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(VRow, { class: "justify-center" }, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(VMenu, { "min-width": "200px" }, {
								activator: withCtx(({ props }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(VBtn, mergeProps({ icon: "" }, props), {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(VAvatar, {
												color: "brown",
												size: "large"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(`<span class="text-headline-small"${_scopeId}>${ssrInterpolate(unref(data)?.user?.name)}</span>`);
													else return [createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)];
												}),
												_: 2
											}, _parent, _scopeId));
											else return [createVNode(VAvatar, {
												color: "brown",
												size: "large"
											}, {
												default: withCtx(() => [createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)]),
												_: 1
											})];
										}),
										_: 2
									}, _parent, _scopeId));
									else return [createVNode(VBtn, mergeProps({ icon: "" }, props), {
										default: withCtx(() => [createVNode(VAvatar, {
											color: "brown",
											size: "large"
										}, {
											default: withCtx(() => [createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)]),
											_: 1
										})]),
										_: 1
									}, 16)];
								}),
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(VCard, { class: "mt-2" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(VCardText, null, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(VBtn, {
														variant: "text",
														rounded: "",
														onClick: onExit
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(` Выйти `);
															else return [createTextVNode(" Выйти ")];
														}),
														_: 1
													}, _parent, _scopeId));
													else return [createVNode(VBtn, {
														variant: "text",
														rounded: "",
														onClick: withModifiers(onExit, ["stop"])
													}, {
														default: withCtx(() => [createTextVNode(" Выйти ")]),
														_: 1
													})];
												}),
												_: 1
											}, _parent, _scopeId));
											else return [createVNode(VCardText, null, {
												default: withCtx(() => [createVNode(VBtn, {
													variant: "text",
													rounded: "",
													onClick: withModifiers(onExit, ["stop"])
												}, {
													default: withCtx(() => [createTextVNode(" Выйти ")]),
													_: 1
												})]),
												_: 1
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									else return [createVNode(VCard, { class: "mt-2" }, {
										default: withCtx(() => [createVNode(VCardText, null, {
											default: withCtx(() => [createVNode(VBtn, {
												variant: "text",
												rounded: "",
												onClick: withModifiers(onExit, ["stop"])
											}, {
												default: withCtx(() => [createTextVNode(" Выйти ")]),
												_: 1
											})]),
											_: 1
										})]),
										_: 1
									})];
								}),
								_: 1
							}, _parent, _scopeId));
							else return [createVNode(VMenu, { "min-width": "200px" }, {
								activator: withCtx(({ props }) => [createVNode(VBtn, mergeProps({ icon: "" }, props), {
									default: withCtx(() => [createVNode(VAvatar, {
										color: "brown",
										size: "large"
									}, {
										default: withCtx(() => [createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)]),
										_: 1
									})]),
									_: 1
								}, 16)]),
								default: withCtx(() => [createVNode(VCard, { class: "mt-2" }, {
									default: withCtx(() => [createVNode(VCardText, null, {
										default: withCtx(() => [createVNode(VBtn, {
											variant: "text",
											rounded: "",
											onClick: withModifiers(onExit, ["stop"])
										}, {
											default: withCtx(() => [createTextVNode(" Выйти ")]),
											_: 1
										})]),
										_: 1
									})]),
									_: 1
								})]),
								_: 1
							})];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(VRow, { class: "justify-center" }, {
						default: withCtx(() => [createVNode(VMenu, { "min-width": "200px" }, {
							activator: withCtx(({ props }) => [createVNode(VBtn, mergeProps({ icon: "" }, props), {
								default: withCtx(() => [createVNode(VAvatar, {
									color: "brown",
									size: "large"
								}, {
									default: withCtx(() => [createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)]),
									_: 1
								})]),
								_: 1
							}, 16)]),
							default: withCtx(() => [createVNode(VCard, { class: "mt-2" }, {
								default: withCtx(() => [createVNode(VCardText, null, {
									default: withCtx(() => [createVNode(VBtn, {
										variant: "text",
										rounded: "",
										onClick: withModifiers(onExit, ["stop"])
									}, {
										default: withCtx(() => [createTextVNode(" Выйти ")]),
										_: 1
									})]),
									_: 1
								})]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/header/profile.vue
var _sfc_setup$3 = profile_vue_vue_type_script_setup_true_lang_default.setup;
profile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/profile.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var profile_default = Object.assign(profile_vue_vue_type_script_setup_true_lang_default, { __name: "HeaderProfile" });
//#endregion
//#region app/components/header/mnemo-header.vue?vue&type=script&setup=true&lang.ts
var mnemo_header_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-header",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mnemo-header" }, _attrs))} data-v-7790e712><div class="mnemo-header__container" data-v-7790e712><div class="logo" data-v-7790e712>`);
			_push(ssrRenderComponent(VImg, {
				src: logo_2_default,
				width: "30",
				height: "30"
			}, null, _parent));
			_push(`<span class="logo-text" data-v-7790e712>Mnemo</span></div><div class="flex" data-v-7790e712>`);
			_push(ssrRenderComponent(profile_default, null, null, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region app/components/header/mnemo-header.vue
var _sfc_setup$2 = mnemo_header_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_header_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/mnemo-header.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var mnemo_header_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(mnemo_header_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7790e712"]]), { __name: "HeaderMnemoHeader" });
//#endregion
//#region app/components/breadcrumbs/mnemo-breadcrumbs.vue?vue&type=script&setup=true&lang.ts
var mnemo_breadcrumbs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-breadcrumbs",
	__ssrInlineRender: true,
	setup(__props) {
		const { breadcrumbs } = useBreadcrumbs();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mnemo-breadcrumbs" }, _attrs))}>`);
			if (unref(breadcrumbs).length) {
				_push(`<nav class="mnemo-breadcrumbs__container" aria-label="Навигационная цепочка"><!--[-->`);
				ssrRenderList(unref(breadcrumbs), (item, index) => {
					_push(`<!--[-->`);
					if (item.to) _push(ssrRenderComponent(_component_NuxtLink, {
						to: item.to,
						class: "mnemo-breadcrumbs__container-link"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(item.title)}`);
							else return [createTextVNode(toDisplayString(item.title), 1)];
						}),
						_: 2
					}, _parent));
					else _push(`<span class="mnemo-breadcrumbs__container-current">${ssrInterpolate(item.title)}</span>`);
					if (index < unref(breadcrumbs).length - 1) _push(ssrRenderComponent(VIcon, {
						size: "20",
						class: "mt-1"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` mdi-chevron-right `);
							else return [createTextVNode(" mdi-chevron-right ")];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--></nav>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/breadcrumbs/mnemo-breadcrumbs.vue
var _sfc_setup$1 = mnemo_breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/breadcrumbs/mnemo-breadcrumbs.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var mnemo_breadcrumbs_default = Object.assign(mnemo_breadcrumbs_vue_vue_type_script_setup_true_lang_default, { __name: "BreadcrumbsMnemoBreadcrumbs" });
//#endregion
//#region app/layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-be11749a>`);
			_push(ssrRenderComponent(mnemo_header_default, null, null, _parent));
			_push(ssrRenderComponent(mnemo_breadcrumbs_default, { class: "mb-6" }, null, _parent));
			_push(`<main class="app-layout__main" data-v-be11749a><div class="app-layout__container" data-v-be11749a>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></main></div>`);
		};
	}
});
//#endregion
//#region app/layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = /*#__PURE__*/ _plugin_vue_export_helper_default(default_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-be11749a"]]);

export { default_default as default };;globalThis.__timing__.logEnd('Load chunks/build/default-DjPysi6-');
//# sourceMappingURL=default-DjPysi6-.mjs.map
