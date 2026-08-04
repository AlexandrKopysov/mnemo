globalThis.__timing__.logStart('Load chunks/build/mnemo-repeat-store-gNqU4H3-');import { $ as $fetch$1 } from '../virtual/entry.mjs';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { A as Answer } from '../_/nitro.mjs';

//#region app/entities/review-session/api/index.ts
async function getReviewSession() {
	return await $fetch$1("/api/review-session/preview", { method: "GET" });
}
async function createReviewSession() {
	return await $fetch$1("/api/review-session", { method: "POST" });
}
//#endregion
//#region app/entities/review-session/model/mnemo-repeat-store.ts
var useMnemoSessionStore = defineStore("mnemo-session", () => {
	const reviewSession = ref(null);
	const startedAt = ref(null);
	const queue = ref([]);
	const decks = ref([]);
	const totalCards = ref(0);
	const completedCount = ref(0);
	const hardCount = ref(0);
	const normalCount = ref(0);
	const easyCount = ref(0);
	const currentCard = computed(() => {
		return queue.value[completedCount.value] ?? null;
	});
	const remainingCount = computed(() => {
		return Math.max(totalCards.value - completedCount.value, 0);
	});
	const progressPercent = computed(() => {
		if (!totalCards.value) return 0;
		return Math.round(completedCount.value / totalCards.value * 100);
	});
	const isCompleted = computed(() => {
		return totalCards.value > 0 && completedCount.value >= totalCards.value;
	});
	async function startSession() {
		const session = await createReviewSession();
		if (!session) return;
		applySession(session);
	}
	function applySession(session) {
		startedAt.value = session.startedAt;
		queue.value = session.queue;
		decks.value = session.decks;
		totalCards.value = session.totalCards;
		completedCount.value = 0;
		hardCount.value = 0;
		normalCount.value = 0;
		easyCount.value = 0;
	}
	function completeCurrentCard(answer) {
		if (!currentCard.value) return;
		if (answer === Answer.HARD) hardCount.value++;
		if (answer === Answer.EASY) easyCount.value++;
		if (answer === Answer.NORMAL) normalCount.value++;
		completedCount.value++;
	}
	function resetSession() {
		startedAt.value = null;
		queue.value = [];
		decks.value = [];
		totalCards.value = 0;
		completedCount.value = 0;
		hardCount.value = 0;
		easyCount.value = 0;
		normalCount.value = 0;
	}
	async function getSessionData() {
		const res = await getReviewSession();
		if (!res) return;
		reviewSession.value = res;
	}
	return {
		startedAt,
		queue,
		decks,
		totalCards,
		completedCount,
		hardCount,
		normalCount,
		easyCount,
		currentCard,
		remainingCount,
		progressPercent,
		isCompleted,
		startSession,
		completeCurrentCard,
		resetSession,
		reviewSession,
		getSessionData
	};
});

export { useMnemoSessionStore as u };;globalThis.__timing__.logEnd('Load chunks/build/mnemo-repeat-store-gNqU4H3-');
//# sourceMappingURL=mnemo-repeat-store-gNqU4H3-.mjs.map
