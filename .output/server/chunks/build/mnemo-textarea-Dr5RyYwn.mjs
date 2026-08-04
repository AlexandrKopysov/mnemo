globalThis.__timing__.logStart('Load chunks/build/mnemo-textarea-Dr5RyYwn');import { _ as _plugin_vue_export_helper_default, g as genericComponent, a as useProxiedModel, b as useDisplay, f as filterInputAttrs, c as convertToUnit, d as callEvent, p as propsFactory, o as omit, e as clamp } from '../virtual/entry.mjs';
import { u as useRender } from './VBtn-BK5zdqJr.mjs';
import { I as Intersect, f as forwardRefs } from './forwardRefs-BQag-fAc.mjs';
import { u as useFocus, a as useAutocomplete, V as VInput, b as VField, c as VCounter, d as useAutofocus, m as makeVFieldProps, e as makeVInputProps, f as makeAutocompleteProps } from './autofocus-iHZUSa1f.mjs';
import { defineComponent, useModel, computed, mergeProps, unref, mergeModels, ref, shallowRef, watchEffect, watch, createVNode, createElementVNode, Fragment, withDirectives, normalizeClass, vModelText, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

//#region node_modules/vuetify/lib/components/VTextarea/VTextarea.js
var makeVTextareaProps = propsFactory({
	autoGrow: Boolean,
	autofocus: Boolean,
	counter: [
		Boolean,
		Number,
		String
	],
	counterValue: Function,
	prefix: String,
	placeholder: String,
	persistentPlaceholder: Boolean,
	persistentCounter: Boolean,
	noResize: Boolean,
	rows: {
		type: [Number, String],
		default: 5,
		validator: (v) => !isNaN(parseFloat(v))
	},
	maxHeight: {
		type: [Number, String],
		validator: (v) => !isNaN(parseFloat(v))
	},
	maxRows: {
		type: [Number, String],
		validator: (v) => !isNaN(parseFloat(v))
	},
	suffix: String,
	modelModifiers: Object,
	...makeAutocompleteProps(),
	...omit(makeVInputProps(), ["direction"]),
	...makeVFieldProps()
}, "VTextarea");
var VTextarea = genericComponent()({
	name: "VTextarea",
	directives: { vIntersect: Intersect },
	inheritAttrs: false,
	props: makeVTextareaProps(),
	emits: {
		"click:control": (e) => true,
		"mousedown:control": (e) => true,
		"update:focused": (focused) => true,
		"update:modelValue": (val) => true,
		"update:rows": (rows) => true
	},
	setup(props, { attrs, emit, slots }) {
		const model = useProxiedModel(props, "modelValue");
		const { isFocused, focus, blur } = useFocus(props);
		const { onIntersect } = useAutofocus(props);
		const counterValue = computed(() => {
			return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
		});
		const max = computed(() => {
			if (attrs.maxlength) return attrs.maxlength;
			if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
			return props.counter;
		});
		const vInputRef = ref();
		const vFieldRef = ref();
		const controlHeight = shallowRef("");
		const textareaRef = ref();
		const scrollbarWidth = ref(0);
		const { platform } = useDisplay();
		const autocomplete = useAutocomplete(props);
		const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
		function onFocus() {
			if (autocomplete.isSuppressing.value) autocomplete.update();
			if (textareaRef.value !== (void 0).activeElement) textareaRef.value?.focus();
			if (!isFocused.value) focus();
		}
		function onControlClick(e) {
			onFocus();
			emit("click:control", e);
		}
		function onControlMousedown(e) {
			emit("mousedown:control", e);
		}
		function onClear(e) {
			e.stopPropagation();
			onFocus();
			nextTick(() => {
				model.value = "";
				callEvent(props["onClick:clear"], e);
			});
		}
		function onInput(e) {
			const el = e.target;
			if (!props.modelModifiers?.trim) {
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
		const sizerRef = ref();
		const rows = ref(Number(props.rows));
		const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
		watchEffect(() => {
			if (!props.autoGrow) rows.value = Number(props.rows);
		});
		function calculateInputHeight() {
			nextTick(() => {
				if (!textareaRef.value) return;
				if (platform.value.firefox) {
					scrollbarWidth.value = 12;
					return;
				}
				const { offsetWidth, clientWidth } = textareaRef.value;
				scrollbarWidth.value = Math.max(0, offsetWidth - clientWidth);
			});
			if (!props.autoGrow) return;
			nextTick(() => {
				if (!sizerRef.value || !vFieldRef.value) return;
				const style = getComputedStyle(sizerRef.value);
				const fieldStyle = getComputedStyle(vFieldRef.value.$el);
				const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
				const height = sizerRef.value.scrollHeight;
				const lineHeight = parseFloat(style.lineHeight);
				const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
				const maxHeight = props.maxHeight ? parseFloat(props.maxHeight) : parseFloat(props.maxRows) * lineHeight + padding || Infinity;
				const newHeight = clamp(height ?? 0, minHeight, maxHeight);
				rows.value = Math.floor((newHeight - padding) / lineHeight);
				controlHeight.value = convertToUnit(newHeight);
			});
		}
		watch(model, calculateInputHeight);
		watch(() => props.rows, calculateInputHeight);
		watch(() => props.maxHeight, calculateInputHeight);
		watch(() => props.maxRows, calculateInputHeight);
		watch(() => props.density, calculateInputHeight);
		watch(rows, (val) => {
			emit("update:rows", val);
		});
		let observer;
		watch(sizerRef, (val) => {
			if (val) {
				observer = new ResizeObserver(calculateInputHeight);
				observer.observe(sizerRef.value);
			} else observer?.disconnect();
		});
		useRender(() => {
			const hasCounter = !!(slots.counter || props.counter || props.counterValue);
			const hasDetails = !!(hasCounter || slots.details);
			const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
			const { modelValue: _, ...inputProps } = VInput.filterProps(props);
			const fieldProps = {
				...VField.filterProps(props),
				"onClick:clear": onClear
			};
			return createVNode(VInput, mergeProps({
				"ref": vInputRef,
				"modelValue": model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				"class": [
					"v-textarea v-text-field",
					{
						"v-textarea--prefixed": props.prefix,
						"v-textarea--suffixed": props.suffix,
						"v-text-field--prefixed": props.prefix,
						"v-text-field--suffixed": props.suffix,
						"v-textarea--auto-grow": props.autoGrow,
						"v-textarea--no-resize": props.noResize || props.autoGrow,
						"v-input--plain-underlined": isPlainOrUnderlined.value
					},
					props.class
				],
				"style": [{
					"--v-textarea-max-height": props.maxHeight ? convertToUnit(props.maxHeight) : void 0,
					"--v-textarea-scroll-bar-width": convertToUnit(scrollbarWidth.value)
				}, props.style]
			}, rootAttrs, inputProps, {
				"centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
				"focused": isFocused.value,
				"indentDetails": props.indentDetails ?? !isPlainOrUnderlined.value
			}), {
				...slots,
				default: ({ id, isDisabled, isDirty, isReadonly, isValid, hasDetails }) => createVNode(VField, mergeProps({
					"ref": vFieldRef,
					"style": { "--v-textarea-control-height": controlHeight.value },
					"onClick": onControlClick,
					"onMousedown": onControlMousedown,
					"onClick:prependInner": props["onClick:prependInner"],
					"onClick:appendInner": props["onClick:appendInner"]
				}, fieldProps, {
					"id": id.value,
					"active": isActive.value || isDirty.value,
					"labelId": `${id.value}-label`,
					"centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
					"dirty": isDirty.value || props.dirty,
					"disabled": isDisabled.value,
					"focused": isFocused.value,
					"details": hasDetails.value,
					"error": isValid.value === false
				}), {
					...slots,
					default: ({ props: { class: fieldClass, ...slotProps }, controlRef }) => createElementVNode(Fragment, null, [
						props.prefix && createElementVNode("span", { "class": "v-text-field__prefix" }, [props.prefix]),
						withDirectives(createElementVNode("textarea", mergeProps({
							"ref": (val) => textareaRef.value = controlRef.value = val,
							"class": fieldClass,
							"value": model.value,
							"onInput": onInput,
							"autofocus": props.autofocus,
							"readonly": isReadonly.value,
							"disabled": isDisabled.value,
							"placeholder": props.placeholder,
							"rows": props.rows,
							"name": autocomplete.fieldName.value,
							"autocomplete": autocomplete.fieldAutocomplete.value,
							"onFocus": onFocus,
							"onBlur": blur,
							"aria-labelledby": `${id.value}-label`
						}, slotProps, inputAttrs), null), [[
							Intersect,
							{ handler: onIntersect },
							null,
							{ once: true }
						]]),
						props.autoGrow && withDirectives(createElementVNode("textarea", {
							"class": normalizeClass([fieldClass, "v-textarea__sizer"]),
							"id": `${slotProps.id}-sizer`,
							"onUpdate:modelValue": ($event) => model.value = $event,
							"ref": sizerRef,
							"readonly": true,
							"aria-hidden": "true"
						}, null), [[vModelText, model.value]]),
						props.suffix && createElementVNode("span", { "class": "v-text-field__suffix" }, [props.suffix])
					])
				}),
				details: hasDetails ? (slotProps) => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
					"active": props.persistentCounter || isFocused.value,
					"value": counterValue.value,
					"max": max.value,
					"disabled": props.disabled
				}, slots.counter)])]) : void 0
			});
		});
		return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
	}
});
//#endregion
//#region app/components/ui/mnemo-textarea.vue?vue&type=script&setup=true&lang.ts
var mnemo_textarea_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "mnemo-textarea",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		label: { default: "" },
		placeholder: { default: "" },
		disabled: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		rows: { default: 5 },
		autoGrow: {
			type: Boolean,
			default: true
		},
		hideDetails: {
			type: Boolean,
			default: true
		},
		fullHeight: {
			type: Boolean,
			default: false
		}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const model = useModel(__props, "modelValue");
		const effectiveAutoGrow = computed(() => props.fullHeight ? false : props.autoGrow);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VTextarea, mergeProps({
				modelValue: model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				label: __props.label,
				placeholder: __props.placeholder,
				disabled: __props.disabled,
				error: __props.error,
				rows: __props.rows,
				"auto-grow": unref(effectiveAutoGrow),
				variant: "outlined",
				density: "compact",
				"hide-details": __props.hideDetails,
				class: ["mnemo-textarea", { "mnemo-textarea--full-height": __props.fullHeight }]
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/components/ui/mnemo-textarea.vue
var _sfc_setup = mnemo_textarea_vue_vue_type_script_setup_true_lang_default.setup;
mnemo_textarea_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/mnemo-textarea.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var mnemo_textarea_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(mnemo_textarea_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5b10cf65"]]), { __name: "UiMnemoTextarea" });

export { mnemo_textarea_default as m };;globalThis.__timing__.logEnd('Load chunks/build/mnemo-textarea-Dr5RyYwn');
//# sourceMappingURL=mnemo-textarea-Dr5RyYwn.mjs.map
