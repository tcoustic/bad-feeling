<template>
  <div class="background"
       :id = "id"
       :class="[{ 'background-active': isActive }, backgroundType]"
        @click="$emit('toggled-background')"
  >
    <h3>{{title}}</h3>
    <h5 class="description">{{description}}</h5>
    <ul aria-labelledby="background-title">
      <li v-for="skill in skills" :key="skill.name">
        <skill :name="skill.name" :level="skill.level"/>
      </li>
    </ul>
    <span>
      {{stunt}}
    </span>
  </div>
</template>

<script>

import Skill from "@/components/Skill";
export default {
name: "Background",
  components: {Skill},
  props: {
    title: {required: true, type: String},
    description: {default: '', type: String},
    type: {type: String, default: ''},
    active: {default: false, type: Boolean},
    skills: {type: Array, required: true},
    stunt: {default: '', type: String},
    id: {required: true, type: String}
  },
  data() {
   return {
     backgroundSkills: [],
     backgroundType: this.type
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