globalThis.__timing__.logStart('Load chunks/build/mnemo-form-N_yqkAmm');import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

//#region app/components/form/mnemo-form.vue?vue&type=script&setup=true&lang.ts
var mnemo_form_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-form",
	__ssrInlineRender: true,
	props: {
		title: {},
		useToolbar: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "mnemo-form" }, _attrs))} data-v-a5ea454c>`);
			if (props.useToolbar) {
				_push(`<header class="mnemo-form__toolbar" data-v-a5ea454c><div class="mnemo-form__toolbar-left" data-v-a5ea454c>`);
				ssrRenderSlot(_ctx.$slots, "toolbar-left", {}, null, _push, _parent);
				_push(`</div><div class="mnemo-form__toolbar-right" data-v-a5ea454c>`);
				ssrRenderSlot(_ctx.$slots, "toolbar-right", {}, null, _push, _parent);
				_push(`</div></header>`);
			} else _push(`<!---->`);
			_push(`<div class="mnemo-form__content" data-v-a5ea454c>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region app/components/form/mnemo-form.vue
var _sfc_setup = mnemo_form_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_form_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-form.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var mnemo_form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(mnemo_form_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a5ea454c"]]), { __name: "FormMnemoForm" });

export { mnemo_form_default as m };;globalThis.__timing__.logEnd('Load chunks/build/mnemo-form-N_yqkAmm');
//# sourceMappingURL=mnemo-form-N_yqkAmm.mjs.map
