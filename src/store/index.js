import { createStore } from 'vuex'
import auth from './module/auth'
import options from './module/options'

export default createStore({
  modules: {
    auth,
    options,
  }
})