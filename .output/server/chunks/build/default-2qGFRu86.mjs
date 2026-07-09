import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, withModifiers, unref, toDisplayString, shallowRef, watch, withDirectives, createElementVNode, normalizeStyle, normalizeClass, Fragment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, d as useAuth, g as genericComponent, m as provideTheme, q as convertToUnit, n as navigateTo, t as provideDefaults, p as propsFactory, I as IconValue, s as makeThemeProps } from './server.mjs';
import { V as VContainer, a as VRow } from './VRow-BMaGFa-i.mjs';
import { b as VImg, V as VMenu, a as VAvatar, c as createSimpleFunctional } from './VMenu-CYtgR6QR.mjs';
import { V as VBtn, R as Ripple, c as useBorder, j as useVariant, d as useDensity, e as useDimension, f as useElevation, x as useLoader, C as useLocation, D as usePosition, g as useRounded, i as useLink, h as useRender, l as VDefaultsProvider, L as LoaderSlot, k as genOverlays, a as VIcon, n as makeVariantProps, m as makeTagProps, t as makeRouterProps, o as makeRoundedProps, E as makePositionProps, F as makeLocationProps, A as makeLoaderProps, p as makeElevationProps, q as makeDimensionProps, r as makeDensityProps, b as makeComponentProps, s as makeBorderProps } from './index-CTo6apaC.mjs';
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

