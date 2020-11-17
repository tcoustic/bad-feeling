<template>
  <div class="background"
       :id = "id"
       :class="{ 'background-active': isActive, 'background-inactive': !isActive}"
        @click="$emit('toggled-background')"
  >
    <h3 id="background-title">{{title}}</h3>
    <ul aria-labelledby="background-title">
      <li v-for="skill in skills" :key="skill.name">
        <skill :name="skill.name" :level="skill.level"/>
      </li>
    </ul>
  </div>
</template>

<script>

import Skill from "@/components/Skill";
export default {
name: "Background",
  components: {Skill},
  props: {
    title: {required: true, type: String},
    active: {default: false, type: Boolean},
    skills: {type: Array, required: true},
    id: {required: true, type: String}
  },
  data() {
   return {
     backgroundSkills: []
   }
  },
  created() {
  },
  methods: {
    loadSkills() {
      this.backgroundSkills = this.skills
    }
  },
  computed: {
    isActive() {
      return this.active
    }
  }
}
</script>

<style>

</style>