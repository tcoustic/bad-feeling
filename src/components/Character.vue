<template>
  <div class="character">
    <button @click="$emit('clear-character')">Clear</button>
    <div>
      <label for="character-name">Name:
        <input id="character-name" v-model="name">
      </label>
    </div>
    <div>
      <ul id="skills">
        <li v-for="skill in characterSkills" :key="skill.name">
          <skill :name="skill.name" :level="skill.level"/>
        </li>
      </ul>
    </div>
    <div>
      <ul id="stunts">
        <li v-for="stunt in s=characterStunts" :key="stunt">{{stunt}}</li>
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
    backgrounds: {type: Array}
  },
  computed: {
    characterSkills() {
      const skillList = []
    this.backgrounds.forEach(
        background => {
          background.skills.forEach(skill => {
            const foundSkill = skillList.find(elem => elem.name === skill.name)
            let skillToPush = {name: skill.name,
              level:(foundSkill !== undefined)? foundSkill.level + skill.level : skill.level}
            skillList.push(skillToPush)
            if(foundSkill !== undefined) skillList.splice(skillList.indexOf(foundSkill), 1)
          })
        }
    )
    return skillList.sort((a, b) => b.level - a.level)
    },
    characterStunts() {
      const stuntList = []
      this.backgrounds.forEach(background => {stuntList.push(background.stunt)})
      return stuntList
    }
  }
}
</script>

<style>

</style>