import { defineComponent, ref, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, computed, h, isRef, createTextVNode, capitalize, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { M as MnemoInput, a as MnemoButton } from './mnemo-input-CDMkvOjj.mjs';
import { _ as _export_sfc, g as genericComponent, k as keys, p as propsFactory, d as useAuth, e as breakpoints, n as navigateTo } from './server.mjs';
import { V as VContainer, a as VRow } from './VRow-BMaGFa-i.mjs';
import { m as makeTagProps, b as makeComponentProps } from './index-CTo6apaC.mjs';
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

const _imports_0 = "" + __buildAssetsURL("logo.C7ehDNpI.svg");
async function register(body) {
  return await $fetch("/api/internal/auth/register", {
    method: "POST",
    body
  });
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: {
    switch: () => {
    }
  },
  setup(__props, { emit: __emit }) {
    const visiblePass = ref(false);
    const visibleRepeatPass = ref(false);
    const emit = __emit;
    const login2 = ref("");
    const password = ref("");
    const repeatPassword = ref("");
    const error = ref(null);
    const isLoading = ref(false);
    const loginRules = [
      (v) => !!v || "Введите логин"
    ];
    const passwordRules = [
      (v) => !!v || "Введите пароль",
      (v) => v.length >= 6 || "Минимум 6 символов"
    ];
    const repeatPasswordRules = [
      (v) => !!v || "Повторите пароль",
      (v) => v === password.value || "Пароли не совпадают"
    ];
    async function onRegister() {
      error.value = null;
      isLoading.value = true;
      try {
        await register({
          login: login2.value,
          password: password.value,
          repeatPassword: repeatPassword.value
        });
        login2.value = "";
        password.value = "";
        repeatPassword.value = "";
        emit("switch");
      } catch (e) {
        error.value = e?.data?.statusMessage || "Ошибка регистрации";
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col items-center justify-start" }, _attrs))} data-v-88f8166c><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="Логотип" data-v-88f8166c><span class="title mt-2" data-v-88f8166c>Регистрация</span><span class="sub-title mt-1" data-v-88f8166c>Создайте новый аккаунт</span><div class="w-full flex flex-col gap-2 mt-5" data-v-88f8166c>`);
      _push(ssrRenderComponent(MnemoInput, {
        label: "Логин",
        modelValue: unref(login2),
        "onUpdate:modelValue": ($event) => isRef(login2) ? login2.value = $event : null,
        class: "w-full",
        "prepend-inner-icon": "mdi-email-outline",
        rules: loginRules,
        onKeydown: onRegister
      }, null, _parent));
      _push(ssrRenderComponent(MnemoInput, {
        label: "Пароль",
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        class: "w-full",
        "prepend-inner-icon": "mdi-lock-outline",
        "append-inner-icon": unref(visiblePass) ? "mdi-eye-off" : "mdi-eye",
        type: unref(visiblePass) ? "text" : "password",
        rules: passwordRules,
        "onClick:appendInner": ($event) => visiblePass.value = !unref(visiblePass),
        onKeydown: onRegister
      }, null, _parent));
      _push(ssrRenderComponent(MnemoInput, {
        label: "Повторите пароль",
        modelValue: unref(repeatPassword),
        "onUpdate:modelValue": ($event) => isRef(repeatPassword) ? repeatPassword.value = $event : null,
        class: "w-full",
        "prepend-inner-icon": "mdi-lock-outline",
        "append-inner-icon": unref(visibleRepeatPass) ? "mdi-eye-off" : "mdi-eye",
        type: unref(visibleRepeatPass) ? "text" : "password",
        rules: repeatPasswordRules,
        "onClick:appendInner": ($event) => visibleRepeatPass.value = !unref(visibleRepeatPass),
        onKeydown: onRegister
      }, null, _parent));
      _push(`</div><span class="mt-6 error" data-v-88f8166c>${ssrInterpolate(unref(error))}</span>`);
      _push(ssrRenderComponent(MnemoButton, {
        class: "w-full mt-6",
        onClick: onRegister
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Зарегистрироваться `);
          } else {
            return [
              createTextVNode(" Зарегистрироваться ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="sub-title mt-6" data-v-88f8166c> Есть аккаунт? <a class="link" data-v-88f8166c>Войти</a></span></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/register-form/ui/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const RegisterForm = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-88f8166c"]]), { __name: "AuthRegisterFormUi" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: {
    switch: () => {
    }
  },
  setup(__props, { emit: __emit }) {
    const visible = ref(false);
    const { signIn } = useAuth();
    const login2 = ref("");
    const password = ref("");
    const error = ref(null);
    const isLoading = ref(false);
    ref();
    const loginRules = [
      (v) => !!v || "Введите логин"
    ];
    const passwordRules = [
      (v) => !!v || "Введите пароль"
    ];
    async function onLogin() {
      error.value = null;
      isLoading.value = true;
      try {
        const res = await signIn("credentials", {
          login: login2.value,
          password: password.value,
          redirect: false
        });
        if (res?.error) {
          error.value = "Неверный логин или пароль";
          return;
        }
        await navigateTo("/");
      } catch {
        error.value = "Ошибка входа. Попробуйте снова.";
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col items-center justify-start" }, _attrs))} data-v-63f6e71c><img class="logo"${ssrRenderAttr("src", _imports_0)} alt="Логотип" data-v-63f6e71c><span class="title mt-2" data-v-63f6e71c>Вход</span><span class="sub-title mt-1" data-v-63f6e71c>Войдите в свою учетную запись</span><div class="w-full flex flex-col gap-2 mt-5" data-v-63f6e71c>`);
      _push(ssrRenderComponent(MnemoInput, {
        modelValue: unref(login2),
        "onUpdate:modelValue": ($event) => isRef(login2) ? login2.value = $event : null,
        label: "Логин",
        class: "w-full",
        rules: loginRules,
        "prepend-inner-icon": "mdi-email-outline",
        onKeydown: onLogin
      }, null, _parent));
      _push(ssrRenderComponent(MnemoInput, {
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        label: "Пароль",
        class: "w-full",
        "prepend-inner-icon": "mdi-lock-outline",
        rules: passwordRules,
        "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
        type: "visible ? 'text' : 'password'",
        "onClick:appendInner": ($event) => visible.value = !unref(visible),
        onKeydown: onLogin
      }, null, _parent));
      _push(`</div><span class="mt-6 error" data-v-63f6e71c>${ssrInterpolate(unref(error))}</span>`);
      _push(ssrRenderComponent(MnemoButton, {
        class: "w-full mt-6",
        onClick: onLogin
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Войти `);
          } else {
            return [
              createTextVNode(" Войти ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="sub-title mt-6" data-v-63f6e71c> Нет аккаунта? <a class="link" data-v-63f6e71c>Зарегистрируйтесь</a></span></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/login-form/ui/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LoginFormNew = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-63f6e71c"]]), { __name: "AuthLoginFormUi" });
const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap = {
  col: keys(breakpointProps),
  offset: keys(offsetProps),
  order: ["order", "orderSm", "orderMd", "orderLg", "orderXl", "orderXxl"]
};
function parseCols(val) {
  if (typeof val === "string" && val.includes("/")) {
    const [cols, size] = val.split("/");
    return {
      cols: Number(cols),
      size: Number(size)
    };
  }
  return {
    cols: val
  };
}
function parseBreakpoint(type, prop, val) {
  if (val == null || val === false) {
    return {};
  }
  const {
    cols,
    size
  } = parseCols(val);
  const breakpoint = prop.replace(type, "").toLowerCase();
  if (type === "offset") {
    return {
      className: `v-col--offset-${breakpoint}-${cols}`,
      variables: [{
        [`--v-col-offset-base-${breakpoint}`]: size
      }]
    };
  } else if (type === "order") {
    return {
      className: `order-${breakpoint}-${cols}`
    };
  }
  return {
    className: cols === "" || cols === true ? `v-col--${breakpoint}` : `v-col--cols-${breakpoint}-${cols}`,
    variables: [{
      [`--v-col-size-base-${breakpoint}`]: size
    }]
  };
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const alignSelfValidator = (str) => ALIGN_SELF_VALUES.includes(str);
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  /** @deprecated use order-* class instead */
  order: {
    type: [String, Number],
    default: null
  },
  /** @deprecated use order-sm-* class instead */
  orderSm: {
    type: String,
    default: null
  },
  /** @deprecated use order-md-* class instead */
  orderMd: {
    type: String,
    default: null
  },
  /** @deprecated use order-lg-* class instead */
  orderLg: {
    type: String,
    default: null
  },
  /** @deprecated use order-xl-* class instead */
  orderXl: {
    type: String,
    default: null
  },
  /** @deprecated use order-xxl-* class instead */
  orderXxl: {
    type: String,
    default: null
  },
  /** @deprecated use align-self-* class instead */
  alignSelf: {
    type: String,
    default: null,
    validator: alignSelfValidator
  },
  /** @deprecated use align-self-sm-* class instead */
  alignSelfSm: {
    type: String,
    default: null,
    validator: alignSelfValidator
  },
  /** @deprecated use align-self-md-* class instead */
  alignSelfMd: {
    type: String,
    default: null,
    validator: alignSelfValidator
  },
  /** @deprecated use align-self-lg-* class instead */
  alignSelfLg: {
    type: String,
    default: null,
    validator: alignSelfValidator
  },
  /** @deprecated use align-self-xl-* class instead */
  alignSelfXl: {
    type: String,
    default: null,
    validator: alignSelfValidator
  },
  /** @deprecated use align-self-xxl-* class instead */
  alignSelfXxl: {
    type: String,
    default: null,
    validator: alignSelfValidator
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
const VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, {
    slots
  }) {
    const sizeBaseOverride = computed(() => parseCols(props.cols).size);
    const offsetBaseOverride = computed(() => parseCols(props.offset).size);
    const responsive = computed(() => {
      const classList = ["v-col"];
      const variablesList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const {
            className,
            variables
          } = parseBreakpoint(type, prop, value);
          if (className) classList.push(className);
          if (variables) variablesList.push(...variables);
        });
      }
      const {
        cols
      } = parseCols(props.cols);
      const {
        cols: offset
      } = parseCols(props.offset);
      classList.push({
        [`v-col--cols-${cols}`]: cols,
        [`v-col--offset-${offset}`]: offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return {
        classes: classList,
        variables: variablesList
      };
    });
    return () => h(props.tag, {
      class: [responsive.value.classes, props.class],
      style: [{
        "--v-col-size-base": sizeBaseOverride.value
      }, {
        "--v-col-offset-base": offsetBaseOverride.value
      }, responsive.value.variables, props.style]
    }, slots.default?.());
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const mode = ref("login");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({
        fluid: "",
        class: "auth-page"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "justify-center align-center fill-height" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    class: "flex justify-center"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(mode) === "login") {
                          _push4(ssrRenderComponent(LoginFormNew, {
                            class: "auth-page__form",
                            onSwitch: ($event) => mode.value = "register"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(RegisterForm, {
                            class: "auth-page__form",
                            onSwitch: ($event) => mode.value = "login"
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          unref(mode) === "login" ? (openBlock(), createBlock(LoginFormNew, {
                            key: 0,
                            class: "auth-page__form",
                            onSwitch: ($event) => mode.value = "register"
                          }, null, 8, ["onSwitch"])) : (openBlock(), createBlock(RegisterForm, {
                            key: 1,
                            class: "auth-page__form",
                            onSwitch: ($event) => mode.value = "login"
                          }, null, 8, ["onSwitch"]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      class: "flex justify-center"
                    }, {
                      default: withCtx(() => [
                        unref(mode) === "login" ? (openBlock(), createBlock(LoginFormNew, {
                          key: 0,
                          class: "auth-page__form",
                          onSwitch: ($event) => mode.value = "register"
                        }, null, 8, ["onSwitch"])) : (openBlock(), createBlock(RegisterForm, {
                          key: 1,
                          class: "auth-page__form",
                          onSwitch: ($event) => mode.value = "login"
                        }, null, 8, ["onSwitch"]))
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
              createVNode(VRow, { class: "justify-center align-center fill-height" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    class: "flex justify-center"
                  }, {
                    default: withCtx(() => [
                      unref(mode) === "login" ? (openBlock(), createBlock(LoginFormNew, {
                        key: 0,
                        class: "auth-page__form",
                        onSwitch: ($event) => mode.value = "register"
                      }, null, 8, ["onSwitch"])) : (openBlock(), createBlock(RegisterForm, {
                        key: 1,
                        class: "auth-page__form",
                        onSwitch: ($event) => mode.value = "login"
                      }, null, 8, ["onSwitch"]))
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7fe14bb"]]);

export { login as default };
//# sourceMappingURL=login-DvMuOBVx.mjs.map
