import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '../router'

Vue.use(AclInstaller)

export default new AclCreate({
  initial: 'unauthenticated',
  notfound: '/error',
  router,
  acceptLocalRules: true,
  globalRules: {
    isAuthenticated: new AclRule('authenticated').generate(),
    isUnauthenticated: new AclRule('unauthenticated').generate()
  }
})
