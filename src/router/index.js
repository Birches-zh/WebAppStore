import Vue from 'vue'
import Router from 'vue-router'
// import Home from 'pages/home'
// import Cart from 'pages/cart'
// import Category from 'pages/category'
// import Personal from 'pages/personal'
// import Search from 'pages/search'
// import Product from 'pages/product'
Vue.use(Router)
//children是二级路由的写法，用数组是因为可能不止一个二级路由，注意，二级路由的path不加/
const routes = [
  {
    name:'home',
    path:'/home',
    // component:Home,
    // 实现懒加载，只有点击页面的时候才加载，提升性能
    component:() => import('pages/home'),
    children: [
      {
      name: 'home-product',
      path: 'product/:id',
      // component: Product
      component:() => import('pages/product'),
      }
    ]
  },
  {
    name:'cart',
    path:'/cart',
    // component:Cart
    component:() => import('pages/cart'),
  },
  {
    name:'category',
    path:'/category',
    // component:Category
    component:() => import('pages/category'),
  },
  {
    name:'personal',
    path:'/personal',
    // component:Personal
    component:() => import('pages/personal'),
  },
  {
    name:'search',
    path:'/search',
    // component:Search
    component:() => import('pages/search'),
  },
  //这里是防止用户随便输入地址，自动跳转成首页
  {
    path:'*',
    redirect:'/home'
  }
];
export default new Router({
  //因为前面写了const 在ES6写法这里就直接routes
  routes
})
