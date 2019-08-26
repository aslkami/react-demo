import { gql } from "apollo-boost";
import React from "react";
import { Mutation, Query } from "react-apollo";
import CartDropdown from "./cart-dropdown.component";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CartDropdownContainer = () => {
  return (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
      {toggleCartHidden => {
        return (
          <Query query={GET_CART_ITEMS}>
            {({ data: { cartItems } }) => {
              return (
                <CartDropdown
                  toggleCartHidden={toggleCartHidden}
                  cartItems={cartItems}
                />
              );
            }}
          </Query>
        );
      }}
    </Mutation>
  );
};

export default CartDropdownContainer;
