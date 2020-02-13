<template>
  <div>
    <div class="card" style="width: 18rem; height:40rem">
      <div class="card-img-top">
        <div
          :id="'carouselExampleFade' + event.AuxID"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <p v-if="user"></p>
            <div class="carousel-item active">
              <img :src="event.Slika[0]" class="d-block w-100" alt="..." />
            </div>
            <div
              class="carousel-item"
              v-for="slika in event.Slika"
              :key="slika.id"
            >
              <img :src="slika" class="d-block w-100" alt="..." />
            </div>
          </div>

          <a
            class="carousel-control-prev"
            :href="'#carouselExampleFade' + event.AuxID"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            :href="'#carouselExampleFade' + event.AuxID"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <router-link
            class="card-link"
            :to="
              $i18nRoute({ path: '/' + lang + '/nekretnina/' + event.AuxID })
            "
          >
            {{ event.VrstaNekretnine }} na {{ event.TipOglasa }}
            {{ event.Grad }}
          </router-link>
        </h5>
        <!-- <p class="card-text" v-if="lang === 'sr'">
          {{ event.Opis.srpski | fixDescription }}.
        </p>
        <p class="card-text" v-if="lang === 'en'">
          {{ event.Opis.engleski | fixDescription }}.
        </p>
        <p class="card-text" v-if="lang === 'ru'">
          {{ event.Opis.ruski | fixDescription }}.
        </p> -->
        <p class="card-text">{{ getOpis | fixDescription }}.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Sifra nekretnine : # {{ event.AuxID }}</li>
        <li class="list-group-item">
          Vrsta nekretnine : {{ event.VrstaNekretnine }}
        </li>
        <li class="list-group-item">
          Povrsina: {{ event.Ukupnapovršina }}
          m
          <sup>2</sup>
        </li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link"
          >Cijena : {{ event.Cena }} {{ event.Valuta }}</a
        >
      </div>
      <div class="card-body">
        <a href="#" class="card-link">Kontaktirajte nas</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: localStorage.getItem('lang')
    };
  },
  props: {
    event: Object
  },
  methods: {
    showEstate() {
      this.$store.dispatch('sendToNekretninaView', this.event).then(() => {
        this.$i18nRoute({ name: 'event-show' });
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    getOpis() {
      if (typeof this.event.Opis === 'string') {
        return this.event.Opis;
      } else {
        var langs = {
          sr: 'srpski',
          en: 'engleski',
          ru: 'ruski'
        };
        return this.event.Opis[langs[this.lang]];
      }
    }
  },
  filters: {
    fixDescription: function(value) {
      const findDot = value.indexOf('.');
      var result = '';
      if (findDot === -1) {
        result = value;
      } else {
        result = value.substr(0, findDot + 1);
      }
      return result;
    }
  }
};
</script>

<style scoped>
.w-100 {
  height: 200px;
}
.card {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
