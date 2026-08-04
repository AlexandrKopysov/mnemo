globalThis.__timing__.logStart('Load chunks/build/mnemo-input-Bj3NAqAD');import { _ as _plugin_vue_export_helper_default, g as genericComponent, a as useProxiedModel, p as propsFactory, o as omit, f as filterInputAttrs, d as callEvent } from '../virtual/entry.mjs';
import { u as useRender } from './VBtn-BK5zdqJr.mjs';
import { I as Intersect, f as forwardRefs } from './forwardRefs-BQag-fAc.mjs';
import { u as useFocus, a as useAutocomplete, m as makeVFieldProps, e as makeVInputProps, f as makeAutocompleteProps, V as VInput, b as VField, c as VCounter, d as useAutofocus } from './autofocus-iHZUSa1f.mjs';
import { defineComponent, useModel, mergeProps, mergeModels, computed, ref, createVNode, createElementVNode, Fragment, withDirectives, normalizeClass, cloneVNode, useSSRContext, nextTick } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

//#region node_modules/vuetify/lib/components/VTextField/VTextField.js
var activeTypes = [
	"color",
	"file",
	"time",
	"date",
	"datetime-local",
	"week",
	"month"
];
var makeVTextFieldProps = propsFactory({
	autofocus: Boolean,
	counter: [
		Boolean,
		Number,
		String
	],
	counterValue: [Number, Function],
	prefix: String,
	placeholder: String,
	persistentPlaceholder: Boolean,
	persistentCounter: Boolean,
	suffix: String,
	role: String,
	type: {
		type: String,
		default: "text"
	},
	modelModifiers: Object,
	...makeAutocompleteProps(),
	...omit(makeVInputProps(), ["direction"]),
	...makeVFieldProps()
}, "VTextField");
var VTextField = genericComponent()({
	name: "VTextField",
	directives: { vIntersect: Intersect },
	inheritAttrs: false,
	props: makeVTextFieldProps(),
	emits: {
		"click:control": (e) => true,
		"mousedown:control": (e) => true,
		"update:focused": (focused) => true,
		"update:modelValue": (val) => true
	},
	setup(props, { attrs, emit, slots }) {
		const model = useProxiedModel(props, "modelValue", void 0, (v) => {
			if (Object.is(v, -0)) return "-0";
			return v;
		});
		const { isFocused, focus, blur } = useFocus(props);
		const { onIntersect } = useAutofocus(props);
		const counterValue = computed(() => {
			return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : (model.value ?? "").toString().length;
		});
		const max = computed(() => {
			if (attrs.maxlength) return attrs.maxlength;
			if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
			return props.counter;
		});
		const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
		const vInputRef = ref();
		const vFieldRef = ref();
		const inputRef = ref();
		const autocomplete = useAutocomplete(props);
		const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
		function onFocus() {
			if (autocomplete.isSuppressing.value) autocomplete.update();
			if (!isFocused.value) focus();
			nextTick(() => {
				if (inputRef.value !== (void 0).activeElement) inputRef.value?.focus();
			});
		}
		function onControlMousedown(e) {
			emit("mousedown:control", e);
			if (e.target === inputRef.value) return;
			onFocus();
			e.preventDefault();
		}
		function onControlClick(e) {
			emit("click:control", e);
		}
		function onClear(e, reset) {
			e.stopPropagation();
			onFocus();
			nextTick(() => {
				reset();
				callEvent(props["onClick:clear"], e);
			});
		}
		function onInput(e) {
			const el = e.target;
			if (!(props.modelModifiers?.trim && [
				"text",
				"search",
				"password",
				"tel",
				"url"
			].includes(props.type))) {
				model.value = el.value;
				return;
			}
			const value = el.value;
			const start = el.selectionStart;
			const end = el.selectionEnd;
			model.value = value;
			nextTick(() => {
				let offset = 0;
				if (value.trimStart().length === el.value.length) offset = value.length - el.value.length;
				if (start != null) el.selectionStart = start - offset;
				if (end != null) el.selectionEnd = end - offset;
			});
		}
		useRender(() => {
			const hasCounter = !!(slots.counter || props.counter !== false && props.counter != null);
			const hasDetails = !!(hasCounter || slots.details);
			const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
			const { modelValue: _, ...inputProps } = VInput.filterProps(props);
			const fieldProps = VField.filterProps(props);
			return createVNode(VInput, mergeProps({
				"ref": vInputRef,
				"modelValue": model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				"class": [
					"v-text-field",
					{
						"v-text-field--prefixed": props.prefix,
						"v-text-field--suffixed": props.suffix,
						"v-input--plain-underlined": isPlainOrUnderlined.value
					},
					props.class
				],
				"style": props.style
			}, rootAttrs, inputProps, {
				"centerAffix": !isPlainOrUnderlined.value,
				"focused": isFocused.value,
				"indentDetails": props.indentDetails ?? !isPlainOrUnderlined.value
			}), {
				...slots,
				default: ({ id, isDisabled, isDirty, isReadonly, isValid, hasDetails, reset }) => createVNode(VField, mergeProps({
					"ref": vFieldRef,
					"onMousedown": onControlMousedown,
					"onClick": onControlClick,
					"onClick:clear": (e) => onClear(e, reset),
					"role": props.role
				}, omit(fieldProps, ["onClick:clear"]), {
					"id": id.value,
					"labelId": `${id.value}-label`,
					"active": isActive.value || isDirty.value,
					"dirty": isDirty.value || props.dirty,
					"disabled": isDisabled.value,
					"focused": isFocused.value,
					"details": hasDetails.value,
					"error": isValid.value === false
				}), {
					...slots,
					default: ({ props: { class: fieldClass, ...slotProps }, controlRef }) => {
						const inputNode = createElementVNode("input", mergeProps({
							"ref": (val) => inputRef.value = controlRef.value = val,
							"value": model.value,
							"onInput": onInput,
							"autofocus": props.autofocus,
							"readonly": isReadonly.value,
							"disabled": isDisabled.value,
							"name": autocomplete.fieldName.value,
							"autocomplete": autocomplete.fieldAutocomplete.value,
							"placeholder": props.placeholder,
							"size": 1,
							"role": props.role,
							"type": props.type,
							"onFocus": focus,
							"onBlur": blur,
							"aria-labelledby": `${id.value}-label`
						}, slotProps, inputAttrs), null);
						return createElementVNode(Fragment, null, [
							props.prefix && createElementVNode("span", { "class": "v-text-field__prefix" }, [createElementVNode("span", { "class": "v-text-field__prefix__text" }, [props.prefix])]),
							withDirectives(slots.default ? createElementVNode("div", {
								"class": normalizeClass(fieldClass),
								"data-no-activator": ""
							}, [slots.default({ id }), inputNode]) : cloneVNode(inputNode, { class: fieldClass }), [[
								Intersect,
								onIntersect,
								null,
								{ once: true }
							]]),
							props.suffix && createElementVNode("span", { "class": "v-text-field__suffix" }, [createElementVNode("span", { "class": "v-text-field__suffix__text" }, [props.suffix])])
						]);
					}
				}),
				details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
					"active": props.persistentCounter || isFocused.value,
					"value": counterValue.value,
					"max": max.value,
					"disabled": props.disabled
				}, slots.counter)])]) : void 0
			});
		});
		return forwardRefs({}, vInputRef, vFieldRef, inputRef);
	}
});
//#endregion
//#region app/components/ui/mnemo-input.vue?vue&type=script&setup=true&lang.ts
var mnemo_input_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-input",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		prependIcon: { default: "" },
		prependInnerIcon: {},
		appendInnerIcon: {},
		label: { default: "" },
		placeholder: { default: "" },
		disabled: { type: Boolean },
		error: {
			type: Boolean,
			default: false
		},
		type: { default: "text" },
		hideDetails: {
			type: Boolean,
			default: true
		},
		rules: { default: () => [] },
		maxWidth: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["click:append-inner"], ["update:modelValue"]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const model = useModel(__props, "modelValue");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VTextField, mergeProps({
				modelValue: model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				label: __props.label,
				placeholder: __props.placeholder,
				disabled: __props.disabled,
				error: __props.error,
				type: __props.type,
				"prepend-inner-icon": __props.prependInnerIcon,
				"append-inner-icon": __props.appendInnerIcon,
				rules: __props.rules,
				variant: "outlined",
				density: "compact",
				"hide-details": __props.hideDetails,
				class: "mnemo-input",
				"max-width": __props.maxWidth,
				"onClick:appendInner": ($event) => emit("click:append-inner")
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/components/ui/mnemo-input.vue
var _sfc_setup = mnemo_input_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_input_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/mnemo-input.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var mnemo_input_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(mnemo_input_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1084dbd2"]]), { __name: "UiMnemoInput" });

export { mnemo_input_default as m };;globalThis.__timing__.logEnd('Load chunks/build/mnemo-input-Bj3NAqAD');
//# sourceMappingURL=mnemo-input-Bj3NAqAD.mjs.map
