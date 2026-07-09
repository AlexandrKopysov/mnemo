import { defineComponent, ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { M as MnemoForm } from './mnemo-form-CVX64wVD.mjs';
import { M as MnemoInput, a as MnemoButton } from './mnemo-input-CDMkvOjj.mjs';
import { c as createDeck, u as updateDeck } from './api-v3Snu0ik.mjs';
import { n as navigateTo } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "deck-form",
  __ssrInlineRender: true,
  props: {
    mode: { default: "create" },
    deckId: {}
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      title: "",
      description: ""
    });
    const buttonName = computed(() => props.mode === "create" ? "Создать" : "Сохранить");
    const onSave = async () => {
      if (props.mode === "create") {
        await createDeck(form.value);
      } else {
        await updateDeck(props.deckId, form.value);
      }
      onLeave();
    };
    const onLeave = () => {
      return navigateTo("/");
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
            _push2(`<div class="flex flex-col gap-4 w-1/2"${_scopeId}>`);
            _push2(ssrRenderComponent(MnemoInput, {
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              label: "Название колоды",
              placeholder: "Введите название колоды"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(MnemoInput, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              label: "Описание колоды",
              placeholder: "Введите описание колоды"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4 w-1/2" }, [
                createVNode(MnemoInput, {
                  modelValue: unref(form).title,
                  "onUpdate:modelValue": ($event) => unref(form).title = $event,
                  label: "Название колоды",
                  placeholder: "Введите название колоды"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(MnemoInput, {
                  modelValue: unref(form).description,
                  "onUpdate:modelValue": ($event) => unref(form).description = $event,
                  label: "Описание колоды",
                  placeholder: "Введите описание колоды"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DeckForm = Object.assign(_sfc_main, { __name: "DecksDeckForm" });

export { DeckForm as D };
//# sourceMappingURL=deck-form-B9E4sxhI.mjs.map
