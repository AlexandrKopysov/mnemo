globalThis.__timing__.logStart('Load chunks/build/cards-14NwBVkg');import { u as useRoute, _ as _plugin_vue_export_helper_default, n as navigateTo } from '../virtual/entry.mjs';
import { V as VBtn, a as VIcon } from './VBtn-BK5zdqJr.mjs';
import { V as VMenu } from './VMenu-5yZPJeqd.mjs';
import { V as VList, a as VListItem } from './VList-B7h15kBl.mjs';
import { u as useBreadcrumbs } from './use-breadcrumbs-B6g0mspW.mjs';
import { m as mnemo_form_default } from './mnemo-form-N_yqkAmm.mjs';
import { m as mnemo_button_default } from './mnemo-button-DgV1Ml-V.mjs';
import { m as mnemo_input_default } from './mnemo-input-Bj3NAqAD.mjs';
import { d as deleteCard, g as getCardList } from './api-D9ph_P1-.mjs';
import { g as getDeck } from './api-CGYnhVmc.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, isRef, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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

//#region app/composables/use-date-time.ts
function formatReviewDate(date) {
	const target = new Date(date);
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const targetDay = new Date(target);
	targetDay.setHours(0, 0, 0, 0);
	if (targetDay.getTime() === today.getTime()) return "сегодня";
	if (targetDay.getTime() === tomorrow.getTime()) return "завтра";
	return new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "long"
	}).format(target);
}
//#endregion
//#region app/components/card/card-tile-status.vue?vue&type=script&setup=true&lang.ts
var card_tile_status_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "card-tile-status",
	__ssrInlineRender: true,
	props: { card: {} },
	setup(__props) {
		const iconVariant = {
			base: "mdi-circle",
			outline: "mdi-circle-outline"
		};
		const color = {
			base: "#5fa391",
			red: "#E74C3C",
			orange: "#F39C12",
			yellow: "#F1C40F",
			green: "#27AE60"
		};
		const props = __props;
		const iconCircle = computed(() => {
			switch (props.card.knowledgeScore) {
				case 1: return [
					{
						icon: iconVariant.base,
						color: color.red
					},
					{
						icon: iconVariant.outline,
						color: color.red
					},
					{
						icon: iconVariant.outline,
						color: color.red
					},
					{
						icon: iconVariant.outline,
						color: color.red
					}
				];
				case 2: return [
					{
						icon: iconVariant.base,
						color: color.orange
					},
					{
						icon: iconVariant.base,
						color: color.orange
					},
					{
						icon: iconVariant.outline,
						color: color.orange
					},
					{
						icon: iconVariant.outline,
						color: color.orange
					}
				];
				case 3: return [
					{
						icon: iconVariant.base,
						color: color.yellow
					},
					{
						icon: iconVariant.base,
						color: color.yellow
					},
					{
						icon: iconVariant.base,
						color: color.yellow
					},
					{
						icon: iconVariant.outline,
						color: color.yellow
					}
				];
				case 4: return [
					{
						icon: iconVariant.base,
						color: color.green
					},
					{
						icon: iconVariant.base,
						color: color.green
					},
					{
						icon: iconVariant.base,
						color: color.green
					},
					{
						icon: iconVariant.base,
						color: color.green
					}
				];
				default: return [
					{
						icon: iconVariant.outline,
						color: color.base
					},
					{
						icon: iconVariant.outline,
						color: color.base
					},
					{
						icon: iconVariant.outline,
						color: color.base
					},
					{
						icon: iconVariant.outline,
						color: color.base
					}
				];
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "card-tile-status" }, _attrs))} data-v-27dff8b8><div data-v-27dff8b8><!--[-->`);
			ssrRenderList(unref(iconCircle), (icon) => {
				_push(ssrRenderComponent(VIcon, {
					key: icon.icon,
					icon: icon.icon,
					color: icon.color,
					size: "20"
				}, null, _parent));
			});
			_push(`<!--]--></div><div data-v-27dff8b8> Следующее повторение: ${ssrInterpolate(unref(formatReviewDate)(__props.card.dueAt))}</div></div>`);
		};
	}
});
//#endregion
//#region app/components/card/card-tile-status.vue
var _sfc_setup$2 = card_tile_status_vue_vue_type_script_setup_true_lang_default.setup;
card_tile_status_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/card-tile-status.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var card_tile_status_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(card_tile_status_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-27dff8b8"]]), { __name: "CardTileStatus" });
//#endregion
//#region app/components/card/card-tile.vue?vue&type=script&setup=true&lang.ts
var card_tile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "card-tile",
	__ssrInlineRender: true,
	props: { card: {} },
	emits: [
		"click",
		"edit",
		"delete"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const onEditClick = () => {
			emit("edit", props.card.id);
		};
		const onDeleteClick = () => {
			emit("delete", props.card.id);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_card_tile_status = card_tile_status_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "tile-container" }, _attrs))} data-v-bd2501b9><div class="tile-info" data-v-bd2501b9><div class="tile-title" data-v-bd2501b9>${ssrInterpolate(__props.card.front)}</div></div><div class="tile-left-container" data-v-bd2501b9>`);
			_push(ssrRenderComponent(_component_card_tile_status, { card: __props.card }, null, _parent));
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
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/components/card/card-tile.vue
var _sfc_setup$1 = card_tile_vue_vue_type_script_setup_true_lang_default.setup;
card_tile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/card-tile.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var card_tile_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(card_tile_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bd2501b9"]]), { __name: "CardTile" });
//#endregion
//#region app/pages/decks/[deckId]/cards/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const title = computed(() => deck.value?.title);
		const route = useRoute();
		const deckId = computed(() => String(route.params.deckId));
		const deck = ref();
		const cards = ref([]);
		const search = ref("");
		useBreadcrumbs();
		const onAddCard = async () => {
			return navigateTo({
				name: "decks-deckId-cards-new",
				params: { deckId: deckId.value }
			});
		};
		function onCardClick(cardId) {
			return navigateTo({
				name: "decks-deckId-cards-cardId-learn",
				params: {
					deckId: deckId.value,
					cardId
				}
			});
		}
		function onCardEdit(cardId) {
			return navigateTo({
				name: "decks-deckId-cards-cardId-edit",
				params: {
					deckId: deckId.value,
					cardId
				}
			});
		}
		async function onCardDelete(cardId) {
			await deleteCard(deckId.value, cardId);
			await getData();
		}
		async function getData() {
			deck.value = await getDeck(deckId.value);
			cards.value = await getCardList(deckId.value);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_card_tile = card_tile_default;
			_push(ssrRenderComponent(mnemo_form_default, mergeProps({ title: unref(title) }, _attrs), {
				"toolbar-left": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(mnemo_button_default, {
						onClick: onAddCard,
						width: "150"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Добавить карточку `);
							else return [createTextVNode(" Добавить карточку ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(mnemo_button_default, {
						onClick: onAddCard,
						width: "150"
					}, {
						default: withCtx(() => [createTextVNode(" Добавить карточку ")]),
						_: 1
					})];
				}),
				"toolbar-right": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(mnemo_input_default, {
						modelValue: unref(search),
						"onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
						width: "380",
						placeholder: "Поиск",
						"prepend-inner-icon": "mdi-magnify"
					}, null, _parent, _scopeId));
					else return [createVNode(mnemo_input_default, {
						modelValue: unref(search),
						"onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
						width: "380",
						placeholder: "Поиск",
						"prepend-inner-icon": "mdi-magnify"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="decks-grid"${_scopeId}><!--[-->`);
						ssrRenderList(unref(cards), (card) => {
							_push(ssrRenderComponent(_component_card_tile, {
								key: card.id,
								class: "mb-4",
								card,
								onClick: ($event) => onCardClick(card.id),
								onEdit: ($event) => onCardEdit(card.id),
								onDelete: ($event) => onCardDelete(card.id)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
					} else return [createVNode("div", { class: "decks-grid" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(cards), (card) => {
						return openBlock(), createBlock(_component_card_tile, {
							key: card.id,
							class: "mb-4",
							card,
							onClick: ($event) => onCardClick(card.id),
							onEdit: ($event) => onCardEdit(card.id),
							onDelete: ($event) => onCardDelete(card.id)
						}, null, 8, [
							"card",
							"onClick",
							"onEdit",
							"onDelete"
						]);
					}), 128))])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/decks/[deckId]/cards/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/decks/[deckId]/cards/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var cards_default = index_vue_vue_type_script_setup_true_lang_default;

export { cards_default as default };;globalThis.__timing__.logEnd('Load chunks/build/cards-14NwBVkg');
//# sourceMappingURL=cards-14NwBVkg.mjs.map
