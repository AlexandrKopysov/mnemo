globalThis.__timing__.logStart('Load chunks/build/mnemo-button-DgV1Ml-V');import { V as VBtn } from './VBtn-BK5zdqJr.mjs';
import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, computed, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

//#region app/types/ui/button.ts
var BUTTON_VARIANT = {
	PRIMARY: "primary",
	SECONDARY: "secondary",
	OUTLINE: "outline",
	DANGER: "danger",
	DARK: "dark",
	SUCCESS: "success"
};
//#endregion
//#region app/components/ui/mnemo-button.vue?vue&type=script&setup=true&lang.ts
var mnemo_button_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-button",
	__ssrInlineRender: true,
	props: {
		width: { default: "" },
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		prependIcon: { default: "" },
		size: { default: "large" },
		nativeType: { default: {
			BUTTON: "button"}.BUTTON },
		variant: { default: BUTTON_VARIANT.PRIMARY },
		block: {
			type: Boolean,
			default: false
		}
	},
	emits: ["click"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		function handleClick() {
			emit("click");
		}
		const variantConfig = computed(() => {
			switch (props.variant) {
				case BUTTON_VARIANT.DANGER: return {
					vuetifyVariant: "flat",
					color: "mnemo-danger",
					className: "mnemo-btn--danger"
				};
				case BUTTON_VARIANT.DARK: return {
					vuetifyVariant: "flat",
					color: "mnemo-dark",
					className: "mnemo-btn--dark"
				};
				case BUTTON_VARIANT.OUTLINE: return {
					vuetifyVariant: "outlined",
					color: "mnemo-outline",
					className: "mnemo-btn--outline"
				};
				case BUTTON_VARIANT.SECONDARY: return {
					vuetifyVariant: "flat",
					color: "mnemo-secondary",
					className: "mnemo-btn--secondary"
				};
				case BUTTON_VARIANT.SUCCESS: return {
					vuetifyVariant: "flat",
					color: "mnemo-success",
					className: "mnemo-btn--success"
				};
				case BUTTON_VARIANT.PRIMARY:
				default: return {
					vuetifyVariant: "flat",
					color: "mnemo-primary",
					className: "mnemo-btn--primary"
				};
			}
		});
		const buttonClass = computed(() => [
			"mnemo-btn",
			variantConfig.value.className,
			{ "mnemo-btn--block": props.block }
		]);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VBtn, mergeProps({
				width: __props.width,
				type: __props.nativeType,
				loading: __props.loading,
				disabled: __props.disabled,
				"prepend-icon": __props.prependIcon || void 0,
				size: __props.size,
				variant: variantConfig.value.vuetifyVariant,
				color: variantConfig.value.color,
				class: buttonClass.value,
				onClick: handleClick
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, void 0, true)];
				}),
				_: 3
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/ui/mnemo-button.vue
var _sfc_setup = mnemo_button_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_button_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/mnemo-button.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var mnemo_button_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(mnemo_button_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-4c3eb3a7"]]), { __name: "UiMnemoButton" });

export { mnemo_button_default as m };;globalThis.__timing__.logEnd('Load chunks/build/mnemo-button-DgV1Ml-V');
//# sourceMappingURL=mnemo-button-DgV1Ml-V.mjs.map
