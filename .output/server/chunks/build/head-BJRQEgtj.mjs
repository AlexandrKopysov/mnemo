globalThis.__timing__.logStart('Load chunks/build/head-BJRQEgtj');import { j as useNuxtApp, ac as defineProdDiagnostics, ad as prodReporters, ae as docsBase } from '../virtual/entry.mjs';
import { getCurrentScope, ref, watchEffect, getCurrentInstance, onBeforeUnmount, onDeactivated, onActivated, hasInjectionContext, inject } from 'vue';
import { walkResolver } from 'unhead/utils';
import { i as injectHead$1, V as VueResolver, h as headSymbol } from '../routes/renderer.mjs';

function useHead(input, options = {}) {
  const head = options.head || injectHead$1();
  return head.ssr ? head.push(input || {}, options) : clientUseHead(head, input, options);
}
function clientUseHead(head, input, options = {}) {
  const scope = getCurrentScope();
  if (scope && !scope.active) {
    return { patch() {
    }, dispose() {
    }, _i: -1 };
  }
  const deactivated = ref(false);
  if (options.onRendered && scope) {
    const _onRendered = options.onRendered;
    options = { ...options, onRendered: (ctx) => scope.run(() => _onRendered(ctx)) };
  }
  let entry;
  watchEffect(() => {
    const i = deactivated.value ? {} : walkResolver(input, VueResolver);
    if (entry) {
      entry.patch(i);
    } else {
      entry = head.push(i, options);
    }
  });
  const vm = getCurrentInstance();
  if (vm) {
    onBeforeUnmount(() => {
      entry.dispose();
    });
    onDeactivated(() => {
      deactivated.value = true;
    });
    onActivated(() => {
      deactivated.value = false;
    });
  }
  return entry;
}

//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.1_@babel+plugin-sy_b942fa8e71d932aca3f66540b9469867/node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject(headSymbol);
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead$1(input, options = {}) {
	return useHead(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}

export { useHead$1 as u };;globalThis.__timing__.logEnd('Load chunks/build/head-BJRQEgtj');
//# sourceMappingURL=head-BJRQEgtj.mjs.map
