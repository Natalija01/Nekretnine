<template>
  <div v-if="getNekretnina">
    <v-container>
      <v-row no-gutters>
        <v-carousel
          cycle
          height="500"
          hide-delimiter-background
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(img, i) in getNekretnina.Slika"
            :key="i"
            :src="img"
          >
          </v-carousel-item>
        </v-carousel>
      </v-row>
      <v-row justify-center>
        <div class="col-md-12 text-center">
          <v-chip class="ma-2" color="red" text-color="black">
            {{ getNekretnina.TipOglasa }}
          </v-chip>
          <v-chip class="ma-2" color="secondary">
            {{ getNekretnina.DeoGrada }}
          </v-chip>

          <v-chip class="ma-2" color="primary">
            {{ getNekretnina.Grad }}
          </v-chip>

          <v-chip class="ma-2" color="yellow">
            {{ getNekretnina.VrstaNekretnine }}
          </v-chip>

          <v-chip class="ma-2">
            {{ getNekretnina.Ukupnapovršina }} m<sup>2</sup>
          </v-chip>

          <v-chip class="ma-2" color="red" text-color="yellow">
            {{ getNekretnina.Država ? getNekretnina.Država : 'Crna Gora' }}
          </v-chip>

          <v-chip class="ma-2" color="green" text-color="white">
            {{ getNekretnina.Cena }} {{ getNekretnina.Valuta }}
          </v-chip>
        </div>
      </v-row>
      <v-row no-gutters>
        <h3 v-if="getNekretnina.TipOglasa">
          {{ getNekretnina.VrstaNekretnine }} na
          {{ getNekretnina.TipOglasa.toLowerCase() }}
        </h3>
        <v-btn text small color="primary" v-if="user" @click="editNekretnina"
          >Edit</v-btn
        >

        <div v-if="lang && getNekretnina.Opis">
          {{ getOpis }}
        </div>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    previewMode: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(this.$route.params.id);
    console.log(this.getNekretnina);
    if (!this.previewMode) {
      this.$store.dispatch('getNekretnina', this.$route.params.id);
    }
  },
  data() {
    return {
      lang: localStorage.getItem('lang')
    };
  },
  methods: {
    editNekretnina() {
      this.$store.commit('setEditNekretnina', this.getNekretnina);
      // this.$i18nRoute({ path: '/' + this.lang + '/dashboard' });
      this.$router.push('/' + this.lang + '/dashboard');
    }
  },
  computed: {
    getNekretnina() {
      return this.$store.getters.getNekretnina;
    },
    getOpis() {
      if (typeof this.getNekretnina.Opis === 'string') {
        return this.getNekretnina.Opis;
      } else {
        var langs = {
          sr: 'srpski',
          en: 'engleski',
          ru: 'ruski'
        };
        return this.getNekretnina.Opis[langs[this.lang]];
      }
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
