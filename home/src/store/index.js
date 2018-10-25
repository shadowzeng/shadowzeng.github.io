import Vuex from 'vuex'
import Vue from 'vue'
import {mainNavRoutes} from '../router'

Vue.use(Vuex)

const state = {
    mainNavData: mainNavRoutes
}

const mutations = {
    loadingDone(state){
        state.loading = !state.loading
    },
    aboutMeData(state, data){
        state.aboutMe = data
    },
    lablesData(state, data){
        state.labels = data
    },
    articleListData(state, data){debugger
        state.articleList = data
    },
    totalData(state, data){
        state.total = data
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store