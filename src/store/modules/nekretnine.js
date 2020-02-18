import firebase from 'firebase';
// import router from '../../router';
// import router from '@/router/index.js';
// import { Trans } from '@/plugins/Translation';
const state = {
  nekretnine: [],
  nekretnina: {},
  lastVisible: {},
  size: false,
  tempNekretnina: {},
  tmpImages: []
};

const getters = {
  getNekretnine(state) {
    return state.nekretnine;
  },
  getNekretnina(state) {
    return state.nekretnina;
  },
  getSize(state) {
    return state.size;
  },
  getTempNekretnina(state) {
    return state.tempNekretnina;
  },
  getTempSlika(state) {
    return state.tmpImages;
  }
};

const mutations = {
  setNekretnine(state, payload) {
    state.nekretnine = payload;
  },
  setNekretnina(state, payload) {
    state.nekretnina = payload;
  },
  setLastVisible(state, payload) {
    state.lastVisible = payload;
  },
  addToNekretnine(state, payload) {
    state.nekretnine.push(payload);
  },
  setSize(state, payload) {
    state.size = payload;
  },
  setTempImages(state, payload) {
    state.tmpImages.push(payload);
  },
  setTempNekretnina(state, payload) {
    state.tempNekretnina = payload;
  }
};

const actions = {
  takeAllNekretnine({ commit }, payload) {
    commit('setLoading', true);
    var array = [];
    var query = payload
      ? firebase
          .firestore()
          .collection('nekretnine')
          .startAfter(state.lastVisible)
          .limit(3)
      : firebase
          .firestore()
          .collection('nekretnine')
          .limit(3);
    query.get().then(snapshot => {
      if (snapshot.docs.length > 0) {
        commit('setSize', true);
      } else {
        commit('setSize', false);
      }
      commit('setLastVisible', snapshot.docs[snapshot.docs.length - 1]);
      snapshot.docs.forEach(item => {
        array.push(item.data());
        if (payload) {
          commit('addToNekretnine', item.data());
        }
      });
      if (!payload) commit('setNekretnine', array);
      commit('setLoading', false);
    });
  },
  filterRealEstates({ commit }, payload) {
    var array = [];
    var query = firebase.firestore().collection('nekretnine');
    if (payload.type) {
      query = query.where('VrstaNekretnine', '==', payload.type);
    }
    if (payload.city) {
      query = query.where('Grad', '==', payload.city);
    }
    if (payload.typeOglasa) {
      query = query.where('TipOglasa', '==', payload.typeOglasa);
    }
    commit('setLoading', true);
    query =
      payload && payload.loadMore ? query.startAfter(state.lastVisible) : query;
    query.get().then(snapshot => {
      if (snapshot.docs.length > 0) {
        commit('setSize', true);
      } else {
        commit('setSize', false);
      }
      commit('setLastVisible', snapshot.docs[snapshot.docs.length - 1]);
      snapshot.docs.forEach(item => {
        if (
          payload.priceFrom <= item.data().Cena &&
          item.data().Cena <= payload.priceTo
        ) {
          array.push(item.data());
        }
        if (payload.loadMore) commit('addToNekretnine', item.data());
      });
      if (!payload.loadMore) commit('setNekretnine', array);
      commit('setLoading', false);
    });
  },
  sendToNekretninaView({ commit }, payload) {
    console.log(payload);
    commit('setNekretnina', payload);
    // Trans.i18nRoute({ params: { path: 'en/nekretnina/' + payload.AuxID } });
    // router.push('/nekretnina/' + payload.AuxID);
  },
  novaNekretnina({ commit }, payload) {
    commit('setLoading', true);
    firebase
      .firestore()
      .collection('nekretnine')
      .add(payload);
    commit('setLoading', false);
  },
  getNekretnina({ commit }, payload) {
    commit('setLoading', true);
    var items = [];
    firebase
      .firestore()
      .collection('nekretnine')
      .where('AuxID', '==', payload)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          items.push(item.data());
        });
        commit('setNekretnina', items[0]);
        commit('setLoading', false);
      });
  },
  addNekretninaImages({ commit }, payload) {
    console.log(payload.image);
    const imgFile = payload.image;
    const ext = imgFile.name.slice(imgFile.name.lastIndexOf('.'));
    const folder = payload.folder;
    commit('setLoading', true);
    if (payload.images.length > 1) {
      payload.images.forEach((item, index) => {
        const ext = item.name.slice(item.name.lastIndexOf('.'));
        return firebase
          .storage()
          .ref(folder + '/' + index + ext)
          .put(item)
          .then(() => {
            var urlImage = '';
            firebase
              .storage()
              .ref(folder + '/' + index + ext)
              .getDownloadURL()
              .then(downloadURL => {
                urlImage = downloadURL;
                commit('setTempImages', urlImage);
                commit('setLoading', false);
              });
          });
      });
    } else {
      return firebase
        .storage()
        .ref(folder + '/name1' + ext)
        .put(imgFile)
        .then(fileData => {
          console.log(fileData);
          var urlImage = '';
          firebase
            .storage()
            .ref(folder + '/name1' + ext)
            .getDownloadURL()
            .then(downloadURL => {
              urlImage = downloadURL;
              commit('setTempImages', urlImage);
              commit('setLoading', false);
            });
        });
    }
  }
  // addNekretnine({ commit }, payload) {
  // 	var array = payload;
  // 	array.forEach((element) => {
  // 		firebase.firestore().collection('nekretnine').add(element);
  // 	});
  // 	commit('setNekretnine', array);
  // }
};

export default {
  state,
  getters,
  mutations,
  actions
};
