import { defineComponent, ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, useModel, mergeProps, mergeModels, shallowRef, watchEffect, watch, createElementVNode, Fragment, withDirectives, normalizeClass, vModelText, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { M as MnemoForm } from './mnemo-form-CVX64wVD.mjs';
import { M as MnemoInput, a as MnemoButton, u as useFocus, b as useAutocomplete, c as VInput, d as VField, e as VCounter, f as useAutofocus, m as makeVFieldProps, g as makeVInputProps, h as makeAutocompleteProps } from './mnemo-input-CDMkvOjj.mjs';
import { I as Intersect, h as useRender, w as forwardRefs } from './index-CTo6apaC.mjs';
import { _ as _export_sfc, n as navigateTo, g as genericComponent, h as useProxiedModel, A as useDisplay, B as filterInputAttrs, q as convertToUnit, C as callEvent, p as propsFactory, z as omit, D as clamp } from './server.mjs';

const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
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
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true,
    "update:rows": (rows) => true
  },
  setup(props, {
    attrs,
    emit,
    slots
  }) {
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
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
    const {
      platform
    } = useDisplay();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (textareaRef.value !== (void 0).activeElement) {
        textareaRef.value?.focus();
      }
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
        if (value.trimStart().length === el.value.length) {
          offset = value.length - el.value.length;
        }
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
        const {
          offsetWidth,
          clientWidth
        } = textareaRef.value;
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
      } else {
        observer?.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        "onClick:clear": onClear
      };
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
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
        default: ({
          id,
          isDisabled,
          isDirty,
          isReadonly,
          isValid,
          hasDetails: hasDetails2
        }) => createVNode(VField, mergeProps({
          "ref": vFieldRef,
          "style": {
            "--v-textarea-control-height": controlHeight.value
          },
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
          "details": hasDetails2.value,
          "error": isValid.value === false
        }), {
          ...slots,
          default: ({
            props: {
              class: fieldClass,
              ...slotProps
            },
            controlRef
          }) => createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
            "class": "v-text-field__prefix"
          }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
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
          }, slotProps, inputAttrs), null), [[Intersect, {
            handler: onIntersect
          }, null, {
            once: true
          }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
            "class": normalizeClass([fieldClass, "v-textarea__sizer"]),
            "id": `${slotProps.id}-sizer`,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "ref": sizerRef,
            "readonly": true,
            "aria-hidden": "true"
          }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
            "class": "v-text-field__suffix"
          }, [props.suffix])])
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "mnemo-textarea",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    label: { default: "" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    rows: { default: 5 },
    autoGrow: { type: Boolean, default: true },
    hideDetails: { type: Boolean, default: true },
    fullHeight: { type: Boolean, default: false }
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/mnemo-textarea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MnemoTextarea = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5caccc6c"]]), { __name: "UiMnemoTextarea" });
async function createCard(body) {
  return await $fetch(`/api/decks/${body.deckId}/cards`, {
    method: "POST",
    body
  });
}
async function updateCard(deckId, cardId, body) {
  const url = `/api/decks/${deckId}/cards/${cardId}`;
  return await $fetch(url, {
    method: "PUT",
    body
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "card-form",
  __ssrInlineRender: true,
  props: {
    mode: { default: "create" },
    cardId: {},
    deckId: {}
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      front: "",
      back: "",
      deckId: props.deckId
    });
    const buttonName = computed(() => props.mode === "create" ? "Создать" : "Сохранить");
    const onSave = async () => {
      try {
        if (props.mode === "create") {
          await createCard(form.value);
        } else {
          if (!props.cardId) return;
          await updateCard(props.deckId, props.cardId, form.value);
        }
        navigateTo({
          name: "decks-deckId-cards",
          params: {
            deckId: props.deckId
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    const onLeave = () => {
      return navigateTo({
        name: "decks-deckId-cards",
        params: {
          deckId: props.deckId
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MnemoForm, _attrs, {
        "toolbar-left": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MnemoButton, {
              onClick: onSave,
              width: "150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(buttonName))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(buttonName)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(MnemoButton, {
              onClick: onLeave,
              width: "150",
              variant: "secondary",
              class: "ml-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Закрыть `);
                } else {
                  return [
                    createTextVNode(" Закрыть ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(MnemoButton, {
                onClick: onSave,
                width: "150"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(buttonName)), 1)
                ]),
                _: 1
              }),
              createVNode(MnemoButton, {
                onClick: onLeave,
                width: "150",
                variant: "secondary",
                class: "ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Закрыть ")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-form-content" data-v-001761e8${_scopeId}><div class="flex flex-col gap-4 w-1/2" data-v-001761e8${_scopeId}>`);
            _push2(ssrRenderComponent(MnemoInput, {
              modelValue: unref(form).front,
              "onUpdate:modelValue": ($event) => unref(form).front = $event,
              label: "Название карточки",
              placeholder: "Введите название карточки"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 card-back-field" data-v-001761e8${_scopeId}>`);
            _push2(ssrRenderComponent(MnemoTextarea, {
              modelValue: unref(form).back,
              "onUpdate:modelValue": ($event) => unref(form).back = $event,
              label: "Описание карточки",
              placeholder: "Введите описание карточки",
              "full-height": ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "card-form-content" }, [
                createVNode("div", { class: "flex flex-col gap-4 w-1/2" }, [
                  createVNode(MnemoInput, {
                    modelValue: unref(form).front,
                    "onUpdate:modelValue": ($event) => unref(form).front = $event,
                    label: "Название карточки",
                    placeholder: "Введите название карточки"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4 card-back-field" }, [
                  createVNode(MnemoTextarea, {
                    modelValue: unref(form).back,
                    "onUpdate:modelValue": ($event) => unref(form).back = $event,
                    label: "Описание карточки",
                    placeholder: "Введите описание карточки",
                    "full-height": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/card-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-001761e8"]]), { __name: "CardForm" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=card-form-CIgHJ0xu.mjs.map
