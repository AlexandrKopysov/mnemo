globalThis.__timing__.logStart('Load chunks/routes/api/decks/_deckId/cards/_cardId/review.post');import { A as Answer, c as defineEventHandler, e as getRouterParam, r as readBody, f as createError, p as prisma } from '../../../../../../_/nitro.mjs';
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

const EASE_FACTOR_CHANGE = {
  [Answer.EASY]: 0.15,
  [Answer.NORMAL]: 0,
  [Answer.HARD]: -0.2
};
const MIN_EASE_FACTOR = 1.3;
const MAX_EASE_FACTOR = 3.5;
function calculateEaseFactor(currentEaseFactor, answer) {
  return Math.min(
    MAX_EASE_FACTOR,
    Math.max(
      MIN_EASE_FACTOR,
      currentEaseFactor + EASE_FACTOR_CHANGE[answer]
    )
  );
}

const HARD_INTERVAL_DAYS = 1;
const FIRST_NORMAL_INTERVAL_DAYS = 1;
const FIRST_EASY_INTERVAL_DAYS = 3;
const EASY_INTERVAL_BONUS = 0.3;
function calculateIntervalDays(params) {
  const {
    currentIntervalDays,
    currentRepetitions,
    currentEaseFactor,
    answer
  } = params;
  if (answer === Answer.HARD) {
    return HARD_INTERVAL_DAYS;
  }
  if (answer === Answer.NORMAL) {
    if (currentRepetitions === 0) {
      return FIRST_NORMAL_INTERVAL_DAYS;
    }
    return Math.max(
      FIRST_NORMAL_INTERVAL_DAYS,
      Math.round(currentIntervalDays * currentEaseFactor)
    );
  }
  if (currentRepetitions === 0) {
    return FIRST_EASY_INTERVAL_DAYS;
  }
  return Math.max(
    FIRST_EASY_INTERVAL_DAYS,
    Math.round(currentIntervalDays * (currentEaseFactor + EASY_INTERVAL_BONUS))
  );
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function getNextStatus(answer) {
  return answer === Answer.HARD ? "LEARNING" : "REVIEW";
}
function calculateRepetitions(currentRepetitions, answer) {
  return answer === Answer.HARD ? 0 : currentRepetitions + 1;
}
function calculateLapses(currentLapses, answer) {
  return answer === Answer.HARD ? currentLapses + 1 : currentLapses;
}
function calculateNextReview(card, answer) {
  const now = /* @__PURE__ */ new Date();
  const easeFactor = calculateEaseFactor(card.easeFactor, answer);
  const intervalDays = calculateIntervalDays({
    currentIntervalDays: card.intervalDays,
    currentRepetitions: card.repetitions,
    currentEaseFactor: card.easeFactor,
    answer
  });
  return {
    status: getNextStatus(answer),
    dueAt: addDays(now, intervalDays),
    lastReviewedAt: now,
    intervalDays,
    easeFactor,
    repetitions: calculateRepetitions(card.repetitions, answer),
    lapses: calculateLapses(card.lapses, answer)
  };
}

const review_post = defineEventHandler(async (event) => {
  const deckId = getRouterParam(event, "deckId");
  const cardId = getRouterParam(event, "cardId");
  const body = await readBody(event);
  if (!deckId || !cardId || !body.answer) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441"
    });
  }
  const card = await prisma.card.findUnique({
    where: {
      id: cardId,
      deckId
    }
  });
  if (!card) {
    throw createError({
      statusCode: 404,
      statusMessage: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
    });
  }
  const nextReviewData = calculateNextReview(card, body.answer);
  const updatedCard = await prisma.card.update({
    where: {
      id: cardId,
      deckId
    },
    data: nextReviewData
  });
  return updatedCard;
});

export { review_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/decks/_deckId/cards/_cardId/review.post');
//# sourceMappingURL=review.post.mjs.map
