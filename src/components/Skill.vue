<template>
  <div class="skill" :class="[{'adjusting' : adjusting}]">
    <button v-if="adjusting" @click="adjust(-1)">-</button>
    <div>{{ name }} {{ level }}</div>
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

  .adjusting {
    display: grid;
    opacity: 0.8;
    grid-template-columns: auto 1fr auto;;
  }

  .adjusting:hover {
    opacity: 1;
    background: darkgrey;
  }
</style>