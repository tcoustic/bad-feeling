<template>
  <div>
    {{ skillName }} {{ level }}
  </div>
</template>

<script>
export default {
name: "Skill",
  props: {
    skillName: {required: true, type: String},
    level: {required: true, type: Number}
  }
}
</script>

<style scoped>

</style>