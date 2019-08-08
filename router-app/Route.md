### 路由

> 路由匹配 / 和 /products 属于包含关系，即访问 /products 会把 / 的视图也展示出来

- `/` 路由加个 `exact` 属性，`<Route exact path="/">`
- `Route` 外层加一个 `Switch` 标签， `<Switch><Route path="/"></Switch>`
- `<Redirect />`如果匹配不到路径， 会匹配 `/`目录， 此时需要加上 `exact` 属性

#### 路由传参

1. `<Route path="/Products" component={Products} />` => `<Route path="/Products" render={ props => <Products sortBy="newest" {...props}/>} />`

#### 路由顺序

1. `/movies/:id` 需要在 `/movies` 上面有先写
