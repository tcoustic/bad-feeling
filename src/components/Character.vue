<template>
  <div>
    <div>
      <label for="character-name">Name:
        <input id="character-name" v-model="name">
      </label>
    </div>
    <div>
      <ul id="skills">
        <li v-for="skill in characterSkills" :key="skill.skillName">{{skill.skillName}}: {{skill.level}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
name: "Character",
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
            const foundSkill = skillList.find(elem => elem.skillName === skill.skillName)
            let skillToPush = {skillName: skill.skillName,
              level:(foundSkill !== undefined)? foundSkill.level + skill.level : skill.level}
            skillList.push(skillToPush)
            if(foundSkill !== undefined) skillList.splice(skillList.indexOf(foundSkill), 1)
          })
        }
    )
    return skillList.sort((a, b) => b.level - a.level)
    }
  }
}
</script>

<style>

</style>