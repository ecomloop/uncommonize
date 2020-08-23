import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, PostList } from 'components';
import HomeCarouselItem from '../components/HomeCarouselItem';
import { Layout } from 'layouts';
import Search from 'components/search';
import _ from 'lodash';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PostSectionHeading = styled.h1`
  margin-left: 4rem;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const ShopSectionHeading = styled.h1`
  margin-left: 4rem;
`;

const ShopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const CarouselWrapper = styled.div`
  margin: 1rem 4rem 1rem 3rem;
  @media (max-width: 1000px) {
    margin: 1rem;
  }
  @media (max-width: 700px) {
    margin: 1rem;
  }
`;

const Index = ({ data }) => {
  const { edges } = data.allMysqlMainView;
  const maxItems = 25;
  const [limit, setLimit] = React.useState(maxItems);
  const [showMore, setShowMore] = React.useState(true);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const increaseLimit = () => {
    setLimit(limit + maxItems);
  }

  const searchIndices = [
    { name: `uncommonry`, title: `Shops`, type: `shopHit` },
  ]

  const rowDataViewEdges = data.allMysqlDataView.edges;
  const combinedEdges = [];

  //Creating a new dataset with original nodes and required columns from DataView
  edges.map((edge) => {
    let newNode = {
      name: edge.node.name,
      slug: edge.node.UserName,
      about: edge.node.about,
      instagramname: edge.node.UserName,
      ...edge.node
    }
    combinedEdges.push(newNode);

  })

  //Now sorting (desc) based on FollowerRate
  var sortedEdges = _.sortBy(combinedEdges, obj => -obj.FollowerRate)

  //Now limiting the items as per limit
  const listEdges = _.slice(sortedEdges, 0, limit)

  const featuredShopEdges = _.filter(edges, ({ node }) => node.tags && node.tags.indexOf("featured") >= 0)
  const combinedFeatureShopEdges = [];
  //Creating a new dataset with original nodes and required columns from DataView
  featuredShopEdges.map((edge) => {
    let newNode = {
      slug: edge.node.UserName,
      instagramname: edge.node.UserName,
      ...edge.node
    }
    combinedFeatureShopEdges.push(newNode);
  })
  console.log(combinedFeatureShopEdges)

  return (
    <Layout title={'emprezzo | Discover the best online shopping sites & direct-to-consumer brands'} description="Discover the best online shopping sites & direct to consumer brands." >
      <Header title="Discover the best online shopping sites"></Header>

      {/* <p className="center"><a href ="/randomshop" className="button button">Discover a  shop</a></p> */}
      <div className="center">
        🧐 Discover the best online shopping sites<br />🛒 Shop direct-to-consumer brands<br/>

      </div>
      <div className="center">

          <a href="/randomshop/" className="button ">Discover a shop</a>
      </div>
      <div className="search_main">
        <Search collapse homepage indices={searchIndices} />
      </div>


      <CarouselWrapper>
      <h3>Featured Shops</h3>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          keyBoardControl={true}
        >
          {combinedFeatureShopEdges.map((node, index) => (
            <HomeCarouselItem
              id={`post-${index}`}
              key={index}
              path={`/shops/${node.UserName}`}
              title={node.name}
              cover={node.ProfilePicURL}
              excerpt={node.about && node.about.substring(0, 40) + "..."}
            />
          ))}
        </Carousel>
      </CarouselWrapper>



      <CarouselWrapper>
      <h3>Popular Shopify stores</h3>
      Discover some of the <a href="/top-shopify-stores">top Shopify stores</a> by social medial follower counts
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          keyBoardControl={true}
        >
          {listEdges.map((node, index) => (
            <HomeCarouselItem
              id={`post-${index}`}
              key={index}
              path={`/shops/${node.slug}`}
              title={node.name}
              cover={node.ProfilePicURL}
              excerpt={node.about && node.about.substring(0, 40) + "..."}
            />
          ))}
        </Carousel>
      </CarouselWrapper>

      <ShopWrapper>
        <h3>Discover the best online shopping sites at Emprezzo</h3>
        <p>There are endless options when shopping online, yet nothing seems like the right fit. Discover the best direct to consumer brands at Emprezzo.</p>

        <h3>What's the benefit of shopping direct-to-consumer brands?</h3>
        <p>Direct to consumers stores connect diretly with their customer, which helps reduce costs paid to large reatilers and makertplaces. Marketplaces typically charge sellers for marketing, fulfillment, commission, and additional fees making it hard for stores to turn a profit without increasing costs.</p>
        <h3>What are the best online shopping sites?</h3>
        <p>Our lists are compiled based on thousands of data points from social media platforms, trafic data, API tools, and our own research. We present our findings and listed based upon the data retreived. </p>
      </ShopWrapper>
    </Layout >
  );
};

export default Index;


export const query = graphql`
  query {
    allMysqlDataView {
      edges {
        node {
          UserName
          PostDate
          AlexaCountry
          UniquePhotoLink
          PostsCount
          FollowersCount
          FollowingCount
          GlobalRank
          LocalRank
          TOS
          ProfilePicURL
          Caption
          ShortCodeURL
          FollowerRate
          PostRate
          activity
          AlexaURL
        }
      }
    }

    allMysqlMainView {
      edges {
        node {
          AlexaURL
          Facebook
          FollowerRate
          GlobalRank
          Instagram
          LocalRank
          Pinterest
          PostRate
          ProfilePicURL
          TOS
          TikTok
          Twitter
          UserID
          UserName
          YouTube
          activity
          category
          tags
          FullName
          Biography
          name
          about
        }
      }
    }
  }
`;
