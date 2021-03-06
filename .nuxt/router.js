import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7da02162 = () => import('../pages/search/search.vue' /* webpackChunkName: "pages/search/search" */).then(m => m.default || m)
const _1448dd0d = () => import('../pages/food/foodList.vue' /* webpackChunkName: "pages/food/foodList" */).then(m => m.default || m)
const _114277a3 = () => import('../pages/food/foodDetails.vue' /* webpackChunkName: "pages/food/foodDetails" */).then(m => m.default || m)
const _4f0f29d0 = () => import('../pages/food/foodDetailsParamList.vue' /* webpackChunkName: "pages/food/foodDetailsParamList" */).then(m => m.default || m)
const _7c7202b2 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/search/search",
			component: _7da02162,
			name: "search-search"
		},
		{
			path: "/food/foodList",
			component: _1448dd0d,
			name: "food-foodList"
		},
		{
			path: "/food/foodDetails",
			component: _114277a3,
			name: "food-foodDetails"
		},
		{
			path: "/food/foodDetailsParamList",
			component: _4f0f29d0,
			name: "food-foodDetailsParamList"
		},
		{
			path: "/",
			component: _7c7202b2,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
