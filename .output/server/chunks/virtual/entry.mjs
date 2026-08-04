import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};globalThis.__timing__.logStart('Load chunks/virtual/entry');import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, isRef, defineComponent, shallowRef, h, resolveComponent, computed, unref, createElementBlock, provide, cloneVNode, toValue, onServerPrefetch, ref, nextTick, queuePostFlushCb, warn, watchEffect, createVNode, normalizeClass, toRaw, mergeProps, createElementVNode, watch, onScopeDispose, capitalize, Fragment, readonly, createApp, onErrorCaptured, resolveDynamicComponent, defineAsyncComponent, isReadonly, useSSRContext, isShallow, isReactive, isVNode, createCommentVNode, withCtx, toRefs, Suspense } from 'vue';
import { f as createError, w as hasProtocol$1, o as joinURL$1, x as withQuery$1, y as sanitizeStatusCode, z as parseURL$1, h as encodePath, B as decodePath, C as isScriptProtocol, D as destr, E as i, F as s, G as l, H as baseURL, I as defu, J as parseQuery$1, K as withTrailingSlash$1, L as withoutTrailingSlash$1, M as defu$1, O as getRequestHeaders$1, P as withLeadingSlash, Q as appendHeader, R as getHeader, S as toRouteMatcher, T as createRouter$1, U as withoutBase } from '../_/nitro.mjs';
import http from 'node:http';
import https from 'node:https';
import { START_LOCATION, createMemoryHistory, createRouter, useRoute as useRoute$1, RouterView } from 'vue-router';
import { isPlainObject as isPlainObject$1 } from '@vue/shared';
import getURL from 'requrl';
import { setActivePinia, createPinia, shouldHydrate } from 'pinia';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import utc from 'dayjs/plugin/utc.js';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks$1(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks$1(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks$1(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}
const isBrowser = "undefined" !== "undefined";
function createDebugger(hooks, _options = {}) {
	const options = {
		inspect: isBrowser,
		group: isBrowser,
		filter: () => true,
		..._options
	};
	const _filter = options.filter;
	const filter = typeof _filter === "string" ? (name) => name.startsWith(_filter) : _filter;
	const _tag = options.tag ? `[${options.tag}] ` : "";
	const logPrefix = (event) => _tag + event.name + "".padEnd(event._id, "\0");
	const _idCtr = {};
	const unsubscribeBefore = hooks.beforeEach((event) => {
		if (filter !== void 0 && !filter(event.name)) return;
		_idCtr[event.name] = _idCtr[event.name] || 0;
		event._id = _idCtr[event.name]++;
		console.time(logPrefix(event));
	});
	const unsubscribeAfter = hooks.afterEach((event) => {
		if (filter !== void 0 && !filter(event.name)) return;
		if (options.group) console.groupCollapsed(event.name);
		if (options.inspect) console.timeLog(logPrefix(event), event.args);
		else console.timeEnd(logPrefix(event));
		if (options.group) console.groupEnd();
		_idCtr[event.name]--;
	});
	return { close: () => {
		unsubscribeBefore();
		unsubscribeAfter();
	} };
}

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance();
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}

var captureStackTrace = Error.captureStackTrace;
var Diagnostic = class Diagnostic extends Error {
	name;
	/**
	* The diagnostic code, e.g. `MATH_E001`.
	* Also appears as the `name` property.
	*/
	code;
	/**
	* URL to extended documentation for this diagnostic code.
	* Auto-generated from {@link DefineDiagnosticsOptions.docsBase}.
	*/
	docs;
	/**
	* Optional actionable instructions on how to resolve the problem.
	*/
	fix;
	/**
	* Locations in user code that contributed to this diagnostic, in
	* `file:line:column` format. Relevant when the stack trace doesn't reflect
	* the user's source (e.g. compilers, bundlers), otherwise redundant with the
	* stack and should be omitted.
	*/
	sources;
	/**
	* Alias for {@link Error.message}: the reason this diagnostic was raised.
	*/
	get why() {
		return this.message;
	}
	/**
	* @param init        structured initializer; `why` is required
	* @param captureFrom V8 stack-cutoff frame. Defaults to {@link Diagnostic}
	* so the top of the trace is the `new Diagnostic(...)` call site.
	* `defineDiagnostics` passes its action method to strip its own frames too.
	* Ignored on engines without `Error.captureStackTrace`.
	*/
	constructor(init, captureFrom = Diagnostic) {
		super(init.why, { cause: init.cause });
		this.code = this.name = init.code;
		this.fix = init.fix;
		this.docs = init.docs;
		this.sources = init.sources;
		captureStackTrace?.(this, captureFrom);
	}
	/**
	* Converts the diagnostic into a serializable structured object.
	*/
	toJSON() {
		return {
			name: this.name,
			why: this.why,
			fix: this.fix,
			docs: this.docs,
			sources: this.sources,
			cause: this.cause,
			stack: this.stack
		};
	}
};
/**
* Resolves the docs URL for a code from a `docsBase` (string template or
* resolver function). Shared by {@link defineDiagnostics} and
* {@link defineProdDiagnostics}. Per-code `docs` overrides are handled by the
* caller; this only covers the `docsBase`-derived case.
*
* @internal
*/
function deriveDocs(docsBase, code) {
	return typeof docsBase === "string" ? `${docsBase}/${code.toLowerCase()}` : docsBase?.(code);
}
/**
* Production counterpart to {@link defineDiagnostics}. Returns a `Proxy` that
* builds a minimal {@link Diagnostic} for any accessed code: the code becomes
* the instance `name`, `docs` is derived from `docsBase`, and `why` points to
* the docs URL when one exists (empty otherwise, so the thrown header is just
* the code). It carries no catalog text, so it stays tiny in a bundle.
*
* The strip plugin (`@nostics/unplugin`) can rewrite a `defineDiagnostics()`
* call into a `"production" === 'production'` ternary that selects this
* factory in production, dropping every `why`/`fix` string from the bundle.
*
* @example
* ```ts
* const diagnostics = defineProdDiagnostics({ docsBase: 'https://docs.example.com' })
* throw diagnostics.NUXT_B2011() // NUXT_B2011: https://docs.example.com/nuxt_b2011
* ```
*/
/* @__NO_SIDE_EFFECTS__ */
function defineProdDiagnostics(options = {}) {
	const { docsBase, reporters = [] } = options;
	return new Proxy({}, { get(_target, code) {
		if (typeof code !== "string") return void 0;
		const handle = (params = {}, reporterOptions = {}) => {
			const docs = deriveDocs(docsBase, code);
			const diagnostic = new Diagnostic({
				code,
				why: docs ?? "",
				docs,
				cause: params.cause,
				sources: params.sources
			}, handle);
			for (const reporter of reporters) reporter(diagnostic, reporterOptions);
			return diagnostic;
		};
		return handle;
	} });
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
var fetchDefaults = {};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.5.1";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.12.0 */
function registerPluginHooks(nuxtApp, plugin) {
	if (plugin.hooks) nuxtApp.hooks.addHooks(plugin.hooks);
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	return applyPluginsWithDependencies(nuxtApp, plugins);
}
async function applyPluginsWithDependencies(nuxtApp, plugins) {
	const resolvedPlugins = /* @__PURE__ */ new Set();
	const unresolvedPlugins = [];
	const parallels = [];
	let error;
	let promiseDepth = 0;
	async function executePlugin(plugin) {
		const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
		if (unresolvedPluginsForThisPlugin.length > 0) unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
		else {
			const promise = applyPlugin(nuxtApp, plugin).then(async () => {
				if (plugin._name) {
					resolvedPlugins.add(plugin._name);
					await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
						if (dependsOn.has(plugin._name)) {
							dependsOn.delete(plugin._name);
							if (dependsOn.size === 0) {
								promiseDepth++;
								await executePlugin(unexecutedPlugin);
							}
						}
					}));
				}
			}).catch((e) => {
				if (!plugin.parallel && !nuxtApp.payload.error) throw e;
				error ||= e;
			});
			if (plugin.parallel) parallels.push(promise);
			else await promise;
		}
	}
	for (const plugin of plugins) registerPluginHooks(nuxtApp, plugin);
	for (const plugin of plugins) await executePlugin(plugin);
	await Promise.all(parallels);
	if (promiseDepth) for (let i = 0; i < promiseDepth; i++) await Promise.all(parallels);
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
var definePayloadPlugin = defineNuxtPlugin;
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => args ? setup(...args) : setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}

//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/utils.js
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var LayoutSymbol = Symbol("layout");
var PageRouteSymbol = Symbol("route");
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = () => {
	return useNuxtApp()?.$router;
};
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = scope.parent;
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var addRouteMiddleware = (name, middleware, options = {}) => {
	const nuxtApp = useNuxtApp();
	const global = options.global || typeof name !== "string";
	const mw = middleware;
	if (!mw) {
		navigationDiagnostics.NUXT_E2006({ cause: name });
		return;
	}
	if (global) nuxtApp._middleware.global.push(mw);
	else nuxtApp._middleware.named[name] = mw;
};
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol$1(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL$1((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL$1(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery$1(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL$1(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL$1(url);
	return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$1 = (error) => {
	if (typeof error !== "string" && error.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController: AbortController$1 });
const $fetch$2 = ofetch;

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch$2.create({ baseURL: baseURL() });
var $fetch$1$2 = globalThis.$fetch;
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return initialValue;
		}
		state.value = initialValue;
	}
	return state;
}

//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/utils.js
/**
* Internal utility
* @private
*/
var _wrapInTransition = (props, children) => {
	return { default: () => children.default?.() };
};
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
function generateRouteKey$1(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey$1(to) !== generateRouteKey$1(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
/** Return `tag` if it is a safe HTML tag name, otherwise `fallback`. */
function sanitizeTag(tag, fallback) {
	return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}
function toArray$1(value) {
	return Array.isArray(value) ? value : [value];
}
/**
* Internal utility
* @private
*/
function _mergeTransitionProps(routeProps) {
	const _props = [];
	for (const prop of routeProps) {
		if (!prop) continue;
		_props.push({
			...prop,
			onAfterLeave: prop.onAfterLeave ? toArray$1(prop.onAfterLeave) : void 0,
			onBeforeLeave: prop.onBeforeLeave ? toArray$1(prop.onBeforeLeave) : void 0
		});
	}
	return defu(..._props);
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(selector) {
	try {
		const elem = (void 0).querySelector(selector);
		if (elem) return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
	} catch {}
	return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	...router_options_default
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/nuxt-link.js
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/**
* Reject URL strings that would resolve to a script-capable protocol when used as the
* `href` of an anchor element. Returns the value unchanged when safe, or `null`.
*
* The denylist is delegated to `ufo`'s `isScriptProtocol` so it stays in sync with the
* check used by `navigateTo` (currently `javascript:`, `data:`, `vbscript:`, `blob:`).
* ASCII whitespace and control characters are stripped first because browser URL
* parsers tolerate them before the scheme, and `view-source:` is peeled recursively
* because Chromium resolves it transparently to the inner URL.
*/
function sanitizeExternalHref(value) {
	let candidate = value.replace(/[\u0000-\u001F\s]+/g, "");
	while (candidate.toLowerCase().startsWith("view-source:")) candidate = candidate.slice(12);
	const colon = candidate.indexOf(":");
	if (colon > 0 && isScriptProtocol(candidate.slice(0, colon + 1))) return null;
	return value;
}
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const config = /* @__PURE__ */ useRuntimeConfig();
		const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			return typeof path === "string" && hasProtocol$1(path, { acceptRelative: true });
		});
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const isExternal = computed(() => {
			if (unref(props.external)) return true;
			const path = unref(props.to) || unref(props.href) || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
		});
		const link = isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to,
			viewTransition: unref(props.viewTransition)
		});
		const href = computed(() => {
			const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
				const raw = to.value;
				return typeof raw === "string" ? sanitizeExternalHref(raw) : raw;
			}
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				const href = typeof path === "object" ? router.resolve(path).href : path;
				const safe = typeof href === "string" ? sanitizeExternalHref(href) : href;
				return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			return applyTrailingSlashBehavior(joinURL$1(config.app.baseURL, to.value), effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			href,
			isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(to.value)),
			async navigate(_e) {
				if (href.value === null) return;
				await navigateTo(href.value, {
					replace: unref(props.replace),
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	return defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			href: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			target: {
				type: String,
				default: void 0,
				required: false
			},
			rel: {
				type: String,
				default: void 0,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				default: void 0,
				required: false
			},
			exactActiveClass: {
				type: String,
				default: void 0,
				required: false
			},
			prefetchedClass: {
				type: String,
				default: void 0,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				default: void 0,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				default: void 0,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots }) {
			const router = useRouter();
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
			const prefetched = shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			function shouldPrefetch(mode) {
				return false;
			}
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				const target = props.target || null;
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				const getCustomSlotProps = (routerLinkSlotProps) => ({
					href: href.value,
					navigate,
					get route() {
						if (!href.value) return;
						const url = new URL(href.value, "http://localhost");
						return {
							path: url.pathname,
							fullPath: url.pathname,
							get query() {
								return parseQuery$1(url.search);
							},
							hash: url.hash,
							params: {},
							name: void 0,
							matched: [],
							redirectedFrom: void 0,
							meta: {},
							href: href.value
						};
					},
					rel,
					target,
					isExternal: isExternal.value || hasTarget.value,
					isActive: false,
					isExactActive: false,
					...routerLinkSlotProps,
					prefetch,
					prefetched: prefetched.value,
					shouldPrefetch
				});
				if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(resolveComponent("RouterLink"), routerLinkProps, props.custom && slots.default ? { default: (slotProps) => slots.default(getCustomSlotProps(slotProps)) } : slots.default);
				}
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default(getCustomSlotProps());
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: async (event) => {
						if (isExternal.value || hasTarget.value) return;
						event.preventDefault();
						try {
							const encodedHref = encodeRoutePath(href.value ?? "");
							return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
						} finally {}
					}
				}, slots.default?.());
			};
		}
	});
}
var NuxtLink = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
	if (trailingSlash !== "append" && trailingSlash !== "remove") return to;
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash$1 : withoutTrailingSlash$1;
	if (hasProtocol$1(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}

//#region src/index.ts
/**
* Compute the 64-bit FNV-1a hash of a string as two 32-bit lanes.
*
* This is the fast core: no BigInt, no allocations, plain `Math.imul`-free
* 32-bit arithmetic. Prefer {@link fnv1a64Hex} or {@link fnv1a64Base36} for a
* usable key; use this directly only when you want to avoid string formatting.
*
* The hash is computed over UTF-16 code units (`str.charCodeAt(i)`), not UTF-8
* bytes. For ASCII input this matches a canonical FNV-1a-64; for non-ASCII it
* does not. See the README for details.
*
* @param str - The string to hash.
* @returns The `{ high, low }` 32-bit lanes of the 64-bit hash.
*/
function fnv1a64(str) {
	const len = str.length;
	let i = 0;
	let t0 = 0;
	let v0 = 8997;
	let t1 = 0;
	let v1 = 33826;
	let t2 = 0;
	let v2 = 40164;
	let t3 = 0;
	let v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return {
		high: (v3 << 16 | v2) >>> 0,
		low: (v1 << 16 | v0) >>> 0
	};
}
/**
* Compute the 64-bit FNV-1a hash of a string as a `bigint`.
*
* Ergonomic and comparable, at the cost of composing the two lanes into a
* `bigint`. For a compact string key, prefer {@link fnv1a64Base36}.
*
* @param str - The string to hash.
* @returns The 64-bit hash as an unsigned `bigint`.
*/
function fnv1a64BigInt(str) {
	const { high, low } = fnv1a64(str);
	return BigInt(high) << 32n | BigInt(low);
}
const hexDigits = "0123456789abcdef";
/**
* Every byte value rendered as its two hex digits, so a 32-bit lane formats in
* 4 lookups instead of `toString(16)` plus a `padStart`. Leading zeros are
* intrinsic to the table, which is what makes the padding free.
*/
Array.from({ length: 256 }, (_, i) => hexDigits.charAt(i >> 4) + hexDigits.charAt(i & 15));
/**
* Compute the 64-bit FNV-1a hash of a string as a base36 string.
*
* This is the shortest textual form (up to 13 characters) and is ideal for
* cache keys. The length varies with the value; it is not zero-padded. Equal
* inputs always produce identical strings.
*
* @param str - The string to hash.
* @returns A base36 string of the 64-bit hash.
*/
function fnv1a64Base36(str) {
	return fnv1a64BigInt(str).toString(36);
}

function walk(input, seen) {
	if (input === null) return "L";
	let out, i = 0, keys = input, tmp = typeof input;
	if (tmp !== "object") {
		if (tmp === "number") return input - input === 0 ? "n" + input : "L";
		if (tmp === "string") return "s" + input;
		if (tmp === "bigint") return "n" + input;
		if (tmp === "boolean") return input ? "T" : "F";
		return;
	}
	let is_arr = Array.isArray(input);
	if (!is_arr) {
		if (input instanceof Date) return "d" + +input;
		if (input instanceof RegExp) return "r" + input.source + input.flags;
	}
	tmp = seen.indexOf(input);
	if (~tmp) return "~" + (tmp + 1);
	if (typeof input.toJSON === "function" && !ArrayBuffer.isView(input)) {
		input = input.toJSON();
		if (input === null || typeof input !== "object") return walk(input, seen);
		tmp = seen.indexOf(input);
		if (~tmp) return "~" + (tmp + 1);
		is_arr = Array.isArray(input);
	}
	seen.push(keys);
	if (is_arr) {
		for (out = "a"; i < input.length; out += (tmp = walk(input[i++], seen)) === undefined ? "L" : tmp);
	} else if (input instanceof Set) {
		out = "e";
		for (let value of input) out += (tmp = walk(value, seen)) === undefined ? "L" : tmp;
	} else if (input instanceof Map) {
		keys = [...input.keys()];
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) {
			if ((tmp = walk(input.get(keys[i]), seen)) !== undefined) out += keys[i] + tmp;
		}
	} else if (input[Symbol.toStringTag] === undefined || ArrayBuffer.isView(input)) {
		keys = Object.keys(input);
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) {
			if ((tmp = walk(input[keys[i]], seen)) !== undefined) out += keys[i] + tmp;
		}
	} else {
		throw new Error("Unsupported value");
	}
	seen.pop();
	return out;
}
/**
* Canonicalize a value into a stable identity string. Two structurally-equal
* inputs return the same id, regardless of key order.
*
* @example
* ```ts
* identify({ a: 1, b: 2 }) === identify({ b: 2, a: 1 }); // true
* ```
*/
function identify(input) {
	return walk(input, []) ?? "U";
}

