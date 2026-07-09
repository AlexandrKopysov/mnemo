import { defineComponent, ref, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, mergeProps, withModifiers, computed, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { M as MnemoForm } from './mnemo-form-CVX64wVD.mjs';
import { M as MnemoInput, a as MnemoButton } from './mnemo-input-CDMkvOjj.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { V as VMenu } from './VMenu-CYtgR6QR.mjs';
import { V as VList, a as VListItem } from './VList-DAPyq7NT.mjs';
import { V as VBtn, a as VIcon } from './index-CTo6apaC.mjs';
import { d as deleteDeck, g as getDecks } from './api-v3Snu0ik.mjs';
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

const SIZE = 70;
const STROKE_WIDTH = 4;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "deck-tile-circle-compleet",
  __ssrInlineRender: true,
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    const CENTER = SIZE / 2;
    const RADIUS = (SIZE - STROKE_WIDTH) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const animatedValue = ref(0);
    const normalizedValue = computed(() => {
      const safeValue = Number(props.value ?? 0);
      if (Number.isNaN(safeValue)) {
        return 0;
      }
      return Math.max(0, Math.min(100, safeValue));
    });
    const progressColor = computed(() => {
      if (normalizedValue.value <= 25) {
        return "#E55353";
      }
      if (normalizedValue.value <= 50) {
        return "#F2994A";
      }
      if (normalizedValue.value <= 75) {
        return "#F2C94C";
      }
      return "#62BF9C";
    });
    const strokeDashoffset = computed(() => CIRCUMFERENCE * (1 - animatedValue.value / 100));
    const progressText = computed(() => `${Math.round(animatedValue.value)}%`);
    const animateTo = (targetValue) => {
      {
        animatedValue.value = targetValue;
        return;
      }
    };
    watch(
      normalizedValue,
      (nextValue) => {
        animateTo(nextValue);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "progress-circle",
        style: { width: `${SIZE}px`, height: `${SIZE}px` }
      }, _attrs))} data-v-3d7591b5><svg class="progress-ring"${ssrRenderAttr("width", SIZE)}${ssrRenderAttr("height", SIZE)} viewBox="0 0 70 70" data-v-3d7591b5><circle class="progress-ring-track"${ssrRenderAttr("cx", CENTER)}${ssrRenderAttr("cy", CENTER)}${ssrRenderAttr("r", RADIUS)} fill="none"${ssrRenderAttr("stroke-width", STROKE_WIDTH)} data-v-3d7591b5></circle><circle class="progress-ring-value"${ssrRenderAttr("cx", CENTER)}${ssrRenderAttr("cy", CENTER)}${ssrRenderAttr("r", RADIUS)} fill="none"${ssrRenderAttr("stroke", progressColor.value)}${ssrRenderAttr("stroke-width", STROKE_WIDTH)} stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", CIRCUMFERENCE)}${ssrRenderAttr("stroke-dashoffset", strokeDashoffset.value)} data-v-3d7591b5></circle></svg><span class="progress-label" style="${ssrRenderStyle({ color: progressColor.value })}" data-v-3d7591b5>${ssrInterpolate(progressText.value)}</span></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-tile-circle-compleet.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DeckTileCircleCompleet = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-3d7591b5"]]), { __name: "DecksDeckTileCircleCompleet" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "deck-tile",
  __ssrInlineRender: true,
  props: {
    deck: {}
  },
  emits: ["click", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const onEditClick = () => {
      emit("edit", props.deck.id);
    };
    const onDeleteClick = () => {
      emit("delete", props.deck.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tile-container" }, _attrs))} data-v-1c71d393><div class="tile-info" data-v-1c71d393><div class="tile-title" data-v-1c71d393>${ssrInterpolate(__props.deck.title)}</div><div class="tile-subtitle" data-v-1c71d393> Всего: ${ssrInterpolate(__props.deck.total)}</div></div><div class="tile-left-container" data-v-1c71d393>`);
      _push(ssrRenderComponent(DeckTileCircleCompleet, {
        value: __props.deck.percentCompleet
      }, null, _parent));
      _push(ssrRenderComponent(VMenu, { location: "bottom end" }, {
        activator: withCtx(({ props: menuProps }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              icon: "",
              variant: "text",
              class: "dot-menu-btn",
              ripple: false
            }, menuProps, { onClick: () => {
            } }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, {
                    size: "24",
                    color: "rgba(22, 38, 55, 0.75)"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` mdi-dots-vertical `);
                      } else {
                        return [
                          createTextVNode(" mdi-dots-vertical ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VIcon, {
                      size: "24",
                      color: "rgba(22, 38, 55, 0.75)"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" mdi-dots-vertical ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                icon: "",
                variant: "text",
                class: "dot-menu-btn",
                ripple: false
              }, menuProps, {
                onClick: withModifiers(() => {
                }, ["stop"])
              }), {
                default: withCtx(() => [
                  createVNode(VIcon, {
                    size: "24",
                    color: "rgba(22, 38, 55, 0.75)"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" mdi-dots-vertical ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 16, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VListItem, {
                    "prepend-icon": "mdi-pencil",
                    title: "Редактировать",
                    onClick: onEditClick
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VListItem, {
                    "prepend-icon": "mdi-trash-can-outline",
                    title: "Удалить",
                    onClick: onDeleteClick
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VListItem, {
                      "prepend-icon": "mdi-pencil",
                      title: "Редактировать",
                      onClick: withModifiers(onEditClick, ["stop"])
                    }),
                    createVNode(VListItem, {
                      "prepend-icon": "mdi-trash-can-outline",
                      title: "Удалить",
                      onClick: withModifiers(onDeleteClick, ["stop"])
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VList, null, {
                default: withCtx(() => [
                  createVNode(VListItem, {
                    "prepend-icon": "mdi-pencil",
                    title: "Редактировать",
                    onClick: withModifiers(onEditClick, ["stop"])
                  }),
                  createVNode(VListItem, {
                    "prepend-icon": "mdi-trash-can-outline",
                    title: "Удалить",
                    onClick: withModifiers(onDeleteClick, ["stop"])
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-tile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DeckTile = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-1c71d393"]]), { __name: "DecksDeckTile" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const decks = ref([]);
    async function getAllDecks() {
      decks.value = await getDecks();
    }
    function addDeck() {
      return navigateTo("/decks/new");
    }
    function onDeckClick(deckId) {
      if (!deckId) {
        return;
      }
      return navigateTo({
        name: "decks-deckId-cards",
        params: {
          deckId
        }
      });
    }
    function onDeckEdit(deckId) {
      if (!deckId) {
        return;
      }
      return navigateTo({
        name: "decks-deckId-edit",
        params: {
          deckId
        }
      });
    }
    async function onDeckDelete(id) {
      await deleteDeck(id);
      await getAllDecks();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MnemoForm, _attrs, {
        "toolbar-left": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MnemoButton, {
              onClick: addDeck,
              width: "150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Добавить колоду `);
                } else {
                  return [
                    createTextVNode(" Добавить колоду ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(MnemoButton, {
                onClick: addDeck,
                width: "150"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Добавить колоду ")
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
            _push2(`<div class="decks-grid" data-v-ea291d8c${_scopeId}><!--[-->`);
            ssrRenderList(unref(decks), (deck) => {
              _push2(`<div data-v-ea291d8c${_scopeId}>`);
              _push2(ssrRenderComponent(DeckTile, {
                deck,
                onClick: ($event) => onDeckClick(deck.id),
                onEdit: ($event) => onDeckEdit(deck.id),
                onDelete: ($event) => onDeckDelete(deck.id)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "decks-grid" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(decks), (deck) => {
                  return openBlock(), createBlock("div", {
                    key: deck.id
                  }, [
                    createVNode(DeckTile, {
                      deck,
                      onClick: ($event) => onDeckClick(deck.id),
                      onEdit: ($event) => onDeckEdit(deck.id),
                      onDelete: ($event) => onDeckDelete(deck.id)
                    }, null, 8, ["deck", "onClick", "onEdit", "onDelete"])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea291d8c"]]);

export { index as default };
//# sourceMappingURL=index-DuMPRUXv.mjs.map
