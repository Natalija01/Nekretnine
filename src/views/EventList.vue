<template>
  <div>
    <banner></banner>
    <h1 class="text-center">{{ $t('allproperties.title') }}</h1>

    <main class="main">
      <div class="container" v-if="getNekretnine">
        <div class="row">
          <div class="col-md-12">
            <div class="input-group">
              <div class="input-group-prepend"></div>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                v-model="city"
              >
                <option
                  v-for="grad in gradovi"
                  :key="grad.index"
                  :value="grad"
                  >{{ grad }}</option
                >
              </select>
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tip Nekretnine
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" @click="setTip('Plac')">Plac</a>
                  <a class="dropdown-item" @click="setTip('Stan')">Stan</a>
                  <a class="dropdown-item" @click="setTip('Kuca')">Kuca</a>
                  <a class="dropdown-item" @click="setTip('Garaza')">Garaza</a>
                </div>
              </div>
              <div class="input-group-prepend">
                <span class="input-group-text">Cijena Od</span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                v-model="priceFrom"
              />
              <div class="input-group-append">
                <span class="input-group-text">Cijena do</span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                v-model="priceTo"
              />
              <div class="input-group-prepend ml-2">
                <button
                  class="btn btn-primary"
                  type="button"
                  id="button-addon1"
                  @click="filterRealEstates"
                >
                  Pretrazi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row justify-content-center">
            <div v-for="event in getNekretnine" :key="event.index">
              <EventCard :event="event" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-center mb-2">
        <button
          class="btn btn-success"
          @click="loadMoreNekretnina"
          v-if="getSize"
        >
          Load More
        </button>
        <h3 class="text-center" v-else>No more results !</h3>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import Footer from '@/components/Footer.vue';
import banner from '@/components/banner.vue';
export default {
  components: {
    EventCard,
    banner,
    Footer
  },
  created() {
    this.$store.dispatch('takeAllNekretnine');
  },
  data() {
    return {
      filterEnabled: false,
      filterOptions: {},
      city: 'Podgorica',
      priceFrom: 0,
      priceTo: 10000000,
      realEstateType: '',
      events: [],
      gradovi: [
        'Podgorica',
        'Niksic',
        'Pljevlja',
        'Bijelo Polje',
        'Cetinje',
        'Bar',
        'Herceg Novi',
        'Berane',
        'Budva',
        'Ulcinj',
        'Tivat',
        'Rozaje',
        'Kotor',
        'Danilovgrad',
        'Mojkovac',
        'Plav',
        'Kolasin',
        'Zabljak',
        'Pluzine',
        'Andrijevica',
        'Savnik'
      ]
    };
  },
  computed: {
    getNekretnine() {
      return this.$store.getters.getNekretnine;
    },
    getSize() {
      return this.$store.getters.getSize;
    }
  },
  methods: {
    loadMoreNekretnina() {
      var repo = 'takeAllNekretnine';
      if (this.filterEnabled) {
        repo = 'filterRealEstates';
      }
      this.$store.dispatch(repo, true);
    },
    setTip(value) {
      this.realEstateType = value;
    },
    filterRealEstates() {
      const filterOptions = {
        city: this.city,
        type: this.realEstateType,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo
      };
      this.filterOptions = filterOptions;
      this.filterEnabled = true;
      this.$store.dispatch('filterRealEstates', filterOptions);
    }
  }
};
</script>

<style></style>
