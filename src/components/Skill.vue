<template>
  <div class="skill">
    <button v-if="adjusting" @click="adjust(-1)">-</button>
    {{ name }} {{ level }}
    <button v-if="adjusting" @click="adjust(1)">+</button>
  </div>
</template>

<script>
export default {
name: "Skill",
  props: {
    name: {required: true, type: String},
    level: {required: true, type: Number},
    adjusting: {type: Boolean, default: false}
  },
  methods: {
  adjust(value) {
    this.$parent.$emit('adjust', {name: this.name, level: value})
  }
  }
}
</script>

<style>
  .skill {
    text-transform: capitalize;
  }
</style>