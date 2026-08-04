globalThis.__timing__.logStart('Load chunks/build/edit-DFLUbWoO');import { u as useRoute } from '../virtual/entry.mjs';
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

//#region app/pages/decks/[deckId]/cards/[cardId]/edit.vue?vue&type=script&setup=true&lang.ts
var edit_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "edit",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const deckId = computed(() => String(route.params.deckId));
		const cardId = computed(() => String(route.params.cardId));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(card_form_default, mergeProps({
				mode: "edit",
				"deck-id": unref(deckId),
				"card-id": unref(cardId)
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/pages/decks/[deckId]/cards/[cardId]/edit.vue
var _sfc_setup = edit_vue_vue_type_script_setup_true_lang_default.setup;
edit_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/cards/[cardId]/edit.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var edit_default = edit_vue_vue_type_script_setup_true_lang_default;

export { edit_default as default };;globalThis.__timing__.logEnd('Load chunks/build/edit-DFLUbWoO');
//# sourceMappingURL=edit-DFLUbWoO.mjs.map
