globalThis.__timing__.logStart('Load chunks/_/calculate-knowledge-score');function calculateKnowledgeScore(card) {
  if (card.status === "NEW") {
    return 0;
  }
  if (card.lapses >= 3) {
    return 1;
  }
  if (card.intervalDays >= 30 && card.repetitions >= 4) {
    return 4;
  }
  if (card.intervalDays >= 7 && card.repetitions >= 3) {
    return 3;
  }
  if (card.intervalDays >= 1 && card.repetitions >= 1) {
    return 2;
  }
  return 1;
}

export { calculateKnowledgeScore as c };;globalThis.__timing__.logEnd('Load chunks/_/calculate-knowledge-score');
//# sourceMappingURL=calculate-knowledge-score.mjs.map
