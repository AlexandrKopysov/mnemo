import { toRef, useId, watch, shallowRef, ref, createVNode, normalizeStyle, normalizeClass, computed, withDirectives, mergeProps, createElementVNode, Fragment, toDisplayString, toRaw, toValue, provide, inject, nextTick, vShow, readonly } from 'vue';
import { V as VExpandTransition } from './mnemo-input-CDMkvOjj.mjs';
import { u as useBackgroundColor, c as useBorder, d as useDensity, e as useDimension, f as useElevation, g as useRounded, h as useRender, R as Ripple, i as useLink, j as useVariant, k as genOverlays, a as VIcon, l as VDefaultsProvider, n as makeVariantProps, m as makeTagProps, o as makeRoundedProps, p as makeElevationProps, q as makeDimensionProps, r as makeDensityProps, b as makeComponentProps, s as makeBorderProps, t as makeRouterProps, v as useTextColor, M as MaybeTransition } from './index-CTo6apaC.mjs';
import { g as genericComponent, m as provideTheme, h as useProxiedModel, t as provideDefaults, q as convertToUnit, o as deprecate, i as getCurrentInstance, v as focusChild, p as propsFactory, I as IconValue, s as makeThemeProps, E as EventProp, j as consoleError, x as isPrimitive, y as getPropertyFromItem, z as omit, w as wrapInArray, l as defineComponent } from './server.mjs';
import { a as VAvatar, c as createSimpleFunctional } from './VMenu-CYtgR6QR.mjs';

