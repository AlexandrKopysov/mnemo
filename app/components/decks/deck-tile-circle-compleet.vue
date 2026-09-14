<template>
    <div
        class="progress-circle"
        :style="{ width: `${SIZE}px`, height: `${SIZE}px` }"
    >
        <svg
            class="progress-ring"
            :width="SIZE"
            :height="SIZE"
            viewBox="0 0 70 70"
        >
            <circle
                class="progress-ring-track"
                :cx="CENTER"
                :cy="CENTER"
                :r="RADIUS"
                fill="none"
                :stroke-width="STROKE_WIDTH"
            />
            <circle
                class="progress-ring-value"
                :cx="CENTER"
                :cy="CENTER"
                :r="RADIUS"
                fill="none"
                :stroke="progressColor"
                :stroke-width="STROKE_WIDTH"
                stroke-linecap="round"
                :stroke-dasharray="CIRCUMFERENCE"
                :stroke-dashoffset="strokeDashoffset"
            />
        </svg>
        <span
            class="progress-label"
            :style="{ color: progressColor }"
        >
            {{ progressText }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

interface IProps {
    value?: number
}

const props = defineProps<IProps>()

const SIZE = 70
const STROKE_WIDTH = 4
const CENTER = SIZE / 2
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ANIMATION_DURATION_MS = 1200

const animatedValue = ref(0)
let frameId: number | null = null

const normalizedValue = computed(() => {
    const safeValue = Number(props.value ?? 0)

    if (Number.isNaN(safeValue)) {
        return 0
    }

    return Math.max(0, Math.min(100, safeValue))
})

const progressColor = computed(() => {
    if (normalizedValue.value <= 25) {
        return '#E55353'
    }

    if (normalizedValue.value <= 50) {
        return '#F2994A'
    }

    if (normalizedValue.value <= 75) {
        return '#F2C94C'
    }

    return '#62BF9C'
})

const strokeDashoffset = computed(() => CIRCUMFERENCE * (1 - animatedValue.value / 100))
const progressText = computed(() => `${Math.round(animatedValue.value)}%`)

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const animateTo = (targetValue: number) => {
    if (!import.meta.client) {
        animatedValue.value = targetValue
        return
    }

    if (frameId !== null) {
        cancelAnimationFrame(frameId)
    }

    const startValue = animatedValue.value
    const delta = targetValue - startValue
    const startTs = performance.now()

    const step = (timestamp: number) => {
        const elapsed = timestamp - startTs
        const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1)
        const easedProgress = easeOutCubic(progress)

        animatedValue.value = startValue + delta * easedProgress

        if (progress < 1) {
            frameId = requestAnimationFrame(step)
            return
        }

        animatedValue.value = targetValue
        frameId = null
    }

    frameId = requestAnimationFrame(step)
}

watch(
    normalizedValue,
    (nextValue) => {
        animateTo(nextValue)
    },
    { immediate: true },
)

onBeforeUnmount(() => {
    if (frameId !== null) {
        cancelAnimationFrame(frameId)
    }
})
</script>

<style scoped>
.progress-circle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.progress-ring {
    transform: rotate(-90deg);
}

.progress-ring-track {
    stroke: rgba(98, 191, 156, 0.2);
}

.progress-ring-value {
    transition: stroke 0.25s linear;
}

.progress-label {
    position: absolute;
    font-size: 24px;
    font-weight: 400;
    line-height: 1;
}
</style>
