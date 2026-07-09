import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "mnemo-breadcrumbs",
  __ssrInlineRender: true,
  props: {
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>${ssrInterpolate(__props.breadcrumbs)}</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-breadcrumbs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MnemoBreadcrumbs = Object.assign(_sfc_main$2, { __name: "FormMnemoBreadcrumbs" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "mnemo-form-header",
  __ssrInlineRender: true,
  props: {
    title: { default: "" },
    breadcrumbs: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 data-v-27317c33>${ssrInterpolate(__props.title)}</h1>`);
      _push(ssrRenderComponent(MnemoBreadcrumbs, { breadcrumbs: __props.breadcrumbs }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-form-header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MnemoFormHeader = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-27317c33"]]), { __name: "FormMnemoFormHeader" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mnemo-form",
  __ssrInlineRender: true,
  props: {
    title: {},
    breadcrumbs: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-bca3556f>`);
      _push(ssrRenderComponent(MnemoFormHeader, {
        breadcrumbs: __props.breadcrumbs,
        title: __props.title
      }, null, _parent));
      _push(`<div class="form" data-v-bca3556f><div class="flex justify-between" data-v-bca3556f><div data-v-bca3556f>`);
      ssrRenderSlot(_ctx.$slots, "toolbar-left", {}, null, _push, _parent);
      _push(`</div><div data-v-bca3556f>`);
      ssrRenderSlot(_ctx.$slots, "toolbar-right", {}, null, _push, _parent);
      _push(`</div></div><div class="mt-10 form-content" data-v-bca3556f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/mnemo-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MnemoForm = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-bca3556f"]]), { __name: "FormMnemoForm" });

export { MnemoForm as M };
//# sourceMappingURL=mnemo-form-CVX64wVD.mjs.map
