globalThis.__timing__.logStart('Load chunks/build/card-form-BjOTyY97');import { _ as _plugin_vue_export_helper_default, n as navigateTo } from '../virtual/entry.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { m as mnemo_form_default } from './mnemo-form-N_yqkAmm.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { m as mnemo_input_default } from './mnemo-input-Bj3NAqAD.mjs';
import { m as mnemo_textarea_default } from './mnemo-textarea-Dr5RyYwn.mjs';
import { c as createCard, u as updateCard } from './api-D9ph_P1-.mjs';
import { defineComponent, ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/card/card-form.vue?vue&type=script&setup=true&lang.ts
var card_form_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "card-form",
	__ssrInlineRender: true,
	props: {
		mode: { default: "create" },
		cardId: {},
		deckId: {}
	},
	setup(__props) {
		useBreadcrumbs();
		const props = __props;
		const form = ref({
			front: "",
			back: "",
			deckId: props.deckId
		});
		const buttonName = computed(() => props.mode === "create" ? "Создать" : "Сохранить");
		const onSave = async () => {
			try {
				if (props.mode === "create") await createCard(form.value);
				else {
					if (!props.cardId) return;
					await updateCard(props.deckId, props.cardId, form.value);
				}
				navigateTo({
					name: "decks-deckId-cards",
					params: { deckId: props.deckId }
				});
			} catch (error) {
				console.error(error);
			}
		};
		const onLeave = () => {
			return navigateTo({
				name: "decks-deckId-cards",
				params: { deckId: props.deckId }
			});
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
						_push(`<div class="card-form-content" data-v-6f4c575a${_scopeId}><div class="flex flex-col gap-4 w-1/2" data-v-6f4c575a${_scopeId}>`);
						_push(ssrRenderComponent(mnemo_input_default, {
							modelValue: unref(form).front,
							"onUpdate:modelValue": ($event) => unref(form).front = $event,
							label: "Название карточки",
							placeholder: "Введите название карточки"
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-4 card-back-field" data-v-6f4c575a${_scopeId}>`);
						_push(ssrRenderComponent(mnemo_textarea_default, {
							modelValue: unref(form).back,
							"onUpdate:modelValue": ($event) => unref(form).back = $event,
							label: "Описание карточки",
							placeholder: "Введите описание карточки",
							"full-height": ""
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "card-form-content" }, [createVNode("div", { class: "flex flex-col gap-4 w-1/2" }, [createVNode(mnemo_input_default, {
						modelValue: unref(form).front,
						"onUpdate:modelValue": ($event) => unref(form).front = $event,
						label: "Название карточки",
						placeholder: "Введите название карточки"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", { class: "mt-4 card-back-field" }, [createVNode(mnemo_textarea_default, {
						modelValue: unref(form).back,
						"onUpdate:modelValue": ($event) => unref(form).back = $event,
						label: "Описание карточки",
						placeholder: "Введите описание карточки",
						"full-height": ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"])])])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/card/card-form.vue
var _sfc_setup = card_form_vue_vue_type_script_setup_true_lang_default.setup;
card_form_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/card-form.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var card_form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(card_form_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-6f4c575a"]]), { __name: "CardForm" });

export { card_form_default as c };;globalThis.__timing__.logEnd('Load chunks/build/card-form-BjOTyY97');
//# sourceMappingURL=card-form-BjOTyY97.mjs.map
