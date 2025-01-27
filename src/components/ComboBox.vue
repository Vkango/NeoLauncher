<template>
    <div class="combo-box">
      <input
        type="text"
        v-model="searchTerm"
        @input="filterOptions"
        @focus="showOptions = true"
        @blur="showOptions = false"
        placeholder="Select an option"
      />
      <RippleButton v-if="showOptions" class="options">
        <RippleButton
          v-for="option in filteredOptions"
          :key="option.value"
          class="option"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </RippleButton>
      </RippleButton>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    options: {
      type: Array,
      required: true,
      validator: (options) => options.every(option => 'label' in option && 'value' in option)
    }
  });
  
  const searchTerm = ref('');
  const showOptions = ref(false);
  const selectedOption = ref(null);
  const filteredOptions = ref(props.options);
  
  const filterOptions = () => {
    filteredOptions.value = props.options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  };
  
  const selectOption = (option) => {
    selectedOption.value = option;
    searchTerm.value = option.label;
    showOptions.value = false;
  };
  
  watch(() => props.options, (newOptions) => {
    filteredOptions.value = newOptions;
    selectedOption.value = null;
    searchTerm.value = '';
  });
  </script>
  
  <style scoped>
  .combo-box {
    position: relative;
    width: 100%;
  }
  
  .combo-box input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .options {
    position: absolute;
    width: 100%;


    z-index: 10;
  }
  
  .option {
    padding: 8px;
    cursor: pointer;
  }
  

  </style>