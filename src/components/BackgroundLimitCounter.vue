<template>
<div
    class="background-limit-counter"
    :class="name"
    >
  {{name}} {{current}}/{{limit}}
</div>
</template>

<script>
export default {
name: "BackgroundLimitCounter",
  props: {
    name: {required: true, type: String},
    limit: {required: true, type: Number},
    current: {default: 0, type: Number}
  }
}
</script>

<style>

.background-limit-counter {
  text-transform: capitalize;
}

</style>