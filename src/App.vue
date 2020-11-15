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
        />
    </div>
  </div>
</template>

<script>
import uniqueId from "lodash.uniqueid";
import Background from "@/components/Background";
import Character from "@/components/Character";

export default {
  name: 'App',
  components: {
    Character,
    Background
  },
  data() {
    return {
      Backgrounds: [
        {id: uniqueId('background-'), title: 'A', skills: [{skillName: "name", level: 1}, {skillName: "another", level: 2}], active: false},
        {id: uniqueId('background-'), title: 'V', skills: [],active: true},
        {id: uniqueId('background-'), title: 'S', skills: [],active: false},
        {id: uniqueId('background-'), title: 'R', skills: [],active: false}
      ]
    }
  },
  methods: {
    toggleBackground(backgroundId) {
      const backgroundToToggle = this.Backgrounds.find(background => background.id === backgroundId)
      backgroundToToggle.active = !backgroundToToggle.active
    },
    findActiveBackgrounds() {
      return this.Backgrounds.filter(background => background.active === true)
    }
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
}

.background-container {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}


.background {
  padding: 1rem;
  place-items: center;
  border-radius: 1rem;

}

.background-active {
  background-color: aqua;
}

.background-inactive {
  background-color: darkgray;
}

</style>
