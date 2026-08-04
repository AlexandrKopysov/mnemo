globalThis.__timing__.logStart('Load chunks/build/pages-DGkaVbFr');import { _ as _plugin_vue_export_helper_default, n as navigateTo } from '../virtual/entry.mjs';
import { a as VIcon, V as VBtn } from './VBtn-BK5zdqJr.mjs';
import { V as VMenu } from './VMenu-5yZPJeqd.mjs';
import { V as VList, a as VListItem } from './VList-B7h15kBl.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { m as mnemo_form_default } from './mnemo-form-N_yqkAmm.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { m as mnemo_input_default } from './mnemo-input-Bj3NAqAD.mjs';
import { d as deleteDeck, a as getDecks } from './api-CGYnhVmc.mjs';
import { u as useMnemoSessionStore } from './mnemo-repeat-store-gNqU4H3-.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, withModifiers, computed, watch, useSSRContext } from 'vue';
import { storeToRefs } from 'pinia';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import './forwardRefs-BQag-fAc.mjs';
import './autofocus-iHZUSa1f.mjs';

//#region app/components/widgets/mnemo-repeat-form/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default$1 = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { reviewSession } = storeToRefs(useMnemoSessionStore());
		const startRepeat = () => {
			return navigateTo({ name: "learn-session" });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "session-preview" }, _attrs))} data-v-c5f697ad><div class="session-preview__calendar" data-v-c5f697ad>`);
			_push(ssrRenderComponent(VIcon, {
				size: "50",
				color: "rgba(1, 154, 93, 0.75)"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` mdi-calendar-clock `);
					else return [createTextVNode(" mdi-calendar-clock ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="session-preview__info" data-v-c5f697ad><span class="session-preview__title" data-v-c5f697ad> Сегодня к повторению </span><div class="session-preview__total" data-v-c5f697ad><span class="session-preview__total-value" data-v-c5f697ad>${ssrInterpolate(unref(reviewSession)?.totalCards ?? 0)}</span><span class="session-preview__total-label" data-v-c5f697ad> карточек </span></div><span class="session-preview__estimated" data-v-c5f697ad> ~ ${ssrInterpolate(unref(reviewSession)?.estimatedMinutes ?? 0)} минут </span></div><div class="session-preview__decks" data-v-c5f697ad><span class="session-preview__decks-title" data-v-c5f697ad> По колодам </span><div class="session-preview__decks-list" data-v-c5f697ad><!--[-->`);
			ssrRenderList(unref(reviewSession)?.decks ?? [], (deck) => {
				_push(`<div class="session-preview__deck" data-v-c5f697ad><span class="session-preview__deck-title" data-v-c5f697ad>${ssrInterpolate(deck.title)}</span><span class="session-preview__deck-count" data-v-c5f697ad>${ssrInterpolate(deck.cardsCount)}</span></div>`);
			});
			_push(`<!--]--></div></div><div class="session-preview__actions" data-v-c5f697ad><div class="session-preview__streak" data-v-c5f697ad><div class="session-preview__streak-value" data-v-c5f697ad>`);
			_push(ssrRenderComponent(VIcon, {
				size: "24",
				color: "rgba(1, 154, 93, 0.75)"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` mdi-fire `);
					else return [createTextVNode(" mdi-fire ")];
				}),
				_: 1
			}, _parent));
			_push(`<span data-v-c5f697ad>5</span></div><span class="session-preview__streak-days" data-v-c5f697ad> дней </span></div><span class="session-preview__streak-label" data-v-c5f697ad> Текущая серия </span>`);
			_push(ssrRenderComponent(mnemo_button_default, {
				class: "session-preview__button",
				onClick: ($event) => startRepeat()
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Начать повторение `);
					else return [createTextVNode(" Начать повторение ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region app/components/widgets/mnemo-repeat-form/index.vue
var _sfc_setup$3 = index_vue_vue_type_script_setup_true_lang_default$1.setup;
index_vue_vue_type_script_setup_true_lang_default$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/mnemo-repeat-form/index.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var mnemo_repeat_form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default$1, [["__scopeId", "data-v-c5f697ad"]]), { __name: "WidgetsMnemoRepeatForm" });
//#endregion
//#region app/components/decks/deck-tile-circle-compleet.vue?vue&type=script&setup=true&lang.ts
var SIZE = 70;
var STROKE_WIDTH = 4;
var deck_tile_circle_compleet_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "deck-tile-circle-compleet",
	__ssrInlineRender: true,
	props: { value: {} },
	setup(__props) {
		const props = __props;
		const CENTER = SIZE / 2;
		const RADIUS = (SIZE - STROKE_WIDTH) / 2;
		const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
		const animatedValue = ref(0);
		const normalizedValue = computed(() => {
			const safeValue = Number(props.value ?? 0);
			if (Number.isNaN(safeValue)) return 0;
			return Math.max(0, Math.min(100, safeValue));
		});
		const progressColor = computed(() => {
			if (normalizedValue.value <= 25) return "#E55353";
			if (normalizedValue.value <= 50) return "#F2994A";
			if (normalizedValue.value <= 75) return "#F2C94C";
			return "#62BF9C";
		});
		const strokeDashoffset = computed(() => CIRCUMFERENCE * (1 - animatedValue.value / 100));
		const progressText = computed(() => `${Math.round(animatedValue.value)}%`);
		const animateTo = (targetValue) => {
			animatedValue.value = targetValue;
		};
		watch(normalizedValue, (nextValue) => {
			animateTo(nextValue);
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "progress-circle",
				style: {
					width: `${SIZE}px`,
					height: `${SIZE}px`
				}
			}, _attrs))} data-v-41c632b8><svg class="progress-ring"${ssrRenderAttr("width", SIZE)}${ssrRenderAttr("height", SIZE)} viewBox="0 0 70 70" data-v-41c632b8><circle class="progress-ring-track"${ssrRenderAttr("cx", CENTER)}${ssrRenderAttr("cy", CENTER)}${ssrRenderAttr("r", RADIUS)} fill="none"${ssrRenderAttr("stroke-width", STROKE_WIDTH)} data-v-41c632b8></circle><circle class="progress-ring-value"${ssrRenderAttr("cx", CENTER)}${ssrRenderAttr("cy", CENTER)}${ssrRenderAttr("r", RADIUS)} fill="none"${ssrRenderAttr("stroke", progressColor.value)}${ssrRenderAttr("stroke-width", STROKE_WIDTH)} stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", CIRCUMFERENCE)}${ssrRenderAttr("stroke-dashoffset", strokeDashoffset.value)} data-v-41c632b8></circle></svg><span class="progress-label" style="${ssrRenderStyle({ color: progressColor.value })}" data-v-41c632b8>${ssrInterpolate(progressText.value)}</span></div>`);
		};
	}
});
//#endregion
//#region app/components/decks/deck-tile-circle-compleet.vue
var _sfc_setup$2 = deck_tile_circle_compleet_vue_vue_type_script_setup_true_lang_default.setup;
deck_tile_circle_compleet_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-tile-circle-compleet.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var deck_tile_circle_compleet_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(deck_tile_circle_compleet_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-41c632b8"]]), { __name: "DecksDeckTileCircleCompleet" });
//#endregion
//#region app/components/decks/deck-tile.vue?vue&type=script&setup=true&lang.ts
var deck_tile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "deck-tile",
	__ssrInlineRender: true,
	props: { deck: {} },
	emits: [
		"click",
		"edit",
		"delete"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const onEditClick = () => {
			emit("edit", props.deck.id);
		};
		const onDeleteClick = () => {
			emit("delete", props.deck.id);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "tile-container" }, _attrs))} data-v-3ea65a46><div class="tile-info" data-v-3ea65a46><div class="tile-title" data-v-3ea65a46>${ssrInterpolate(__props.deck.title)}</div>`);
			_push(ssrRenderComponent(VMenu, { location: "bottom end" }, {
				activator: withCtx(({ props: menuProps }, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(VBtn, mergeProps({
						icon: "",
						variant: "text",
						class: "dot-menu-btn",
						ripple: false
					}, menuProps, { onClick: () => {} }), {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(VIcon, {
								size: "24",
								color: "rgba(22, 38, 55, 0.75)"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` mdi-dots-vertical `);
									else return [createTextVNode(" mdi-dots-vertical ")];
								}),
								_: 2
							}, _parent, _scopeId));
							else return [createVNode(VIcon, {
								size: "24",
								color: "rgba(22, 38, 55, 0.75)"
							}, {
								default: withCtx(() => [createTextVNode(" mdi-dots-vertical ")]),
								_: 1
							})];
						}),
						_: 2
					}, _parent, _scopeId));
					else return [createVNode(VBtn, mergeProps({
						icon: "",
						variant: "text",
						class: "dot-menu-btn",
						ripple: false
					}, menuProps, { onClick: withModifiers(() => {}, ["stop"]) }), {
						default: withCtx(() => [createVNode(VIcon, {
							size: "24",
							color: "rgba(22, 38, 55, 0.75)"
						}, {
							default: withCtx(() => [createTextVNode(" mdi-dots-vertical ")]),
							_: 1
						})]),
						_: 1
					}, 16, ["onClick"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(VList, null, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(VListItem, {
									"prepend-icon": "mdi-pencil",
									title: "Редактировать",
									onClick: onEditClick
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(VListItem, {
									"prepend-icon": "mdi-trash-can-outline",
									title: "Удалить",
									onClick: onDeleteClick
								}, null, _parent, _scopeId));
							} else return [createVNode(VListItem, {
								"prepend-icon": "mdi-pencil",
								title: "Редактировать",
								onClick: withModifiers(onEditClick, ["stop"])
							}), createVNode(VListItem, {
								"prepend-icon": "mdi-trash-can-outline",
								title: "Удалить",
								onClick: withModifiers(onDeleteClick, ["stop"])
							})];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(VList, null, {
						default: withCtx(() => [createVNode(VListItem, {
							"prepend-icon": "mdi-pencil",
							title: "Редактировать",
							onClick: withModifiers(onEditClick, ["stop"])
						}), createVNode(VListItem, {
							"prepend-icon": "mdi-trash-can-outline",
							title: "Удалить",
							onClick: withModifiers(onDeleteClick, ["stop"])
						})]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="tile-content" data-v-3ea65a46><div data-v-3ea65a46><p class="m-0" data-v-3ea65a46> Всего: ${ssrInterpolate(__props.deck.total)}</p><div class="tile-due" data-v-3ea65a46>${ssrInterpolate(__props.deck.dueCardsCount)} на сегодня </div></div>`);
			_push(ssrRenderComponent(deck_tile_circle_compleet_default, { value: __props.deck.percentCompleet }, null, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/components/decks/deck-tile.vue
var _sfc_setup$1 = deck_tile_vue_vue_type_script_setup_true_lang_default.setup;
deck_tile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/decks/deck-tile.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var deck_tile_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(deck_tile_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3ea65a46"]]), { __name: "DecksDeckTile" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { getSessionData } = useMnemoSessionStore();
		useBreadcrumbs();
		const decks = ref([]);
		async function getAllDecks() {
			decks.value = await getDecks();
			await getSessionData();
		}
		function addDeck() {
			return navigateTo("/decks/new");
		}
		function onDeckClick(deckId) {
			if (!deckId) return;
			return navigateTo({
				name: "decks-deckId-cards",
				params: { deckId }
			});
		}
		function onDeckEdit(deckId) {
			if (!deckId) return;
			return navigateTo({
				name: "decks-deckId-edit",
				params: { deckId }
			});
		}
		async function onDeckDelete(id) {
			await deleteDeck(id);
			await getAllDecks();
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "deck-page" }, _attrs))} data-v-2b6c6e2c>`);
			_push(ssrRenderComponent(mnemo_repeat_form_default, { class: "deck-page__review" }, null, _parent));
			_push(ssrRenderComponent(mnemo_form_default, { class: "deck-page__list" }, {
				"toolbar-left": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(mnemo_button_default, {
						onClick: addDeck,
						width: "150"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Добавить колоду `);
							else return [createTextVNode(" Добавить колоду ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(mnemo_button_default, {
						onClick: addDeck,
						width: "150"
					}, {
						default: withCtx(() => [createTextVNode(" Добавить колоду ")]),
						_: 1
					})];
				}),
				"toolbar-right": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(mnemo_input_default, {
						width: "380",
						placeholder: "Поиск",
						"prepend-inner-icon": "mdi-magnify"
					}, null, _parent, _scopeId));
					else return [createVNode(mnemo_input_default, {
						width: "380",
						placeholder: "Поиск",
						"prepend-inner-icon": "mdi-magnify"
					})];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="decks-grid" data-v-2b6c6e2c${_scopeId}><!--[-->`);
						ssrRenderList(unref(decks), (deck) => {
							_push(`<div data-v-2b6c6e2c${_scopeId}>`);
							_push(ssrRenderComponent(deck_tile_default, {
								deck,
								onClick: ($event) => onDeckClick(deck.id),
								onEdit: ($event) => onDeckEdit(deck.id),
								onDelete: ($event) => onDeckDelete(deck.id)
							}, null, _parent, _scopeId));
							_push(`</div>`);
						});
						_push(`<!--]--></div>`);
					} else return [createVNode("div", { class: "decks-grid" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(decks), (deck) => {
						return openBlock(), createBlock("div", { key: deck.id }, [createVNode(deck_tile_default, {
							deck,
							onClick: ($event) => onDeckClick(deck.id),
							onEdit: ($event) => onDeckEdit(deck.id),
							onDelete: ($event) => onDeckDelete(deck.id)
						}, null, 8, [
							"deck",
							"onClick",
							"onEdit",
							"onDelete"
						])]);
					}), 128))])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2b6c6e2c"]]);

export { pages_default as default };;globalThis.__timing__.logEnd('Load chunks/build/pages-DGkaVbFr');
//# sourceMappingURL=pages-DGkaVbFr.mjs.map
