import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import Spinner from 'react-bootstrap/Spinner';
import ErrorMessage from '../../common/error/ErrorMessage';
import CardGroup from '../layout/card/CardGroup';
import { Link } from 'react-router-dom';
import StyledBtn from '../layout/button/StyledBtn';
import Card from 'react-bootstrap/Card';
import Paragraph from '../layout/headings/Paragraph';

const SearchPage = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value, allData, filteredData);

    result = allData.filter((data) => {
      console.log('filter data', data);
      return data.title.rendered.search(value) !== -1;
    });
    setFilteredData(result);
  };

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await http.get('wp/v2/posts');
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

  if (loading) return <Spinner animation="border" variant="success" />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          onChange={(event) => handleSearch(event)}
        />
      </Form>

      <CardGroup>
        {filteredData.map((posts) => (
          <Card className="card_post" key={posts.id}>
            <Card.Img variant="top" src={posts.featured_media_src_url} alt="{posts.name}" />
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
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </>
  );
};

export default SearchPage;
