import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Moment from "react-moment";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Paragraph from "../layout/headings/Paragraph";
import ErrorMessage from "../../common/error/ErrorMessage";
import axios from "axios";
import { BASE_URL } from "../../constants/api";

const urlPosts = BASE_URL;

const DetailPosts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams();

	const url = urlPosts + `wp/v2/posts/${id}`;

	useEffect(function () {
		async function getPosts() {
			try {
				const response = await axios.get(url);
				console.log("response", response);
				setPosts(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// const { data: posts, error, isLoading } = useFetch(urlDetail + id);

	if (loading) return <Spinner className="spinner" animation="border" variant="success" />;
	if (error) return <ErrorMessage>{error}</ErrorMessage>;

	return (
		<>
			<Container className="container">
			<Card className="card_post_detail" key={posts.id}>
			<Card.Img variant="top" src={posts.featured_media_src_url} alt="{posts.name}" />
			<Card.Body>
				<Card.Title>{posts.title.rendered}</Card.Title>
				<Moment className="moment" format="DD MMMM YYYY">
				{posts.date}
			</Moment>
				<Card.Text>
				<Paragraph dangerouslySetInnerHTML={{ __html: posts.content.rendered }} />
				</Card.Text>
			</Card.Body>	
			</Card>			
			</Container>
		</>
	);
};

export default DetailPosts;


