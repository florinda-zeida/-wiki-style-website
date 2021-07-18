import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/error/ErrorMessage";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/headings/Heading";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import DeletePostButton from "./DeletePostButton";

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
});

export default function EditPost() {
	const [post, setPost] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [fetchingPost, setFetchingPost] = useState(true);
	const [updatingPost, setUpdatingPost] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [updateError, setUpdateError] = useState(null);

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

	let { id } = useParams();

	const url = `wp/v2/posts/${id}`;

	useEffect(
		function () {
			async function getPosts() {
				try {
					const response = await http.get(url);
					console.log("response", response.data);
					setPost(response.data);
				} catch (error) {
					console.log(error);
					setFetchError(error.toString());
				} finally {
					setFetchingPost(false);
				}
			}

			getPosts();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	async function onSubmit(data) {
		setUpdatingPost(true);
		setUpdateError(null);
		setUpdated(false);

		console.log(data);

		try {
			const response = await http.put(url, data);
			console.log("response", response.data);
			setUpdated(true);
		} catch (error) {
			console.log("error", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingPost(false);
		}
	}

	if (fetchingPost) return <div>Loading...</div>;

	if (fetchError) return <div>Error loading post</div>;

	return (
<>
			<Heading content="Edit Post" />
			<Container className="container_form">
			<form onSubmit={handleSubmit(onSubmit)}>
				{updated && <Alert variant="success">The post was updated</Alert>}

				{updateError && <ErrorMessage>{updateError}</ErrorMessage>}

				<fieldset disabled={updatingPost}>
				<Form.Group>
				<Form.Control className="control" name="title" defaultValue={post.title.rendered} placeholder="Title" ref={register} />
						{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</Form.Group>

				<Form.Group>
				<Form.Control className="control" name="content" defaultValue={post.content.rendered} placeholder="Content" ref={register} />
				</Form.Group>

					<button className="btn">Update</button>
					<hr />
					<DeletePostButton id={post.id} />
				</fieldset>
			</form>
			</Container>
		</>
	);
}
