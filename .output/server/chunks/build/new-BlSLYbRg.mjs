import { _ as __nuxt_component_0 } from './card-form-CIgHJ0xu.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { f as useRoute } from './server.mjs';
import './mnemo-form-CVX64wVD.mjs';
import './mnemo-input-CDMkvOjj.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const deckId = computed(() => String(route.params.deckId));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_card_form = __nuxt_component_0;
      _push(ssrRenderComponent(_component_card_form, mergeProps({
        mode: "create",
        "deck-id": unref(deckId)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/cards/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-BlSLYbRg.mjs.map
