<template>
  <section id="app">
    <character name="Bob" :backgrounds="activeBackgrounds" @clear-character="clearCharacter" />
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
      Backgrounds: []
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
    findActiveBackgrounds() {
      return this.Backgrounds.filter(background => background.active === true)
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
    }
  },
  mounted() {
    this.importBackgrounds()
  },
  computed: {
    activeBackgrounds() {
      return this.findActiveBackgrounds()
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
  grid-template-columns: minmax(16rem, 25%) 1fr;
  grid-template-rows: auto 1fr auto;
}

.background-container {
  display: flex;
  flex-wrap: wrap;
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
  flex: 0 1 12rem;
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
