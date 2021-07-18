import Heading from '../layout/headings/Heading';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import ErrorMessage from '../../common/error/ErrorMessage';
import CardGroup from '../layout/card/CardGroup';
import { Link } from 'react-router-dom';
import StyledBtn from '../layout/button/StyledBtn';
import Card from 'react-bootstrap/Card';
import Paragraph from '../layout/headings/Paragraph';
import { BASE_URL } from "../../constants/api";
import { PAGE_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const urlPosts = BASE_URL + PAGE_PATH;

const Blog = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [counter, setCounter] = useState(0);
  const [filtered, setFiltered] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    setFiltered(value);
    let result = [];
    console.log(value, allData, filteredData);

    result = allData.filter((data) => {
      return data.title.rendered.search(value) != -1;
    });
    setCounter(result.length);
    setFilteredData(result);
  };

  useEffect(() => {
  
    async function getPosts() {
      try {
        const response = await axios.get(urlPosts);
        setAllData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  if (loading) return <Spinner className="spinner" animation="border" variant="success" />;
	if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <>
        <Container>
          <Heading content=" Welcome to Style Wiki" />
        </Container>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          onChange={(event) => handleSearch(event)}
        />
      </Form>
      {filtered.length !== 0 && <div>no of posts: {counter}</div>}

      <CardGroup>
        {filteredData.map((posts) => (
          <Card className="card_post" key={posts.id}>
            <Card.Img variant="top" src={posts.featured_media_src_url} alt="" />
            <Card.Body>
              <Card.Title>{posts.title.rendered}</Card.Title>
              <Card.Text>
                <Paragraph
                  dangerouslySetInnerHTML={{ __html: posts.excerpt.rendered }}
                />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={`/detail/${posts.id}`}>
                <StyledBtn className="btn">View more</StyledBtn>
              </Link>
              {auth && (
                <Link to={`/admin/edit/${posts.id}`}><StyledBtn className="btn btn_post">Edit Post</StyledBtn></Link>
              )}
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </>
  );
};

export default Blog;
