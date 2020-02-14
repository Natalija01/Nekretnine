<template>
  <div>
    <form v-on:submit.prevent="dodajNekretninu()" @submit.prevent="submit">
      <div class="form-group" :class="{ 'form-group--error': $v.sifra.$error }">
        <label for="exampleFormControlInput1">Sifra nekretnine</label>
        <input
          type="text"
          class="form-control form__input"
          v-model.trim="$v.sifra.$model"
          id="exampleFormControlInput1"
          placeholder="exmple : #40059"
          v-model="sifra"
        />
      </div>
      <template v-if="$v.sifra.$error">
        <div class="error" v-if="!$v.sifra.required">
          Field is required
        </div>
        <tree-view
          :data="$v.sifra"
          :options="{ rootObjectKey: '$v.sifra', maxDepth: 2 }"
        ></tree-view
      ></template>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.povrsina.$error }"
      >
        <label for="exampleFormControlInput1">Povrsina</label>
        <input
          type="text"
          class="form-control form__input"
          v-model.trim="$v.povrsina.$model"
          id="exampleFormControlInput3"
          placeholder="100"
          v-model="povrsina"
        />
      </div>
      <template v-if="$v.sifra.$error">
        <div class="error" v-if="!$v.povrsina.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.povrsina.numeric">
          You need to enter numerical value
        </div>
        <tree-view
          :data="$v.sifra"
          :options="{ rootObjectKey: '$v.sifra', maxDepth: 2 }"
        ></tree-view
      ></template>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.cijena.$error }"
      >
        <label for="exampleFormControlInput1">Cijena</label>
        <input
          type="text"
          class="form-control form__input"
          v-model.trim="$v.cijena.$model"
          id="exampleFormControlInput2"
          placeholder="100000"
          v-model="cijena"
        />
      </div>
      <template v-if="$v.cijena.$error">
        <div class="error" v-if="!$v.cijena.required">
          Field is required
        </div>
        <div class="error" v-if="!$v.cijena.numeric">
          You need to enter numerical value
        </div>
        <tree-view
          :data="$v.sifra"
          :options="{ rootObjectKey: '$v.sifra', maxDepth: 2 }"
        ></tree-view
      ></template>

      <div
        class="form-group"
        :class="{ 'form-group--error': $v.tipOglasa.$error }"
      >
        <label for="exampleFormControlSelect1">Tip oglasa</label>
        <select
          class="form-control form__input"
          v-model.trim="$v.tipOglasa.$model"
          id="exampleFormControlSelect1"
          @change="uzmiTipOglasa"
        >
          <option>Prodaja</option>
          <option>Izdavanje</option>
          <option>Zamjena</option>
        </select>
      </div>
      <template v-if="$v.tipOglasa.$error">
        <div class="error" v-if="!$v.tipOglasa.required">
          Field is required
        </div>

        <tree-view
          :data="$v.sifra"
          :options="{ rootObjectKey: '$v.tipOglasa', maxDepth: 2 }"
        ></tree-view
      ></template>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.vrstaNekretnine.$error }"
      >
        <label for="exampleFormControlSelect1">Tip nekretnine</label>
        <select
          class="form-control form__input"
          v-model.trim="$v.vrstaNekretnine.$model"
          id="exampleFormControlSelect1"
          @change="uzmiVrstuNekretnine"
        >
          <option>Plac</option>
          <option>Stan</option>
          <option>Kuca</option>
          <option>Garaza</option>
        </select>
      </div>
      <template v-if="$v.vrstaNekretnine.$error">
        <div class="error" v-if="!$v.vrstaNekretnine.required">
          Field is required
        </div>

        <tree-view
          :data="$v.tipOglasa"
          :options="{ rootObjectKey: '$v.vrstaNekretnine', maxDepth: 2 }"
        ></tree-view
      ></template>
      <div class="form-group" :class="{ 'form-group--error': $v.grad.$error }">
        <label for="exampleFormControlSelect1">Grad</label>
        <select
          class="form-control form__input"
          v-model.trim="$v.grad.$model"
          id="exampleFormControlSelect1"
          @change="uzmiGrad"
        >
          <option v-for="grad in gradovi" :key="grad.id">{{ grad }}</option>
        </select>
      </div>
      <template v-if="$v.grad.$error">
        <div class="error" v-if="!$v.grad.required">
          Field is required
        </div>

        <tree-view
          :data="$v.sifra"
          :options="{ rootObjectKey: '$v.grad', maxDepth: 2 }"
        ></tree-view
      ></template>
      <div class="form-group">
        <label for="exampleFormControlInput4">Address</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput44"
          placeholder="Ulica bb"
          v-model="adresa"
        />
      </div>
      <div class="form-group">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Prevodi</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Translation</v-card-title>
              <v-col cols="12" md="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Ruski prevod"
                  v-model="ruski"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Engleski prevod"
                  v-model="engleski"
                ></v-textarea>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false"
                  >Disagree</v-btn
                >
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                  :disabled="ruski.length < 50 && engleski.length < 50"
                  >Agree</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <label for="exampleFormControlTextarea1">Opis</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="srpski"
        ></textarea>
      </div>
      <!-- <button
        type="submit"
        class="btn btn-primary mb-2"
        :disabled="submitStatus === 'PENDING'"
      >
        Kreiraj novu nekretninu
      </button> -->
      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
  </div>
</template>
<script>
import $ from 'jquery';
import { required, numeric } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      ruski: '',
      engleski: '',
      srpski: '',
      dialog: false,
      loading3: false,
      sifra: '',
      povrsina: '',
      cijena: 0,
      tipOglasa: '',
      grad: '',
      adresa: '',
      opis: '',
      slika: [
        'http://realestate360.me/wp-content/uploads/2018/02/1-4-835x467.jpg'
      ],
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
      ],
      vrstaNekretnine: '',
      submitStatus: null
    };
  },
  validations: {
    sifra: {
      required
    },
    povrsina: {
      required,
      numeric
    },
    cijena: {
      required,
      numeric
    },
    tipOglasa: {
      required
    },
    grad: {
      required
    },
    slika: {
      required
    },
    vrstaNekretnine: {
      required
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  methods: {
    submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING';
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
      }
    },
    uzmiTipOglasa(event) {
      this.tipOglasa = event.target.value;
    },
    uzmiGrad(event) {
      this.grad = event.target.value;
    },
    uzmiVrstuNekretnine(event) {
      this.vrstaNekretnine = event.target.value;
    },
    dodajNekretninu() {
      const opis = {
        srpski: this.srpski,
        engleski: this.engleski,
        ruski: this.ruski
      };
      const novaNekretnina = {
        AuxID: this.sifra,
        Cena: this.cijena,
        DeoGrada: this.adresa,
        Grad: this.grad,
        Slika: this.slika,
        Opis: opis,
        Drzava: 'Crna Gora',
        Status: 'Aktivan',
        TipOglasa: this.tipOglasa,
        Valuta: 'EUR',
        VrstaNekretnine: this.vrstaNekretnine,
        Ukupnapovršina: this.povrsina
      };
      // this.$store.dispatch('novaNekretnina', novaNekretnina);
      this.$store.commit('setTempNekretnina', novaNekretnina);
    },
    toggleTranslations() {
      $('#myModal').modal('toggle');
    }
  }
};
</script>
<style></style>