//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var sensitiveMatcher = (m, p) => {
	return [];
};
var foldedMatcher = sensitiveMatcher;
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.sensitive ? defu$1({}, ...sensitiveMatcher().map((r) => r.data).reverse()) : defu$1({}, ...foldedMatcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/manifest.js
var routeRulesMatcher$1 = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher$1(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/ssr.js
var $fetch$1$1 = $fetch$1$2;
/** @since 3.0.0 */
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
function useRequestHeaders(include) {
	const event = useRequestEvent();
	const _headers = event ? getRequestHeaders$1(event) : {};
	if (!include || !event) return _headers;
	const headers = Object.create(null);
	for (const _key of include) {
		const key = _key.toLowerCase();
		const header = _headers[key];
		if (header) headers[key] = header;
	}
	return headers;
}
/** @since 3.2.0 */
function useRequestFetch() {
	return useRequestEvent()?.$fetch || $fetch$1$1;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/utils/hash.js
/**
* Hash an arbitrary value into a short, stable string key.
*
* Values are serialized to a canonical, locale-independent representation
* (equal structures hash equally regardless of key order or runtime locale),
* then digested with a fast non-cryptographic hash. This is what `useFetch` and
* `useAsyncData` use internally to derive their cache keys, so it is safe to use
* for the same purpose in your own code.
*
* The digest is non-cryptographic and must not be used for integrity checks.
*
* @since 4.5.0
*/
function hashKey(value) {
	return fnv1a64Base36(identify(value));
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/utils/debounce-tick.js
/**
* Debounce an async function so that repeated calls within the same tick are
* collapsed into a single call (plus a trailing call if arguments arrived
* while the debounced call was still pending).
*
* Adapted from https://github.com/unjs/perfect-debounce with the timeout
* replaced by Vue's post-flush callback queue.
*/
function debounceTick(fn, options = {}) {
	let leadingValue;
	let active = false;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		const promise = _applyPromised(fn, _this, args);
		currentPromise = promise;
		promise.finally(() => {
			currentPromise = void 0;
			if (trailingArgs && !active) {
				const args = trailingArgs;
				trailingArgs = void 0;
				applyFn(_this, args);
			}
		});
		return promise;
	};
	return function(...args) {
		trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = options.leading && !active;
			if (!active) {
				active = true;
				queuePostFlushCb(() => {
					active = false;
					const flushArgs = trailingArgs ?? args;
					trailingArgs = void 0;
					const promise = options.leading ? leadingValue : applyFn(this, flushArgs);
					for (const _resolve of resolveList) _resolve(promise);
					resolveList = [];
				});
			}
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			return createElementBlock(sanitizeTag(props.fallbackTag || props.placeholderTag, "span"), attrs, fallbackStr);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/compiler/runtime/index.js
/**
* Define a factory for a function that should be registered for automatic key injection.
* @since 4.2.0
* @param factory
*/
function defineKeyedFunctionFactory(factory) {
	const placeholder = function() {
		throw appDiagnostics.NUXT_E1007({ name: factory.name });
	};
	return Object.defineProperty(placeholder, "__nuxt_factory", {
		enumerable: false,
		get: () => factory.factory
	});
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/data.js
/**
* E3xxx
* Data fetching (useFetch / useAsyncData) runtime diagnostics.
*/
var dataDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/asyncData.js
var createUseAsyncData = defineKeyedFunctionFactory({
	name: "createUseAsyncData",
	factory(options = {}) {
		function useAsyncData(...args) {
			const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
			if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
			let [_key, _handler, opts = {}] = args;
			const key = isRef(_key) || typeof _key === "function" ? computed(() => toValue(_key)) : { value: _key };
			if (!key.value || typeof key.value !== "string") throw dataDiagnostics.NUXT_E3008();
			if (typeof _handler !== "function") throw dataDiagnostics.NUXT_E3009();
			const shouldFactoryOptionsOverride = typeof options === "function";
			const nuxtApp = useNuxtApp();
			const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
			if (!shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				if (opts[key] !== void 0) continue;
				opts[key] = factoryOptions[key];
			}
			opts.server ??= true;
			opts.default ??= getDefault;
			opts.getCachedData ??= getDefaultCachedData;
			opts.lazy ??= false;
			opts.immediate ??= true;
			opts.deep ??= asyncDataDefaults.deep;
			opts.dedupe ??= "cancel";
			opts.enabled ??= true;
			if (shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				opts[key] = factoryOptions[key];
			}
			nuxtApp._asyncData[key.value];
			function createInitialFetch() {
				const initialFetchOptions = {
					cause: "initial",
					dedupe: opts.dedupe
				};
				const existing = nuxtApp._asyncData[key.value];
				if (!existing?._init) {
					initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
					nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
					nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
				} else if (nuxtApp._asyncDataPromises[key.value]) initialFetchOptions.cachedData = existing._initialCachedData;
				return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
			}
			const initialFetch = createInitialFetch();
			const asyncData = nuxtApp._asyncData[key.value];
			asyncData._deps++;
			if (opts.server !== false && nuxtApp.payload.serverRendered && opts.immediate) {
				const promise = initialFetch();
				if (getCurrentInstance()) onServerPrefetch(() => promise);
				else nuxtApp.hook("app:created", async () => {
					await promise;
				});
			}
			const asyncReturn = {
				data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
				pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
				status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
				error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
				refresh: (...args) => {
					if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
					return nuxtApp._asyncData[key.value].execute(...args);
				},
				execute: (...args) => asyncReturn.refresh(...args),
				clear: () => {
					const entry = nuxtApp._asyncData[key.value];
					if (entry?._abortController) try {
						entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
					} finally {
						entry._abortController = void 0;
					}
					clearNuxtDataByKey(nuxtApp, key.value);
				}
			};
			const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
			Object.assign(asyncDataPromise, asyncReturn);
			Object.defineProperties(asyncDataPromise, {
				then: {
					enumerable: true,
					value: asyncDataPromise.then.bind(asyncDataPromise)
				},
				catch: {
					enumerable: true,
					value: asyncDataPromise.catch.bind(asyncDataPromise)
				},
				finally: {
					enumerable: true,
					value: asyncDataPromise.finally.bind(asyncDataPromise)
				}
			});
			return asyncDataPromise;
		}
		return useAsyncData;
	}
});
var useAsyncData = createUseAsyncData.__nuxt_factory();
createUseAsyncData.__nuxt_factory({
	lazy: true,
	_functionName: "useLazyAsyncData"
});
function writableComputedRef(getter) {
	return computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref = getter();
			if (ref) ref.value = value;
		}
	});
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	delete nuxtApp.payload.data[key];
	delete nuxtApp.payload._errors[key];
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
		nuxtApp._asyncData[key].error.value = void 0;
		nuxtApp._asyncData[key].status.value = "idle";
		nuxtApp._asyncData[key]._initialCachedData = void 0;
	}
	delete nuxtApp._asyncDataPromises[key];
}
function pick$1(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= void 0;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = _handler ;
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData !== void 0;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: computed(() => asyncData.status.value === "pending"),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if ((opts.dedupe ?? options.dedupe) === "defer") return nuxtApp._asyncDataPromises[key];
			}
			{
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData !== void 0) {
					nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
					asyncData.error.value = void 0;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			if (toValue(options.enabled) === false) return Promise.resolve(asyncData.data.value);
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const cleanupController = new AbortController();
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, {
						once: true,
						signal: cleanupController.signal
					});
					return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return;
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick$1(result, options.pick);
				nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = void 0;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return nuxtApp._asyncDataPromises[key];
				if (asyncData._abortController?.signal.aborted) return nuxtApp._asyncDataPromises[key];
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return nuxtApp._asyncDataPromises[key];
				}
				asyncData.error.value = createError$1(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				cleanupController.abort();
				if (nuxtApp._asyncDataPromises[key] === promise) delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounceTick((...args) => asyncData.execute(...args)),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (nuxtApp._asyncDataPromises[key]) {
				asyncData._abortController?.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
				delete nuxtApp._asyncDataPromises[key];
			}
			if (!hasCustomGetCachedData) nextTick(() => {
				if (!nuxtApp._asyncData[key]?._init) {
					clearNuxtDataByKey(nuxtApp, key);
					asyncData.execute = () => Promise.resolve();
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => void 0;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, {
		once: true,
		signal: cleanupSignal
	});
	return controller.signal;
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/fetch.js
var $fetch$1 = $fetch$1$2;
var MAYBE_REF_OR_GETTER_OPTION_KEYS = [
	"method",
	"baseURL",
	"query",
	"params",
	"body",
	"headers"
];
function generateOptionSegments(opts) {
	const segments = [toValue(opts.method)?.toUpperCase() || "GET", toValue(opts.baseURL)];
	for (const _obj of [opts.query || opts.params]) {
		const obj = toValue(_obj);
		if (!obj) continue;
		const unwrapped = {};
		for (const [key, value] of Object.entries(obj)) unwrapped[toValue(key)] = toValue(value);
		segments.push(unwrapped);
	}
	if (opts.body) {
		const value = toValue(opts.body);
		if (!value) segments.push(hashKey(value));
		else if (value instanceof ArrayBuffer) segments.push(hashKey(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
		else if (value instanceof FormData) {
			const entries = [];
			for (const entry of value.entries()) {
				const [key, val] = entry;
				entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
			}
			segments.push(hashKey(entries));
		} else if (isPlainObject$1(value)) segments.push(hashKey(reactive(value)));
		else try {
			segments.push(hashKey(value));
		} catch {
			dataDiagnostics.NUXT_E3002({ cause: value });
		}
	}
	return segments;
}
/**
* A factory function to create a custom `useFetch` composable with pre-defined default options.
* @since 4.2.0
*/
var createUseFetch = defineKeyedFunctionFactory({
	name: "createUseFetch",
	factory(options = {}) {
		function useFetch(request, arg1, arg2) {
			const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
			const factoryOptions = typeof options === "function" ? options(opts) : options;
			const { server, lazy, default: defaultFn, transform, pick, watch: watchSources, immediate, getCachedData, deep, dedupe, timeout, enabled, ...fetchOptions } = {
				...typeof options === "function" ? {} : factoryOptions,
				...opts,
				...typeof options === "function" ? factoryOptions : {}
			};
			const _request = computed(() => toValue(request));
			const key = computed(() => toValue(fetchOptions.key) || "$f" + hashKey([
				autoKey,
				typeof _request.value === "string" ? _request.value : "",
				...generateOptionSegments(fetchOptions)
			]));
			if (!fetchOptions.baseURL && typeof _request.value === "string" && _request.value[0] === "/" && _request.value[1] === "/") throw dataDiagnostics.NUXT_E3001({ url: _request.value });
			const _fetchOptions = reactive({
				...fetchDefaults,
				...fetchOptions,
				cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
			});
			const _asyncDataOptions = {
				server,
				lazy,
				default: defaultFn,
				transform,
				pick,
				immediate,
				getCachedData,
				deep,
				dedupe,
				timeout,
				enabled,
				watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
			};
			if (watchSources === false) _asyncDataOptions._keyTriggersExecute = false;
			return useAsyncData(key, (_, { signal }) => {
				let _$fetch = fetchOptions.$fetch || $fetch$1;
				if (!fetchOptions.$fetch) {
					if (typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/")) _$fetch = useRequestFetch();
				}
				const resolvedOptions = {
					signal,
					..._fetchOptions
				};
				for (const key of MAYBE_REF_OR_GETTER_OPTION_KEYS) if (typeof resolvedOptions[key] === "function") resolvedOptions[key] = toValue(resolvedOptions[key]);
				return _$fetch(_request.value, resolvedOptions);
			}, _asyncDataOptions);
		}
		return useFetch;
	}
});
createUseFetch.__nuxt_factory();
createUseFetch.__nuxt_factory({
	lazy: true,
	_functionName: "useLazyFetch"
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/composables/layout.js
var routeRulesMatcher = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function resolveLayoutName(route, name) {
	return unref(name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path ?? "/").appLayout ?? "default";
}

//#region node_modules/vuetify/lib/util/console.js
function consoleWarn(message) {
	warn(`Vuetify: ${message}`);
}
function consoleError(message) {
	warn(`Vuetify error: ${message}`);
}
function deprecate(original, replacement) {
	replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map((s) => `'${s}'`).join(", ") + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
	warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
}
var PREFERS_REDUCED_MOTION = () => false;
//#endregion
//#region node_modules/vuetify/lib/util/helpers.js
function getNestedValue(obj, path, fallback) {
	const last = path.length - 1;
	if (last < 0) return obj === void 0 ? fallback : obj;
	for (let i = 0; i < last; i++) {
		if (obj == null) return fallback;
		obj = obj[path[i]];
	}
	if (obj == null) return fallback;
	return obj[path[last]] === void 0 ? fallback : obj[path[last]];
}
function getObjectValueByPath(obj, path, fallback) {
	if (obj == null || !path || typeof path !== "string") return fallback;
	if (obj[path] !== void 0) return obj[path];
	path = path.replace(/\[(\w+)\]/g, ".$1");
	path = path.replace(/^\./, "");
	return getNestedValue(obj, path.split("."), fallback);
}
function getPropertyFromItem(item, property, fallback) {
	if (property === true) return item === void 0 ? fallback : item;
	if (property == null || typeof property === "boolean") return fallback;
	if (item !== Object(item)) {
		if (typeof property !== "function") return fallback;
		const value = property(item, fallback);
		return typeof value === "undefined" ? fallback : value;
	}
	if (typeof property === "string") return getObjectValueByPath(item, property, fallback);
	if (Array.isArray(property)) return getNestedValue(item, property, fallback);
	if (typeof property !== "function") return fallback;
	const value = property(item, fallback);
	return typeof value === "undefined" ? fallback : value;
}
function createRange(length, start = 0) {
	return Array.from({ length }, (v, k) => start + k);
}
function convertToUnit(str, unit = "px") {
	if (str == null || str === "") return;
	const num = Number(str);
	if (isNaN(num)) return String(str);
	else if (!isFinite(num)) return;
	else return `${num}${unit}`;
}
function isObject(obj) {
	return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function isPlainObject(obj) {
	let proto;
	return obj !== null && typeof obj === "object" && ((proto = Object.getPrototypeOf(obj)) === Object.prototype || proto === null);
}
function refElement(obj) {
	if (obj && "$el" in obj) {
		const el = obj.$el;
		if (el?.nodeType === Node.TEXT_NODE) return el.nextElementSibling;
		return el;
	}
	return obj;
}
function keys(o) {
	return Object.keys(o);
}
function has(obj, key) {
	return key.every((k) => obj.hasOwnProperty(k));
}
function pick(obj, paths) {
	const found = {};
	for (const key of paths) if (Object.prototype.hasOwnProperty.call(obj, key)) found[key] = obj[key];
	return found;
}
function pickWithRest(obj, paths, exclude) {
	const found = Object.create(null);
	const rest = Object.create(null);
	for (const key in obj) if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key) && true) found[key] = obj[key];
	else rest[key] = obj[key];
	return [found, rest];
}
function omit(obj, exclude) {
	const clone = { ...obj };
	exclude.forEach((prop) => delete clone[prop]);
	return clone;
}
var onRE = /^on[^a-z]/;
var bubblingEvents = [
	"onAfterscriptexecute",
	"onAnimationcancel",
	"onAnimationend",
	"onAnimationiteration",
	"onAnimationstart",
	"onAuxclick",
	"onBeforeinput",
	"onBeforescriptexecute",
	"onChange",
	"onClick",
	"onCompositionend",
	"onCompositionstart",
	"onCompositionupdate",
	"onContextmenu",
	"onCopy",
	"onCut",
	"onDblclick",
	"onFocusin",
	"onFocusout",
	"onFullscreenchange",
	"onFullscreenerror",
	"onGesturechange",
	"onGestureend",
	"onGesturestart",
	"onGotpointercapture",
	"onInput",
	"onKeydown",
	"onKeypress",
	"onKeyup",
	"onLostpointercapture",
	"onMousedown",
	"onMousemove",
	"onMouseout",
	"onMouseover",
	"onMouseup",
	"onMousewheel",
	"onPaste",
	"onPointercancel",
	"onPointerdown",
	"onPointerenter",
	"onPointerleave",
	"onPointermove",
	"onPointerout",
	"onPointerover",
	"onPointerup",
	"onReset",
	"onSelect",
	"onSubmit",
	"onTouchcancel",
	"onTouchend",
	"onTouchmove",
	"onTouchstart",
	"onTransitioncancel",
	"onTransitionend",
	"onTransitionrun",
	"onTransitionstart",
	"onWheel"
];
/**
* Filter attributes that should be applied to
* the root element of an input component. Remaining
* attributes should be passed to the <input> element inside.
*/
function filterInputAttrs(attrs) {
	const [events, props] = pickWithRest(attrs, [onRE]);
	const inputEvents = omit(events, bubblingEvents);
	const [rootAttrs, inputAttrs] = pickWithRest(props, [
		"class",
		"style",
		"id",
		"inert",
		/^data-/
	]);
	Object.assign(rootAttrs, events);
	Object.assign(inputAttrs, inputEvents);
	return [rootAttrs, inputAttrs];
}
function wrapInArray(v) {
	return v == null ? [] : Array.isArray(v) ? v : [v];
}
function clamp(value, min = 0, max = 1) {
	return Math.max(min, Math.min(max, value));
}
function padEnd(str, length, char = "0") {
	return str + char.repeat(Math.max(0, length - str.length));
}
function padStart(str, length, char = "0") {
	return char.repeat(Math.max(0, length - str.length)) + str;
}
function chunk(str, size = 1) {
	const chunked = [];
	let index = 0;
	while (index < str.length) {
		chunked.push(str.substr(index, size));
		index += size;
	}
	return chunked;
}
function mergeDeep(source = {}, target = {}, arrayFn, targetCondition) {
	const out = {};
	for (const key in source) out[key] = source[key];
	for (const key in target) {
		const targetProperty = target[key];
		if (targetCondition && !targetCondition(key, targetProperty)) continue;
		const sourceProperty = source[key];
		if (isPlainObject(sourceProperty) && isPlainObject(targetProperty)) {
			out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn, targetCondition);
			continue;
		}
		out[key] = targetProperty;
	}
	return out;
}
function flattenFragments(nodes) {
	return nodes.map((node) => {
		if (node.type === Fragment) return flattenFragments(node.children);
		else return node;
	}).flat();
}
function toKebabCase(str = "") {
	if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
	const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
	toKebabCase.cache.set(str, kebab);
	return kebab;
}
toKebabCase.cache = /* @__PURE__ */ new Map();
function findChildrenWithProvide(key, vnode) {
	if (!vnode || typeof vnode !== "object") return [];
	if (Array.isArray(vnode)) return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
	else if (vnode.suspense) return findChildrenWithProvide(key, vnode.ssContent);
	else if (Array.isArray(vnode.children)) return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
	else if (vnode.component) {
		if (Object.getOwnPropertyDescriptor(vnode.component.provides, key)) return [vnode.component];
		else if (vnode.component.subTree) return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
	}
	return [];
}
var CircularBuffer = class {
	#arr = [];
	#pointer = 0;
	constructor(size) {
		this.size = size;
	}
	get isFull() {
		return this.#arr.length === this.size;
	}
	push(val) {
		this.#arr[this.#pointer] = val;
		this.#pointer = (this.#pointer + 1) % this.size;
	}
	values() {
		return this.#arr.slice(this.#pointer).concat(this.#arr.slice(0, this.#pointer));
	}
	clear() {
		this.#arr.length = 0;
		this.#pointer = 0;
	}
};
/**
* Convert a computed ref to a record of refs.
* The getter function must always return an object with the same keys.
*/
function destructComputed(getter) {
	const refs = reactive({});
	watchEffect(() => {
		const base = getter();
		for (const key in base) refs[key] = base[key];
	}, { flush: "sync" });
	const obj = {};
	for (const key in refs) obj[key] = toRef(() => refs[key]);
	return obj;
}
/** Array.includes but value can be any type */
function includes(arr, val) {
	return arr.includes(val);
}
var EventProp = () => [Function, Array];
function hasEvent(props, name) {
	name = "on" + capitalize(name);
	return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler, ...args) {
	if (Array.isArray(handler)) for (const h of handler) h(...args);
	else if (typeof handler === "function") handler(...args);
}
function focusableChildren(el, filterByTabIndex = true) {
	const targets = [
		"button",
		"[href]",
		"input:not([type=\"hidden\"])",
		"select",
		"textarea",
		"details:not(:has(> summary))",
		"details > summary",
		"[tabindex]",
		"[contenteditable]:not([contenteditable=\"false\"])",
		"audio[controls]",
		"video[controls]"
	].map((s) => `${s}${filterByTabIndex ? ":not([tabindex=\"-1\"])" : ""}:not([disabled], [inert])`).join(", ");
	let elements;
	try {
		elements = [...el.querySelectorAll(targets)];
	} catch (err) {
		consoleError(String(err));
		return [];
	}
	return elements.filter((x) => !x.closest("[inert]")).filter((x) => !!x.offsetParent || x.getClientRects().length > 0).filter((x) => !x.parentElement?.closest("details:not([open])") || x.tagName === "SUMMARY" && x.parentElement?.tagName === "DETAILS");
}
function getNextElement(elements, location, condition) {
	let _el;
	let idx = elements.indexOf((void 0).activeElement);
	const inc = location === "next" ? 1 : -1;
	do {
		idx += inc;
		_el = elements[idx];
	} while ((!_el || _el.offsetParent == null || !(condition?.(_el) ?? true)) && idx < elements.length && idx >= 0);
	return _el;
}
function focusChild(el, location) {
	const focusable = focusableChildren(el);
	if (location == null) {
		if (el === (void 0).activeElement || !el.contains((void 0).activeElement)) focusable[0]?.focus();
	} else if (location === "first") focusable[0]?.focus();
	else if (location === "last") focusable.at(-1)?.focus();
	else if (typeof location === "number") focusable[location]?.focus();
	else {
		const _el = getNextElement(focusable, location);
		if (_el) _el.focus();
		else focusChild(el, location === "next" ? "first" : "last");
	}
}
/** Returns null if the selector is not supported or we can't check */
function matchesSelector(el, selector) {
	return null;
}
function defer(timeout, cb) {
	cb();
	return () => {};
}
function isClickInsideElement(event, targetDiv) {
	const mouseX = event.clientX;
	const mouseY = event.clientY;
	const divRect = targetDiv.getBoundingClientRect();
	const divLeft = divRect.left;
	const divTop = divRect.top;
	const divRight = divRect.right;
	const divBottom = divRect.bottom;
	return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
}
function templateRef() {
	const el = shallowRef();
	const fn = (target) => {
		el.value = target;
	};
	Object.defineProperty(fn, "value", {
		enumerable: true,
		get: () => el.value,
		set: (val) => el.value = val
	});
	Object.defineProperty(fn, "el", {
		enumerable: true,
		get: () => refElement(el.value)
	});
	return fn;
}
function isPrimitive(value) {
	return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "bigint";
}
function onlyDefinedProps(props) {
	const booleanAttributes = ["checked", "disabled"];
	return Object.fromEntries(Object.entries(props).filter(([key, v]) => booleanAttributes.includes(key) ? !!v : v !== void 0));
}
//#endregion
//#region node_modules/vuetify/lib/util/color/APCA.js
/**
* WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
* @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
*/
var mainTRC = 2.4;
var Rco = .2126729;
var Gco = .7151522;
var Bco = .072175;
var normBG = .55;
var normTXT = .58;
var revTXT = .57;
var revBG = .62;
var blkThrs = .03;
var blkClmp = 1.45;
var deltaYmin = 5e-4;
var scaleBoW = 1.25;
var scaleWoB = 1.25;
var loConThresh = .078;
var loConFactor = 12.82051282051282;
var loConOffset = .06;
var loClip = .001;
function APCAcontrast(text, background) {
	const Rtxt = (text.r / 255) ** mainTRC;
	const Gtxt = (text.g / 255) ** mainTRC;
	const Btxt = (text.b / 255) ** mainTRC;
	const Rbg = (background.r / 255) ** mainTRC;
	const Gbg = (background.g / 255) ** mainTRC;
	const Bbg = (background.b / 255) ** mainTRC;
	let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
	let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
	if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
	if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp;
	if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0;
	let outputContrast;
	if (Ybg > Ytxt) {
		const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
		outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
	} else {
		const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
		outputContrast = SAPC > -1e-3 ? 0 : SAPC > -0.078 ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
	}
	return outputContrast * 100;
}
//#endregion
//#region node_modules/vuetify/lib/util/color/transformCIELAB.js
var delta = .20689655172413793;
var cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
var cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ$1(xyz) {
	const transform = cielabForwardTransform;
	const transformedY = transform(xyz[1]);
	return [
		116 * transformedY - 16,
		500 * (transform(xyz[0] / .95047) - transformedY),
		200 * (transformedY - transform(xyz[2] / 1.08883))
	];
}
function toXYZ$1(lab) {
	const transform = cielabReverseTransform;
	const Ln = (lab[0] + 16) / 116;
	return [
		transform(Ln + lab[1] / 500) * .95047,
		transform(Ln),
		transform(Ln - lab[2] / 200) * 1.08883
	];
}
//#endregion
//#region node_modules/vuetify/lib/util/color/transformSRGB.js
var srgbForwardMatrix = [
	[
		3.2406,
		-1.5372,
		-0.4986
	],
	[
		-0.9689,
		1.8758,
		.0415
	],
	[
		.0557,
		-0.204,
		1.057
	]
];
var srgbForwardTransform = (C) => C <= .0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - .055;
var srgbReverseMatrix = [
	[
		.4124,
		.3576,
		.1805
	],
	[
		.2126,
		.7152,
		.0722
	],
	[
		.0193,
		.1192,
		.9505
	]
];
var srgbReverseTransform = (C) => C <= .04045 ? C / 12.92 : ((C + .055) / 1.055) ** 2.4;
function fromXYZ(xyz) {
	const rgb = Array(3);
	const transform = srgbForwardTransform;
	const matrix = srgbForwardMatrix;
	for (let i = 0; i < 3; ++i) rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
	return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2]
	};
}
function toXYZ({ r, g, b }) {
	const xyz = [
		0,
		0,
		0
	];
	const transform = srgbReverseTransform;
	const matrix = srgbReverseMatrix;
	r = transform(r / 255);
	g = transform(g / 255);
	b = transform(b / 255);
	for (let i = 0; i < 3; ++i) xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
	return xyz;
}
//#endregion
//#region node_modules/vuetify/lib/util/colorUtils.js
function isCssColor(color) {
	return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor(color) {
	return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
var cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
var mappers = {
	rgb: (r, g, b, a) => ({
		r,
		g,
		b,
		a
	}),
	rgba: (r, g, b, a) => ({
		r,
		g,
		b,
		a
	}),
	hsl: (h, s, l, a) => HSLtoRGB({
		h,
		s,
		l,
		a
	}),
	hsla: (h, s, l, a) => HSLtoRGB({
		h,
		s,
		l,
		a
	}),
	hsv: (h, s, v, a) => HSVtoRGB({
		h,
		s,
		v,
		a
	}),
	hsva: (h, s, v, a) => HSVtoRGB({
		h,
		s,
		v,
		a
	})
};
function parseColor(color) {
	if (typeof color === "number") {
		if (isNaN(color) || color < 0 || color > 16777215) consoleWarn(`'${color}' is not a valid hex color`);
		return {
			r: (color & 16711680) >> 16,
			g: (color & 65280) >> 8,
			b: color & 255
		};
	} else if (typeof color === "string" && cssColorRe.test(color)) {
		const { groups } = color.match(cssColorRe);
		const { fn, values } = groups;
		const realValues = values.split(/,\s*|\s*\/\s*|\s+/).map((v, i) => {
			if (v.endsWith("%") || i > 0 && i < 3 && [
				"hsl",
				"hsla",
				"hsv",
				"hsva"
			].includes(fn)) return parseFloat(v) / 100;
			else return parseFloat(v);
		});
		return mappers[fn](...realValues);
	} else if (typeof color === "string") {
		let hex = color.startsWith("#") ? color.slice(1) : color;
		if ([3, 4].includes(hex.length)) hex = hex.split("").map((char) => char + char).join("");
		else if (![6, 8].includes(hex.length)) consoleWarn(`'${color}' is not a valid hex(a) color`);
		const int = parseInt(hex, 16);
		if (isNaN(int) || int < 0 || int > 4294967295) consoleWarn(`'${color}' is not a valid hex(a) color`);
		return HexToRGB(hex);
	} else if (typeof color === "object") {
		if (has(color, [
			"r",
			"g",
			"b"
		])) return color;
		else if (has(color, [
			"h",
			"s",
			"l"
		])) return HSVtoRGB(HSLtoHSV(color));
		else if (has(color, [
			"h",
			"s",
			"v"
		])) return HSVtoRGB(color);
	}
	throw new TypeError(`Invalid color: ${color == null ? color : String(color) || color.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
/** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
function HSVtoRGB(hsva) {
	const { h, s, v, a } = hsva;
	const f = (n) => {
		const k = (n + h / 60) % 6;
		return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
	};
	const rgb = [
		f(5),
		f(3),
		f(1)
	].map((v) => Math.round(v * 255));
	return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2],
		a
	};
}
function HSLtoRGB(hsla) {
	return HSVtoRGB(HSLtoHSV(hsla));
}
function HSLtoHSV(hsl) {
	const { h, s, l, a } = hsl;
	const v = l + s * Math.min(l, 1 - l);
	return {
		h,
		s: v === 0 ? 0 : 2 - 2 * l / v,
		v,
		a
	};
}
function toHex(v) {
	const h = Math.round(v).toString(16);
	return ("00".substr(0, 2 - h.length) + h).toUpperCase();
}
function RGBtoHex({ r, g, b, a }) {
	return `#${[
		toHex(r),
		toHex(g),
		toHex(b),
		a !== void 0 ? toHex(Math.round(a * 255)) : ""
	].join("")}`;
}
function HexToRGB(hex) {
	hex = parseHex(hex);
	let [r, g, b, a] = chunk(hex, 2).map((c) => parseInt(c, 16));
	a = a === void 0 ? a : a / 255;
	return {
		r,
		g,
		b,
		a
	};
}
function parseHex(hex) {
	if (hex.startsWith("#")) hex = hex.slice(1);
	hex = hex.replace(/([^0-9a-f])/gi, "F");
	if (hex.length === 3 || hex.length === 4) hex = hex.split("").map((x) => x + x).join("");
	if (hex.length !== 6) hex = padEnd(padEnd(hex, 6), 8, "F");
	return hex;
}
function lighten(value, amount) {
	const lab = fromXYZ$1(toXYZ(value));
	lab[0] = lab[0] + amount * 10;
	return fromXYZ(toXYZ$1(lab));
}
function darken(value, amount) {
	const lab = fromXYZ$1(toXYZ(value));
	lab[0] = lab[0] - amount * 10;
	return fromXYZ(toXYZ$1(lab));
}
/**
* Calculate the relative luminance of a given color
* @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
*/
function getLuma(color) {
	return toXYZ(parseColor(color))[1];
}
function hasLightForeground(color) {
	const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
	return Math.abs(APCAcontrast(parseColor(16777215), parseColor(color))) > Math.min(blackContrast, 50);
}
//#endregion
//#region node_modules/vuetify/lib/util/propsFactory.js
/**
* Creates a factory function for props definitions.
* This is used to define props in a composable then override
* default values in an implementing component.
*
* @example Simplified signature
* (props: Props) => (defaults?: Record<keyof props, any>) => Props
*
* @example Usage
* const makeProps = propsFactory({
*   foo: String,
* })
*
* defineComponent({
*   props: {
*     ...makeProps({
*       foo: 'a',
*     }),
*   },
*   setup (props) {
*     // would be "string | undefined", now "string" because a default has been provided
*     props.foo
*   },
* }
*/
function propsFactory(props, source) {
	return (defaults) => {
		return Object.keys(props).reduce((obj, prop) => {
			const definition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]) ? props[prop] : { type: props[prop] };
			if (defaults && prop in defaults) obj[prop] = {
				...definition,
				default: defaults[prop]
			};
			else obj[prop] = definition;
			if (source && !obj[prop].source) obj[prop].source = source;
			return obj;
		}, {});
	};
}
/**
* Like `Partial<T>` but doesn't care what the value is
*/
//#endregion
//#region node_modules/vuetify/lib/util/getCurrentInstance.js
function getCurrentInstance$1(name, message) {
	const vm = getCurrentInstance();
	if (!vm) throw new Error(`[Vuetify] ${name} ${"must be called from inside a setup function"}`);
	return vm;
}
function getCurrentInstanceName(name = "composables") {
	const vm = getCurrentInstance$1(name).type;
	return toKebabCase(vm?.aliasName || vm?.name);
}
//#endregion
//#region node_modules/vuetify/lib/util/injectSelf.js
function injectSelf(key, vm = getCurrentInstance$1("injectSelf")) {
	const { provides } = vm;
	if (provides && key in provides) return provides[key];
}
//#endregion
//#region node_modules/vuetify/lib/composables/defaults.js
var DefaultsSymbol = Symbol.for("vuetify:defaults");
function createDefaults(options) {
	return ref(options);
}
function injectDefaults() {
	const defaults = inject(DefaultsSymbol);
	if (!defaults) throw new Error("[Vuetify] Could not find defaults instance");
	return defaults;
}
function provideDefaults(defaults, options) {
	const injectedDefaults = injectDefaults();
	const providedDefaults = ref(defaults);
	const newDefaults = computed(() => {
		if (unref(options?.disabled)) return injectedDefaults.value;
		const scoped = unref(options?.scoped);
		const reset = unref(options?.reset);
		const root = unref(options?.root);
		if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value;
		let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value });
		if (scoped) return properties;
		if (reset || root) {
			const len = Number(reset || Infinity);
			for (let i = 0; i <= len; i++) {
				if (!properties || !("prev" in properties)) break;
				properties = properties.prev;
			}
			if (properties && typeof root === "string" && root in properties) properties = mergeDeep(mergeDeep(properties, { prev: properties }), properties[root]);
			return properties;
		}
		return properties.prev ? mergeDeep(properties.prev, properties, void 0, (_, v) => v !== void 0) : properties;
	});
	provide(DefaultsSymbol, newDefaults);
	return newDefaults;
}
function propIsDefined(vnode, prop) {
	return vnode.props && (typeof vnode.props[prop] !== "undefined" || typeof vnode.props[toKebabCase(prop)] !== "undefined");
}
function internalUseDefaults(props = {}, name, defaults = injectDefaults()) {
	const vm = getCurrentInstance$1("useDefaults");
	name = name ?? vm.type.name ?? vm.type.__name;
	if (!name) throw new Error("[Vuetify] Could not determine component name");
	const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
	const _props = new Proxy(props, { get(target, prop) {
		const propValue = Reflect.get(target, prop);
		if (prop === "class" || prop === "style") return [componentDefaults.value?.[prop], propValue].filter((v) => v != null);
		if (propIsDefined(vm.vnode, prop)) return propValue;
		const _componentDefault = componentDefaults.value?.[prop];
		if (_componentDefault !== void 0) return _componentDefault;
		const _globalDefault = defaults.value?.global?.[prop];
		if (_globalDefault !== void 0) return _globalDefault;
		return propValue;
	} });
	const _subcomponentDefaults = shallowRef();
	watchEffect(() => {
		if (componentDefaults.value) {
			const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()));
			_subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
		} else _subcomponentDefaults.value = void 0;
	});
	function provideSubDefaults() {
		const injected = injectSelf(DefaultsSymbol, vm);
		provide(DefaultsSymbol, computed(() => {
			return _subcomponentDefaults.value ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value;
		}));
	}
	return {
		props: _props,
		provideSubDefaults
	};
}
//#endregion
//#region node_modules/vuetify/lib/util/defineComponent.js
function defineComponent$1(options) {
	options._setup = options._setup ?? options.setup;
	if (!options.name) {
		consoleWarn("The component is missing an explicit name, unable to generate default prop value");
		return options;
	}
	if (options._setup) {
		options.props = propsFactory(options.props ?? {}, options.name)();
		const propKeys = Object.keys(options.props).filter((key) => key !== "class" && key !== "style");
		options.filterProps = function filterProps(props) {
			return pick(props, propKeys);
		};
		options.props._as = String;
		options.setup = function setup(props, ctx) {
			const defaults = injectDefaults();
			if (!defaults.value) return options._setup(props, ctx);
			const { props: _props, provideSubDefaults } = internalUseDefaults(props, props._as ?? options.name, defaults);
			const setupBindings = options._setup(_props, ctx);
			provideSubDefaults();
			return setupBindings;
		};
	}
	return options;
}
function genericComponent(exposeDefaults = true) {
	return (options) => (exposeDefaults ? defineComponent$1 : defineComponent)(options);
}
//#endregion
//#region node_modules/vuetify/lib/composables/icons.js
var IconValue = [
	String,
	Function,
	Object,
	Array
];
var IconSymbol = Symbol.for("vuetify:icons");
var makeIconProps = propsFactory({
	icon: { type: IconValue },
	tag: {
		type: [
			String,
			Object,
			Function
		],
		required: true
	}
}, "icon");
var VComponentIcon = genericComponent()({
	name: "VComponentIcon",
	props: makeIconProps(),
	setup(props, { slots }) {
		return () => {
			const Icon = props.icon;
			return createVNode(props.tag, null, { default: () => [props.icon ? createVNode(Icon, null, null) : slots.default?.()] });
		};
	}
});
var VSvgIcon = defineComponent$1({
	name: "VSvgIcon",
	inheritAttrs: false,
	props: makeIconProps(),
	setup(props, { attrs }) {
		return () => {
			return createVNode(props.tag, mergeProps(attrs, { "style": null }), { default: () => [createElementVNode("svg", {
				"class": "v-icon__svg",
				"xmlns": "http://www.w3.org/2000/svg",
				"viewBox": "0 0 24 24",
				"role": "img",
				"aria-hidden": "true"
			}, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? createElementVNode("path", {
				"d": path[0],
				"fill-opacity": path[1]
			}, null) : createElementVNode("path", { "d": path }, null)) : createElementVNode("path", { "d": props.icon }, null)])] });
		};
	}
});
defineComponent$1({
	name: "VLigatureIcon",
	props: makeIconProps(),
	setup(props) {
		return () => {
			return createVNode(props.tag, null, { default: () => [props.icon] });
		};
	}
});
var VClassIcon = defineComponent$1({
	name: "VClassIcon",
	props: makeIconProps(),
	setup(props) {
		return () => {
			return createVNode(props.tag, { "class": normalizeClass(props.icon) }, null);
		};
	}
});
var useIcon = (props) => {
	const icons = inject(IconSymbol);
	if (!icons) throw new Error("Missing Vuetify Icons provide!");
	return { iconData: computed(() => {
		const iconAlias = toValue(props);
		if (!iconAlias) return { component: VComponentIcon };
		let icon = iconAlias;
		if (typeof icon === "string") {
			icon = icon.trim();
			if (icon.startsWith("$")) icon = icons.aliases?.[icon.slice(1)];
		}
		if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`);
		if (Array.isArray(icon)) return {
			component: VSvgIcon,
			icon
		};
		else if (typeof icon !== "string") return {
			component: VComponentIcon,
			icon
		};
		const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
		const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
		return {
			component: icons.sets[iconSetName ?? icons.defaultSet].component,
			icon: iconName
		};
	}) };
};
//#endregion
//#region node_modules/vuetify/lib/composables/toggleScope.js
function useToggleScope(source, fn) {
	let scope;
	function start() {
		scope = effectScope();
		scope.run(() => fn.length ? fn(() => {
			scope?.stop();
			start();
		}) : fn());
	}
	watch(source, (active) => {
		if (active && !scope) start();
		else if (!active) {
			scope?.stop();
			scope = void 0;
		}
	}, { immediate: true });
	onScopeDispose(() => {
		scope?.stop();
	});
}
//#endregion
//#region node_modules/vuetify/lib/composables/proxiedModel.js
function useProxiedModel(props, prop, defaultValue, transformIn = (v) => v, transformOut = (v) => v) {
	const vm = getCurrentInstance$1("useProxiedModel");
	const internal = ref(props[prop] !== void 0 ? props[prop] : defaultValue);
	const kebabProp = toKebabCase(prop);
	const isControlled = kebabProp !== prop ? computed(() => {
		props[prop];
		return !!((vm.vnode.props?.hasOwnProperty(prop) || vm.vnode.props?.hasOwnProperty(kebabProp)) && (vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vm.vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
	}) : computed(() => {
		props[prop];
		return !!(vm.vnode.props?.hasOwnProperty(prop) && vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
	});
	useToggleScope(() => !isControlled.value, () => {
		watch(() => props[prop], (val) => {
			internal.value = val;
		});
	});
	const model = computed({
		get() {
			const externalValue = props[prop];
			return transformIn(isControlled.value ? externalValue : internal.value);
		},
		set(internalValue) {
			const newValue = transformOut(internalValue);
			const value = toRaw(isControlled.value ? props[prop] : internal.value);
			if (value === newValue || transformIn(value) === internalValue) return;
			internal.value = newValue;
			vm?.emit(`update:${prop}`, newValue);
		}
	});
	Object.defineProperty(model, "externalValue", { get: () => isControlled.value ? props[prop] : internal.value });
	return model;
}
//#endregion
//#region node_modules/vuetify/lib/locale/en.js
var en_default = {
	badge: "Badge",
	open: "Open",
	close: "Close",
	dismiss: "Dismiss",
	confirmEdit: {
		ok: "OK",
		cancel: "Cancel"
	},
	dataIterator: {
		noResultsText: "No matching records found",
		loadingText: "Loading items..."
	},
	dataTable: {
		itemsPerPageText: "Rows per page:",
		ariaLabel: {
			sortDescending: "Sorted descending.",
			sortAscending: "Sorted ascending.",
			sortNone: "Not sorted.",
			activateNone: "Activate to remove sorting.",
			activateDescending: "Activate to sort descending.",
			activateAscending: "Activate to sort ascending."
		},
		sortBy: "Sort by"
	},
	dataFooter: {
		itemsPerPageText: "Items per page:",
		itemsPerPageAll: "All",
		nextPage: "Next page",
		prevPage: "Previous page",
		firstPage: "First page",
		lastPage: "Last page",
		pageText: "{0}-{1} of {2}"
	},
	dateRangeInput: { divider: "to" },
	datePicker: {
		itemsSelected: "{0} selected",
		range: {
			title: "Select dates",
			header: "Enter dates"
		},
		title: "Select date",
		header: "Enter date",
		input: { placeholder: "Enter date" },
		ariaLabel: {
			previousMonth: "Previous month",
			nextMonth: "Next month",
			selectYear: "Select year",
			previousYear: "Previous year",
			nextYear: "Next year",
			selectMonth: "Select month",
			selectDate: "{0}",
			currentDate: "Today, {0}"
		}
	},
	noDataText: "No data available",
	carousel: {
		prev: "Previous visual",
		next: "Next visual",
		ariaLabel: { delimiter: "Carousel slide {0} of {1}" }
	},
	calendar: {
		moreEvents: "{0} more",
		today: "Today"
	},
	input: {
		clear: "Clear {0}",
		prependAction: "{0} prepended action",
		appendAction: "{0} appended action",
		otp: "Please enter OTP character {0}"
	},
	fileInput: {
		counter: "{0} files",
		counterSize: "{0} files ({1} in total)"
	},
	fileUpload: {
		title: "Drag and drop files here",
		divider: "or",
		browse: "Browse Files"
	},
	timePicker: {
		am: "AM",
		pm: "PM",
		title: "Select Time",
		hour: "Hour",
		minute: "Minute",
		second: "Second",
		notAllowed: "Value is not allowed"
	},
	pagination: { ariaLabel: {
		root: "Pagination Navigation",
		next: "Next page",
		previous: "Previous page",
		page: "Go to page {0}",
		currentPage: "Page {0}, Current page",
		first: "First page",
		last: "Last page"
	} },
	stepper: {
		next: "Next",
		prev: "Previous"
	},
	rating: { ariaLabel: { item: "Rating {0} of {1}" } },
	loading: "Loading...",
	infiniteScroll: {
		loadMore: "Load more",
		empty: "No more"
	},
	rules: {
		required: "This field is required",
		email: "Please enter a valid email",
		number: "This field can only contain numbers",
		integer: "This field can only contain integer values",
		capital: "This field can only contain uppercase letters",
		maxLength: "You must enter a maximum of {0} characters",
		minLength: "You must enter a minimum of {0} characters",
		strictLength: "The length of the entered field is invalid",
		exclude: "The {0} character is not allowed",
		notEmpty: "Please choose at least one value",
		pattern: "Invalid format"
	},
	command: { search: "Type a command or search..." },
	hotkey: {
		then: "then",
		ctrl: "Ctrl",
		command: "Command",
		space: "Space",
		shift: "Shift",
		alt: "Alt",
		enter: "Enter",
		escape: "Escape",
		upArrow: "Up Arrow",
		downArrow: "Down Arrow",
		leftArrow: "Left Arrow",
		rightArrow: "Right Arrow",
		backspace: "Backspace",
		option: "Option",
		plus: "plus",
		shortcut: "Keyboard shortcut: {0}",
		or: "or"
	},
	video: {
		play: "Play",
		pause: "Pause",
		seek: "Seek",
		volume: "Volume",
		showVolume: "Show volume control",
		mute: "Mute",
		unmute: "Unmute",
		enterFullscreen: "Full screen",
		exitFullscreen: "Exit full screen"
	},
	colorPicker: { ariaLabel: {
		eyedropper: "Select color with eyedropper",
		hueSlider: "Hue",
		alphaSlider: "Alpha",
		redInput: "Red value",
		greenInput: "Green value",
		blueInput: "Blue value",
		alphaInput: "Alpha value",
		hueInput: "Hue value",
		saturationInput: "Saturation value",
		lightnessInput: "Lightness value",
		hexInput: "HEX value",
		hexaInput: "HEX with alpha value",
		changeFormat: "Change color format"
	} }
};
//#endregion
//#region node_modules/vuetify/lib/locale/adapters/vuetify.js
var LANG_PREFIX = "$vuetify.";
var replace = (str, params) => {
	return str.replace(/\{(\d+)\}/g, (match, index) => {
		return String(params[Number(index)]);
	});
};
var createTranslateFunction = (current, fallback, messages) => {
	return (key, ...params) => {
		if (!key.startsWith(LANG_PREFIX)) return replace(key, params);
		const shortKey = key.replace(LANG_PREFIX, "");
		const currentLocale = current.value && messages.value[current.value];
		const fallbackLocale = fallback.value && messages.value[fallback.value];
		let str = getObjectValueByPath(currentLocale, shortKey, null);
		if (!str) {
			consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
			str = getObjectValueByPath(fallbackLocale, shortKey, null);
		}
		if (!str) {
			consoleError(`Translation key "${key}" not found in fallback`);
			str = key;
		}
		if (typeof str !== "string") {
			consoleError(`Translation key "${key}" has a non-string value`);
			str = key;
		}
		return replace(str, params);
	};
};
function createNumberFunction(current, fallback) {
	return (value, options) => {
		return new Intl.NumberFormat([current.value, fallback.value], options).format(value);
	};
}
function inferDecimalSeparator(current, fallback) {
	return createNumberFunction(current, fallback)(.1).includes(",") ? "," : ".";
}
function useProvided(props, prop, provided) {
	const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);
	internal.value = props[prop] ?? provided.value;
	watch(provided, (v) => {
		if (props[prop] == null) internal.value = provided.value;
	});
	return internal;
}
function createProvideFunction(state) {
	return (props) => {
		const current = useProvided(props, "locale", state.current);
		const fallback = useProvided(props, "fallback", state.fallback);
		const messages = useProvided(props, "messages", state.messages);
		return {
			name: "vuetify",
			current,
			fallback,
			messages,
			decimalSeparator: toRef(() => inferDecimalSeparator(current, fallback)),
			t: createTranslateFunction(current, fallback, messages),
			n: createNumberFunction(current, fallback),
			provide: createProvideFunction({
				current,
				fallback,
				messages
			})
		};
	};
}
function createVuetifyAdapter(options) {
	const current = shallowRef(options?.locale ?? "en");
	const fallback = shallowRef(options?.fallback ?? "en");
	const messages = ref({
		en: en_default,
		...options?.messages
	});
	return {
		name: "vuetify",
		current,
		fallback,
		messages,
		decimalSeparator: toRef(() => options?.decimalSeparator ?? inferDecimalSeparator(current, fallback)),
		t: createTranslateFunction(current, fallback, messages),
		n: createNumberFunction(current, fallback),
		provide: createProvideFunction({
			current,
			fallback,
			messages
		})
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/locale.js
var LocaleSymbol = Symbol.for("vuetify:locale");
function isLocaleInstance(obj) {
	return obj.name != null;
}
function createLocale(options) {
	const i18n = options?.adapter && isLocaleInstance(options?.adapter) ? options?.adapter : createVuetifyAdapter(options);
	const rtl = createRtl(i18n, options);
	return {
		...i18n,
		...rtl
	};
}
function useLocale() {
	const locale = inject(LocaleSymbol);
	if (!locale) throw new Error("[Vuetify] Could not find injected locale instance");
	return locale;
}
function genDefaults$1$1() {
	return {
		af: false,
		ar: true,
		bg: false,
		ca: false,
		ckb: false,
		cs: false,
		de: false,
		el: false,
		en: false,
		es: false,
		et: false,
		fa: true,
		fi: false,
		fr: false,
		hr: false,
		hu: false,
		he: true,
		id: false,
		it: false,
		ja: false,
		km: false,
		ko: false,
		lv: false,
		lt: false,
		nl: false,
		no: false,
		pl: false,
		pt: false,
		ro: false,
		ru: false,
		sk: false,
		sl: false,
		srCyrl: false,
		srLatn: false,
		sv: false,
		th: false,
		tr: false,
		az: false,
		uk: false,
		vi: false,
		zhHans: false,
		zhHant: false
	};
}
function createRtl(i18n, options) {
	const rtl = ref(options?.rtl ?? genDefaults$1$1());
	const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);
	return {
		isRtl,
		rtl,
		rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
	};
}
function useRtl() {
	const locale = inject(LocaleSymbol);
	if (!locale) throw new Error("[Vuetify] Could not find injected rtl instance");
	return {
		isRtl: locale.isRtl,
		rtlClasses: locale.rtlClasses
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/theme.js
var ThemeSymbol = Symbol.for("vuetify:theme");
var makeThemeProps = propsFactory({ theme: String }, "theme");
function genDefaults$2() {
	return {
		defaultTheme: "system",
		prefix: "v-",
		variations: {
			colors: [],
			lighten: 0,
			darken: 0
		},
		themes: {
			light: {
				dark: false,
				colors: {
					background: "#FFFFFF",
					surface: "#FFFFFF",
					"surface-bright": "#FFFFFF",
					"surface-light": "#EEEEEE",
					"surface-variant": "#424242",
					"on-surface-variant": "#EEEEEE",
					primary: "#1867C0",
					"primary-darken-1": "#1F5592",
					secondary: "#48A9A6",
					"secondary-darken-1": "#018786",
					error: "#B00020",
					info: "#2196F3",
					success: "#4CAF50",
					warning: "#FB8C00"
				},
				variables: {
					"border-color": "#000000",
					"border-opacity": .12,
					"shadow-color": "#000000",
					"high-emphasis-opacity": .87,
					"medium-emphasis-opacity": .6,
					"disabled-opacity": .38,
					"idle-opacity": .04,
					"hover-opacity": .04,
					"focus-opacity": .12,
					"selected-opacity": .08,
					"activated-opacity": .12,
					"pressed-opacity": .12,
					"dragged-opacity": .08,
					"theme-kbd": "#EEEEEE",
					"theme-on-kbd": "#000000",
					"theme-code": "#F5F5F5",
					"theme-on-code": "#000000",
					"theme-on-dark": "#FFF",
					"theme-on-light": "#000",
					"elevation-overlay-color": "black",
					"elevation-overlay-opacity-step": "2%"
				}
			},
			dark: {
				dark: true,
				colors: {
					background: "#121212",
					surface: "#212121",
					"surface-bright": "#ccbfd6",
					"surface-light": "#424242",
					"surface-variant": "#c8c8c8",
					"on-surface-variant": "#000000",
					primary: "#2196F3",
					"primary-darken-1": "#277CC1",
					secondary: "#54B6B2",
					"secondary-darken-1": "#48A9A6",
					error: "#CF6679",
					info: "#2196F3",
					success: "#4CAF50",
					warning: "#FB8C00"
				},
				variables: {
					"border-color": "#FFFFFF",
					"border-opacity": .12,
					"shadow-color": "#000000",
					"high-emphasis-opacity": 1,
					"medium-emphasis-opacity": .7,
					"disabled-opacity": .5,
					"idle-opacity": .1,
					"hover-opacity": .04,
					"focus-opacity": .12,
					"selected-opacity": .08,
					"activated-opacity": .12,
					"pressed-opacity": .16,
					"dragged-opacity": .08,
					"theme-kbd": "#424242",
					"theme-on-kbd": "#FFFFFF",
					"theme-code": "#343434",
					"theme-on-code": "#CCCCCC",
					"theme-on-dark": "#FFF",
					"theme-on-light": "#000",
					"elevation-overlay-color": "white",
					"elevation-overlay-opacity-step": "2%"
				}
			}
		},
		stylesheetId: "vuetify-theme-stylesheet",
		scoped: false,
		utilities: true
	};
}
function parseThemeOptions(options = genDefaults$2()) {
	const defaults = genDefaults$2();
	if (!options) return {
		...defaults,
		isDisabled: true
	};
	return mergeDeep(defaults, options);
}
function createCssClass(lines, selector, content, scope) {
	lines.push(`${getScopedSelector(selector, scope)} {\n`, ...content.map((line) => `  ${line};\n`), "}\n");
}
function genCssVariables(theme, prefix) {
	const lightOverlay = theme.dark ? 2 : 1;
	const darkOverlay = theme.dark ? 1 : 2;
	const variables = [];
	for (const [key, value] of Object.entries(theme.colors)) {
		const rgb = parseColor(value);
		variables.push(`--${prefix}theme-${key}: ${rgb.r},${rgb.g},${rgb.b}` + (rgb.a == null ? "" : `,${rgb.a}`));
		if (!key.startsWith("on-")) variables.push(`--${prefix}theme-${key}-overlay-multiplier: ${getLuma(value) > .18 ? lightOverlay : darkOverlay}`);
	}
	for (const [key, value] of Object.entries(theme.variables)) {
		const color = typeof value === "string" && value.startsWith("#") ? parseColor(value) : void 0;
		const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : void 0;
		variables.push(`--${prefix}${key}: ${rgb ?? value}`);
	}
	return variables;
}
function genVariation(name, color, variations) {
	const object = {};
	if (variations) for (const variation of ["lighten", "darken"]) {
		const fn = variation === "lighten" ? lighten : darken;
		for (const amount of createRange(variations[variation], 1)) object[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount));
	}
	return object;
}
function genVariations(colors, variations) {
	if (!variations) return {};
	let variationColors = {};
	for (const name of variations.colors) {
		const color = colors[name];
		if (!color) continue;
		variationColors = {
			...variationColors,
			...genVariation(name, color, variations)
		};
	}
	return variationColors;
}
function genOnColors(colors, variables) {
	const onColors = {};
	for (const color of Object.keys(colors)) {
		if (color.startsWith("on-") || colors[`on-${color}`]) continue;
		const onColor = `on-${color}`;
		onColors[onColor] = hasLightForeground(parseColor(colors[color])) ? variables["theme-on-dark"] : variables["theme-on-light"];
	}
	return onColors;
}
function getScopedSelector(selector, scope) {
	if (!scope) return selector;
	const scopeSelector = `:where(${scope})`;
	return selector === ":root" ? scopeSelector : `${scopeSelector} ${selector}`;
}
function upsertStyles(id, cspNonce, styles) {
	return;
}
function createTheme(options) {
	const parsedOptions = parseThemeOptions(options);
	const _name = shallowRef(parsedOptions.defaultTheme);
	const themes = ref(parsedOptions.themes);
	const systemName = shallowRef("light");
	const name = computed({
		get() {
			return _name.value === "system" ? systemName.value : _name.value;
		},
		set(val) {
			_name.value = val;
		}
	});
	const computedThemes = computed(() => {
		const acc = {};
		for (const [name, original] of Object.entries(themes.value)) {
			const merged = mergeDeep(original.dark || name === "dark" ? themes.value.dark : themes.value.light, original);
			const colors = {
				...merged.colors,
				...genVariations(merged.colors, parsedOptions.variations)
			};
			acc[name] = {
				...merged,
				colors: {
					...colors,
					...genOnColors(colors, merged.variables)
				}
			};
		}
		return acc;
	});
	const current = toRef(() => computedThemes.value[name.value]);
	const isSystem = toRef(() => _name.value === "system");
	const styles = computed(() => {
		const lines = [];
		const scoped = parsedOptions.scoped ? parsedOptions.prefix : "";
		lines.push("@layer theme-base {\n");
		if (current.value?.dark) createCssClass(lines, ":root", ["color-scheme: dark"], parsedOptions.scope);
		createCssClass(lines, ":root", genCssVariables(current.value, parsedOptions.prefix), parsedOptions.scope);
		for (const [themeName, theme] of Object.entries(computedThemes.value)) createCssClass(lines, `.${parsedOptions.prefix}theme--${themeName}`, [`color-scheme: ${theme.dark ? "dark" : "normal"}`, ...genCssVariables(theme, parsedOptions.prefix)], parsedOptions.scope);
		lines.push("}\n");
		if (parsedOptions.utilities) {
			const bgLines = [];
			const fgLines = [];
			const colors = new Set(Object.values(computedThemes.value).flatMap((theme) => Object.keys(theme.colors)));
			for (const key of colors) if (key.startsWith("on-")) createCssClass(fgLines, `.${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))`], parsedOptions.scope);
			else {
				createCssClass(bgLines, `.${scoped}bg-${key}`, [
					`--${parsedOptions.prefix}theme-overlay-multiplier: var(--${parsedOptions.prefix}theme-${key}-overlay-multiplier)`,
					`background-color: rgb(var(--${parsedOptions.prefix}theme-${key}))`,
					`color: rgb(var(--${parsedOptions.prefix}theme-on-${key}))`
				], parsedOptions.scope);
				createCssClass(fgLines, `.${scoped}text-${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))`], parsedOptions.scope);
				createCssClass(fgLines, `.${scoped}border-${key}`, [`--${parsedOptions.prefix}border-color: var(--${parsedOptions.prefix}theme-${key})`], parsedOptions.scope);
			}
			lines.push("@layer theme-background {\n", ...bgLines.map((v) => `  ${v}`), "}\n", "@layer theme-foreground {\n", ...fgLines.map((v) => `  ${v}`), "}\n");
		}
		return "@layer vuetify-utilities {\n" + lines.map((v) => `  ${v}`).join("") + "\n}";
	});
	const themeClasses = toRef(() => parsedOptions.isDisabled ? void 0 : `${parsedOptions.prefix}theme--${name.value}`);
	const themeNames = toRef(() => Object.keys(computedThemes.value));
	function install(app) {
		if (parsedOptions.isDisabled) return;
		const head = app._context.provides.usehead;
		if (head) {
			function getHead() {
				return { style: [{
					textContent: styles.value,
					id: parsedOptions.stylesheetId,
					nonce: parsedOptions.cspNonce || false,
					tagPosition: "bodyOpen"
				}] };
			}
			if (head.push) head.push(getHead);
			else head.addHeadObjs(getHead());
		} else {
			updateStyles();
			function updateStyles() {
				upsertStyles(parsedOptions.stylesheetId, parsedOptions.cspNonce, styles.value);
			}
		}
	}
	function change(themeName) {
		if (themeName !== "system" && !themeNames.value.includes(themeName)) {
			consoleWarn(`Theme "${themeName}" not found on the Vuetify theme instance`);
			return;
		}
		name.value = themeName;
	}
	function cycle(themeArray = themeNames.value) {
		const currentIndex = themeArray.indexOf(name.value);
		change(themeArray[currentIndex === -1 ? 0 : (currentIndex + 1) % themeArray.length]);
	}
	function toggle(themeArray = ["light", "dark"]) {
		cycle(themeArray);
	}
	const globalName = new Proxy(name, {
		get(target, prop) {
			return Reflect.get(target, prop);
		},
		set(target, prop, val) {
			if (prop === "value") deprecate(`theme.global.name.value = ${val}`, `theme.change('${val}')`);
			return Reflect.set(target, prop, val);
		}
	});
	return {
		install,
		change,
		cycle,
		toggle,
		isDisabled: parsedOptions.isDisabled,
		isSystem,
		name,
		themes,
		current,
		computedThemes,
		prefix: parsedOptions.prefix,
		themeClasses,
		styles,
		global: {
			name: globalName,
			current
		}
	};
}
function provideTheme(props) {
	getCurrentInstance$1("provideTheme");
	const theme = inject(ThemeSymbol, null);
	if (!theme) throw new Error("Could not find Vuetify theme injection");
	const name = toRef(() => props.theme ?? theme.name.value);
	const current = toRef(() => theme.themes.value[name.value]);
	const themeClasses = toRef(() => theme.isDisabled ? void 0 : `${theme.prefix}theme--${name.value}`);
	const newTheme = {
		...theme,
		name,
		current,
		themeClasses
	};
	provide(ThemeSymbol, newTheme);
	return newTheme;
}
function useTheme() {
	getCurrentInstance$1("useTheme");
	const theme = inject(ThemeSymbol, null);
	if (!theme) throw new Error("Could not find Vuetify theme injection");
	return theme;
}

//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/composables/commonAuthState.js
function makeCommonAuthState() {
	const data = useState("auth:data", () => void 0);
	const hasInitialSession = computed(() => !!data.value);
	const lastRefreshedAt = useState("auth:lastRefreshedAt", () => {
		if (hasInitialSession.value) return /* @__PURE__ */ new Date();
	});
	const loading = useState("auth:loading", () => false);
	return {
		data,
		loading,
		lastRefreshedAt,
		status: computed(() => {
			if (loading.value) return "loading";
			if (data.value) return "authenticated";
			return "unauthenticated";
		})
	};
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/composables/authjs/useAuthState.js
var useAuthState = () => makeCommonAuthState();
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/url.js
function resolveApiUrlPath(endpointPath, runtimeConfig) {
	if (isExternalUrl(endpointPath)) return endpointPath;
	return joinURL$1(resolveApiBaseURL(runtimeConfig), endpointPath);
}
function resolveApiBaseURL(runtimeConfig, returnOnlyPathname) {
	const authRuntimeConfig = runtimeConfig.public.auth;
	if (returnOnlyPathname === void 0) returnOnlyPathname = !runtimeConfig.public.auth.disableInternalRouting;
	let baseURL = authRuntimeConfig.baseURL;
	if (authRuntimeConfig.originEnvKey) {
		const envBaseURL = process.env[authRuntimeConfig.originEnvKey];
		if (envBaseURL) baseURL = envBaseURL;
	}
	if (returnOnlyPathname) baseURL = withLeadingSlash(parseURL$1(baseURL).pathname);
	return baseURL;
}
function isExternalUrl(url) {
	return url.startsWith("http://") || url.startsWith("https://");
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/logger.js
var ERROR_PREFIX = "[@sidebase/nuxt-auth]";
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/fetch.js
async function _fetch(nuxt, path, fetchOptions = {}, proxyCookies = false) {
	const runtimeConfigOrPromise = callWithNuxt(nuxt, useRuntimeConfig);
	const runtimeConfig = "public" in runtimeConfigOrPromise ? runtimeConfigOrPromise : await runtimeConfigOrPromise;
	const joinedPath = resolveApiUrlPath(path, runtimeConfig);
	if (runtimeConfig.public.auth.disableInternalRouting === false) {
		if ((nuxt.ssrContext?.event?.path)?.startsWith(joinedPath)) {
			console.error(`${ERROR_PREFIX} Recursion detected at ${joinedPath}. Have you set the correct \`auth.baseURL\`?`);
			throw new FetchConfigurationError("Server configuration error");
		}
	}
	if (!fetchOptions.credentials) fetchOptions.credentials = "include";
	let event;
	if (proxyCookies) {
		const fetchOptionsHeaders = new Headers(fetchOptions.headers ?? {});
		event = await callWithNuxt(nuxt, useRequestEvent);
		if (event && fetchOptionsHeaders.get("cookie") === null) {
			const cookies = event.node.req.headers.cookie;
			if (cookies) {
				fetchOptionsHeaders.set("cookie", cookies);
				fetchOptions.headers = fetchOptionsHeaders;
			}
		}
	}
	try {
		return $fetch.raw(joinedPath, fetchOptions).then((res) => {
			if (proxyCookies && event) {
				const cookies = res.headers.getSetCookie();
				event.node.res.appendHeader("set-cookie", cookies);
			}
			return res._data;
		});
	} catch (error) {
		let errorMessage = `${ERROR_PREFIX} Error while requesting ${joinedPath}.`;
		if (runtimeConfig.public.auth.provider.type === "authjs") errorMessage += " Have you added the authentication handler server-endpoint `[...].ts`? Have you added the authentication handler in a non-default location (default is `~/server/api/auth/[...].ts`) and not updated the module-setting `auth.basePath`?";
		errorMessage += " Error is:";
		console.error(errorMessage);
		console.error(error);
		throw new FetchConfigurationError("Runtime error, check the console logs to debug, open an issue at https://github.com/sidebase/nuxt-auth/issues/new/choose if you continue to have this problem");
	}
}
var FetchConfigurationError = class extends Error {};
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/checkSessionResult.js
var isNonEmptyObject = (obj) => typeof obj === "object" && obj !== null && Object.keys(obj).length > 0;
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/helpers.js
function useTypedBackendConfig(runtimeConfig, type) {
	const provider = runtimeConfig.public.auth.provider;
	if (provider.type === type) return provider;
	throw new Error("RuntimeError: Type must match at this point");
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/composables/common/getRequestURL.js
function getRequestURL(includePath = true) {
	return getURL(useRequestEvent()?.node.req, includePath);
}
function getRequestURLWN(nuxt) {
	return callWithNuxt(nuxt, getRequestURL);
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/callbackUrl.js
async function determineCallbackUrl(authConfig, userCallbackUrl, inferFromRequest) {
	if (userCallbackUrl) return await normalizeCallbackUrl(userCallbackUrl);
	const authConfigCallbackUrl = typeof authConfig.globalAppMiddleware === "object" ? authConfig.globalAppMiddleware.addDefaultCallbackUrl : void 0;
	if (typeof authConfigCallbackUrl === "string") return await normalizeCallbackUrl(authConfigCallbackUrl);
	if (inferFromRequest !== false && (inferFromRequest === true || authConfigCallbackUrl === true || authConfigCallbackUrl === void 0 && authConfig.globalAppMiddleware === true)) return getRequestURLWN(useNuxtApp());
}
function determineCallbackUrlForRouteMiddleware(authConfig, middlewareTo) {
	const authConfigCallbackUrl = typeof authConfig.globalAppMiddleware === "object" ? authConfig.globalAppMiddleware.addDefaultCallbackUrl : void 0;
	if (typeof authConfigCallbackUrl === "string") return authConfigCallbackUrl;
	if (authConfigCallbackUrl === true || authConfigCallbackUrl === void 0 && authConfig.globalAppMiddleware === true) return middlewareTo.fullPath;
}
async function normalizeCallbackUrl(rawCallbackUrl) {
	if (isExternalUrl(rawCallbackUrl)) return rawCallbackUrl;
	return (await callWithNuxt(useNuxtApp(), useRouter)).options.history.createHref(rawCallbackUrl);
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/composables/authjs/utils/navigateToAuthPage.js
function navigateToAuthPageWN(nuxt, href, isInternalRouting) {
	return callWithNuxt(nuxt, navigateToAuthPage, [
		nuxt,
		href,
		isInternalRouting
	]);
}
var URL_QUOTE_RE = /"/g;
function navigateToAuthPage(nuxtApp, href, isInternalRouting = false) {
	const router = useRouter();
	const inMiddleware = Boolean(nuxtApp._processingMiddleware);
	if (nuxtApp.ssrContext) {
		const isExternalHost = hasProtocol$1(href, { acceptRelative: true });
		if (isExternalHost) {
			const { protocol } = new URL(href, "http://localhost");
			if (protocol && isScriptProtocol(protocol)) throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
		}
		const location = isExternalHost || isInternalRouting ? href : router.resolve(href).fullPath || "/";
		async function redirect(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedLoc = location.replace(URL_QUOTE_RE, "%22");
			const encodedHeader = encodeURL(location, isExternalHost);
			nuxtApp.ssrContext._renderResponse = {
				statusCode: 302,
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		}
		if (!isExternalHost && inMiddleware) return redirect(void 0);
		return redirect(!inMiddleware ? void 0 : false);
	}
	(void 0).location.href = href;
	if (href.includes("#")) (void 0).location.reload();
	return new Promise((resolve) => setTimeout(resolve, 60 * 1e3)).then(() => router.push(href));
}
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/composables/authjs/useAuth.js
function useAuth() {
	const nuxt = useNuxtApp();
	const runtimeConfig = useRuntimeConfig();
	const backendConfig = useTypedBackendConfig(runtimeConfig, "authjs");
	const { data, loading, status, lastRefreshedAt } = useAuthState();
	async function signIn(provider, options, authorizationParams) {
		const configuredProviders = await getProviders();
		if (!configuredProviders) {
			const errorUrl = resolveApiUrlPath("error", runtimeConfig);
			return {
				error: "InvalidProvider",
				ok: false,
				status: 500,
				url: errorUrl,
				navigationResult: await navigateToAuthPageWN(nuxt, errorUrl, true)
			};
		}
		if (typeof provider === "undefined") provider = backendConfig.defaultProvider;
		const { redirect = true } = options ?? {};
		const callbackUrl = await callWithNuxt(nuxt, () => determineCallbackUrl(runtimeConfig.public.auth, options?.callbackUrl));
		const hrefSignInAllProviderPage = `${resolveApiUrlPath("signin", runtimeConfig)}${callbackUrl ? `?${new URLSearchParams({ callbackUrl })}` : ""}`;
		const selectedProvider = provider && configuredProviders[provider];
		if (!selectedProvider) return {
			error: "InvalidProvider",
			ok: false,
			status: 400,
			url: hrefSignInAllProviderPage,
			navigationResult: await navigateToAuthPageWN(nuxt, hrefSignInAllProviderPage, true)
		};
		const isCredentials = selectedProvider.type === "credentials";
		const isEmail = selectedProvider.type === "email";
		const isSupportingReturn = isCredentials || isEmail;
		const action = isCredentials ? "callback" : "signin";
		const csrfToken = await getCsrfToken();
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			...await getRequestHeaders(nuxt)
		};
		const body = new URLSearchParams({
			...options,
			csrfToken,
			callbackUrl,
			json: true
		});
		const fetchSignIn = () => _fetch(nuxt, `/${action}/${provider}`, {
			method: "post",
			params: authorizationParams,
			headers,
			body
		}, true).catch((error2) => error2.data);
		const signInData = await callWithNuxt(nuxt, fetchSignIn);
		if (redirect || !isSupportingReturn) {
			const href = signInData.url ?? callbackUrl;
			const navigationResult = await navigateToAuthPageWN(nuxt, href);
			return {
				error: new URL(href, "http://_").searchParams.get("error"),
				ok: true,
				status: 302,
				url: href,
				navigationResult
			};
		}
		const error = new URL(signInData.url).searchParams.get("error");
		await getSession();
		return {
			error,
			status: 200,
			ok: true,
			url: error ? null : signInData.url,
			navigationResult: void 0
		};
	}
	async function getProviders() {
		const headers = await getRequestHeaders(nuxt, false);
		return _fetch(nuxt, "/providers", { headers });
	}
	async function getSession(getSessionOptions) {
		return callWithNuxt(nuxt, async () => {
			const callbackUrlFallback = getRequestURL();
			const { required, callbackUrl, onUnauthenticated } = defu(getSessionOptions || {}, {
				required: false,
				callbackUrl: void 0,
				onUnauthenticated: () => signIn(void 0, { callbackUrl: getSessionOptions?.callbackUrl || callbackUrlFallback })
			});
			function onError() {
				loading.value = false;
			}
			const headers = await getRequestHeaders(nuxt);
			return _fetch(nuxt, "/session", {
				onResponse: ({ response }) => {
					const sessionData = response._data;
					{
						const setCookieValues = response.headers.getSetCookie ? response.headers.getSetCookie() : [response.headers.get("set-cookie")];
						if (setCookieValues && nuxt.ssrContext) for (const value of setCookieValues) {
							if (!value) continue;
							appendHeader(nuxt.ssrContext.event, "set-cookie", value);
						}
					}
					data.value = isNonEmptyObject(sessionData) ? sessionData : null;
					loading.value = false;
					if (required && status.value === "unauthenticated") return onUnauthenticated();
					return sessionData;
				},
				onRequest: ({ options }) => {
					lastRefreshedAt.value = /* @__PURE__ */ new Date();
					options.params = {
						...options.params,
						callbackUrl: callbackUrl || callbackUrlFallback
					};
				},
				onRequestError: onError,
				onResponseError: onError,
				headers
			}, true);
		});
	}
	async function signOut(signOutOptions) {
		const { callbackUrl: userCallbackUrl, redirect = true } = signOutOptions ?? {};
		const csrfToken = await getCsrfToken();
		const callbackUrl = await determineCallbackUrl(runtimeConfig.public.auth, userCallbackUrl, true);
		if (!csrfToken) throw createError$1({
			statusCode: 400,
			message: "Could not fetch CSRF Token for signing out"
		});
		const signoutData = await _fetch(nuxt, "/signout", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				...await getRequestHeaders(nuxt)
			},
			onRequest: ({ options }) => {
				options.body = new URLSearchParams({
					csrfToken,
					callbackUrl,
					json: "true"
				});
			}
		}).catch((error) => error.data);
		if (redirect) {
			const url = signoutData.url ?? callbackUrl;
			return navigateToAuthPageWN(nuxt, url);
		}
		await getSession();
		return signoutData;
	}
	async function getCsrfToken() {
		return callWithNuxt(nuxt, async () => {
			const headers = await getRequestHeaders(nuxt);
			return _fetch(nuxt, "/csrf", { headers }).then((response) => response.csrfToken);
		});
	}
	return {
		status,
		data: readonly(data),
		lastRefreshedAt: readonly(lastRefreshedAt),
		getSession,
		getCsrfToken,
		getProviders,
		signIn,
		signOut,
		refresh: getSession
	};
}
async function getRequestHeaders(nuxt, includeCookie = true) {
	const headers = await callWithNuxt(nuxt, () => useRequestHeaders(["cookie", "host"]));
	if (includeCookie && headers.cookie) return headers;
	return { host: headers.host };
}

//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	__defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget);
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region node_modules/.pnpm/@pinia+nuxt@0.11.3_magic-st_0a78eaca2ce3841781509b8f6f8cf166/node_modules/@pinia/nuxt/dist/runtime/payload-plugin.js
var payloadPlugin = definePayloadPlugin(() => {
	definePayloadReducer("skipHydrate", (data) => !shouldHydrate(data) && 1);
});
//#endregion
//#region node_modules/vuetify/lib/util/easing.js
var standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
var deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
var acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";
var easingPatterns = {
	linear: (t) => t,
	easeInQuad: (t) => t ** 2,
	easeOutQuad: (t) => t * (2 - t),
	easeInOutQuad: (t) => t < .5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t,
	easeInCubic: (t) => t ** 3,
	easeOutCubic: (t) => --t ** 3 + 1,
	easeInOutCubic: (t) => t < .5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
	easeInQuart: (t) => t ** 4,
	easeOutQuart: (t) => 1 - --t ** 4,
	easeInOutQuart: (t) => t < .5 ? 8 * t ** 4 : 1 - 8 * --t ** 4,
	easeInQuint: (t) => t ** 5,
	easeOutQuint: (t) => 1 + --t ** 5,
	easeInOutQuint: (t) => t < .5 ? 16 * t ** 5 : 1 + 16 * --t ** 5,
	instant: (t) => 1
};
//#endregion
//#region node_modules/vuetify/lib/iconsets/mdi.js
var aliases = {
	collapse: "mdi-chevron-up",
	complete: "mdi-check",
	cancel: "mdi-close-circle",
	close: "mdi-close",
	delete: "mdi-close-circle",
	clear: "mdi-close-circle",
	success: "mdi-check-circle",
	info: "mdi-information",
	warning: "mdi-alert-circle",
	error: "mdi-close-circle",
	prev: "mdi-chevron-left",
	next: "mdi-chevron-right",
	checkboxOn: "mdi-checkbox-marked",
	checkboxOff: "mdi-checkbox-blank-outline",
	checkboxIndeterminate: "mdi-minus-box",
	delimiter: "mdi-circle",
	sortAsc: "mdi-arrow-up",
	sortDesc: "mdi-arrow-down",
	expand: "mdi-chevron-down",
	menu: "mdi-menu",
	subgroup: "mdi-menu-down",
	dropdown: "mdi-menu-down",
	radioOn: "mdi-radiobox-marked",
	radioOff: "mdi-radiobox-blank",
	edit: "mdi-pencil",
	ratingEmpty: "mdi-star-outline",
	ratingFull: "mdi-star",
	ratingHalf: "mdi-star-half-full",
	loading: "mdi-cached",
	first: "mdi-page-first",
	last: "mdi-page-last",
	unfold: "mdi-unfold-more-horizontal",
	file: "mdi-paperclip",
	plus: "mdi-plus",
	minus: "mdi-minus",
	calendar: "mdi-calendar",
	treeviewCollapse: "mdi-menu-down",
	treeviewExpand: "mdi-menu-right",
	tableGroupCollapse: "mdi-chevron-down",
	tableGroupExpand: "mdi-chevron-right",
	eyeDropper: "mdi-eyedropper",
	upload: "mdi-cloud-upload",
	color: "mdi-palette",
	command: "mdi-apple-keyboard-command",
	ctrl: "mdi-apple-keyboard-control",
	space: "mdi-keyboard-space",
	shift: "mdi-apple-keyboard-shift",
	alt: "mdi-apple-keyboard-option",
	enter: "mdi-keyboard-return",
	arrowup: "mdi-arrow-up",
	arrowdown: "mdi-arrow-down",
	arrowleft: "mdi-arrow-left",
	arrowright: "mdi-arrow-right",
	backspace: "mdi-backspace",
	play: "mdi-play",
	pause: "mdi-pause",
	fullscreen: "mdi-fullscreen",
	fullscreenExit: "mdi-fullscreen-exit",
	volumeHigh: "mdi-volume-high",
	volumeMedium: "mdi-volume-medium",
	volumeLow: "mdi-volume-low",
	volumeOff: "mdi-volume-variant-off",
	search: "mdi-magnify"
};
var mdi = { component: (props) => h(VClassIcon, {
	...props,
	class: "mdi"
}) };
//#endregion
//#region \0virtual:vuetify-icons-configuration
function iconsConfiguration() {
	return {
		defaultSet: "mdi",
		aliases,
		sets: { mdi }
	};
}
//#endregion
//#region node_modules/.pnpm/vuetify-nuxt-module@1.0.0-r_445629bff95b96860772554538d083cd/node_modules/vuetify-nuxt-module/dist/runtime/plugins/icons.js
function configureIcons(vuetifyOptions) {
	{
		const icons = iconsConfiguration();
		if (icons?.defaultSet === "custom") return;
		vuetifyOptions.icons = icons;
	}
}
//#endregion
//#region node_modules/.pnpm/vuetify-nuxt-module@1.0.0-r_445629bff95b96860772554538d083cd/node_modules/vuetify-nuxt-module/dist/runtime/plugins/vuetify-icons.js
var vuetify_icons_default = defineNuxtPlugin({
	name: "vuetify:icons:plugin",
	order: -25,
	parallel: true,
	setup(nuxtApp) {
		nuxtApp.hook("vuetify:configuration", ({ vuetifyOptions }) => {
			configureIcons(vuetifyOptions);
		});
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$5 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/pages/runtime/validate.js
var middleware$1 = defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$1({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
});
//#endregion
//#region app/middleware/auth.global.ts
var publicPage = ["/login"];
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [
	middleware$1,
	defineNuxtRouteMiddleware((to) => {
		const { status } = useAuth();
		const isPublicPage = publicPage.includes(to.path);
		if (status.value === "unauthenticated" && !isPublicPage) return navigateTo("/login");
		if (status.value === "authenticated" && isPublicPage) return navigateTo("/");
	}),
	/* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})
];
var namedMiddleware = { "sidebase-auth": () => Promise.resolve().then(() => sidebase_auth_exports) };
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "decks-new",
		path: "/decks/new",
		component: () => import('../build/new-FVxidnRd.mjs')
	},
	{
		name: "decks-deckId-cards-new",
		path: "/decks/:deckId()/cards/new",
		component: () => import('../build/new-C_nfRC-I.mjs')
	},
	{
		name: "decks-deckId-cards-cardId-edit",
		path: "/decks/:deckId()/cards/:cardId()/edit",
		component: () => import('../build/edit-DFLUbWoO.mjs')
	},
	{
		name: "decks-deckId-cards-cardId-learn",
		path: "/decks/:deckId()/cards/:cardId()/learn",
		component: () => import('../build/learn-YfZtXf6V.mjs')
	},
	{
		name: "decks-deckId-cards",
		path: "/decks/:deckId()/cards",
		component: () => import('../build/cards-14NwBVkg.mjs')
	},
	{
		name: "decks-deckId-edit",
		path: "/decks/:deckId()/edit",
		component: () => import('../build/edit-Cb2vG9i4.mjs')
	},
	{
		name: "learn-session",
		path: "/learn-session",
		component: () => import('../build/learn-session-DQK3cf5G.mjs')
	},
	{
		name: "login",
		path: "/login",
		meta: { layout: false },
		component: () => import('../build/login-0pcmS1rX.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-DGkaVbFr.mjs')
	}
];
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$4 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error = result || createError$1({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError$1(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		});
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			await nuxtApp.callHook("page:loading:end");
		});
		router.afterEach((to) => {
			if (to.matched.length === 0 && !error.value) return nuxtApp.runWithContext(() => showError(createError$1({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/plugins/debug-hooks.js
var plugin$3 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:debug:hooks",
	enforce: "pre",
	setup(nuxtApp) {
		createDebugger(nuxtApp.hooks, { tag: "nuxt-app" });
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var plugin$2 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
//#endregion
//#region node_modules/.pnpm/@pinia+nuxt@0.11.3_magic-st_0a78eaca2ce3841781509b8f6f8cf166/node_modules/@pinia/nuxt/dist/runtime/plugin.vue3.js
var plugin$1 = defineNuxtPlugin({
	name: "pinia",
	setup(nuxtApp) {
		const pinia = createPinia();
		nuxtApp.vueApp.use(pinia);
		setActivePinia(pinia);
		if (nuxtApp.payload && nuxtApp.payload.pinia) pinia.state.value = nuxtApp.payload.pinia;
		return { provide: { pinia } };
	},
	hooks: { "app:rendered"() {
		const nuxtApp = useNuxtApp();
		nuxtApp.payload.pinia = toRaw(nuxtApp.$pinia).state.value;
		setActivePinia(void 0);
	} }
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = defineNuxtPlugin({ name: "nuxt:global-components" });
//#endregion
//#region node_modules/.pnpm/vuetify-nuxt-module@1.0.0-r_445629bff95b96860772554538d083cd/node_modules/vuetify-nuxt-module/dist/runtime/plugins/vuetify-no-client-hints.js
var plugin = defineNuxtPlugin(() => {
	return { provide: reactive({ ssrClientHints: {
		firstRequest: false,
		prefersColorSchemeAvailable: false,
		prefersReducedMotionAvailable: false,
		viewportHeightAvailable: false,
		viewportWidthAvailable: false
	} }) };
});
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/refreshHandler.js
var DefaultRefreshHandler = class {
	constructor(config) {
		this.config = config;
		this.boundVisibilityHandler = this.visibilityHandler.bind(this);
	}
	/** Result of `useAuth` composable, mostly used for session data/refreshing */
	auth;
	/** Runtime config is mostly used for getting provider data */
	runtimeConfig;
	/** Refetch interval */
	refetchIntervalTimer;
	/** Refetch interval for local/refresh schema */
	refreshTokenIntervalTimer;
	/** Because passing `this.visibilityHandler` to `document.addEventHandler` loses `this` context */
	boundVisibilityHandler;
	init() {
		this.runtimeConfig = useRuntimeConfig().public.auth;
		this.auth = useAuth();
		(void 0).addEventListener("visibilitychange", this.boundVisibilityHandler, false);
		const { enablePeriodically } = this.config;
		if (enablePeriodically !== false && enablePeriodically !== void 0) {
			const intervalTime = enablePeriodically === true ? 1e3 : safeTimerDelay(enablePeriodically);
			this.refetchIntervalTimer = setInterval(() => {
				if (this.auth?.data.value) this.auth.refresh();
			}, intervalTime);
		}
		const provider = this.runtimeConfig.provider;
		if (provider.type === "local" && provider.refresh.isEnabled && provider.refresh.token?.maxAgeInSeconds) {
			const intervalTime = safeTimerDelay(provider.refresh.token.maxAgeInSeconds * 1e3);
			this.refreshTokenIntervalTimer = setInterval(() => {
				if (this.auth?.refreshToken.value) this.auth.refresh();
			}, intervalTime);
		}
	}
	destroy() {
		(void 0).removeEventListener("visibilitychange", this.boundVisibilityHandler, false);
		clearInterval(this.refetchIntervalTimer);
		if (this.refreshTokenIntervalTimer) clearInterval(this.refreshTokenIntervalTimer);
		this.auth = void 0;
		this.runtimeConfig = void 0;
	}
	visibilityHandler() {
		if (this.config?.enableOnWindowFocus && (void 0).visibilityState === "visible" && this.auth?.data.value) this.auth.refresh();
	}
};
var MAX_SAFE_INTERVAL_MS = 2147483647;
function safeTimerDelay(milliseconds) {
	return Math.min(milliseconds, MAX_SAFE_INTERVAL_MS);
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2FrefreshHandler.ts
var _refreshHandler = new DefaultRefreshHandler({
	"enablePeriodically": false,
	"enableOnWindowFocus": true
});
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/middleware/sidebase-auth.js
var sidebase_auth_exports = /* @__PURE__ */ __exportAll({ default: () => sidebase_auth_default });
var sidebase_auth_default = defineNuxtRouteMiddleware((to) => {
	const options = normalizeUserOptions(to.meta.auth);
	if (!options) return;
	const authConfig = useRuntimeConfig().public.auth;
	const { status, signIn } = useAuth();
	const isGuestMode = options.unauthenticatedOnly;
	const isAuthenticated = status.value === "authenticated";
	if (isGuestMode && status.value === "unauthenticated") return;
	else if (isGuestMode && isAuthenticated) return navigateTo(options.navigateAuthenticatedTo);
	else if (isAuthenticated) return;
	if (authConfig.provider.type === "local") {
		const loginRoute = authConfig.provider.pages.login;
		if (loginRoute && loginRoute === to.path) return;
	}
	const globalAppMiddleware = authConfig.globalAppMiddleware;
	if (globalAppMiddleware === true || typeof globalAppMiddleware === "object" && globalAppMiddleware.allow404WithoutAuth) {
		if (!(to.matched.length > 0)) return;
	}
	if (options.navigateUnauthenticatedTo) return navigateTo(options.navigateUnauthenticatedTo);
	if (authConfig.provider.type === "authjs") return signIn(void 0, {
		error: "SessionRequired",
		callbackUrl: determineCallbackUrlForRouteMiddleware(authConfig, to)
	}).then((signInResult) => {
		if (signInResult) return signInResult.navigationResult;
		return true;
	});
	const loginPage = authConfig.provider.pages.login;
	if (typeof loginPage !== "string") {
		console.warn(`${ERROR_PREFIX} provider.pages.login is misconfigured`);
		return;
	}
	const external = isExternalUrl(loginPage);
	if (typeof globalAppMiddleware === "object" && globalAppMiddleware.addDefaultCallbackUrl) {
		let redirectUrl = to.fullPath;
		if (typeof globalAppMiddleware.addDefaultCallbackUrl === "string") redirectUrl = globalAppMiddleware.addDefaultCallbackUrl;
		return navigateTo({
			path: loginPage,
			query: { redirect: redirectUrl }
		}, { external });
	}
	return navigateTo(loginPage, { external });
});
function normalizeUserOptions(userOptions) {
	if (typeof userOptions === "boolean" || userOptions === void 0) return userOptions !== false ? {
		unauthenticatedOnly: false,
		navigateAuthenticatedTo: "/",
		navigateUnauthenticatedTo: void 0
	} : void 0;
	if (typeof userOptions === "object") {
		if (userOptions.unauthenticatedOnly === void 0) userOptions.unauthenticatedOnly = true;
		return {
			unauthenticatedOnly: userOptions.unauthenticatedOnly,
			navigateAuthenticatedTo: userOptions.navigateAuthenticatedTo ?? "/",
			navigateUnauthenticatedTo: userOptions.navigateUnauthenticatedTo
		};
	}
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/utils/kit.js
function withoutQuery(path) {
	return path.split("?")[0];
}
var routeMatcher;
function getNitroRouteRules(path) {
	const { nitro, app } = useRuntimeConfig();
	if (!routeMatcher) routeMatcher = toRouteMatcher(createRouter$1({ routes: Object.fromEntries(Object.entries(nitro?.routeRules || {}).map(([routePath, rules]) => [withoutTrailingSlash$1(routePath), rules])) }));
	const options = {};
	const matches = routeMatcher.matchAll(withoutBase(withoutTrailingSlash$1(withoutQuery(path)), app.baseURL)).toReversed();
	for (const match of matches) options.disableServerSideAuth ??= match.auth?.disableServerSideAuth;
	return options;
}
//#endregion
//#region node_modules/.pnpm/@sidebase+nuxt-auth@1.3.1_@_fb6fc0452df2c9a23758c654e9b983a9/node_modules/@sidebase/nuxt-auth/dist/runtime/plugin.js
var plugin_default$1 = defineNuxtPlugin(async (nuxtApp) => {
	let __temp, __restore;
	const { data, lastRefreshedAt, loading } = useAuthState();
	const { getSession } = useAuth();
	const wholeRuntimeConfig = useRuntimeConfig();
	const runtimeConfig = wholeRuntimeConfig.public.auth;
	const globalAppMiddleware = runtimeConfig.globalAppMiddleware;
	const routeRules = getNitroRouteRules(nuxtApp._route.path);
	runtimeConfig.baseURL = resolveApiBaseURL(wholeRuntimeConfig);
	let nitroPrerender = false;
	if (nuxtApp.ssrContext) nitroPrerender = getHeader(nuxtApp.ssrContext.event, "x-nitro-prerender") !== void 0;
	let disableServerSideAuth = routeRules.disableServerSideAuth;
	disableServerSideAuth ??= runtimeConfig?.disableServerSideAuth;
	disableServerSideAuth ??= false;
	if (disableServerSideAuth) loading.value = true;
	const isErrorUrl = nuxtApp.ssrContext?.error === true;
	const requireAuthOnErrorPage = globalAppMiddleware === true || typeof globalAppMiddleware === "object" && globalAppMiddleware.allow404WithoutAuth;
	if (typeof data.value === "undefined" && !nitroPrerender && !disableServerSideAuth && !(isErrorUrl && requireAuthOnErrorPage)) try {
		[__temp, __restore] = executeAsync(() => getSession()), await __temp, __restore();
	} catch (e) {
		if (!(e instanceof FetchConfigurationError)) throw e;
	}
	nuxtApp.hook("app:mounted", () => {
		_refreshHandler.init();
		if (disableServerSideAuth) getSession();
	});
	const _unmount = nuxtApp.vueApp.unmount;
	nuxtApp.vueApp.unmount = function() {
		_refreshHandler.destroy();
		lastRefreshedAt.value = void 0;
		data.value = void 0;
		_unmount();
	};
	if (globalAppMiddleware === true || typeof globalAppMiddleware === "object" && globalAppMiddleware.isEnabled) addRouteMiddleware("auth", sidebase_auth_default, { global: true });
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fdayjs.imports.mjs
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(utc);
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fdayjs_imports_default = dayjs;
//#endregion
//#region node_modules/.pnpm/dayjs-nuxt@2.1.11_magicast@0.5.3/node_modules/dayjs-nuxt/dist/runtime/plugin.js
var plugin_default = defineNuxtPlugin(async (nuxtApp) => nuxtApp.provide("dayjs", virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fdayjs_imports_default));
//#endregion
//#region \0virtual:vuetify-configuration
function vuetifyConfiguration() {
	return {
		"theme": {
			"defaultTheme": "light",
			"themes": { "light": { "colors": {
				"primary": "#4CAF50",
				"mnemo-primary": "#2563EB",
				"mnemo-secondary": "#64748B",
				"mnemo-outline": "#CBD5E1",
				"mnemo-danger": "#9f2f33",
				"mnemo-dark": "#344556",
				"mnemo-success": "#5fae9a"
			} } }
		},
		"ssr": true
	};
}
//#endregion
//#region node_modules/vuetify/lib/icons.js
function genDefaults$1() {
	return {
		svg: { component: VSvgIcon },
		class: { component: VClassIcon }
	};
}
function createIcons(options) {
	const sets = genDefaults$1();
	const defaultSet = options?.defaultSet ?? "mdi";
	if (defaultSet === "mdi" && !sets.mdi) sets.mdi = mdi;
	return mergeDeep({
		defaultSet,
		sets,
		aliases: {
			...aliases,
			vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", .6]],
			"vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
			"vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", .6]]
		}
	}, options);
}
//#endregion
//#region node_modules/vuetify/lib/composables/date/adapters/vuetify.js
function weekInfo(locale) {
	const code = locale.slice(-2).toUpperCase();
	switch (true) {
		case locale === "GB-alt-variant": return {
			firstDay: 0,
			firstWeekSize: 4
		};
		case locale === "001": return {
			firstDay: 1,
			firstWeekSize: 1
		};
		case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(code): return {
			firstDay: 0,
			firstWeekSize: 1
		};
		case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(code): return {
			firstDay: 1,
			firstWeekSize: 1
		};
		case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(code): return {
			firstDay: 1,
			firstWeekSize: 4
		};
		case `AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY`.includes(code): return {
			firstDay: 6,
			firstWeekSize: 1
		};
		case code === "MV": return {
			firstDay: 5,
			firstWeekSize: 1
		};
		case code === "PT": return {
			firstDay: 0,
			firstWeekSize: 4
		};
		default: return null;
	}
}
function getWeekArray(date, locale, firstDayOfWeek) {
	const weeks = [];
	let currentWeek = [];
	const firstDayOfMonth = startOfMonth(date);
	const lastDayOfMonth = endOfMonth(date);
	const first = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0;
	const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7;
	const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7;
	for (let i = 0; i < firstDayWeekIndex; i++) {
		const adjacentDay = new Date(firstDayOfMonth);
		adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
		currentWeek.push(adjacentDay);
	}
	for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
		const day = new Date(date.getFullYear(), date.getMonth(), i);
		currentWeek.push(day);
		if (currentWeek.length === 7) {
			weeks.push(currentWeek);
			currentWeek = [];
		}
	}
	for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
		const adjacentDay = new Date(lastDayOfMonth);
		adjacentDay.setDate(adjacentDay.getDate() + i);
		currentWeek.push(adjacentDay);
	}
	if (currentWeek.length > 0) weeks.push(currentWeek);
	return weeks;
}
function startOfWeek(date, locale, firstDayOfWeek) {
	let day = (firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0) % 7;
	if (![
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].includes(day)) {
		consoleWarn("Invalid firstDayOfWeek, expected discrete number in range [0-6]");
		day = 0;
	}
	const d = new Date(date);
	while (d.getDay() !== day) d.setDate(d.getDate() - 1);
	return d;
}
function endOfWeek(date, locale) {
	const d = new Date(date);
	const lastDay = ((weekInfo(locale)?.firstDay ?? 0) + 6) % 7;
	while (d.getDay() !== lastDay) d.setDate(d.getDate() + 1);
	return d;
}
function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function parseLocalDate(value) {
	const parts = value.split("-").map(Number);
	return new Date(parts[0], parts[1] - 1, parts[2]);
}
var _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function date(value) {
	if (value == null) return /* @__PURE__ */ new Date();
	if (value instanceof Date) return value;
	if (typeof value === "string") {
		let parsed;
		if (_YYYMMDD.test(value)) return parseLocalDate(value);
		else parsed = Date.parse(value);
		if (!isNaN(parsed)) return new Date(parsed);
	}
	return null;
}
var sundayJanuarySecond2000 = new Date(2e3, 0, 2);
function getWeekdays(locale, firstDayOfWeek, weekdayFormat) {
	const daysFromSunday = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0;
	return createRange(7).map((i) => {
		const weekday = new Date(sundayJanuarySecond2000);
		weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
		return new Intl.DateTimeFormat(locale, { weekday: weekdayFormat ?? "narrow" }).format(weekday);
	});
}
function format(value, formatString, locale, formats) {
	const newDate = date(value) ?? /* @__PURE__ */ new Date();
	const customFormat = formats?.[formatString];
	if (typeof customFormat === "function") return customFormat(newDate, formatString, locale);
	let options = {};
	switch (formatString) {
		case "fullDate":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric"
			};
			break;
		case "fullDateWithWeekday":
			options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			break;
		case "normalDate": return `${newDate.getDate()} ${new Intl.DateTimeFormat(locale, { month: "long" }).format(newDate)}`;
		case "normalDateWithWeekday":
			options = {
				weekday: "short",
				day: "numeric",
				month: "short"
			};
			break;
		case "shortDate":
			options = {
				month: "short",
				day: "numeric"
			};
			break;
		case "year":
			options = { year: "numeric" };
			break;
		case "month":
			options = { month: "long" };
			break;
		case "monthShort":
			options = { month: "short" };
			break;
		case "monthAndYear":
			options = {
				month: "long",
				year: "numeric"
			};
			break;
		case "monthAndDate":
			options = {
				month: "long",
				day: "numeric"
			};
			break;
		case "weekday":
			options = { weekday: "long" };
			break;
		case "weekdayShort":
			options = { weekday: "short" };
			break;
		case "dayOfMonth": return new Intl.NumberFormat(locale).format(newDate.getDate());
		case "hours12h":
			options = {
				hour: "numeric",
				hour12: true
			};
			break;
		case "hours24h":
			options = {
				hour: "numeric",
				hour12: false
			};
			break;
		case "minutes":
			options = { minute: "numeric" };
			break;
		case "seconds":
			options = { second: "numeric" };
			break;
		case "fullTime":
			options = {
				hour: "numeric",
				minute: "numeric"
			};
			break;
		case "fullTime12h":
			options = {
				hour: "numeric",
				minute: "numeric",
				hour12: true
			};
			break;
		case "fullTime24h":
			options = {
				hour: "numeric",
				minute: "numeric",
				hour12: false
			};
			break;
		case "fullDateTime":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric"
			};
			break;
		case "fullDateTime12h":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: true
			};
			break;
		case "fullDateTime24h":
			options = {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: false
			};
			break;
		case "keyboardDate":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			};
			break;
		case "keyboardDateTime":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric"
			};
			return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, " ");
		case "keyboardDateTime12h":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				hour12: true
			};
			return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, " ");
		case "keyboardDateTime24h":
			options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "numeric",
				minute: "numeric",
				hour12: false
			};
			return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, " ");
		default: options = customFormat ?? {
			timeZone: "UTC",
			timeZoneName: "short"
		};
	}
	return new Intl.DateTimeFormat(locale, options).format(newDate);
}
function toISO(adapter, value) {
	const date = adapter.toJsDate(value);
	return `${date.getFullYear()}-${padStart(String(date.getMonth() + 1), 2, "0")}-${padStart(String(date.getDate()), 2, "0")}`;
}
function parseISO(value) {
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day);
}
function addMinutes(date, amount) {
	const d = new Date(date);
	d.setMinutes(d.getMinutes() + amount);
	return d;
}
function addHours(date, amount) {
	const d = new Date(date);
	d.setHours(d.getHours() + amount);
	return d;
}
function addDays(date, amount) {
	const d = new Date(date);
	d.setDate(d.getDate() + amount);
	return d;
}
function addWeeks(date, amount) {
	const d = new Date(date);
	d.setDate(d.getDate() + amount * 7);
	return d;
}
function addMonths(date, amount) {
	const d = new Date(date);
	d.setDate(1);
	d.setMonth(d.getMonth() + amount);
	return d;
}
function getYear(date) {
	return date.getFullYear();
}
function getMonth(date) {
	return date.getMonth();
}
function getWeek(date, locale, firstDayOfWeek, firstDayOfYear) {
	const weekInfoFromLocale = weekInfo(locale);
	const weekStart = firstDayOfWeek ?? weekInfoFromLocale?.firstDay ?? 0;
	const minWeekSize = weekInfoFromLocale?.firstWeekSize ?? 1;
	return firstDayOfYear !== void 0 ? calculateWeekWithFirstDayOfYear(date, locale, weekStart, firstDayOfYear) : calculateWeekWithMinWeekSize(date, locale, weekStart, minWeekSize);
}
function calculateWeekWithFirstDayOfYear(date, locale, weekStart, firstDayOfYear) {
	const firstDayOfYearOffset = (7 + firstDayOfYear - weekStart) % 7;
	const currentWeekStart = startOfWeek(date, locale, weekStart);
	const currentWeekEnd = addDays(currentWeekStart, 6);
	function yearStartWeekdayOffset(year) {
		return (7 + new Date(year, 0, 1).getDay() - weekStart) % 7;
	}
	let year = getYear(currentWeekStart);
	if (year < getYear(currentWeekEnd) && yearStartWeekdayOffset(year + 1) <= firstDayOfYearOffset) year++;
	const yearStart = new Date(year, 0, 1);
	const offset = yearStartWeekdayOffset(year);
	const d1w1 = offset <= firstDayOfYearOffset ? addDays(yearStart, -offset) : addDays(yearStart, 7 - offset);
	return 1 + getDiff(endOfDay(currentWeekStart), startOfDay(d1w1), "weeks");
}
function calculateWeekWithMinWeekSize(date, locale, weekStart, minWeekSize) {
	const currentWeekStart = startOfWeek(date, locale, weekStart);
	const currentWeekEnd = addDays(startOfWeek(date, locale, weekStart), 6);
	function firstWeekSize(year) {
		const yearStart = new Date(year, 0, 1);
		return 7 - getDiff(yearStart, startOfWeek(yearStart, locale, weekStart), "days");
	}
	let year = getYear(currentWeekStart);
	if (year < getYear(currentWeekEnd) && firstWeekSize(year + 1) >= minWeekSize) year++;
	const yearStart = new Date(year, 0, 1);
	const size = firstWeekSize(year);
	const d1w1 = size >= minWeekSize ? addDays(yearStart, size - 7) : addDays(yearStart, size);
	return 1 + getDiff(endOfDay(currentWeekStart), startOfDay(d1w1), "weeks");
}
function getDate(date) {
	return date.getDate();
}
function getNextMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}
function getPreviousMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}
function getHours(date) {
	return date.getHours();
}
function getMinutes(date) {
	return date.getMinutes();
}
function startOfYear(date) {
	return new Date(date.getFullYear(), 0, 1);
}
function endOfYear(date) {
	return new Date(date.getFullYear(), 11, 31);
}
function isWithinRange(date, range) {
	return isEqual(date, range[0]) || isEqual(date, range[1]) || isAfter(date, range[0]) && isBefore(date, range[1]);
}
function isValid(date) {
	const d = new Date(date);
	return d instanceof Date && !isNaN(d.getTime());
}
function isAfter(date, comparing) {
	return date.getTime() > comparing.getTime();
}
function isAfterDay(date, comparing) {
	return isAfter(startOfDay(date), startOfDay(comparing));
}
function isBefore(date, comparing) {
	return date.getTime() < comparing.getTime();
}
function isEqual(date, comparing) {
	return date.getTime() === comparing.getTime();
}
function isSameDay(date, comparing) {
	return date.getDate() === comparing.getDate() && date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
}
function isSameMonth(date, comparing) {
	return date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
}
function isSameYear(date, comparing) {
	return date.getFullYear() === comparing.getFullYear();
}
function getDiff(date, comparing, unit) {
	const d = new Date(date);
	const c = new Date(comparing);
	switch (unit) {
		case "years": return d.getFullYear() - c.getFullYear();
		case "quarters": return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4);
		case "months": return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
		case "weeks": return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60 * 24 * 7));
		case "days": return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60 * 24));
		case "hours": return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60));
		case "minutes": return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60));
		case "seconds": return Math.floor((d.getTime() - c.getTime()) / 1e3);
		default: return d.getTime() - c.getTime();
	}
}
function setHours(date, count) {
	const d = new Date(date);
	d.setHours(count);
	return d;
}
function setMinutes(date, count) {
	const d = new Date(date);
	d.setMinutes(count);
	return d;
}
function setMonth(date, count) {
	const d = new Date(date);
	d.setMonth(count);
	return d;
}
function setDate(date, day) {
	const d = new Date(date);
	d.setDate(day);
	return d;
}
function setYear(date, year) {
	const d = new Date(date);
	d.setFullYear(year);
	return d;
}
function startOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}
function endOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
var VuetifyDateAdapter = class {
	constructor(options) {
		this.locale = options.locale;
		this.formats = options.formats;
	}
	date(value) {
		return date(value);
	}
	toJsDate(date) {
		return date;
	}
	toISO(date) {
		return toISO(this, date);
	}
	parseISO(date) {
		return parseISO(date);
	}
	addMinutes(date, amount) {
		return addMinutes(date, amount);
	}
	addHours(date, amount) {
		return addHours(date, amount);
	}
	addDays(date, amount) {
		return addDays(date, amount);
	}
	addWeeks(date, amount) {
		return addWeeks(date, amount);
	}
	addMonths(date, amount) {
		return addMonths(date, amount);
	}
	getWeekArray(date, firstDayOfWeek) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		return getWeekArray(date, this.locale, firstDay);
	}
	startOfWeek(date, firstDayOfWeek) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		return startOfWeek(date, this.locale, firstDay);
	}
	endOfWeek(date) {
		return endOfWeek(date, this.locale);
	}
	startOfMonth(date) {
		return startOfMonth(date);
	}
	endOfMonth(date) {
		return endOfMonth(date);
	}
	format(date, formatString) {
		return format(date, formatString, this.locale, this.formats);
	}
	isEqual(date, comparing) {
		return isEqual(date, comparing);
	}
	isValid(date) {
		return isValid(date);
	}
	isWithinRange(date, range) {
		return isWithinRange(date, range);
	}
	isAfter(date, comparing) {
		return isAfter(date, comparing);
	}
	isAfterDay(date, comparing) {
		return isAfterDay(date, comparing);
	}
	isBefore(date, comparing) {
		return !isAfter(date, comparing) && !isEqual(date, comparing);
	}
	isSameDay(date, comparing) {
		return isSameDay(date, comparing);
	}
	isSameMonth(date, comparing) {
		return isSameMonth(date, comparing);
	}
	isSameYear(date, comparing) {
		return isSameYear(date, comparing);
	}
	setMinutes(date, count) {
		return setMinutes(date, count);
	}
	setHours(date, count) {
		return setHours(date, count);
	}
	setMonth(date, count) {
		return setMonth(date, count);
	}
	setDate(date, day) {
		return setDate(date, day);
	}
	setYear(date, year) {
		return setYear(date, year);
	}
	getDiff(date, comparing, unit) {
		return getDiff(date, comparing, unit);
	}
	getWeekdays(firstDayOfWeek, weekdayFormat) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		return getWeekdays(this.locale, firstDay, weekdayFormat);
	}
	getYear(date) {
		return getYear(date);
	}
	getMonth(date) {
		return getMonth(date);
	}
	getWeek(date, firstDayOfWeek, firstDayOfYear) {
		const firstDay = firstDayOfWeek !== void 0 ? Number(firstDayOfWeek) : void 0;
		const firstWeekStart = firstDayOfYear !== void 0 ? Number(firstDayOfYear) : void 0;
		return getWeek(date, this.locale, firstDay, firstWeekStart);
	}
	getDate(date) {
		return getDate(date);
	}
	getNextMonth(date) {
		return getNextMonth(date);
	}
	getPreviousMonth(date) {
		return getPreviousMonth(date);
	}
	getHours(date) {
		return getHours(date);
	}
	getMinutes(date) {
		return getMinutes(date);
	}
	startOfDay(date) {
		return startOfDay(date);
	}
	endOfDay(date) {
		return endOfDay(date);
	}
	startOfYear(date) {
		return startOfYear(date);
	}
	endOfYear(date) {
		return endOfYear(date);
	}
};
//#endregion
//#region node_modules/vuetify/lib/composables/date/date.js
var DateOptionsSymbol = Symbol.for("vuetify:date-options");
var DateAdapterSymbol = Symbol.for("vuetify:date-adapter");
function createDate(options, locale) {
	const _options = mergeDeep({
		adapter: VuetifyDateAdapter,
		locale: {
			af: "af-ZA",
			bg: "bg-BG",
			ca: "ca-ES",
			ckb: "",
			cs: "cs-CZ",
			de: "de-DE",
			el: "el-GR",
			en: "en-US",
			et: "et-EE",
			fa: "fa-IR",
			fi: "fi-FI",
			hr: "hr-HR",
			hu: "hu-HU",
			he: "he-IL",
			id: "id-ID",
			it: "it-IT",
			ja: "ja-JP",
			ko: "ko-KR",
			lv: "lv-LV",
			lt: "lt-LT",
			nl: "nl-NL",
			no: "no-NO",
			pl: "pl-PL",
			pt: "pt-PT",
			ro: "ro-RO",
			ru: "ru-RU",
			sk: "sk-SK",
			sl: "sl-SI",
			srCyrl: "sr-SP",
			srLatn: "sr-SP",
			sv: "sv-SE",
			th: "th-TH",
			tr: "tr-TR",
			az: "az-AZ",
			uk: "uk-UA",
			vi: "vi-VN",
			zhHans: "zh-CN",
			zhHant: "zh-TW"
		}
	}, options);
	return {
		options: _options,
		instance: createInstance(_options, locale)
	};
}
function createInstance(options, locale) {
	const instance = reactive(typeof options.adapter === "function" ? new options.adapter({
		locale: options.locale[locale.current.value] ?? locale.current.value,
		formats: options.formats
	}) : options.adapter);
	watch(locale.current, (value) => {
		instance.locale = options.locale[value] ?? value ?? instance.locale;
	});
	return instance;
}
//#endregion
//#region node_modules/vuetify/lib/composables/display.js
var breakpoints = [
	"sm",
	"md",
	"lg",
	"xl",
	"xxl"
];
var DisplaySymbol = Symbol.for("vuetify:display");
var defaultDisplayOptions = {
	mobileBreakpoint: "lg",
	thresholds: {
		xs: 0,
		sm: 600,
		md: 840,
		lg: 1145,
		xl: 1545,
		xxl: 2138
	}
};
var parseDisplayOptions = (options = defaultDisplayOptions) => {
	return mergeDeep(defaultDisplayOptions, options);
};
function getClientWidth(ssr) {
	return typeof ssr === "object" && ssr.clientWidth || 0;
}
function getClientHeight(ssr) {
	return typeof ssr === "object" && ssr.clientHeight || 0;
}
function getPlatform(ssr) {
	const userAgent = "ssr";
	function match(regexp) {
		return Boolean(userAgent.match(regexp));
	}
	return {
		android: match(/android/i),
		ios: match(/iphone|ipad|ipod/i),
		cordova: match(/cordova/i),
		electron: match(/electron/i),
		chrome: match(/chrome/i),
		edge: match(/edge/i),
		firefox: match(/firefox/i),
		opera: match(/opera/i),
		win: match(/win/i),
		mac: match(/mac/i),
		linux: match(/linux/i),
		touch: false,
		ssr: true
	};
}
function createDisplay(options, ssr) {
	const { thresholds, mobileBreakpoint } = parseDisplayOptions(options);
	const height = shallowRef(getClientHeight(ssr));
	const platform = shallowRef(getPlatform());
	const state = reactive({});
	const width = shallowRef(getClientWidth(ssr));
	function updateSize() {
		height.value = getClientHeight();
		width.value = getClientWidth();
	}
	function update() {
		updateSize();
		platform.value = getPlatform();
	}
	watchEffect(() => {
		const xs = width.value < thresholds.sm;
		const sm = width.value < thresholds.md && !xs;
		const md = width.value < thresholds.lg && !(sm || xs);
		const lg = width.value < thresholds.xl && !(md || sm || xs);
		const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
		const xxl = width.value >= thresholds.xxl;
		const name = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : xl ? "xl" : "xxl";
		const breakpointValue = typeof mobileBreakpoint === "number" ? mobileBreakpoint : thresholds[mobileBreakpoint];
		const mobile = width.value < breakpointValue;
		state.xs = xs;
		state.sm = sm;
		state.md = md;
		state.lg = lg;
		state.xl = xl;
		state.xxl = xxl;
		state.smAndUp = !xs;
		state.mdAndUp = !(xs || sm);
		state.lgAndUp = !(xs || sm || md);
		state.xlAndUp = !(xs || sm || md || lg);
		state.smAndDown = !(md || lg || xl || xxl);
		state.mdAndDown = !(lg || xl || xxl);
		state.lgAndDown = !(xl || xxl);
		state.xlAndDown = !xxl;
		state.name = name;
		state.height = height.value;
		state.width = width.value;
		state.mobile = mobile;
		state.mobileBreakpoint = mobileBreakpoint;
		state.platform = platform.value;
		state.thresholds = thresholds;
	});
	return {
		...toRefs(state),
		update,
		ssr: !!ssr
	};
}
function useDisplay(props = { mobile: null }, name = getCurrentInstanceName()) {
	const display = inject(DisplaySymbol);
	if (!display) throw new Error("Could not find Vuetify display injection");
	const mobile = computed(() => {
		if (props.mobile) return true;
		else if (typeof props.mobileBreakpoint === "number") return display.width.value < props.mobileBreakpoint;
		else if (props.mobileBreakpoint) return display.width.value < display.thresholds.value[props.mobileBreakpoint];
		else if (props.mobile === null) return display.mobile.value;
		else return false;
	});
	const displayClasses = toRef(() => {
		if (!name) return {};
		return { [`${name}--mobile`]: mobile.value };
	});
	return {
		...display,
		displayClasses,
		mobile
	};
}
//#endregion
//#region node_modules/vuetify/lib/composables/goto.js
var GoToSymbol = Symbol.for("vuetify:goto");
function genDefaults() {
	return {
		container: void 0,
		duration: 300,
		layout: false,
		offset: 0,
		easing: "easeInOutCubic",
		patterns: easingPatterns
	};
}
function createGoTo(options, locale) {
	return {
		rtl: locale.isRtl,
		options: mergeDeep(genDefaults(), options)
	};
}
//#endregion
//#region node_modules/vuetify/lib/framework.js
function createVuetify(vuetify = {}) {
	const { blueprint, ...rest } = vuetify;
	const options = mergeDeep(blueprint, rest);
	const { aliases = {}, components = {}, directives = {} } = options;
	const scope = effectScope();
	return scope.run(() => {
		const defaults = createDefaults(options.defaults);
		const display = createDisplay(options.display, options.ssr);
		const theme = createTheme(options.theme);
		const icons = createIcons(options.icons);
		const locale = createLocale(options.locale);
		const date = createDate(options.date, locale);
		const goTo = createGoTo(options.goTo, locale);
		function install(app) {
			for (const key in directives) app.directive(key, directives[key]);
			for (const key in components) app.component(key, components[key]);
			for (const key in aliases) app.component(key, defineComponent$1({
				...aliases[key],
				name: key,
				aliasName: aliases[key].name
			}));
			const appScope = effectScope();
			appScope.run(() => {
				theme.install(app);
			});
			app.onUnmount(() => appScope.stop());
			app.provide(DefaultsSymbol, defaults);
			app.provide(DisplaySymbol, display);
			app.provide(ThemeSymbol, theme);
			app.provide(IconSymbol, icons);
			app.provide(LocaleSymbol, locale);
			app.provide(DateOptionsSymbol, date.options);
			app.provide(DateAdapterSymbol, date.instance);
			app.provide(GoToSymbol, goTo);
			app.mixin({ computed: { $vuetify() {
				return reactive({
					defaults: inject$1.call(this, DefaultsSymbol),
					display: inject$1.call(this, DisplaySymbol),
					theme: inject$1.call(this, ThemeSymbol),
					icons: inject$1.call(this, IconSymbol),
					locale: inject$1.call(this, LocaleSymbol),
					date: inject$1.call(this, DateAdapterSymbol)
				});
			} } });
		}
		function unmount() {
			scope.stop();
		}
		return {
			install,
			unmount,
			defaults,
			display,
			theme,
			icons,
			locale,
			date,
			goTo
		};
	});
}
createVuetify.version = "4.0.1";
function inject$1(key) {
	const vm = this.$;
	const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides;
	if (provides && key in provides) return provides[key];
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fvuetify%2Flabs-rules-configuration.mjs
var rulesOptions = {};
//#endregion
//#region node_modules/vuetify/lib/labs/rules/rules.js
function createRules(options, locale) {
	const { t } = locale;
	const aliases = {
		required: (err) => {
			return (v) => {
				return v === 0 || !!v || t(err || "$vuetify.rules.required");
			};
		},
		email: (err) => {
			return (v) => !v || typeof v === "string" && /^.+@\S+\.\S+$/.test(v) || t(err || "$vuetify.rules.email");
		},
		number: (err) => {
			return (v) => !v || !isNaN(Number(v)) || t(err || "$vuetify.rules.number");
		},
		integer: (err) => {
			return (v) => /^[\d]*$/.test(v) || t(err || "$vuetify.rules.integer");
		},
		capital: (err) => {
			return (v) => /^[A-Z]*$/.test(v) || t(err || "$vuetify.rules.capital");
		},
		maxLength: (len, err) => {
			return (v) => !v || v.length <= len || t(err || "$vuetify.rules.maxLength", len);
		},
		minLength: (len, err) => {
			return (v) => !v || v.length >= len || t(err || "$vuetify.rules.minLength", len);
		},
		strictLength: (len, err) => {
			return (v) => !v || v.length === len || t(err || "$vuetify.rules.strictLength", len);
		},
		exclude: (forbiddenCharacters, err) => {
			return (v) => {
				let error = true;
				for (const character of forbiddenCharacters) if (v.includes(character)) error = err || t("$vuetify.rules.exclude", character);
				return error;
			};
		},
		notEmpty: (err) => {
			return (v) => v && v.length > 0 || t(err || "$vuetify.rules.notEmpty");
		},
		pattern: (pattern, err) => {
			return (v) => !v || pattern.test(v) || t(err || "$vuetify.rules.pattern");
		},
		...options?.aliases
	};
	function resolve(fn) {
		return computed(() => fn().map((rule) => {
			let ruleName = null;
			let ruleParams = [void 0];
			if (Array.isArray(rule)) {
				ruleName = rule[0];
				ruleParams = rule.slice(1);
			} else if (typeof rule === "string") ruleName = rule;
			if (ruleName !== null) {
				if (ruleName.startsWith("$")) ruleName = ruleName.slice(1);
				return aliases[ruleName]?.(...ruleParams);
			} else return rule;
		}));
	}
	return {
		resolve,
		aliases
	};
}
var RulesSymbol = Symbol.for("vuetify:rules");
function useRules(fn) {
	const rules = inject(RulesSymbol, null);
	if (!fn) {
		if (!rules) throw new Error("Could not find Vuetify rules injection");
		return rules.aliases;
	}
	return rules?.resolve(fn) ?? toRef(fn);
}
//#endregion
//#region node_modules/vuetify/lib/labs/rules/plugin.js
function createRulesPlugin(rules, locale) {
	return { install(app) {
		app.provide(RulesSymbol, createRules(rules, locale));
	} };
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	payloadPlugin,
	vuetify_icons_default,
	plugin$5,
	plugin$4,
	plugin$3,
	plugin$2,
	plugin$1,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	plugin,
	plugin_default$1,
	plugin_default,
	defineNuxtPlugin({
		name: "vuetify:nuxt:server:plugin",
		order: 25,
		dependsOn: ["vuetify:icons:plugin"],
		parallel: true,
		async setup(nuxtApp) {
			let __temp, __restore;
			const vuetifyOptions = vuetifyConfiguration();
			[__temp, __restore] = executeAsync(() => nuxtApp.hooks.callHook("vuetify:configuration", {
				isDev: false,
				vuetifyOptions
			})), await __temp, __restore();
			[__temp, __restore] = executeAsync(() => nuxtApp.hooks.callHook("vuetify:before-create", {
				isDev: false,
				vuetifyOptions
			})), await __temp, __restore();
			const vuetify = createVuetify(vuetifyOptions);
			nuxtApp.vueApp.use(vuetify);
			nuxtApp.vueApp.use(createRulesPlugin(rulesOptions, vuetify.locale));
			nuxtApp.provide("vuetify", vuetify);
			[__temp, __restore] = executeAsync(() => nuxtApp.hooks.callHook("vuetify:ready", vuetify)), await __temp, __restore();
		}
	})
];
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Flayouts.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default = { default: defineAsyncComponent(() => import('../build/default-DjPysi6-.mjs').then((m) => m.default || m)) };
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/nuxt-layout.js
var LayoutLoader = defineComponent({
	name: "LayoutLoader",
	inheritAttrs: false,
	props: {
		name: String,
		layoutProps: Object
	},
	setup(props, context) {
		return () => h(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default[props.name], props.layoutProps, context.slots);
	}
});
var nuxt_layout_default = defineComponent({
	name: "NuxtLayout",
	inheritAttrs: false,
	props: {
		name: {
			type: [
				String,
				Boolean,
				Object
			],
			default: null
		},
		fallback: {
			type: [String, Object],
			default: null
		}
	},
	setup(props, context) {
		const nuxtApp = useNuxtApp();
		const injectedRoute = inject(PageRouteSymbol);
		const route = !injectedRoute || injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
		const layout = computed(() => {
			let layout = resolveLayoutName(route, props.name);
			if (layout && !(layout in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) {
				if (props.fallback) layout = unref(props.fallback);
			}
			return layout;
		});
		provide(LayoutSymbol, layout);
		const layoutRef = shallowRef();
		context.expose({ layoutRef });
		const done = nuxtApp.deferHydration();
		let lastLayout;
		return () => {
			const hasTransition = !!layout.value && layout.value in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default && !!(route?.meta.layoutTransition ?? false);
			const transitionProps = hasTransition && _mergeTransitionProps([
				route?.meta.layoutTransition,
				false,
				{
					onBeforeLeave() {
						nuxtApp["~transitionPromise"] = new Promise((resolve) => {
							nuxtApp["~transitionFinish"] = resolve;
						});
					},
					onAfterLeave() {
						nuxtApp["~transitionFinish"]?.();
						delete nuxtApp["~transitionFinish"];
						delete nuxtApp["~transitionPromise"];
					}
				}
			]);
			const previouslyRenderedLayout = lastLayout;
			lastLayout = layout.value;
			return _wrapInTransition(transitionProps, { default: () => h(Suspense, {
				suspensible: true,
				onResolve: async () => {
					await nextTick(done);
				}
			}, { default: () => h(LayoutProvider, {
				layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
				key: layout.value || void 0,
				name: layout.value,
				shouldProvide: !props.name,
				isRenderingNewLayout: (name) => {
					return name !== previouslyRenderedLayout && name === layout.value;
				},
				hasTransition
			}, context.slots) }) }).default();
		};
	}
});
var LayoutProvider = defineComponent({
	name: "NuxtLayoutProvider",
	inheritAttrs: false,
	props: {
		name: { type: [String, Boolean] },
		layoutProps: { type: Object },
		hasTransition: { type: Boolean },
		shouldProvide: { type: Boolean },
		isRenderingNewLayout: {
			type: Function,
			required: true
		}
	},
	setup(props, context) {
		const name = props.name;
		if (props.shouldProvide) provide(LayoutMetaSymbol, { isCurrent: (route) => name === false || name === resolveLayoutName(route) });
		const injectedRoute = inject(PageRouteSymbol);
		const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
		const enclosingLayout = inject(LayoutMetaSymbol, null);
		if (isNotWithinNuxtPage) {
			const vueRouterRoute = useRoute$1();
			const reactiveChildRoute = {};
			for (const _key in vueRouterRoute) {
				const key = _key;
				Object.defineProperty(reactiveChildRoute, key, {
					enumerable: true,
					get: () => {
						return props.isRenderingNewLayout(props.name) && (!enclosingLayout || enclosingLayout.isCurrent(vueRouterRoute)) ? vueRouterRoute[key] : injectedRoute[key];
					}
				});
			}
			provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
		}
		return () => {
			if (!name || typeof name === "string" && !(name in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) return context.slots.default?.();
			return h(LayoutLoader, {
				key: name,
				layoutProps: props.layoutProps,
				name
			}, context.slots);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region app/app.vue
var _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_NuxtLayout = nuxt_layout_default;
	const _component_NuxtPage = page_default;
	_push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent, _scopeId));
			else return [createVNode(_component_NuxtPage)];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-8cEr2qiW.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-DjGA9cWz.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { $fetch$1$2 as $, isObject as A, isPrimitive as B, useToggleScope as C, templateRef as D, isCssColor as E, isParsableColor as F, parseColor as G, hasLightForeground as H, IconValue as I, flattenFragments as J, wrapInArray as K, findChildrenWithProvide as L, consoleWarn as M, onlyDefinedProps as N, EventProp as O, PREFERS_REDUCED_MOTION as P, pick as Q, useLocale as R, useRules as S, standardEasing as T, isClickInsideElement as U, focusChild as V, acceleratedEasing as W, deceleratedEasing as X, consoleError as Y, pickWithRest as Z, _plugin_vue_export_helper_default as _, useProxiedModel as a, CircularBuffer as a0, getNextElement as a1, focusableChildren as a2, matchesSelector as a3, defer as a4, getPropertyFromItem as a5, defineComponent$1 as a6, deprecate as a7, keys as a8, useAuth as a9, breakpoints as aa, NuxtLink as ab, defineProdDiagnostics as ac, prodReporters as ad, docsBase as ae, entry as af, useDisplay as b, convertToUnit as c, callEvent as d, clamp as e, filterInputAttrs as f, genericComponent as g, __exportAll as h, __reExport as i, useNuxtApp as j, useState as k, provideTheme as l, useTheme as m, navigateTo as n, omit as o, propsFactory as p, useIcon as q, getCurrentInstance$1 as r, getCurrentInstanceName as s, hasEvent as t, useRoute as u, useRtl as v, destructComputed as w, makeThemeProps as x, includes as y, provideDefaults as z };;globalThis.__timing__.logEnd('Load chunks/virtual/entry');
//# sourceMappingURL=entry.mjs.map
