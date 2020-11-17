<template>
  <div id="app">
    <character name="Bob" :backgrounds="activeBackgrounds" />
    <div class="background-container">
        <background v-for="background in Backgrounds" :key="background.id"
                    :title="background.title"
                    :active="background.active"
                    :id="background.id"
                    :skills="background.skills"
                    @toggled-background="toggleBackground(background.id)"
                    :class="{'background-disabled': activeBackgrounds.length >= 3}"
        />
    </div>
  </div>
</template>

<script>
import uniqueId from "lodash.uniqueid";
import Background from "@/components/Background";
import Character from "@/components/Character";
import backgrounds from './assets/backgrounds.json'

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
      }

    },
    findActiveBackgrounds() {
      return this.Backgrounds.filter(background => background.active === true)
    },
    importBackgrounds() {
      this.Backgrounds = []
      backgrounds.backgrounds.forEach(background => {
        this.Backgrounds.push(
            {id: uniqueId('background-'), title: background.name, skills: background.skills, active: false}
        )
      })
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
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: minmax(192px, 25%) 1fr;
  grid-template-rows: auto 1fr auto;
}

.background-container {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(192px, 1fr));
}

.background {
  padding: 1rem;
  place-items: center;
  border-radius: 1rem;
}

  ul {
    list-style-type: none;
    padding: 0;
  }

.character {
  padding: 1rem;
  place-items: center;
  border-radius: 1rem;
  background-color: aquamarine;
}

.background-active {
  background-color: aqua;
}

.background-inactive {
  background-color: darkgray;
}

.background-inactive.background-disabled {
  opacity: 50%;
}

</style>
