<template>
  <v-container>
    <v-row no-gutters>
      <h4>Dodavanje novih nekretnina</h4>
    </v-row>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Osnovne informacije</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Dodavanje slika</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="3">Pregled</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <!-- <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card> -->
          <RealEstate ref="child" />

          <v-btn color="primary" @click="nextStep">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <AddImagesForRealEstates />
          <v-btn color="primary" @click="nextStep">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <!-- <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card> -->
          <Preview :previewMode="true" v-if="getNekretnina" />
          <v-btn color="primary" @click="nextStep">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import RealEstate from '@/components/RealEstates/RealEstateForm';
import AddImagesForRealEstates from '@/components/AddImagesForRealEstates';
import Preview from '@/views/EventShow';
export default {
  components: {
    RealEstate,
    AddImagesForRealEstates,
    Preview
  },
  data() {
    return {
      e1: 1
    };
  },
  methods: {
    nextStep() {
      if (this.e1 === 1) {
        this.$refs.child.dodajNekretninu();
      }
      if (this.e1 === 2) {
        var dump = this.getTempNekretnina;
        dump.Slika = this.getTempSlika;
        this.$store.commit('setNekretnina', dump);
      }
      if (this.e1 === 3) {
        this.$store.dispatch('novaNekretnina', this.getNekretnina);
      }
      this.e1++;
    }
  },
  computed: {
    getNekretnina() {
      return this.$store.getters.getNekretnina;
    },
    getTempNekretnina() {
      return this.$store.getters.getTempNekretnina;
    },
    getTempSlika() {
      return this.$store.getters.getTempSlika;
    }
  }
};
</script>
