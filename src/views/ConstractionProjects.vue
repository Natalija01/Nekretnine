<template>
  <div>
    <div class="fluid-container">
      <SlideConstraction></SlideConstraction>
    </div>
    <div class="container">
      <div class="constractionProjects">
        <h1 class="mb-3 mt-3" style="text-align: left; ">
          {{ $t('constructionpage.title') }}
        </h1>
        <div class="card-group">
          <div class="card">
            <router-link :to="$i18nRoute({ name: 'project1' })">
              <img
                src="http://realestate360.me/imperijaImg/TProject1.PNG"
                class="card-img-top"
                alt="..."
            /></router-link>
            <div class="card-body">
              <h5 class="card-title">{{ $t('constructionpage.project1') }}</h5>
            </div>
          </div>
          <div class="card">
            <router-link :to="$i18nRoute({ name: 'project2' })">
              <img
                src="http://realestate360.me/imperijaImg/project2.PNG"
                class="card-img-top"
                alt="..."
            /></router-link>
            <div class="card-body">
              <h5 class="card-title">{{ $t('constructionpage.project2') }}</h5>
            </div>
          </div>
          <div class="card">
            <router-link :to="$i18nRoute({ name: 'project3' })">
              <img
                src="http://realestate360.me/imperijaImg/project3.PNG"
                class="card-img-top"
                alt="..."
            /></router-link>
            <div class="card-body">
              <h5 class="card-title">{{ $t('constructionpage.project3') }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="card-group">
        <div class="card">
          <router-link :to="$i18nRoute({ name: 'project4' })">
            <img
              src="http://realestate360.me/imperijaImg/project4.PNG"
              class="card-img-top"
              alt="..."
          /></router-link>
          <div class="card-body">
            <h5 class="card-title">{{ $t('constructionpage.project4') }}</h5>
          </div>
        </div>
        <div class="card">
          <router-link :to="$i18nRoute({ name: 'project5' })">
            <img
              src="http://realestate360.me/imperijaImg/project5.PNG"
              class="card-img-top"
              alt="..."
          /></router-link>
          <div class="card-body">
            <h5 class="card-title">{{ $t('constructionpage.project5') }}</h5>
          </div>
        </div>
        <div class="card">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideConstraction from '@/components/SlideConstraction.vue';
export default {
  components: {
    SlideConstraction
  }
};
</script>

<style scoped>
.card:hover .card-img-top {
  opacity: 0.7;
}
</style>
