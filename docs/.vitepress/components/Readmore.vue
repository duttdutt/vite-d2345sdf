<template>
    <div :class="blockClass" class="readmore" @click="handleClick">
        <Icon :icon="iconComponent" width="20" height="20" :class="iconClass" />
        <p class="readmore-text">
            <slot /><strong>{{ ' ' + props.second + '.' }}</strong>
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from "@iconify/vue";

const props = defineProps({
    to: {
        type: String,
        required: true
    },
    second: {
        type: String
    }
});

const types = {
    readmore: {
        class: 'readmore-class',
        icon: 'ph:bookmark-simple-duotone',
        iconClass: 'icon-readmore'
    }
};

const blockClass = computed(() => types['readmore'].class);
const iconComponent = computed(() => types['readmore'].icon);
const iconClass = computed(() => types['readmore'].iconClass);

const handleClick = () => {
    window.open(props.to, '_blank'); // Открываем ссылку в новой вкладке
};
</script>

<style scoped>
.readmore {
    font-size: 16px;
    padding: 0.6rem 0.9rem;
    margin: 1rem 0;
    border: 1px solid;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: border-color 0.3s;
}

.readmore {
    border-color: var(--readmore-border);
    background-color: var(--readmore-bg);
}

.readmore:hover {
    border-color: var(--readmore-border-hover);
    /* Ховер для бордера */
}

.readmore-text {
    color: var(--vp-c-text-1);
    margin: 0;
    font-size: 14px !important;
}

.icon-readmore {
    color: #F87171;
    margin-right: 0.3rem;
}
</style>