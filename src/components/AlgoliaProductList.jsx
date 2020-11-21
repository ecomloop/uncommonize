import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import AlgoliaProductItem from './AlgoliaProductItem'
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/algolia.css';

const SearchWrapper = styled.div`
  width: 100vw;  
`;

const LeftPanel = styled.div`
  float: left;
  width: 250px;

  .ais-ClearRefinements-button {
    background-color: #C04CFD;
  }

  .ais-RefinementList-item {
    margin-bottom: 0px;
  }

  .ais-RefinementList-labelText {
    margin-left: 5px;
    font-size: 0.8rem;
  }

  .ais-RefinementList-count {
    font-size: 0.6rem;
  }
`;

const RightPanel = styled.div`
  margin-left: 260px;
  @media (max-width: 700px) {
    margin-left: 0px;
    display: block;
  }

  .ais-Hits-item, .ais-Results-item {
    width: calc(20% - 1rem);
    @media (max-width: 700px) {
      width: calc(50% - 1rem);
    } 
  }

  .ais-Pagination-item--selected .ais-Pagination-link {
    color: #FFF;
    background-color: #C04CFD;
    border-color:#C04CFD
  }

  .ais-Pagination-item--disabled .ais-Pagination-link {
    color: #a5abc4;
  }

  ais-Breadcrumb-link, .ais-HierarchicalMenu-link, .ais-Menu-link, .ais-Pagination-link, .ais-RatingMenu-link {
    color:#C04CFD
  }
`;

const FilterHeading = styled.div `
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 8px 0 5px 0
`;

const AlgoliaProductList = () => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );
  const searchIndexName = `empProducts`;

  return (
    <SearchWrapper>
      <InstantSearch indexName={searchIndexName} searchClient={searchClient}>
        <LeftPanel>
          <ClearRefinements />
          <FilterHeading>Category</FilterHeading>
          <RefinementList attribute="shopCategory" />
          <FilterHeading>Brands</FilterHeading>
          <RefinementList attribute="shopName" />
          <Configure hitsPerPage={10} />
        </LeftPanel>
        <RightPanel>
          <SearchBox />
          <Hits hitComponent={AlgoliaProductItem} />
          <Pagination />
        </RightPanel>
      </InstantSearch>
    </SearchWrapper>
  );
}

export default AlgoliaProductList;