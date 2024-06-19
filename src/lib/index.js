import Account from './Account'

const components = [
  Account,
]

const install = (app) => {
  components.forEach(component => {
    if (typeof component === 'function' && typeof component === 'string') {
      app.component(`u-${component.normalize.toLowerCase()}`, component)
    } else if (component && typeof component.name === 'string') {
      app.component(component.name, component)
    } else if (component && typeof component.install === 'function') {
      app.use(component)
    } else {
      console.log('没有可以注册的组件', component)
    }
  })
}

export {
  install,
  Account
}