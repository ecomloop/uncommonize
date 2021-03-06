import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Header, BlogList } from 'components';
import { Layout } from 'layouts';
import _ from 'lodash';
import { useMediaQuery } from 'react-responsive'

const ShopsWrapper = styled.div`
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

const TableWrapper = styled.div`
  width: 100%;
  height: 800px;
`;

const StickyTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const TableStickyHeader = styled.table`
  display: table;

  thead {
    display: table-header-group;
  }

  thead>tr {
    display: table-row;
  }

  thead>tr>th {
    position: sticky;
    display: table-cell;
    top: 0px;
    white-space: nowrap;
    z-index: 2;
    width: auto;
    background-color: white;
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
  }

  tbody>tr>td {
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
  }
`;

const AmazonAlternatives = ({ data }) => {
  const { edges } = data.allMysqlMainView;
  const maxItems = 12;
  const [limit, setLimit] = React.useState(maxItems);
  const [showMore, setShowMore] = React.useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const increaseLimit = () => {
    setLimit(limit + maxItems);
  }

  const rowDataViewEdges = data.allMysqlDataView.edges;
  const combinedEdges = [];

  //Creating a new dataset with original nodes and required columns from DataView
  edges.map((edge) => {
    const inputID = edge.node.AlexaURL;
    //filter to show only shops with DataView . AlexaCountry = United States
    var resultData = _.filter(rowDataViewEdges, ({ node }) => (node.AlexaURL == inputID && node.AlexaCountry == "United States"))
    var firstDataRow = null;
    if (resultData.length > 0) {
      firstDataRow = resultData[0]
      let newNode = {
        ...edge.node,
        ...firstDataRow.node
      }
      combinedEdges.push(newNode);
    }
  })

  //Now sorting (asc) based on LocalRank
  var sortedEdges = _.sortBy(combinedEdges, obj => -obj.FollowerRate)

  //Now limiting the items as per limit
  const listEdges = _.slice(sortedEdges, 0, limit)

  const defaultImageOnError = (e) => { e.target.src = "https://source.unsplash.com/100x100/?abstract," + (Math.random() * 1000) }

  const renderProfilePicURL = (node) => {
    if (node.mysqlImages && node.mysqlImages.length > 0) {
      return (
        <Image fluid={node.mysqlImages[0].childImageSharp.fluid} style={{ width: "50px", margin: '0px' }} title={node.about} alt={node.about} />
      );
    } else if (node.ProfilePicURL) {
      return (
        <img src={node.ProfilePicURL} className="profileimage" onError={defaultImageOnError} style={{ width: "50px", margin: '0px' }} title={node.about} alt={node.about} />
      );
    } else {
      return (
        <img src={"https://source.unsplash.com/100x100/?abstract," + (Math.random() * 1000)} className="profileimage" style={{ width: "50px", margin: '0px' }} title={node.about} alt={node.about} />
      );
    }
  }

  return (
    <Layout title={'Amazon Alternatives for Online Shopping'} description='Discover amazing alternatives to the Amazon marketplace. Find amazon alernatives. Shop directly to support independent online stores.' >
      <Header title="🧐 Discover great Amazon alternatives for online shopping" subtitle=""></Header>

      <ShopsWrapper>
        <div className="intro_text">
          <h3>Browse shopping alternatives to Amazon</h3>
          <p>Independent online shops offer great amazon alternatives for shopping directly</p>
        </div>
        <TableWrapper>
          <StickyTableWrapper>
            <TableStickyHeader>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Store</th>
                  {!isMobile &&
                    <>
                      <th></th>
                      <th>TrafficRank</th>
                    </>
                  }
                  <th>FollowerRate</th>
                  {!isMobile &&
                    <>
                      <th>Pinterest</th>
                      <th>Instagram</th>
                      <th>Twitter</th>
                      <th>Facebook</th>
                      <th>Tiktok</th>
                      <th>Youtube</th>
                    </>
                  }
                </tr>
              </thead>
              <tbody>
                {listEdges.map((node, index) => (
                  <tr key={index} id={`post-${index}`}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/shops/${node.UserName}/`}>
                        {renderProfilePicURL(node)}
                      </Link>
                    </td>
                    {!isMobile &&
                      <>
                        <td><Link to={`/shops/${node.UserName}/`}>{node.name}</Link></td>
                        <td>{node.LocalRank}</td>
                      </>
                    }
                    <td>{node.FollowerRate}</td>
                    {!isMobile &&
                      <>
                        <td>{node.PinFollowers || "-"}</td>
                        <td>{node.FollowersCount || "-"}</td>
                        <td>{node.TwitterFollowers || "-"}</td>
                        <td>{node.FBLikes || "-"}</td>
                        <td>{node.TTFollowers || "-"}</td>
                        <td>{node.YTSubs || "-"}</td>
                      </>
                    }
                  </tr>
                ))}
              </tbody>
            </TableStickyHeader>
          </StickyTableWrapper>
        </TableWrapper>

      </ShopsWrapper>
      {showMore && listEdges.length > 0 && listEdges.length < edges.length &&
        <div className="center">
          <button className="button" onClick={increaseLimit}>
            Load More
          </button>
        </div>
      }
      <ShopsWrapper>
        <div className="intro_text">
          <h3>Discover the best Amazon marketplace alternatives for shoppping online</h3>
          <p>Find some of the best anti-amazon shops and avoid the hassle of looking for amazon customer service.</p><p>Search for great Amazon shopping alternatives in header or <a href="/randomshop">discover a shop</a>.</p>
          <h3>What makes a great alternative to the Amazon marketplace?</h3>
          <p>The shops on this list are sell directly to customers via their online stores. Most offer free shipping, which is one of the major Amazon prime beneifts.</p>
          <h3>How are the stores ranked?</h3>
          <p>The stores are ranked based upon their SocialScore and overall web rank. The social score is derived from factors such as followers, fans, and activity on social media accounts. Web rank is based upon the websites estimated search engine ranking, as well as average time on site by visitors.</p>
          <h3>Is this an anti-Amazon shopping list?</h3>
          <p>This list of shopping alternatives is not intended to be anti-Amazon, per se. It exists to help find alternatives that consumers may not yet be aware.</p>
        </div>
      </ShopsWrapper>
    </Layout>
  );
};

export default AmazonAlternatives;

export const query = graphql`
  query {
    allMysqlMainView {
      edges {
        node {
          AlexaURL
          UserName
          FBLikes
          PinFollowers
          TTFollowers
          TwitterFollowers
          YTSubs
          name
          about
        }
      }
    }
    allMysqlDataView {
      edges {
        node {
          UserName
          FullName
          PostDate
          AlexaCountry
          AlexaURL
          PhotoLink
          PostsCount
          FollowersCount
          FollowingCount
          GlobalRank
          LocalRank
          TOS
          ProfilePicURL
          mysqlImages {
            childImageSharp {
              fluid(srcSetBreakpoints: [200, 400]) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          Caption
          ShortCodeURL
          FollowerRate
          PostRate
          activity
        }
      }
    }
  }
`;
