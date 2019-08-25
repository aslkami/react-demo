import { gql } from "apollo-boost";
import React from "react";
import { Query } from "react-apollo";
import Spinner from "./../../components/spinner/spinner.component";
import Collection from "./collection.component";

const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CollectionContainer = ({ match }) => {
  return (
    <Query
      query={GET_COLLECTIONS_BY_TITLE}
      variables={{ title: match.params.collectionId }}
    >
      {({ loading, data: { getCollectionsByTitle } }) => {
        if (loading) return <Spinner></Spinner>;
        return <Collection collection={getCollectionsByTitle}></Collection>;
      }}
    </Query>
  );
};

export default CollectionContainer;
