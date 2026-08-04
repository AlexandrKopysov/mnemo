globalThis.__timing__.logStart('Load chunks/build/login-0pcmS1rX');import { _ as _plugin_vue_export_helper_default, g as genericComponent, a8 as keys, p as propsFactory, a9 as useAuth, aa as breakpoints, n as navigateTo, $ as $fetch$1 } from '../virtual/entry.mjs';
import { B as makeTagProps, k as makeComponentProps } from './VBtn-BK5zdqJr.mjs';
import { V as VContainer, a as VRow } from './VRow-TYrOIe6i.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { m as mnemo_input_default } from './mnemo-input-Bj3NAqAD.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, computed, h, isRef, createTextVNode, capitalize, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import '@prisma/adapter-pg';
import '@prisma/client';
import 'next-auth/core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@vue/shared';
import 'requrl';
import 'pinia';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import './forwardRefs-BQag-fAc.mjs';
import './autofocus-iHZUSa1f.mjs';

//#region node_modules/vuetify/lib/components/VGrid/VCol.js
var breakpointProps = (() => {
	return breakpoints.reduce((props, val) => {
		props[val] = {
			type: [
				Boolean,
				String,
				Number
			],
			default: false
		};
		return props;
	}, {});
})();
var offsetProps = (() => {
	return breakpoints.reduce((props, val) => {
		const offsetKey = "offset" + capitalize(val);
		props[offsetKey] = {
			type: [String, Number],
			default: null
		};
		return props;
	}, {});
})();
var propMap = {
	col: keys(breakpointProps),
	offset: keys(offsetProps),
	order: [
		"order",
		"orderSm",
		"orderMd",
		"orderLg",
		"orderXl",
		"orderXxl"
	]
};
function parseCols(val) {
	if (typeof val === "string" && val.includes("/")) {
		const [cols, size] = val.split("/");
		return {
			cols: Number(cols),
			size: Number(size)
		};
	}
	return { cols: val };
}
function parseBreakpoint(type, prop, val) {
	if (val == null || val === false) return {};
	const { cols, size } = parseCols(val);
	const breakpoint = prop.replace(type, "").toLowerCase();
	if (type === "offset") return {
		className: `v-col--offset-${breakpoint}-${cols}`,
		variables: [{ [`--v-col-offset-base-${breakpoint}`]: size }]
	};
	else if (type === "order") return { className: `order-${breakpoint}-${cols}` };
	return {
		className: cols === "" || cols === true ? `v-col--${breakpoint}` : `v-col--cols-${breakpoint}-${cols}`,
		variables: [{ [`--v-col-size-base-${breakpoint}`]: size }]
	};
}
var ALIGN_SELF_VALUES = [
	"auto",
	"start",
	"end",
	"center",
	"baseline",
	"stretch"
];
var alignSelfValidator = (str) => ALIGN_SELF_VALUES.includes(str);
var makeVColProps = propsFactory({
	cols: {
		type: [
			Boolean,
			String,
			Number
		],
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
var VCol = genericComponent()({
	name: "VCol",
	props: makeVColProps(),
	setup(props, { slots }) {
		const sizeBaseOverride = computed(() => parseCols(props.cols).size);
		const offsetBaseOverride = computed(() => parseCols(props.offset).size);
		const responsive = computed(() => {
			const classList = ["v-col"];
			const variablesList = [];
			let type;
			for (type in propMap) propMap[type].forEach((prop) => {
				const value = props[prop];
				const { className, variables } = parseBreakpoint(type, prop, value);
				if (className) classList.push(className);
				if (variables) variablesList.push(...variables);
			});
			const { cols } = parseCols(props.cols);
			const { cols: offset } = parseCols(props.offset);
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
			style: [
				{ "--v-col-size-base": sizeBaseOverride.value },
				{ "--v-col-offset-base": offsetBaseOverride.value },
				responsive.value.variables,
				props.style
			]
		}, slots.default?.());
	}
});
//#endregion
//#region app/assets/images/logo.svg
var logo_default = "" + __buildAssetsURL("logo.D5iINsYz.svg");
//#endregion
//#region app/entities/login/api/api.ts
async function register(body) {
	return await $fetch$1("/api/internal/auth/register", {
		method: "POST",
		body
	});
}
//#endregion
//#region app/components/auth/register-form/ui/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default$1 = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	emits: { switch: () => {} },
	setup(__props, { emit: __emit }) {
		const visiblePass = ref(false);
		const visibleRepeatPass = ref(false);
		const emit = __emit;
		const login = ref("");
		const password = ref("");
		const repeatPassword = ref("");
		const error = ref(null);
		const isLoading = ref(false);
		const loginRules = [(v) => !!v || "Введите логин"];
		const passwordRules = [(v) => !!v || "Введите пароль", (v) => v.length >= 6 || "Минимум 6 символов"];
		const repeatPasswordRules = [(v) => !!v || "Повторите пароль", (v) => v === password.value || "Пароли не совпадают"];
		async function onRegister() {
			error.value = null;
			isLoading.value = true;
			try {
				await register({
					login: login.value,
					password: password.value,
					repeatPassword: repeatPassword.value
				});
				login.value = "";
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col items-center justify-start" }, _attrs))} data-v-834788c5><img class="logo"${ssrRenderAttr("src", logo_default)} alt="Логотип" data-v-834788c5><span class="title mt-2" data-v-834788c5>Регистрация</span><span class="sub-title mt-1" data-v-834788c5>Создайте новый аккаунт</span><div class="w-full flex flex-col gap-2 mt-5" data-v-834788c5>`);
			_push(ssrRenderComponent(mnemo_input_default, {
				label: "Логин",
				modelValue: unref(login),
				"onUpdate:modelValue": ($event) => isRef(login) ? login.value = $event : null,
				class: "w-full",
				"prepend-inner-icon": "mdi-email-outline",
				rules: loginRules,
				onKeydown: onRegister
			}, null, _parent));
			_push(ssrRenderComponent(mnemo_input_default, {
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
			_push(ssrRenderComponent(mnemo_input_default, {
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
			_push(`</div><span class="mt-6 error" data-v-834788c5>${ssrInterpolate(unref(error))}</span>`);
			_push(ssrRenderComponent(mnemo_button_default, {
				class: "w-full mt-6",
				onClick: onRegister
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Зарегистрироваться `);
					else return [createTextVNode(" Зарегистрироваться ")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="sub-title mt-6" data-v-834788c5> Есть аккаунт? <a class="link" data-v-834788c5>Войти</a></span></div>`);
		};
	}
});
//#endregion
//#region app/components/auth/register-form/ui/index.vue
var _sfc_setup$2 = index_vue_vue_type_script_setup_true_lang_default$1.setup;
index_vue_vue_type_script_setup_true_lang_default$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/register-form/ui/index.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ui_default$1 = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default$1, [["__scopeId", "data-v-834788c5"]]), { __name: "AuthRegisterFormUi" });
//#endregion
//#region app/components/auth/login-form/ui/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	emits: { switch: () => {} },
	setup(__props, { emit: __emit }) {
		const visible = ref(false);
		const { signIn } = useAuth();
		const login = ref("");
		const password = ref("");
		const error = ref(null);
		const isLoading = ref(false);
		ref();
		const loginRules = [(v) => !!v || "Введите логин"];
		const passwordRules = [(v) => !!v || "Введите пароль"];
		async function onLogin() {
			error.value = null;
			isLoading.value = true;
			try {
				if ((await signIn("credentials", {
					login: login.value,
					password: password.value,
					redirect: false
				}))?.error) {
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-col items-center justify-start" }, _attrs))} data-v-649078b0><img class="logo"${ssrRenderAttr("src", logo_default)} alt="Логотип" data-v-649078b0><span class="title mt-2" data-v-649078b0>Вход</span><span class="sub-title mt-1" data-v-649078b0>Войдите в свою учетную запись</span><div class="w-full flex flex-col gap-2 mt-5" data-v-649078b0>`);
			_push(ssrRenderComponent(mnemo_input_default, {
				modelValue: unref(login),
				"onUpdate:modelValue": ($event) => isRef(login) ? login.value = $event : null,
				label: "Логин",
				class: "w-full",
				rules: loginRules,
				"prepend-inner-icon": "mdi-email-outline",
				onKeydown: onLogin
			}, null, _parent));
			_push(ssrRenderComponent(mnemo_input_default, {
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
			_push(`</div><span class="mt-6 error" data-v-649078b0>${ssrInterpolate(unref(error))}</span>`);
			_push(ssrRenderComponent(mnemo_button_default, {
				class: "w-full mt-6",
				onClick: onLogin
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Войти `);
					else return [createTextVNode(" Войти ")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="sub-title mt-6" data-v-649078b0> Нет аккаунта? <a class="link" data-v-649078b0>Зарегистрируйтесь</a></span></div>`);
		};
	}
});
//#endregion
//#region app/components/auth/login-form/ui/index.vue
var _sfc_setup$1 = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/login-form/ui/index.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ui_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-649078b0"]]), { __name: "AuthLoginFormUi" });
//#endregion
//#region app/pages/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		const mode = ref("login");
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(VContainer, mergeProps({
				fluid: "",
				class: "auth-page"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(VRow, { class: "justify-center align-center fill-height" }, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(VCol, {
								cols: "12",
								class: "flex justify-center"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) if (unref(mode) === "login") _push(ssrRenderComponent(ui_default, {
										class: "auth-page__form",
										onSwitch: ($event) => mode.value = "register"
									}, null, _parent, _scopeId));
									else _push(ssrRenderComponent(ui_default$1, {
										class: "auth-page__form",
										onSwitch: ($event) => mode.value = "login"
									}, null, _parent, _scopeId));
									else return [unref(mode) === "login" ? (openBlock(), createBlock(ui_default, {
										key: 0,
										class: "auth-page__form",
										onSwitch: ($event) => mode.value = "register"
									}, null, 8, ["onSwitch"])) : (openBlock(), createBlock(ui_default$1, {
										key: 1,
										class: "auth-page__form",
										onSwitch: ($event) => mode.value = "login"
									}, null, 8, ["onSwitch"]))];
								}),
								_: 1
							}, _parent, _scopeId));
							else return [createVNode(VCol, {
								cols: "12",
								class: "flex justify-center"
							}, {
								default: withCtx(() => [unref(mode) === "login" ? (openBlock(), createBlock(ui_default, {
									key: 0,
									class: "auth-page__form",
									onSwitch: ($event) => mode.value = "register"
								}, null, 8, ["onSwitch"])) : (openBlock(), createBlock(ui_default$1, {
									key: 1,
									class: "auth-page__form",
									onSwitch: ($event) => mode.value = "login"
								}, null, 8, ["onSwitch"]))]),
								_: 1
							})];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(VRow, { class: "justify-center align-center fill-height" }, {
						default: withCtx(() => [createVNode(VCol, {
							cols: "12",
							class: "flex justify-center"
						}, {
							default: withCtx(() => [unref(mode) === "login" ? (openBlock(), createBlock(ui_default, {
								key: 0,
								class: "auth-page__form",
								onSwitch: ($event) => mode.value = "register"
							}, null, 8, ["onSwitch"])) : (openBlock(), createBlock(ui_default$1, {
								key: 1,
								class: "auth-page__form",
								onSwitch: ($event) => mode.value = "login"
							}, null, 8, ["onSwitch"]))]),
							_: 1
						})]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = /*#__PURE__*/ _plugin_vue_export_helper_default(login_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a1fb83b0"]]);

export { login_default as default };;globalThis.__timing__.logEnd('Load chunks/build/login-0pcmS1rX');
//# sourceMappingURL=login-0pcmS1rX.mjs.map