const _imports_0 = "" + __buildAssetsURL("logo_2.Bjs5vF23.svg");
const makeVCardActionsProps = propsFactory({
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardActions");
const VCardActions = genericComponent()({
  name: "VCardActions",
  props: makeVCardActionsProps(),
  setup(props, {
    slots
  }) {
    provideDefaults({
      VBtn: {
        slim: true,
        variant: "text"
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-card-actions", props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});
const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardSubtitle");
const VCardSubtitle = genericComponent()({
  name: "VCardSubtitle",
  props: makeVCardSubtitleProps(),
  setup(props, {
    slots
  }) {
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-card-subtitle", props.class]),
      "style": normalizeStyle([{
        "--v-card-subtitle-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const VCardTitle = createSimpleFunctional("v-card-title");
const makeCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VCardItem");
const VCardItem = genericComponent()({
  name: "VCardItem",
  props: makeCardItemProps(),
  setup(props, {
    slots
  }) {
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-card-item", props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-card-item__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? toDisplayString(props.title)]
        }), hasSubtitle && createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.() ?? toDisplayString(props.subtitle)]
        }), slots.default?.()]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-card-item__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            }
          }
        }, slots.append)])]
      });
    });
    return {};
  }
});
const makeVCardTextProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCardText");
const VCardText = genericComponent()({
  name: "VCardText",
  props: makeVCardTextProps(),
  setup(props, {
    slots
  }) {
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-card-text", props.class]),
      "style": normalizeStyle([{
        "--v-card-text-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const makeVCardProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VCard");
const VCard = genericComponent()({
  name: "VCard",
  directives: {
    vRipple: Ripple
  },
  props: makeVCardProps(),
  setup(props, {
    attrs,
    slots
  }) {
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    const loadingColor = shallowRef(void 0);
    watch(() => props.loading, (val, old) => {
      loadingColor.value = !val && typeof old === "string" ? old : typeof val === "boolean" ? void 0 : val;
    }, {
      immediate: true
    });
    useRender(() => {
      const isLink = props.link !== false && link.isLink.value;
      const isClickable = !props.disabled && props.link !== false && (props.link || link.isClickable.value);
      const Tag = isLink ? "a" : props.tag;
      const hasTitle = !!(slots.title || props.title != null);
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text != null);
      return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "class": ["v-card", {
          "v-card--disabled": props.disabled,
          "v-card--flat": props.flat,
          "v-card--hover": props.hover && !(props.disabled || props.flat),
          "v-card--link": isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, {
          "--v-card-height": convertToUnit(props.height)
        }, props.style],
        "onClick": isClickable && link.navigate.value,
        "tabindex": props.disabled ? -1 : void 0
      }), {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-card__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(LoaderSlot, {
          "name": "v-card",
          "active": !!props.loading,
          "color": loadingColor.value
        }, {
          default: slots.loader
        }), hasCardItem && createVNode(VCardItem, {
          "key": "item",
          "prependAvatar": props.prependAvatar,
          "prependIcon": props.prependIcon,
          "title": props.title,
          "subtitle": props.subtitle,
          "appendAvatar": props.appendAvatar,
          "appendIcon": props.appendIcon
        }, {
          default: slots.item,
          prepend: slots.prepend,
          title: slots.title,
          subtitle: slots.subtitle,
          append: slots.append
        }), hasText && createVNode(VCardText, {
          "key": "text"
        }, {
          default: () => [slots.text?.() ?? props.text]
        }), slots.default?.(), slots.actions && createVNode(VCardActions, null, {
          default: slots.actions
        }), genOverlays(isClickable, "v-card")]
      }), [[Ripple, isClickable && props.ripple]]);
    });
    return {};
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const { data, signOut } = useAuth();
    function onExit() {
      console.log(data.value?.user);
      signOut().then(() => {
        navigateTo("/login");
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "p-0 m-0" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VMenu, { "min-width": "200px" }, {
                    activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps({ icon: "" }, props), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAvatar, {
                                color: "brown",
                                size: "large"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-headline-small"${_scopeId5}>${ssrInterpolate(unref(data)?.user?.name)}</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAvatar, {
                                  color: "brown",
                                  size: "large"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, mergeProps({ icon: "" }, props), {
                            default: withCtx(() => [
                              createVNode(VAvatar, {
                                color: "brown",
                                size: "large"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 16)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { class: "mt-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      variant: "text",
                                      rounded: "",
                                      onClick: onExit
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Выйти `);
                                        } else {
                                          return [
                                            createTextVNode(" Выйти ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        variant: "text",
                                        rounded: "",
                                        onClick: withModifiers(onExit, ["stop"])
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Выйти ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      variant: "text",
                                      rounded: "",
                                      onClick: withModifiers(onExit, ["stop"])
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Выйти ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, { class: "mt-2" }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    variant: "text",
                                    rounded: "",
                                    onClick: withModifiers(onExit, ["stop"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Выйти ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VMenu, { "min-width": "200px" }, {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps({ icon: "" }, props), {
                          default: withCtx(() => [
                            createVNode(VAvatar, {
                              color: "brown",
                              size: "large"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 16)
                      ]),
                      default: withCtx(() => [
                        createVNode(VCard, { class: "mt-2" }, {
                          default: withCtx(() => [
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  variant: "text",
                                  rounded: "",
                                  onClick: withModifiers(onExit, ["stop"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Выйти ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode(VMenu, { "min-width": "200px" }, {
                    activator: withCtx(({ props }) => [
                      createVNode(VBtn, mergeProps({ icon: "" }, props), {
                        default: withCtx(() => [
                          createVNode(VAvatar, {
                            color: "brown",
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-headline-small" }, toDisplayString(unref(data)?.user?.name), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 16)
                    ]),
                    default: withCtx(() => [
                      createVNode(VCard, { class: "mt-2" }, {
                        default: withCtx(() => [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                variant: "text",
                                rounded: "",
                                onClick: withModifiers(onExit, ["stop"])
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Выйти ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/profile.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Profile = Object.assign(_sfc_main$2, { __name: "HeaderProfile" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "mnemo-header",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-between align-center" }, _attrs))} data-v-5c3aecff><div class="logo" data-v-5c3aecff>`);
      _push(ssrRenderComponent(VImg, {
        src: _imports_0,
        width: "30",
        height: "30"
      }, null, _parent));
      _push(`<span class="logo-text" data-v-5c3aecff>Mnemo</span></div><div class="flex" data-v-5c3aecff>`);
      _push(ssrRenderComponent(Profile, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/mnemo-header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MnemoHeader = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5c3aecff"]]), { __name: "HeaderMnemoHeader" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))} data-v-e5bb2738><div class="layout__container" data-v-e5bb2738>`);
      _push(ssrRenderComponent(MnemoHeader, null, null, _parent));
      _push(`<main class="layout__content" data-v-e5bb2738>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5bb2738"]]);

export { _default as default };
//# sourceMappingURL=default-2qGFRu86.mjs.map
