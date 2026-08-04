globalThis.__timing__.logStart('Load chunks/build/new-C_nfRC-I');import { u as useRoute } from '../virtual/entry.mjs';
import { c as card_form_default } from './card-form-BjOTyY97.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import './use-breadcrumbs-B6g0mspW.mjs';
import './mnemo-form-N_yqkAmm.mjs';
import './mnemo-button-DgV1Ml-V.mjs';
import './VBtn-BK5zdqJr.mjs';
import './mnemo-input-Bj3NAqAD.mjs';
import './forwardRefs-BQag-fAc.mjs';
import './autofocus-iHZUSa1f.mjs';
import './mnemo-textarea-Dr5RyYwn.mjs';
import './api-D9ph_P1-.mjs';

//#region app/pages/decks/[deckId]/cards/new.vue?vue&type=script&setup=true&lang.ts
var new_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const deckId = computed(() => String(route.params.deckId));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(card_form_default, mergeProps({
				mode: "create",
				"deck-id": unref(deckId)
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/pages/decks/[deckId]/cards/new.vue
var _sfc_setup = new_vue_vue_type_script_setup_true_lang_default.setup;
new_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/cards/new.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var new_default = new_vue_vue_type_script_setup_true_lang_default;

export { new_default as default };;globalThis.__timing__.logEnd('Load chunks/build/new-C_nfRC-I');
//# sourceMappingURL=new-C_nfRC-I.mjs.map
