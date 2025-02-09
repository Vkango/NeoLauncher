<template>
  <div class="combobox" @click="toggleDropdown">
    <RippleButton id="RippleButton" class="combobox-selected">
      <div style="display: flex; align-items: center;">
        <span>{{ selectedLabel || placeholder }}</span>
        <img class="icon" src="../assets/chevrondown.svg" style="scale: 0.8; padding-left: 10px;">
      </div>

    </RippleButton>
    <transition name="fade1">
      <div class="combobox-dropdown" v-if="isDropdownVisible">
        <div class="combobox-search" v-if="enableSearch">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索"
            @input="handleSearch"
            @click.stop
          />
        </div>
        <ul class="combobox-options" @click.stop>
          <RippleButton
          id="RippleButton1" 
            v-for="option in filteredOptions"
            :key="option.value"
            class="combobox-option"
            @click="selectOption(option)"
            :class="{ 'is-selected': option.value === selectedValue }"
          >
            {{ option.label }}
          </RippleButton>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  enableSearch: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const selectedValue = ref(props.modelValue);
const selectedLabel = ref('');
const searchQuery = ref('');
const isDropdownVisible = ref(false);

const filteredOptions = computed(() => {
  if (!searchQuery.value || !props.enableSearch) return props.options;
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal;
    selectedLabel.value = props.options.find((opt) => opt.value === newVal)?.label || '';
  },
  { immediate: true }
);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const handleSearch = () => {
  // 搜索逻辑，更新 filteredOptions
};

const selectOption = (option) => {
  selectedValue.value = option.value;
  selectedLabel.value = option.label;
  isDropdownVisible.value = false;
  emit('update:modelValue', selectedValue.value);
  emit('change', selectedValue.value);
};

// 点击外部区域关闭下拉菜单
const handleOutsideClick = (e) => {
  if (!isDropdownVisible.value || !e.target || e.target.closest('.combobox')) return;
  isDropdownVisible.value = false;
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
#RippleButton {
  box-shadow: none;
  background-color: transparent;
}
#RippleButton1 {
  box-shadow: none;
  width: 100%;
  border-radius: 0px;
}
.combobox {
  position: relative;
  width: 100%;
  border-radius: 4px;
  background-color: rgba(var(--text-color), 0.2);
  cursor: pointer;
}

.combobox-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 7px;
  font-size: 12px;
}

.combobox-selected i {
  transition: transform 0.3s;
}

.combobox-selected i.is-reverse {
  transform: rotate(180deg);
}

.combobox-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: fit-content;
  min-width: 100%;
  background-color: rgba(var(--background-color), 0.5);
  backdrop-filter: blur(var(--blur-value));
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.combobox-search {
  padding: 10px;
}

.combobox-search input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 12px;
  background-color: transparent;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.combobox-options {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-y: auto;
  backdrop-filter: blur(var(--blur-value));
}

.combobox-option {
  padding: 10px;
  line-height: 20px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  
}

.combobox-option.is-selected {
  background-color: rgba(var(--text-color), 0.1);
  font-weight: bold;
  color: #409eff;
}

.combobox-option:hover {
  background-color: rgba(var(--text-color), 0.05);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>