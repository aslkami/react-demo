import { gql } from "apollo-boost";
import { addItemToCart, getItemCount } from "./cart.utils";

// 列举突变的字段， resolver 是触发突变的行为
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: [item]!): [item]!
  }
`;

// @client 告诉 apollo 从本地 获取数据
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// _root 如果有父级， 则不为空
// _args 传递的参数  variables: xxxx
// _context 获取客户端的内容， 如 常用的  cache
// _info 展示突变查询信息， 基本不需要
export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      // cartHidden 不必写入数据库 所以从 本地读取
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      // 写入缓存
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },
    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getItemCount(newCartItems) }
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      });
    }
  }
};