function throttle(fn, delay, options = {
  leading: true,
  trailing: true
}) {
  let timeoutId = 0;
  let lastExec = 0;
  let throttling = false;
  let start = 0;
  function clear() {
    clearTimeout(timeoutId);
    throttling = false;
    start = 0;
  }
  const wrap = (...args) => {
    clearTimeout(timeoutId);
    const now = Date.now();
    if (!start) start = now;
    const elapsed = now - Math.max(start, lastExec);
    function invoke() {
      lastExec = Date.now();
      timeoutId = setTimeout(clear, delay);
      fn(...args);
    }
    if (!throttling) {
      throttling = true;
      if (options.leading) {
        invoke();
      }
    } else if (elapsed >= delay) {
      invoke();
    } else if (options.trailing) {
      timeoutId = setTimeout(invoke, delay - elapsed);
    }
  };
  wrap.clear = clear;
  wrap.immediate = fn;
  return wrap;
}
const ListKey = /* @__PURE__ */ Symbol.for("vuetify:list");
function createList(options = {
  filterable: false
}) {
  const parent = inject(ListKey, {
    filterable: false,
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null,
    trackingIndex: shallowRef(-1),
    navigationStrategy: shallowRef("focus"),
    uid: ""
  });
  const {
    filterable,
    trackingIndex = parent.trackingIndex,
    navigationStrategy = parent.navigationStrategy,
    uid = parent.uid || useId()
  } = options;
  const data = {
    filterable: parent.filterable || filterable,
    hasPrepend: shallowRef(false),
    updateHasPrepend: (value) => {
      if (value) data.hasPrepend.value = value;
    },
    trackingIndex,
    navigationStrategy,
    uid
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject(ListKey, null);
}
const independentActiveStrategy = (mandatory) => {
  const strategy = {
    activate: ({
      id,
      value,
      activated
    }) => {
      id = toRaw(id);
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;
      if (value) {
        activated.add(id);
      } else {
        activated.delete(id);
      }
      return activated;
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        for (const id of wrapInArray(v)) {
          set = strategy.activate({
            id,
            value: true,
            activated: new Set(set),
            children,
            parents
          });
        }
      }
      return set;
    },
    out: (v) => {
      return Array.from(v);
    }
  };
  return strategy;
};
const independentSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: ({
      activated,
      id,
      ...rest
    }) => {
      id = toRaw(id);
      const singleSelected = activated.has(id) ? /* @__PURE__ */ new Set([id]) : /* @__PURE__ */ new Set();
      return parentStrategy.activate({
        ...rest,
        id,
        activated: singleSelected
      });
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        const arr = wrapInArray(v);
        if (arr.length) {
          set = parentStrategy.in(arr.slice(0, 1), children, parents);
        }
      }
      return set;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: ({
      id,
      activated,
      children,
      ...rest
    }) => {
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentSingleActiveStrategy(mandatory);
  const strategy = {
    activate: ({
      id,
      activated,
      children,
      ...rest
    }) => {
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const singleOpenStrategy = {
  open: ({
    id,
    value,
    opened,
    parents
  }) => {
    if (value) {
      const newOpened = /* @__PURE__ */ new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: ({
    id,
    value,
    opened,
    parents
  }) => {
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (parent != null && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: ({
    id,
    value,
    opened,
    parents
  }) => {
    if (!value) return opened;
    const path = [];
    let parent = parents.get(id);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
const independentSelectStrategy = (mandatory) => {
  const strategy = {
    select: ({
      id,
      value,
      selected
    }) => {
      id = toRaw(id);
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, [key, value2]) => {
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 1 && on[0] === id) return selected;
      }
      selected.set(id, value ? "on" : "off");
      return selected;
    },
    in: (v, children, parents, disabled) => {
      const map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: ({
      selected,
      id,
      ...rest
    }) => {
      id = toRaw(id);
      const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
      return parentStrategy.select({
        ...rest,
        id,
        selected: singleSelected
      });
    },
    in: (v, children, parents, disabled) => {
      if (v?.length) {
        return parentStrategy.in(v.slice(0, 1), children, parents, disabled);
      }
      return /* @__PURE__ */ new Map();
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: ({
      id,
      selected,
      children,
      ...rest
    }) => {
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: ({
      id,
      selected,
      children,
      ...rest
    }) => {
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = (mandatory) => {
  const strategy = {
    select: ({
      id,
      value,
      selected,
      children,
      parents,
      disabled
    }) => {
      id = toRaw(id);
      const original = new Map(selected);
      const items = [id];
      while (items.length) {
        const item = items.shift();
        if (!disabled.has(item)) {
          selected.set(toRaw(item), value ? "on" : "off");
        }
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = toRaw(parents.get(id));
      while (parent) {
        let everySelected = true;
        let noneSelected = true;
        for (const child of children.get(parent)) {
          const cid = toRaw(child);
          if (disabled.has(cid)) continue;
          if (selected.get(cid) !== "on") everySelected = false;
          if (selected.has(cid) && selected.get(cid) !== "off") noneSelected = false;
          if (!everySelected && !noneSelected) break;
        }
        selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
        parent = toRaw(parents.get(parent));
      }
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, [key, value2]) => {
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 0) return original;
      }
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled: /* @__PURE__ */ new Set()
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" && !children.has(key)) arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const trunkSelectStrategy = (mandatory) => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: parentStrategy.in,
    out: (v, children, parents) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") {
          if (parents.has(key)) {
            const parent = parents.get(key);
            if (v.get(parent) === "on") continue;
          }
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};
const branchSelectStrategy = (mandatory) => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: (v, children, parents, disabled) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        if (children.has(id)) continue;
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" || value === "indeterminate") {
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};
const VNestedSymbol = /* @__PURE__ */ Symbol.for("vuetify:nested");
const emptyNested = {
  id: shallowRef(),
  root: {
    itemsRegistration: ref("render"),
    register: () => null,
    unregister: () => null,
    updateDisabled: () => null,
    children: ref(/* @__PURE__ */ new Map()),
    parents: ref(/* @__PURE__ */ new Map()),
    disabled: ref(/* @__PURE__ */ new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    scrollToActive: ref(false),
    selectable: ref(false),
    opened: ref(/* @__PURE__ */ new Set()),
    activated: ref(/* @__PURE__ */ new Set()),
    selected: ref(/* @__PURE__ */ new Map()),
    selectedValues: ref([]),
    getPath: () => []
  }
};
const makeNestedProps = propsFactory({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean,
  itemsRegistration: {
    type: String,
    default: "render"
  }
}, "nested");
const useNested = (props, {
  items,
  returnObject,
  scrollToActive
}) => {
  const children = shallowRef(/* @__PURE__ */ new Map());
  const parents = shallowRef(/* @__PURE__ */ new Map());
  const disabled = shallowRef(/* @__PURE__ */ new Set());
  const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(Array.isArray(v) ? v.map((i) => toRaw(i)) : v), (v) => [...v.values()]);
  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === "object") return props.activeStrategy;
    if (typeof props.activeStrategy === "function") return props.activeStrategy(props.mandatory);
    switch (props.activeStrategy) {
      case "leaf":
        return leafActiveStrategy(props.mandatory);
      case "single-leaf":
        return leafSingleActiveStrategy(props.mandatory);
      case "independent":
        return independentActiveStrategy(props.mandatory);
      case "single-independent":
      default:
        return independentSingleActiveStrategy(props.mandatory);
    }
  });
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    if (typeof props.selectStrategy === "function") return props.selectStrategy(props.mandatory);
    switch (props.selectStrategy) {
      case "single-leaf":
        return leafSingleSelectStrategy(props.mandatory);
      case "leaf":
        return leafSelectStrategy(props.mandatory);
      case "independent":
        return independentSelectStrategy(props.mandatory);
      case "single-independent":
        return independentSingleSelectStrategy(props.mandatory);
      case "trunk":
        return trunkSelectStrategy(props.mandatory);
      case "branch":
        return branchSelectStrategy(props.mandatory);
      case "classic":
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === "object") return props.openStrategy;
    switch (props.openStrategy) {
      case "list":
        return listOpenStrategy;
      case "single":
        return singleOpenStrategy;
      case "multiple":
      default:
        return multipleOpenStrategy;
    }
  });
  const activated = useProxiedModel(props, "activated", props.activated, (v) => activeStrategy.value.in(v, children.value, parents.value), (v) => activeStrategy.value.out(v, children.value, parents.value));
  const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value, disabled.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
  function getPath(id) {
    const path = [];
    let parent = toRaw(id);
    while (parent !== void 0) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance("nested");
  const nodeIds = /* @__PURE__ */ new Set();
  const itemsUpdatePropagation = throttle(() => {
    nextTick(() => {
      children.value = new Map(children.value);
      parents.value = new Map(parents.value);
    });
  }, 100);
  watch(() => [items.value, toValue(returnObject)], () => {
    if (props.itemsRegistration === "props") {
      updateInternalMaps();
    }
  }, {
    immediate: true
  });
  function updateInternalMaps() {
    const _parents = /* @__PURE__ */ new Map();
    const _children = /* @__PURE__ */ new Map();
    const _disabled = /* @__PURE__ */ new Set();
    const getValue = toValue(returnObject) ? (item) => toRaw(item.raw) : (item) => item.value;
    const stack = [...items.value];
    let i = 0;
    while (i < stack.length) {
      const item = stack[i++];
      const itemValue = getValue(item);
      if (item.children) {
        const childValues = [];
        for (const child of item.children) {
          const childValue = getValue(child);
          _parents.set(childValue, itemValue);
          childValues.push(childValue);
          stack.push(child);
        }
        _children.set(itemValue, childValues);
      }
      if (item.props.disabled) {
        _disabled.add(itemValue);
      }
    }
    children.value = _children;
    parents.value = _parents;
    disabled.value = _disabled;
  }
  const nested = {
    id: shallowRef(),
    root: {
      opened,
      activatable: toRef(() => props.activatable),
      scrollToActive: toRef(() => toValue(scrollToActive)),
      selectable: toRef(() => props.selectable),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === "on") arr.push(key);
        }
        return arr;
      }),
      itemsRegistration: toRef(() => props.itemsRegistration),
      register: (id, parentId, isDisabled, isGroup) => {
        if (nodeIds.has(id)) {
          const path = getPath(id).map(String).join(" -> ");
          const newPath = getPath(parentId).concat(id).map(String).join(" -> ");
          consoleError(`Multiple nodes with the same ID
	${path}
	${newPath}`);
          return;
        } else {
          nodeIds.add(id);
        }
        parentId && id !== parentId && parents.value.set(id, parentId);
        isDisabled && disabled.value.add(id);
        isGroup && children.value.set(id, []);
        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id]);
        }
        itemsUpdatePropagation();
      },
      unregister: (id) => {
        nodeIds.delete(id);
        children.value.delete(id);
        disabled.value.delete(id);
        const parent = parents.value.get(id);
        if (parent) {
          const list = children.value.get(parent) ?? [];
          children.value.set(parent, list.filter((child) => child !== id));
        }
        parents.value.delete(id);
        itemsUpdatePropagation();
      },
      updateDisabled: (id, isDisabled) => {
        if (isDisabled) {
          disabled.value.add(id);
        } else {
          disabled.value.delete(id);
        }
      },
      open: (id, value, event) => {
        vm.emit("click:open", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        vm.emit("click:select", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          disabled: disabled.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id, value, event);
      },
      activate: (id, value, event) => {
        if (!props.activatable) {
          return nested.root.select(id, true, event);
        }
        vm.emit("click:activate", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newActivated = activeStrategy.value.activate({
          id,
          value,
          activated: new Set(activated.value),
          children: children.value,
          parents: parents.value,
          event
        });
        if (newActivated.size !== activated.value.size) {
          activated.value = newActivated;
        } else {
          for (const value2 of newActivated) {
            if (!activated.value.has(value2)) {
              activated.value = newActivated;
              return;
            }
          }
          for (const value2 of activated.value) {
            if (!newActivated.has(value2)) {
              activated.value = newActivated;
              return;
            }
          }
        }
      },
      children,
      parents,
      disabled,
      getPath
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isDisabled, isGroup) => {
  const parent = inject(VNestedSymbol, emptyNested);
  const uidSymbol = /* @__PURE__ */ Symbol("nested item");
  const computedId = computed(() => {
    const idValue = toRaw(toValue(id));
    return idValue !== void 0 ? idValue : uidSymbol;
  });
  const item = {
    ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(computedId.value)),
    scrollToActive: parent.root.scrollToActive,
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === "on"),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  watch(computedId, (val, oldVal) => {
    if (parent.isGroupActivator || parent.root.itemsRegistration.value === "props") return;
    parent.root.unregister(oldVal);
    nextTick(() => {
      parent.root.register(val, parent.id.value, toValue(isDisabled), isGroup);
    });
  });
  watch(() => toValue(isDisabled), (val) => {
    parent.root.updateDisabled(computedId.value, val);
  });
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};
function useSsrBoot() {
  const isBooted = shallowRef(false);
  const ssrBootStyles = toRef(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const VListGroupActivator = defineComponent({
  name: "VListGroupActivator",
  setup(_, {
    slots
  }) {
    useNestedGroupActivator();
    return () => slots.default?.();
  }
});
const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  disabled: Boolean,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  rawId: [String, Number],
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListGroup");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: makeVListGroupProps(),
  setup(props, {
    slots
  }) {
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(() => props.value, () => props.disabled, true);
    const id = computed(() => `v-list-group--id-${String(props.rawId ?? _id.value)}`);
    const list = useList();
    const {
      isBooted
    } = useSsrBoot();
    const parent = inject(VNestedSymbol);
    const renderWhenClosed = toRef(() => parent?.root?.itemsRegistration.value === "render");
    function onClick(e) {
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
        appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
        title: props.title,
        value: props.value
      }
    }));
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-list-group", {
        "v-list-group--prepend": list?.hasPrepend.value,
        "v-list-group--fluid": props.fluid,
        "v-list-group--subgroup": props.subgroup,
        "v-list-group--open": isOpen.value
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": activatorDefaults.value
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(MaybeTransition, {
        "transition": {
          component: VExpandTransition
        },
        "disabled": !isBooted.value
      }, {
        default: () => [renderWhenClosed.value ? withDirectives(createElementVNode("div", {
          "class": "v-list-group__items",
          "role": "group",
          "aria-labelledby": id.value
        }, [slots.default?.()]), [[vShow, isOpen.value]]) : isOpen.value && createElementVNode("div", {
          "class": "v-list-group__items",
          "role": "group",
          "aria-labelledby": id.value
        }, [slots.default?.()])]
      })]
    }));
    return {
      isOpen
    };
  }
});
const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemSubtitle");
const VListItemSubtitle = genericComponent()({
  name: "VListItemSubtitle",
  props: makeVListItemSubtitleProps(),
  setup(props, {
    slots
  }) {
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-list-item-subtitle", props.class]),
      "style": normalizeStyle([{
        "--v-list-item-subtitle-opacity": props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});
const VListItemTitle = createSimpleFunctional("v-list-item-title");
const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  slim: Boolean,
  prependGap: [Number, String],
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: null,
  index: Number,
  tabindex: [Number, String],
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VListItem");
const VListItem = genericComponent()({
  name: "VListItem",
  directives: {
    vRipple: Ripple
  },
  props: makeVListItemProps(),
  emits: {
    click: (e) => true
  },
  setup(props, {
    attrs,
    slots,
    emit
  }) {
    const link = useLink(props, attrs);
    const rootEl = ref();
    const id = computed(() => props.value === void 0 ? link.href.value : props.value);
    const {
      activate,
      isActivated,
      select,
      isOpen,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
      scrollToActive,
      id: uid
    } = useNestedItem(id, () => props.disabled, false);
    const list = useList();
    const isActive = computed(() => props.active !== false && (props.active || link.isActive?.value || (root.activatable.value ? isActivated.value : isSelected.value)));
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isSelectable = computed(() => !!list && (root.selectable.value || root.activatable.value || props.value != null));
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || isSelectable.value));
    const isTracked = computed(() => list && list.navigationStrategy.value === "track" && props.index !== void 0 && list.trackingIndex.value === props.index);
    const role = computed(() => list ? isLink.value ? "link" : isSelectable.value ? "option" : "listitem" : void 0);
    const ariaSelected = computed(() => {
      if (!isSelectable.value) return void 0;
      return root.activatable.value ? isActivated.value : root.selectable.value ? isSelected.value : isActive.value;
    });
    const roundedProps = toRef(() => props.rounded || props.nav);
    const color = toRef(() => props.color ?? props.activeColor);
    const variantProps = toRef(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant
    }));
    watch(() => link.isActive?.value, (val) => {
      if (!val) return;
      handleActiveLink();
    });
    watch(isActivated, (val) => {
      if (!val || !scrollToActive) return;
      rootEl.value?.scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    });
    watch(isTracked, (val) => {
      if (!val) return;
      rootEl.value?.scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    });
    function handleActiveLink() {
      if (parent.value != null) {
        root.open(parent.value, true);
      }
      openOnSelect(true);
    }
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
    } = useVariant(variantProps);
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
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = toRef(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
    const rippleOptions = toRef(() => props.ripple !== void 0 && !!props.ripple && list?.filterable ? {
      keys: ["Enter"]
    } : props.ripple);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isOpen: isOpen.value,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
      isDisabled: props.disabled
    }));
    function onClick(e) {
      emit("click", e);
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;
      if (!isClickable.value) return;
      link.navigate.value?.(e);
      if (isGroupActivator) return;
      if (root.activatable.value) {
        activate(!isActivated.value, e);
      } else if (root.selectable.value) {
        select(!isSelected.value, e);
      } else if (props.value != null && !isLink.value) {
        select(!isSelected.value, e);
      }
    }
    function onKeyDown(e) {
      const target = e.target;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "Enter" || e.key === " " && !list?.filterable) {
        e.preventDefault();
        e.stopPropagation();
        e.target.dispatchEvent(new MouseEvent("click", e));
      }
    }
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = slots.title || props.title != null;
      const hasSubtitle = slots.subtitle || props.subtitle != null;
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      list?.updateHasPrepend(hasPrepend);
      if (props.activeColor) {
        deprecate("active-color", ["color", "base-color"]);
      }
      return withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "ref": rootEl,
        "id": props.index !== void 0 && list ? `v-list-item-${list.uid}-${props.index}` : void 0,
        "class": ["v-list-item", {
          "v-list-item--active": isActive.value,
          "v-list-item--disabled": props.disabled,
          "v-list-item--link": isClickable.value,
          "v-list-item--nav": props.nav,
          "v-list-item--prepend": !hasPrepend && list?.hasPrepend.value,
          "v-list-item--slim": props.slim,
          "v-list-item--focus-visible": isTracked.value,
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [{
          "--v-list-prepend-gap": convertToUnit(props.prependGap)
        }, colorStyles.value, dimensionStyles.value, props.style],
        "tabindex": props.tabindex ?? (isClickable.value ? list ? -2 : 0 : void 0),
        "aria-selected": ariaSelected.value,
        "role": role.value,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }), {
        default: () => [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-list-item__prepend"
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
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            },
            VListItemAction: {
              start: true
            },
            VCheckboxBtn: {
              density: props.density
            }
          }
        }, {
          default: () => [slots.prepend?.(slotProps.value)]
        }), createElementVNode("div", {
          "class": "v-list-item__spacer"
        }, null)]), createElementVNode("div", {
          "class": "v-list-item__content",
          "data-no-activator": ""
        }, [hasTitle && createVNode(VListItemTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.({
            title: props.title
          }) ?? toDisplayString(props.title)]
        }), hasSubtitle && createVNode(VListItemSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.({
            subtitle: props.subtitle
          }) ?? toDisplayString(props.subtitle)]
        }), slots.default?.(slotProps.value)]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-list-item__append"
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
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            },
            VListItemAction: {
              end: true
            },
            VCheckboxBtn: {
              density: props.density
            }
          }
        }, {
          default: () => [slots.append?.(slotProps.value)]
        }), createElementVNode("div", {
          "class": "v-list-item__spacer"
        }, null)])]
      }), [[Ripple, isClickable.value && rippleOptions.value]]);
    });
    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select,
      root,
      id: uid,
      link
    };
  }
});
const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListSubheader");
const VListSubheader = genericComponent()({
  name: "VListSubheader",
  props: makeVListSubheaderProps(),
  setup(props, {
    slots
  }) {
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value, props.class]),
        "style": normalizeStyle([{
          textColorStyles
        }, props.style])
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-list-subheader__text"
        }, [slots.default?.() ?? props.title])]
      });
    });
    return {};
  }
});
const allowedVariants = ["dotted", "dashed", "solid", "double"];
const makeVDividerProps = propsFactory({
  color: String,
  contentOffset: [Number, String, Array],
  gradient: Boolean,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  variant: {
    type: String,
    default: "solid",
    validator: (v) => allowedVariants.includes(v)
  },
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VDivider");
const VDivider = genericComponent()({
  name: "VDivider",
  props: makeVDividerProps(),
  setup(props, {
    attrs,
    slots
  }) {
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? "height" : "width"] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
      }
      return styles;
    });
    const contentStyles = toRef(() => {
      const margin = Array.isArray(props.contentOffset) ? props.contentOffset[0] : props.contentOffset;
      const shift = Array.isArray(props.contentOffset) ? props.contentOffset[1] : 0;
      return {
        marginBlock: props.vertical && margin ? convertToUnit(margin) : void 0,
        marginInline: !props.vertical && margin ? convertToUnit(margin) : void 0,
        transform: shift ? `translate${props.vertical ? "X" : "Y"}(${convertToUnit(shift)})` : void 0
      };
    });
    useRender(() => {
      const divider = createElementVNode("hr", {
        "class": normalizeClass([{
          "v-divider": true,
          "v-divider--gradient": props.gradient && !slots.default,
          "v-divider--inset": props.inset,
          "v-divider--vertical": props.vertical
        }, themeClasses.value, textColorClasses.value, props.class]),
        "style": normalizeStyle([dividerStyles.value, textColorStyles.value, {
          "--v-border-opacity": props.opacity
        }, {
          "border-style": props.variant
        }, props.style]),
        "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
        "role": `${attrs.role || "separator"}`
      }, null);
      if (!slots.default) return divider;
      return createElementVNode("div", {
        "class": normalizeClass(["v-divider__wrapper", {
          "v-divider__wrapper--gradient": props.gradient,
          "v-divider__wrapper--inset": props.inset,
          "v-divider__wrapper--vertical": props.vertical
        }])
      }, [divider, createElementVNode("div", {
        "class": "v-divider__content",
        "style": normalizeStyle(contentStyles.value)
      }, [slots.default()]), divider]);
    });
    return {};
  }
});
const makeVListChildrenProps = propsFactory({
  items: Array,
  returnObject: Boolean
}, "VListChildren");
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: makeVListChildrenProps(),
  setup(props, {
    slots
  }) {
    createList();
    return () => slots.default?.() ?? props.items?.map(({
      children,
      props: itemProps,
      type,
      raw: item
    }, index) => {
      if (type === "divider") {
        return slots.divider?.({
          props: itemProps
        }) ?? createVNode(VDivider, itemProps, null);
      }
      if (type === "subheader") {
        return slots.subheader?.({
          props: itemProps
        }) ?? createVNode(VListSubheader, itemProps, null);
      }
      const slotsWithItem = {
        subtitle: slots.subtitle ? (slotProps) => slots.subtitle?.({
          ...slotProps,
          item
        }) : void 0,
        prepend: slots.prepend ? (slotProps) => slots.prepend?.({
          ...slotProps,
          item
        }) : void 0,
        append: slots.append ? (slotProps) => slots.append?.({
          ...slotProps,
          item
        }) : void 0,
        title: slots.title ? (slotProps) => slots.title?.({
          ...slotProps,
          item
        }) : void 0
      };
      const listGroupProps = VListGroup.filterProps(itemProps);
      return children ? createVNode(VListGroup, mergeProps(listGroupProps, {
        "value": props.returnObject ? item : itemProps?.value,
        "rawId": itemProps?.value
      }), {
        activator: ({
          props: activatorProps
        }) => {
          const listItemProps = mergeProps(itemProps, activatorProps, {
            value: props.returnObject ? item : itemProps.value
          });
          return slots.header ? slots.header({
            props: listItemProps
          }) : createVNode(VListItem, mergeProps(listItemProps, {
            "index": index
          }), slotsWithItem);
        },
        default: () => createVNode(VListChildren, {
          "items": children,
          "returnObject": props.returnObject
        }, slots)
      }) : slots.item ? slots.item({
        props: {
          ...itemProps,
          index
        }
      }) : createVNode(VListItem, mergeProps(itemProps, {
        "index": index,
        "value": props.returnObject ? item : itemProps.value
      }), slotsWithItem);
    });
  }
});
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  itemType: {
    type: [Boolean, String, Array, Function],
    default: "type"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items");
const itemTypes = /* @__PURE__ */ new Set(["item", "divider", "subheader"]);
function transformItem(props, item) {
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? omit(item, ["children"]) : getPropertyFromItem(item, props.itemProps);
  let type = getPropertyFromItem(item, props.itemType, "item");
  if (!itemTypes.has(type)) {
    type = "item";
  }
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems(props, children) : void 0,
    raw: item
  };
}
function transformItems(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems(props, props.items));
  return {
    items
  };
}
const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: IconValue,
  collapseIcon: IconValue,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  prependGap: [Number, String],
  indent: [Number, String],
  nav: Boolean,
  navigationStrategy: {
    type: String,
    default: "focus"
  },
  navigationIndex: Number,
  "onClick:open": EventProp(),
  "onClick:select": EventProp(),
  "onUpdate:opened": EventProp(),
  ...makeNestedProps({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VList");
const VList = genericComponent()({
  name: "VList",
  props: makeVListProps(),
  emits: {
    "update:selected": (value) => true,
    "update:activated": (value) => true,
    "update:opened": (value) => true,
    "update:navigationIndex": (value) => true,
    "click:open": (value) => true,
    "click:activate": (value) => true,
    "click:select": (value) => true
  },
  setup(props, {
    attrs,
    slots,
    emit
  }) {
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      borderClasses
    } = useBorder(props);
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
      roundedClasses
    } = useRounded(props);
    const {
      children,
      open,
      parents,
      select,
      getPath
    } = useNested(props, {
      items,
      returnObject: toRef(() => props.returnObject),
      scrollToActive: toRef(() => props.navigationStrategy === "track")
    });
    const lineClasses = toRef(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(() => props.activeColor);
    const baseColor = toRef(() => props.baseColor);
    const color = toRef(() => props.color);
    const isSelectable = toRef(() => props.selectable || props.activatable);
    const navigationIndex = useProxiedModel(props, "navigationIndex", -1, (v) => v ?? -1);
    const uid = useId();
    createList({
      filterable: props.filterable,
      trackingIndex: navigationIndex,
      navigationStrategy: toRef(() => props.navigationStrategy),
      uid
    });
    watch(items, () => {
      if (props.navigationStrategy === "track") {
        navigationIndex.value = -1;
      }
    });
    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(() => props.expandIcon),
        collapseIcon: toRef(() => props.collapseIcon)
      },
      VListItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        nav: toRef(() => props.nav),
        slim: toRef(() => props.slim),
        variant: toRef(() => props.variant),
        tabindex: toRef(() => props.navigationStrategy === "track" ? -1 : void 0)
      }
    });
    const isFocused = shallowRef(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      if (props.navigationStrategy === "track") {
        if (!~navigationIndex.value) {
          navigationIndex.value = getNextIndex("first");
        }
      } else if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget))) focus();
    }
    function onBlur() {
      if (props.navigationStrategy === "track") {
        navigationIndex.value = -1;
      }
    }
    function getNavigationDirection(key) {
      switch (key) {
        case "ArrowDown":
          return "next";
        case "ArrowUp":
          return "prev";
        case "Home":
          return "first";
        case "End":
          return "last";
        default:
          return null;
      }
    }
    function getNextIndex(direction) {
      const itemCount = items.value.length;
      if (itemCount === 0) return -1;
      let nextIndex;
      if (direction === "first") {
        nextIndex = 0;
      } else if (direction === "last") {
        nextIndex = itemCount - 1;
      } else {
        nextIndex = navigationIndex.value + (direction === "next" ? 1 : -1);
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;
      }
      const startIndex = nextIndex;
      let attempts = 0;
      while (attempts < itemCount) {
        const item = items.value[nextIndex];
        if (item && item.type !== "divider" && item.type !== "subheader") {
          return nextIndex;
        }
        nextIndex += direction === "next" || direction === "first" ? 1 : -1;
        if (nextIndex < 0) nextIndex = itemCount - 1;
        if (nextIndex >= itemCount) nextIndex = 0;
        if (nextIndex === startIndex) return -1;
        attempts++;
      }
      return -1;
    }
    function onKeydown(e) {
      const target = e.target;
      if (!contentRef.value || target.tagName === "INPUT" && ["Home", "End"].includes(e.key) || target.tagName === "TEXTAREA") {
        return;
      }
      const direction = getNavigationDirection(e.key);
      if (direction !== null) {
        e.preventDefault();
        if (props.navigationStrategy === "track") {
          const nextIndex = getNextIndex(direction);
          if (nextIndex !== -1) {
            navigationIndex.value = nextIndex;
          }
        } else {
          focus(direction);
        }
      }
    }
    function onMousedown(e) {
      isFocused.value = true;
    }
    function focus(location) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location);
      }
    }
    useRender(() => {
      const indent = props.indent ?? (props.prependGap ? Number(props.prependGap) + 24 : void 0);
      const ariaMultiselectable = isSelectable.value ? attrs.ariaMultiselectable ?? !String(props.selectStrategy).startsWith("single-") : void 0;
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": normalizeClass(["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav,
          "v-list--slim": props.slim
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([{
          "--v-list-indent": convertToUnit(indent),
          "--v-list-group-prepend": indent ? "0px" : void 0,
          "--v-list-prepend-gap": convertToUnit(props.prependGap)
        }, backgroundColorStyles.value, dimensionStyles.value, props.style]),
        "tabindex": props.disabled ? -1 : 0,
        "role": isSelectable.value ? "listbox" : "list",
        "aria-activedescendant": props.navigationStrategy === "track" && navigationIndex.value >= 0 ? `v-list-item-${uid}-${navigationIndex.value}` : void 0,
        "aria-multiselectable": ariaMultiselectable,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "onMousedown": onMousedown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value,
          "returnObject": props.returnObject
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath,
      navigationIndex
    };
  }
});

export { VList as V, VListItem as a };
//# sourceMappingURL=VList-DAPyq7NT.mjs.map
