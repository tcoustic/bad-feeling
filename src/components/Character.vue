<template>
  <div class="character">
    <button @click="$emit('clear-character')">Clear</button>
    <div>
      <label for="character-name">Name:
        <input id="character-name" v-model="name">
      </label>
    </div>
    <div>
      <button @click="$emit('adjust-skills')">Adjust</button>

      <button v-if="adjustingSkills" @click="$emit('reset-adjustments')">Reset Adjustments</button>
      <div v-if="adjustingSkills">Total adjustment: {{totalAdjustments}}</div>
      <ul v-if="!adjustingSkills" id="skills">
        <li v-for="skill in characterSkills" :key="skill.name">
          <skill
              :name="skill.name"
              :level="skill.level"
              :class="[{
                'adjusted' : skill.adjusted,
                'adjusted-up' : skill.adjustment > 0,
                'adjusted-down' : skill.adjustment < 0,
                'added' : skill.adjustment === skill.level

              }]"
              :adjusting = "false"/>
        </li>
      </ul>
      <ul v-else id="skills-adjustments">
        <li v-for="skill in allSkills" :key="skill">
          <skill :name="skill" :level="adjustedLevel(skill)" :adjusting = "true"/>
        </li>
      </ul>
    </div>
    <div>
      <ul id="stunts">
        <li v-for="stunt in s=characterStunts" :key="stunt.id">{{stunt.stunt}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Skill from "@/components/Skill";
export default {
name: "Character",
  components: {Skill},
  props: {
    name: {type: String, default: ""},
    backgrounds: {type: Array},
    adjustingSkills:{type: Boolean, default: true},
    skillAdjustments: {type: Array},
    allSkills:{type: Array}
  },
  methods: {
    adjustedLevel(name) {
      const skl = this.characterSkills.find(skill => skill.name === name)
      return (skl? skl.level: 0)
    }
  },
  computed: {
    characterSkills() {
      const skillList = []

      function addSkill(skill, adjust = false) {
        const foundSkill = skillList.find(elem => elem.name === skill.name)
        let skillToPush = {name: skill.name,
          level:(foundSkill !== undefined)? foundSkill.level + skill.level : skill.level,
        adjusted: adjust,
        adjustment: adjust? skill.level : 0}
        skillList.push(skillToPush)
        if(foundSkill !== undefined) skillList.splice(skillList.indexOf(foundSkill), 1)
      }
    this.backgrounds.forEach(
        background => {
          background.skills.forEach(skill => addSkill(skill))
        }
    )
    this.skillAdjustments.forEach(
        adjustment => addSkill(adjustment, true)
    )
    return skillList.sort((a, b) => b.level - a.level)
    },
    characterStunts() {
      const stuntList = []
      this.backgrounds.forEach(background => {stuntList.push({stunt: background.stunt, id: background.id})})
      return stuntList
    },
    totalAdjustments() {
      let total = 0;
      this.skillAdjustments.forEach(skill => total += skill.level)
      return total
    }
  }
}
</script>

<style>

</style>