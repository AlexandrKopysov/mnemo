import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, isRef, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { V as VBtn, a as VIcon } from './index-CTo6apaC.mjs';
import { f as useRoute, _ as _export_sfc, n as navigateTo } from './server.mjs';
import { V as VMenu } from './VMenu-CYtgR6QR.mjs';
import { V as VList, a as VListItem } from './VList-DAPyq7NT.mjs';
import { M as MnemoForm } from './mnemo-form-CVX64wVD.mjs';
import { M as MnemoInput, a as MnemoButton } from './mnemo-input-CDMkvOjj.mjs';
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

function formatReviewDate(date) {
  const target = new Date(date);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const targetDay = new Date(target);
  targetDay.setHours(0, 0, 0, 0);
  if (targetDay.getTime() === today.getTime()) {
    return "сегодня";
  }
  if (targetDay.getTime() === tomorrow.getTime()) {
    return "завтра";
  }
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long"
  }).format(target);
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "card-tile-status",
  __ssrInlineRender: true,
  props: {
    card: {}
  },
  setup(__props) {
    const iconVariant = {
      base: "mdi-circle",
      outline: "mdi-circle-outline"
    };
    const color = {
      base: "#5fa391",
      red: "#E74C3C",
      orange: "#F39C12",
      yellow: "#F1C40F",
      green: "#27AE60"
    };
    const props = __props;
    const iconCircle = computed(() => {
      switch (props.card.knowledgeScore) {
        case 1:
          return [
            { icon: iconVariant.base, color: color.red },
            { icon: iconVariant.outline, color: color.red },
            { icon: iconVariant.outline, color: color.red },
            { icon: iconVariant.outline, color: color.red }
          ];
        case 2:
          return [
            { icon: iconVariant.base, color: color.orange },
            { icon: iconVariant.base, color: color.orange },
            { icon: iconVariant.outline, color: color.orange },
            { icon: iconVariant.outline, color: color.orange }
          ];
        case 3:
          return [
            { icon: iconVariant.base, color: color.yellow },
            { icon: iconVariant.base, color: color.yellow },
            { icon: iconVariant.base, color: color.yellow },
            { icon: iconVariant.outline, color: color.yellow }
          ];
        case 4:
          return [
            { icon: iconVariant.base, color: color.green },
            { icon: iconVariant.base, color: color.green },
            { icon: iconVariant.base, color: color.green },
            { icon: iconVariant.base, color: color.green }
          ];
        default:
          return [
            { icon: iconVariant.outline, color: color.base },
            { icon: iconVariant.outline, color: color.base },
            { icon: iconVariant.outline, color: color.base },
            { icon: iconVariant.outline, color: color.base }
          ];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card-tile-status" }, _attrs))} data-v-9a351161><div data-v-9a351161><!--[-->`);
      ssrRenderList(unref(iconCircle), (icon) => {
        _push(ssrRenderComponent(VIcon, {
          key: icon.icon,
          icon: icon.icon,
          color: icon.color,
          size: "20"
        }, null, _parent));
      });
      _push(`<!--]--></div><div data-v-9a351161> Следующее повторение: ${ssrInterpolate(unref(formatReviewDate)(__props.card.dueAt))}</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/card-tile-status.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-9a351161"]]), { __name: "CardTileStatus" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "card-tile",
  __ssrInlineRender: true,
  props: {
    card: {}
  },
  emits: ["click", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const onEditClick = () => {
      emit("edit", props.card.id);
    };
    const onDeleteClick = () => {
      emit("delete", props.card.id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_card_tile_status = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tile-container" }, _attrs))} data-v-da90484e><div class="tile-info" data-v-da90484e><div class="tile-title" data-v-da90484e>${ssrInterpolate(__props.card.front)}</div></div><div class="tile-left-container" data-v-da90484e>`);
      _push(ssrRenderComponent(_component_card_tile_status, { card: __props.card }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/card-tile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-da90484e"]]), { __name: "CardTile" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const title = computed(() => deck.value?.title);
    const breadcrumbs = [
      {
        title: "Главная",
        to: "/"
      }
    ];
    const route = useRoute();
    const deckId = computed(() => String(route.params.deckId));
    const deck = ref();
    const cards = ref([]);
    const search = ref("");
    const onAddCard = async () => {
      return navigateTo({
        name: "decks-deckId-cards-new",
        params: {
          deckId: deckId.value
        }
      });
    };
    function onCardClick(cardId) {
      return onCardEdit(cardId);
    }
    function onCardEdit(cardId) {
      return navigateTo({
        name: "decks-deckId-cards-cardId-edit",
        params: {
          deckId: deckId.value,
          cardId
        }
      });
    }
    function onCardDelete(cardId) {
      console.log("delete card", cardId);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_card_tile = __nuxt_component_0;
      _push(ssrRenderComponent(MnemoForm, mergeProps({
        title: unref(title),
        breadcrumbs
      }, _attrs), {
        "toolbar-left": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MnemoButton, {
              onClick: onAddCard,
              width: "150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Добавить карточку `);
                } else {
                  return [
                    createTextVNode(" Добавить карточку ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(MnemoButton, {
                onClick: onAddCard,
                width: "150"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Добавить карточку ")
                ]),
                _: 1
              })
            ];
          }
        }),
        "toolbar-right": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MnemoInput, {
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
              width: "380",
              placeholder: "Поиск",
              "prepend-inner-icon": "mdi-magnify"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(MnemoInput, {
                modelValue: unref(search),
                "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                width: "380",
                placeholder: "Поиск",
                "prepend-inner-icon": "mdi-magnify"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="decks-grid"${_scopeId}><!--[-->`);
            ssrRenderList(unref(cards), (card) => {
              _push2(ssrRenderComponent(_component_card_tile, {
                key: card.id,
                class: "mb-4",
                card,
                onClick: ($event) => onCardClick(card.id),
                onEdit: ($event) => onCardEdit(card.id),
                onDelete: ($event) => onCardDelete(card.id)
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "decks-grid" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(cards), (card) => {
                  return openBlock(), createBlock(_component_card_tile, {
                    key: card.id,
                    class: "mb-4",
                    card,
                    onClick: ($event) => onCardClick(card.id),
                    onEdit: ($event) => onCardEdit(card.id),
                    onDelete: ($event) => onCardDelete(card.id)
                  }, null, 8, ["card", "onClick", "onEdit", "onDelete"]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/cards/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-nBHsPuAl.mjs.map
