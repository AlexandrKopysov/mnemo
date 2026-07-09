import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { M as MnemoForm } from './mnemo-form-CVX64wVD.mjs';
import { M as MnemoInput, a as MnemoButton } from './mnemo-input-CDMkvOjj.mjs';
import { f as useRoute } from './server.mjs';
import './index-CTo6apaC.mjs';
import '../nitro/nitro.mjs';
import '@prisma/adapter-pg';
import '@prisma/client';
import 'next-auth/core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import 'requrl';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "deck-main",
  __ssrInlineRender: true,
  props: {
    deckId: {}
  },
  setup(__props) {
    function addCard() {
      console.log("addCard");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MnemoForm, _attrs, {
        "toolbar-left": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MnemoButton, { onClick: addCard }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Добавить карточку`);
                } else {
                  return [
                    createTextVNode("Добавить карточку")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(MnemoButton, { onClick: addCard }, {
                default: withCtx(() => [
                  createTextVNode("Добавить карточку")
                ]),
                _: 1
              })
            ];
          }
        }),
        "toolbar-right": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MnemoInput, {
              width: "380",
              placeholder: "Поиск",
              "prepend-inner-icon": "mdi-magnify"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(MnemoInput, {
                width: "380",
                placeholder: "Поиск",
                "prepend-inner-icon": "mdi-magnify"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>DeckMain: ${ssrInterpolate(__props.deckId)}</span>`);
          } else {
            return [
              createVNode("span", null, "DeckMain: " + toDisplayString(__props.deckId), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-main.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DeckMain = Object.assign(_sfc_main$1, { __name: "DecksDeckMain" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const deckId = computed(() => String(route.params.deckId));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(DeckMain, mergeProps({ "deck-id": unref(deckId) }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DIrlsujt.mjs.map
