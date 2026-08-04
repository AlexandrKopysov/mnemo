globalThis.__timing__.logStart('Load chunks/build/learn-YfZtXf6V');import { _ as _plugin_vue_export_helper_default, u as useRoute } from '../virtual/entry.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { m as mnemo_form_default } from './mnemo-form-N_yqkAmm.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { m as mnemo_textarea_default } from './mnemo-textarea-Dr5RyYwn.mjs';
import { r as reviewCard } from './api-D9ph_P1-.mjs';
import { defineComponent, computed, ref, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import './VBtn-BK5zdqJr.mjs';
import './forwardRefs-BQag-fAc.mjs';
import './autofocus-iHZUSa1f.mjs';

//#region app/pages/decks/[deckId]/cards/[cardId]/learn.vue?vue&type=script&setup=true&lang.ts
var learn_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "learn",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const deckId = computed(() => String(route.params.deckId));
		const cardId = computed(() => String(route.params.cardId));
		useBreadcrumbs();
		const card = ref({
			front: "",
			back: "",
			deckId: ""
		});
		const variant = ref("front");
		async function onAnswer(answer) {
			await reviewCard(deckId.value, cardId.value, answer);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(mnemo_form_default, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="${ssrRenderClass([{ "learn-card--front": unref(variant) === "front" }, "learn-card"])}" data-v-8ec901c1${_scopeId}>`);
						if (unref(variant) === "front") {
							_push(`<!--[--><h2 class="learn-card__title" data-v-8ec901c1${_scopeId}>${ssrInterpolate(unref(card).front)}</h2>`);
							_push(ssrRenderComponent(mnemo_button_default, {
								width: "180",
								onClick: ($event) => variant.value = "back"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Показать ответ `);
									else return [createTextVNode(" Показать ответ ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`<!--]-->`);
						} else {
							_push(`<!--[--><h2 class="learn-card__title" data-v-8ec901c1${_scopeId}>${ssrInterpolate(unref(card).front)}</h2><div class="learn-card__answer" data-v-8ec901c1${_scopeId}>`);
							_push(ssrRenderComponent(mnemo_textarea_default, {
								modelValue: unref(card).back,
								"onUpdate:modelValue": ($event) => unref(card).back = $event,
								"full-height": ""
							}, null, _parent, _scopeId));
							_push(`</div><div class="learn-card__actions" data-v-8ec901c1${_scopeId}>`);
							_push(ssrRenderComponent(mnemo_button_default, {
								width: "110",
								variant: "danger",
								onClick: ($event) => onAnswer(("Answer" in _ctx ? _ctx.Answer : unref(__unimport_Answer)).HARD)
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Не вспомнил `);
									else return [createTextVNode(" Не вспомнил ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(mnemo_button_default, {
								width: "110",
								variant: "dark",
								onClick: ($event) => onAnswer(("Answer" in _ctx ? _ctx.Answer : unref(__unimport_Answer)).NORMAL)
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Нормально `);
									else return [createTextVNode(" Нормально ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(mnemo_button_default, {
								width: "110",
								variant: "success",
								onClick: ($event) => onAnswer(("Answer" in _ctx ? _ctx.Answer : unref(__unimport_Answer)).EASY)
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Легко `);
									else return [createTextVNode(" Легко ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><!--]-->`);
						}
						_push(`</div>`);
					} else return [createVNode("div", { class: ["learn-card", { "learn-card--front": unref(variant) === "front" }] }, [unref(variant) === "front" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("h2", { class: "learn-card__title" }, toDisplayString(unref(card).front), 1), createVNode(mnemo_button_default, {
						width: "180",
						onClick: ($event) => variant.value = "back"
					}, {
						default: withCtx(() => [createTextVNode(" Показать ответ ")]),
						_: 1
					}, 8, ["onClick"])], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
						createVNode("h2", { class: "learn-card__title" }, toDisplayString(unref(card).front), 1),
						createVNode("div", { class: "learn-card__answer" }, [createVNode(mnemo_textarea_default, {
							modelValue: unref(card).back,
							"onUpdate:modelValue": ($event) => unref(card).back = $event,
							"full-height": ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "learn-card__actions" }, [
							createVNode(mnemo_button_default, {
								width: "110",
								variant: "danger",
								onClick: ($event) => onAnswer(("Answer" in _ctx ? _ctx.Answer : unref(__unimport_Answer)).HARD)
							}, {
								default: withCtx(() => [createTextVNode(" Не вспомнил ")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(mnemo_button_default, {
								width: "110",
								variant: "dark",
								onClick: ($event) => onAnswer(("Answer" in _ctx ? _ctx.Answer : unref(__unimport_Answer)).NORMAL)
							}, {
								default: withCtx(() => [createTextVNode(" Нормально ")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode(mnemo_button_default, {
								width: "110",
								variant: "success",
								onClick: ($event) => onAnswer(("Answer" in _ctx ? _ctx.Answer : unref(__unimport_Answer)).EASY)
							}, {
								default: withCtx(() => [createTextVNode(" Легко ")]),
								_: 1
							}, 8, ["onClick"])
						])
					], 64))], 2)];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/decks/[deckId]/cards/[cardId]/learn.vue
var _sfc_setup = learn_vue_vue_type_script_setup_true_lang_default.setup;
learn_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/cards/[cardId]/learn.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var learn_default = /*#__PURE__*/ _plugin_vue_export_helper_default(learn_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8ec901c1"]]);

export { learn_default as default };;globalThis.__timing__.logEnd('Load chunks/build/learn-YfZtXf6V');
//# sourceMappingURL=learn-YfZtXf6V.mjs.map
