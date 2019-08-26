import { gql } from "apollo-boost";
import React from "react";
import { Mutation, Query } from "react-apollo";
import CartIcon from "./cart-icon.component";

// 相当于传递 resolver 里面传递的方法， 和 redux的 里传递 action 机制差不多
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  query {
    itemCount @client
  }
`;

const CartIconContainer = () => {
  return (
    <Query query={GET_ITEM_COUNT}>
      {({ data: { itemCount } }) => (
        <Mutation mutation={TOGGLE_CART_HIDDEN}>
          {toggleCartHidden => (
            <CartIcon
              toggleCartHidden={toggleCartHidden}
              itemCount={itemCount}
            />
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default CartIconContainer;

// 下面的用法报错
// import { compose, graphql } from "react-apollo";
// Attempted import error: 'compose' is not exported from 'react-apollo'.

/* const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
  return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />;
};

export default compose(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: "toggleCartHidden" })
)(CartIconContainer); */
