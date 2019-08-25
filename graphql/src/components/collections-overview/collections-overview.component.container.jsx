import { gql } from "apollo-boost";
import React from "react";
import { Query } from "react-apollo";
import Spinner from "./../spinner/spinner.component";
import CollectionsOverview from "./collections-overview.component";

const GET_COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionOverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {({ loading, data }) => {
      if (loading) return <Spinner></Spinner>;
      return (
        <CollectionsOverview
          collections={data.collections}
        ></CollectionsOverview>
      );
    }}
  </Query>
);

export default CollectionOverviewContainer;
