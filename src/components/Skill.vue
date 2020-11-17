<template>
  <div class="skill">
    {{ name }} {{ level }}
  </div>
</template>

<script>
export default {
name: "Skill",
  props: {
    name: {required: true, type: String},
    level: {required: true, type: Number}
  }
}
</script>

<style>
  .skill {
    text-transform: capitalize;
  }
</style>