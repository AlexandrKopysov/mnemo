globalThis.__timing__.logStart('Load chunks/build/deck-form-DfU9lgKg');import { n as navigateTo } from '../virtual/entry.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { m as mnemo_form_default } from './mnemo-form-N_yqkAmm.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { m as mnemo_input_default } from './mnemo-input-Bj3NAqAD.mjs';
import { c as createDeck, u as updateDeck } from './api-CGYnhVmc.mjs';
import { defineComponent, ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/decks/deck-form.vue?vue&type=script&setup=true&lang.ts
var deck_form_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "deck-form",
	__ssrInlineRender: true,
	props: {
		mode: { default: "create" },
		deckId: {}
	},
	setup(__props) {
		const props = __props;
		useBreadcrumbs();
		const form = ref({
			title: "",
			description: ""
		});
		const buttonName = computed(() => props.mode === "create" ? "Создать" : "Сохранить");
		const onSave = async () => {
			if (props.mode === "create") await createDeck(form.value);
			else await updateDeck(props.deckId, form.value);
			onLeave();
		};
		const onLeave = () => {
			return navigateTo("/");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(mnemo_form_default, _attrs, {
				"toolbar-left": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(mnemo_button_default, {
							onClick: onSave,
							width: "150"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(buttonName))}`);
								else return [createTextVNode(toDisplayString(unref(buttonName)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(mnemo_button_default, {
							onClick: onLeave,
							width: "150",
							variant: "secondary",
							class: "ml-2"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Закрыть `);
								else return [createTextVNode(" Закрыть ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(mnemo_button_default, {
						onClick: onSave,
						width: "150"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(buttonName)), 1)]),
						_: 1
					}), createVNode(mnemo_button_default, {
						onClick: onLeave,
						width: "150",
						variant: "secondary",
						class: "ml-2"
					}, {
						default: withCtx(() => [createTextVNode(" Закрыть ")]),
						_: 1
					})];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col gap-4 w-1/2"${_scopeId}>`);
						_push(ssrRenderComponent(mnemo_input_default, {
							modelValue: unref(form).title,
							"onUpdate:modelValue": ($event) => unref(form).title = $event,
							label: "Название колоды",
							placeholder: "Введите название колоды"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(mnemo_input_default, {
							modelValue: unref(form).description,
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							label: "Описание колоды",
							placeholder: "Введите описание колоды"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col gap-4 w-1/2" }, [createVNode(mnemo_input_default, {
						modelValue: unref(form).title,
						"onUpdate:modelValue": ($event) => unref(form).title = $event,
						label: "Название колоды",
						placeholder: "Введите название колоды"
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(mnemo_input_default, {
						modelValue: unref(form).description,
						"onUpdate:modelValue": ($event) => unref(form).description = $event,
						label: "Описание колоды",
						placeholder: "Введите описание колоды"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/decks/deck-form.vue
var _sfc_setup = deck_form_vue_vue_type_script_setup_true_lang_default.setup;
deck_form_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-form.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var deck_form_default = Object.assign(deck_form_vue_vue_type_script_setup_true_lang_default, { __name: "DecksDeckForm" });

export { deck_form_default as d };;globalThis.__timing__.logEnd('Load chunks/build/deck-form-DfU9lgKg');
//# sourceMappingURL=deck-form-DfU9lgKg.mjs.map
