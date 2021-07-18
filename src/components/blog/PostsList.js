import { Link } from "react-router-dom";
import StyledBtn from "../layout/button/StyledBtn";
import Card from "react-bootstrap/Card";
import Paragraph from "../layout/headings/Paragraph";
import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Spinner from "react-bootstrap/Spinner";
import ErrorMessage from "../../common/error/ErrorMessage";
import CardGroup from "../layout/card/CardGroup";

const PostsList = ({ articles }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	useEffect(function () {
		async function getPosts() {
			try {
				const response = await http.get("wp/v2/posts");
				console.log("response", response);
				setPosts(response.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		if (!articles) {
			console.log('www', articles);
			getPosts();
		} else {
			console.log('set', articles);
			setPosts(articles);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <Spinner animation="border" variant="success" />;
	if (error) return <ErrorMessage>{error}</ErrorMessage>;

	return (
		<CardGroup>
			{posts.map((posts) => (
				<Card className="card_post" key={posts.id}>
				<Card.Img variant="top" src={posts.featured_media_src_url} alt="{posts.name}" />
				<Card.Body>
					<Card.Title>{posts.title.rendered}</Card.Title>
					<Card.Text>
					<Paragraph dangerouslySetInnerHTML={{ __html: posts.excerpt.rendered }} />
					</Card.Text>
				</Card.Body>
				<Card.Footer>
				{articles ? (<Link to={`/detail/${posts.id}`}>
				<StyledBtn className="btn">View more</StyledBtn>
				</Link>) : (<Link to={`/admin/edit/${posts.id}`}><StyledBtn className="btn">Edit</StyledBtn></Link>)}
				</Card.Footer>
				</Card>
				
			))}
		</CardGroup>
	);
};

export default PostsList;

