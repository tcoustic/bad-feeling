<template>
  <section id="app">
    <character name="Bob"
               :backgrounds="activeBackgrounds"
               :skill-adjustments="SkillAdjustments"
               :all-skills="allSkills"
               :adjusting-skills="adjustingSkills"
               @clear-character="clearCharacter"
               @adjust-skills="toggleSkillAdjustment"
               @adjust="changeSkillAdjustment"
    />
    <div class="background-container">
        <background v-for="background in Backgrounds" :key="background.id"
                    :title="background.title"
                    :description="background.description"
                    :active="background.active"
                    :id="background.id"
                    :skills="background.skills"
                    :stunt="background.stunt"
                    @toggled-background="toggleBackground(background.id)"
                    :class="{'background-disabled': activeBackgrounds.length >= 3}"
        />
    </div>
  </section>
</template>

<script>
import uniqueId from "lodash.uniqueid";
import Background from "@/components/Background";
import Character from "@/components/Character";
import backgrounds from './assets/backgrounds.json'
import {StorageService} from '@/services/LocalStorageService'

export default {
  name: 'App',
  components: {
    Character,
    Background
  },
  data() {
    return {
      Backgrounds: [],
      SkillAdjustments: [],
      adjustingSkills: false
    }
  },
  methods: {
    toggleBackground(backgroundId) {
      const backgroundToToggle = this.Backgrounds.find(background => background.id === backgroundId)
      if (backgroundToToggle.active || this.activeBackgrounds.length < 3) {
        backgroundToToggle.active = !backgroundToToggle.active
        StorageService.storeBackgrounds(this.Backgrounds)
      }

    },

    toggleSkillAdjustment() {
      this.adjustingSkills = !this.adjustingSkills
    },

    changeSkillAdjustment(adjustment) {
      const foundSkill = this.SkillAdjustments.find(skill => skill.name === adjustment.name)
      if(foundSkill != null) {
        adjustment.level += foundSkill.level
        this.SkillAdjustments.splice(this.SkillAdjustments.indexOf(foundSkill))
      }
      if(adjustment.level !== 0) {
        this.SkillAdjustments.push(adjustment)
      }
      StorageService.storeAdjustments(this.SkillAdjustments)
    },

    findActiveBackgrounds() {
      return this.Backgrounds.filter(background => background.active === true)
    },

    listAllSkills() {
      let skillArray = []
      this.Backgrounds.forEach(background => {
        background.skills.forEach(skill => skillArray.push(skill.name))
      })
      return skillArray.filter((value, index, self) => {
        return self.indexOf(value) === index
      }).sort()

    },

    importAdjustments() {
      this.SkillAdjustments = StorageService.fetchAdjustments() || []
    },

    importBackgrounds() {
      this.Backgrounds = StorageService.fetchBackgrounds()
      if (this.Backgrounds === null || this.Backgrounds === []){
        this.Backgrounds = []
        backgrounds.backgrounds.forEach(background => {
          this.Backgrounds.push(
              {id: uniqueId('background-'),description: background.description, title: background.name, skills: background.skills,stunt: background.stunt , active: false}
          )
        })
      }
    },
    clearCharacter() {
      StorageService.clearBackgroundsStorage()
      this.importBackgrounds()
      this.importAdjustments()
    }
  },
  mounted() {
    this.importBackgrounds()
    this.importAdjustments()
  },
  computed: {
    activeBackgrounds() {
      return this.findActiveBackgrounds()
    },
    allSkills() {
      return this.listAllSkills()
    }
  }
}
</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: lightgray;
  padding: 2rem;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: minmax(12rem, 25%) 1fr;
  grid-template-rows: auto 1fr auto;
}

@media screen and (max-width: 592px){
  #app {
    grid-template-columns: auto;
    grid-template-rows: auto minmax(8rem, 40%) 1fr auto;
  }
}


.background-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

.character {
  padding: 1rem;
  place-items: center;
  border-radius: .5rem;
  background-color: lightgray;
  box-shadow: 2px 2px 4px black;
}

.background {
  flex: 0 1 8rem;
  padding: 1rem;
  place-items: center;
  border-radius: .5rem;
  background-color: darkgray;
  box-shadow: 2px 2px 4px black;
}

.background-disabled {
  opacity: 0.5;
}

.background-active {
  opacity: 1;
  background-color: dimgray;
  color: lightgray;
  box-shadow: 1px 1px 2px black;
}

.description {
  font-weight: lighter;
  font-style: italic;
}




</style>
