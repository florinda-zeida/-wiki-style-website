import React from 'react';
import Heading from "../layout/headings/Heading";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import StyledBtn from '../layout/button/StyledBtn';



const Home = () => {
    return (
      <>
      <Container className="container_home">
      <Heading content="Welcome to Style Wiki Blog" />
      <p>Hi, my name is Florinda, Welcome you to my blog!</p>
      <p>   
        This practical guide shows you some examples of how to build syntax and elements for a site.
      </p>
      <Link to={`/blog`}>
      <StyledBtn className="btn">View my Posts</StyledBtn>
    </Link>

    </Container>
    </>
    );
};
export default Home;