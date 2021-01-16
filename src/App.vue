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
                    :type="background.type"
                    @toggled-background="toggleBackground(background.id)"
                    :class="{'background-disabled': activeBackgrounds.length >= totalLimit || typeLimit(background.type)}"
        />
    </div>
  </section>
</template>

<script>
import uniqueId from "lodash.uniqueid";
import Background from "@/components/Background";
import Character from "@/components/Character";
import systemData from './assets/backgrounds.json'
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
      Limits: [],
      adjustingSkills: false
    }
  },
  methods: {
    toggleBackground(backgroundId) {
      const backgroundToToggle = this.Backgrounds.find(background => background.id === backgroundId)
      const backgroundsTypeCurrentLimit = this.Limits.find(limit => limit.name === backgroundToToggle.type)
      if (
              backgroundToToggle.active ||
              (
                  this.activeBackgrounds.length < this.totalLimit &&
                  (
                      backgroundsTypeCurrentLimit === undefined ||
                      backgroundsTypeCurrentLimit.current < backgroundsTypeCurrentLimit.limit ||
                      backgroundsTypeCurrentLimit.limit === undefined
                  )
              )
          ) {
        backgroundToToggle.active = !backgroundToToggle.active
        this.findActiveBackgroundTypes()
        StorageService.storeBackgrounds(this.Backgrounds)
        StorageService.storeLimits(this.Limits)
      }
    },

    toggleSkillAdjustment() {
      this.adjustingSkills = !this.adjustingSkills
    },

    changeSkillAdjustment(adjustment) {
      const foundSkill = this.SkillAdjustments.find(skill => skill.name === adjustment.name)
      if(foundSkill != null) {
        adjustment.level += foundSkill.level
        this.SkillAdjustments.splice(this.SkillAdjustments.indexOf(foundSkill), 1)
      }
      if(adjustment.level !== 0) {
        this.SkillAdjustments.push(adjustment)
      }
      StorageService.storeAdjustments(this.SkillAdjustments)
    },

    findActiveBackgrounds() {
      return this.Backgrounds.filter(background => background.active === true)
    },

    findActiveBackgroundTypes() {
      this.Limits.forEach(limit => limit.current = 0)
      this.activeBackgrounds.forEach(background => {
        let foundLimit = this.Limits.find(limit => limit.name === background.type)
        if (foundLimit === undefined) {
          this.Limits.push(
              {
                name: background.type,
                current: 1
              }
          )
        } else {
          foundLimit.current++
        }
      })
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

    listAllBackgroundTypes() {
      let typesArray = []
      this.Backgrounds.forEach(background => typesArray.push(background.type))
      return typesArray.filter((value, index, self) => {
        return self.indexOf(value) === index
      }).sort()
    },

    importAdjustments() {
      this.SkillAdjustments = StorageService.fetchAdjustments() || []
    },

    importLimits() {
      this.Limits = StorageService.fetchLimits()
      if (this.Limits === null) {
        this.Limits = []
        systemData.limits.forEach(limit => {
          this.Limits.push(
              {
                name: limit.name,
                limit: limit.limit,
                current: 0
              }
          )
        })
        if (this.Limits.find(limit => limit.name === "totalLimit") === undefined) {
          this.Limits.push(
              {
                name: "totalLimit",
                limit: 4,
                current: 0
              }
          )
        }
      }
    },

    importBackgrounds() {
      this.Backgrounds = StorageService.fetchBackgrounds()
      if (this.Backgrounds === null || this.Backgrounds === []) {
        this.Backgrounds = []
        systemData.backgrounds.forEach(background => {
          this.Backgrounds.push(
              {
                id: uniqueId('background-'),
                description: background.description,
                title: background.name,
                skills: background.skills,
                stunt: background.stunt,
                type: background.type,
                active: false
              }
          )
        })
      }
        this.Backgrounds.sort(function (a, b) {
          if(a.type > b.type) {return 1}
          if(a.type < b.type) {return -1}
          return 0
        })

    },
    clearCharacter() {
      StorageService.clearBackgroundsStorage()
      this.importBackgrounds()
      this.importAdjustments()
      this.importLimits()
    },
    typeLimit(type) {
      const limit = this.Limits.find(limit => limit.name === type)
      return !(limit === undefined || limit.limit === undefined || limit.current < limit.limit)
    }
  },
  mounted() {
    this.importLimits()
    this.importBackgrounds()
    this.importAdjustments()
  },
  computed: {
    activeBackgrounds() {
      return this.findActiveBackgrounds()
    },
    allSkills() {
      return this.listAllSkills()
    },
    allBackgroundTypes() {
      return this.listAllBackgroundTypes()
    },
    totalLimit() {
      return this.Limits.find(limit => limit.name === "totalLimit").limit
    }
  }
}
</script>

<style>

@keyframes fadeIn {
  0% {
    opacity: 0.9;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

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
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(10rem, 1fr));
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
  flex: 0 1 10rem;
  padding: 1rem;
  place-items: center;
  border-radius: .5rem;
  background-color: darkgray;
  box-shadow: 2px 2px 4px black;
  animation-name: fadeIn;
  animation-duration: 0.4s;
}

.background:hover {
  transform: scale(0.99);
  box-shadow: 2px 2px 3px black;
}

.background-disabled {
  opacity: 0.5;
}

.background-active {
  opacity: 1;
  background-color: dimgray;
  color: lightgray;
  box-shadow: 1px 1px 3px black;
}

.education {
  border: 1px solid cornflowerblue;
}

.upbringing {
  border: 1px solid coral;
}

.background-active:hover {
  box-shadow: 1px 1px 2px black;
}

.description {
  font-weight: lighter;
  font-style: italic;
}

.adjusted {
  color: cornflowerblue;
}



</style>
