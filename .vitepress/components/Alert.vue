<template>
    <div :class="blockClass" class="custom-block">
        <p class="custom-block-title">
            <Icon :icon="iconComponent" width="20" height="20" :class="iconClass" />
            {{ title }}
        </p>
        <p class="custom-block-text"><slot /></p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from "@iconify/vue";

const props = defineProps({
    type: {
        type: String,
        default: 'tip',
        validator: value => ['tip', 'info', 'warning', 'danger', 'readmore'].includes(value)
    },
    title: {
        type: String,
        default: 'Tip'
    },
});

const types = {
    tip: {
        class: 'tip-class',
        icon: 'ph:info-duotone',
        iconClass: 'icon-tip'
    },
    info: {
        class: 'info-class',
        icon: 'ph:lightbulb-duotone',
        iconClass: 'icon-info'
    },
    warning: {
        class: 'warning-class',
        icon: 'ph:warning-duotone',
        iconClass: 'icon-warning'
    },
    danger: {
        class: 'danger-class',
        icon: 'ph:warning-diamond-duotone',
        iconClass: 'icon-danger'
    },
    readmore: {
        class: 'readmore-class',
        icon: 'ph:bookmark-simple-duotone',
        iconClass: 'icon-readmore'
    }
};

const blockClass = computed(() => types[props.type]?.class);
const iconComponent = computed(() => types[props.type]?.icon);
const iconClass = computed(() => types[props.type]?.iconClass);
</script>

<style scoped>
:root {
    --tip-bg: #E6F0FE;
    --tip-border: #BEDAFD;
    --info-bg: #B9F3CC;
    --info-border: #E4FCEC;
    --warning-bg: #FEF8DB;
    --warning-border: #FDDC84;
    --danger-bg: #FEEAEA;
    --danger-border: #FBAEAD;
    --readmore-bg: #262626;
    --readmore-border: #404040;
}

.custom-block {
	padding: 1rem;
    margin: 1rem 0;

    border: 1px solid;
    border-radius: 0.5rem;
}

.tip-class {
    border-color: var(--tip-border);
    background-color: var(--tip-bg);
}

.info-class {
    border-color: var(--info-border);
    background-color: var(--info-bg);
}

.warning-class {
    border-color: var(--warning-border);
    background-color: var(--warning-bg);
}

.danger-class {
    border-color: var(--danger-border);
    background-color: var(--danger-bg);
}

.readmore-class {
    border-color: var(--readmore-border);
    background-color: var(--readmore-bg);
}

.readmore-class:hover {
    border-color: var(--readmore-border-hover);
}

.custom-block-title, .custom-block-text {
    color: var(--vp-c-text-1);
}

.custom-block-text {
    font-size: 14px;
}

.icon-tip {
    color: #3C82F6;
}

.icon-info {
    color: #22C55D;
}

.icon-warning {
    color: #F59E0C;
}

.icon-danger {
    color: #EF4444;
}

.icon-readmore {
    color: #F87171;
}

.custom-block-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
}
</style>