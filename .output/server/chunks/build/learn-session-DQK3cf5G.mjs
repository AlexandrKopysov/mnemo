globalThis.__timing__.logStart('Load chunks/build/learn-session-DQK3cf5G');import { h as __exportAll, _ as _plugin_vue_export_helper_default, i as __reExport, j as useNuxtApp } from '../virtual/entry.mjs';
import { a as VIcon, b as VProgressLinear } from './VBtn-BK5zdqJr.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { m as mnemo_form_default } from './mnemo-form-N_yqkAmm.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { u as useMnemoSessionStore } from './mnemo-repeat-store-gNqU4H3-.mjs';
import { defineComponent, mergeProps, unref, ref, withCtx, createTextVNode, computed, createVNode, toDisplayString, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { A as Answer } from '../_/nitro.mjs';
import * as import_pinia from 'pinia';
import 'node:http';
import 'node:https';
import 'vue-router';
import '@vue/shared';
import 'requrl';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import '@prisma/adapter-pg';
import '@prisma/client';
import 'next-auth/core';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';

//#region node_modules/.pnpm/@pinia+nuxt@0.11.3_magic-st_0a78eaca2ce3841781509b8f6f8cf166/node_modules/@pinia/nuxt/dist/runtime/composables.js
var composables_exports = /* @__PURE__ */ __exportAll({ usePinia: () => usePinia });
__reExport(composables_exports, import_pinia);
var usePinia = () => useNuxtApp().$pinia;
//#endregion
//#region app/components/ui/mnemo-progress.vue?vue&type=script&setup=true&lang.ts
var mnemo_progress_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-progress",
	__ssrInlineRender: true,
	props: { value: {} },
	setup(__props) {
		const props = __props;
		const progressValue = computed(() => props.value);
		watch(() => props.value, (value) => {
			console.log(value);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VProgressLinear, mergeProps({
				"model-value": unref(progressValue),
				height: 10,
				color: "#5fa391"
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/components/ui/mnemo-progress.vue
var _sfc_setup$4 = mnemo_progress_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_progress_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/mnemo-progress.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var mnemo_progress_default = Object.assign(mnemo_progress_vue_vue_type_script_setup_true_lang_default, { __name: "UiMnemoProgress" });
//#endregion
//#region app/components/form/mnemo-form-learn/back.vue?vue&type=script&setup=true&lang.ts
var back_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "back",
	__ssrInlineRender: true,
	props: {
		front: {},
		title: {},
		back: {},
		completedCount: {},
		totalCards: {},
		progressPercent: {}
	},
	emits: ["click"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const totalProgress = computed(() => `${props?.completedCount + 1} из ${props.totalCards}`);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(mnemo_form_default, mergeProps({
				class: "learn-form",
				"use-toolbar": false
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="toolbar" data-v-d484699f${_scopeId}><div class="arrow-back" data-v-d484699f${_scopeId}>`);
						_push(ssrRenderComponent(VIcon, {
							size: "24",
							class: "mr-1"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` mdi-arrow-left `);
								else return [createTextVNode(" mdi-arrow-left ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<span class="text" data-v-d484699f${_scopeId}>Выйти</span></div><span class="title" data-v-d484699f${_scopeId}>${ssrInterpolate(__props.title)}</span><span class="propgress" data-v-d484699f${_scopeId}>${ssrInterpolate(unref(totalProgress))}</span></div>`);
						_push(ssrRenderComponent(mnemo_progress_default, {
							class: "mt-4",
							value: __props.progressPercent
						}, null, _parent, _scopeId));
						_push(`<div class="body" data-v-d484699f${_scopeId}><div class="front" data-v-d484699f${_scopeId}><span data-v-d484699f${_scopeId}>${ssrInterpolate(__props.front)}</span></div><div data-v-d484699f${_scopeId}><p data-v-d484699f${_scopeId}>${ssrInterpolate(__props.back)}</p></div></div><div class="button-toolbar" data-v-d484699f${_scopeId}>`);
						_push(ssrRenderComponent(mnemo_button_default, {
							variant: "danger",
							width: "120",
							onClick: ($event) => emit("click", unref(Answer).HARD)
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Повторить`);
								else return [createTextVNode("Повторить")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(mnemo_button_default, {
							variant: "dark",
							width: "120",
							onClick: ($event) => emit("click", unref(Answer).NORMAL)
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Трудно`);
								else return [createTextVNode("Трудно")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(mnemo_button_default, {
							variant: "primary",
							width: "120",
							onClick: ($event) => emit("click", unref(Answer).EASY)
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Легко`);
								else return [createTextVNode("Легко")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode("div", { class: "toolbar" }, [
							createVNode("div", { class: "arrow-back" }, [createVNode(VIcon, {
								size: "24",
								class: "mr-1"
							}, {
								default: withCtx(() => [createTextVNode(" mdi-arrow-left ")]),
								_: 1
							}), createVNode("span", { class: "text" }, "Выйти")]),
							createVNode("span", { class: "title" }, toDisplayString(__props.title), 1),
							createVNode("span", { class: "propgress" }, toDisplayString(unref(totalProgress)), 1)
						]),
						createVNode(mnemo_progress_default, {
							class: "mt-4",
							value: __props.progressPercent
						}, null, 8, ["value"]),
						createVNode("div", { class: "body" }, [createVNode("div", { class: "front" }, [createVNode("span", null, toDisplayString(__props.front), 1)]), createVNode("div", null, [createVNode("p", null, toDisplayString(__props.back), 1)])]),
						createVNode("div", { class: "button-toolbar" }, [
							createVNode(mnemo_button_default, {
								variant: "danger",
								width: "120",
								onClick: ($event) => emit("click", unref(Answer).HARD)
							}, {
								default: withCtx(() => [createTextVNode("Повторить")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(mnemo_button_default, {
								variant: "dark",
								width: "120",
								onClick: ($event) => emit("click", unref(Answer).NORMAL)
							}, {
								default: withCtx(() => [createTextVNode("Трудно")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(mnemo_button_default, {
								variant: "primary",
								width: "120",
								onClick: ($event) => emit("click", unref(Answer).EASY)
							}, {
								default: withCtx(() => [createTextVNode("Легко")]),
								_: 1
							}, 8, ["onClick"])
						])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/form/mnemo-form-learn/back.vue
var _sfc_setup$3 = back_vue_vue_type_script_setup_true_lang_default.setup;
back_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-form-learn/back.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var back_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(back_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d484699f"]]), { __name: "FormMnemoFormLearnBack" });
//#endregion
//#region app/components/form/mnemo-form-learn/front.vue?vue&type=script&setup=true&lang.ts
var front_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "front",
	__ssrInlineRender: true,
	props: { front: {} },
	emits: ["click"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-48bdcc8c><div class="review-card" data-v-48bdcc8c><div class="review-card__accent" data-v-48bdcc8c></div><div class="review-card__content" data-v-48bdcc8c><div class="review-card__label" data-v-48bdcc8c>`);
			_push(ssrRenderComponent(VIcon, { size: "24" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` mdi-help-circle-outline `);
					else return [createTextVNode(" mdi-help-circle-outline ")];
				}),
				_: 1
			}, _parent));
			_push(` Вопрос </div><h2 class="review-card__question" data-v-48bdcc8c>${ssrInterpolate(__props.front)}</h2></div><div class="review-card__hint" data-v-48bdcc8c> Вспомните ответ, затем откройте обратную сторону </div></div></div>`);
		};
	}
});
//#endregion
//#region app/components/form/mnemo-form-learn/front.vue
var _sfc_setup$2 = front_vue_vue_type_script_setup_true_lang_default.setup;
front_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-form-learn/front.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var front_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(front_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-48bdcc8c"]]), { __name: "FormMnemoFormLearnFront" });
//#endregion
//#region app/components/form/mnemo-form-learn/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default$1 = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	props: {
		front: { default: "" },
		title: { default: "" },
		back: { default: "" },
		completedCount: { default: 0 },
		totalCards: { default: 0 },
		progressPercent: { default: 0 }
	},
	emits: ["click"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const inverted = ref(false);
		const onClick = (variant) => {
			emit("click", variant);
			inverted.value = !inverted.value;
		};
		return (_ctx, _push, _parent, _attrs) => {
			if (!unref(inverted)) _push(ssrRenderComponent(front_default, mergeProps({
				front: __props.front,
				onClick: () => inverted.value = !unref(inverted)
			}, _attrs), null, _parent));
			else _push(ssrRenderComponent(back_default, mergeProps({
				front: __props.front,
				back: __props.back,
				title: __props.title,
				"total-cards": __props.totalCards,
				"completed-count": __props.completedCount,
				"progress-percent": __props.progressPercent,
				onClick
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/components/form/mnemo-form-learn/index.vue
var _sfc_setup$1 = index_vue_vue_type_script_setup_true_lang_default$1.setup;
index_vue_vue_type_script_setup_true_lang_default$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-form-learn/index.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var mnemo_form_learn_default = Object.assign(index_vue_vue_type_script_setup_true_lang_default$1, { __name: "FormMnemoFormLearn" });
//#endregion
//#region app/pages/learn-session/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const mnemoSessionStore = useMnemoSessionStore();
		const { startSession, resetSession, completeCurrentCard } = mnemoSessionStore;
		const { currentCard, completedCount, totalCards, progressPercent } = (0, composables_exports.storeToRefs)(mnemoSessionStore);
		useBreadcrumbs();
		const onClick = (variant) => {
			completeCurrentCard(variant);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(mnemo_form_learn_default, mergeProps({
				title: unref(currentCard)?.deckTitle,
				front: unref(currentCard)?.front,
				back: unref(currentCard)?.back,
				"completed-count": unref(completedCount),
				"total-cards": unref(totalCards),
				"progress-percent": unref(progressPercent),
				onClick
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/pages/learn-session/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/learn-session/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var learn_session_default = index_vue_vue_type_script_setup_true_lang_default;

export { learn_session_default as default };;globalThis.__timing__.logEnd('Load chunks/build/learn-session-DQK3cf5G');
//# sourceMappingURL=learn-session-DQK3cf5G.mjs.map
