<template>
  <v-container>
    <v-row no-gutters v-if="getTempSlika && getTempSlika.length > 0">
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(img, i) in getTempSlika" :key="i" :src="img">
          <v-btn small color="error" @click="deleteImage(i)"
            >Delete Image</v-btn
          >
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row no-gutters>
      <input
        type="file"
        ref="authorAvatar"
        accept="image/*"
        @change="onFilePicked"
        multiple
      />
      <v-btn
        :loading="loading3"
        :disabled="loading3"
        color="blue-grey"
        class="ma-2 white--text"
        @click="loader = 'loading3'"
      >
        Upload
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loading3: false,
      images: [],
      image: ''
    };
  },
  created() {
    var editMode = false;
    editMode =
      this.getEditNekretnine && this.getEditNekretnine.AuxID ? true : false;
    if (editMode) {
      this.getEditNekretnine.Slika.forEach(item => {
        this.$store.commit('setTempImages', item);
      });
    }
  },
  methods: {
    onFilePicked(event) {
      const files = event.target.files;
      this.images = files.length > 0 ? files : [];
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
        // return this.imageUrl
      });
      // console.log(this.imageUrl)
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      this.$store.dispatch('addNekretninaImages', {
        image: this.image,
        folder: this.getTempNekretnina.AuxID,
        images: this.images
      });
    },
    read(image) {
      const fileReader = new FileReader();
      return fileReader.readAsDataURL(image);
    },
    deleteImage(index) {
      this.getTempSlika.splice(index, 1);
    }
  },
  computed: {
    getTempNekretnina() {
      return this.$store.getters.getTempNekretnina;
    },
    getTempSlika() {
      return this.$store.getters.getTempSlika;
    },
    getEditNekretnine() {
      return this.$store.getters.getEditNekretnina;
    }
  }
};
</script>
<style></style>
