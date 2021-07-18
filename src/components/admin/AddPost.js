import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/error/ErrorMessage";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/headings/Heading";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SelectPictures from "./media/SelectPictures";


const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
});

export default function AddPost() {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const history = useHistory();
	const http = useAxios();

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);

		data.status = "publish";

		if (data.featured_media === "") {
			data.featured_media = null;
		}

		console.log(data);

		try {
			const response = await http.post("/wp/v2/posts", data);
			console.log("response", response.data);
			history.push("/blog");
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
		<Heading content="Add post" />
		<Container className="container_form">
			<Form onSubmit={handleSubmit(onSubmit)}>
				{serverError && <ErrorMessage>{serverError}</ErrorMessage>}
				<fieldset disabled={submitting}>
				<Form.Group>
				<Form.Control className="control" name="title" placeholder="Title" ref={register} />
						{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
				</Form.Group>

				<Form.Group>
				<Form.Control className="control" name="content" placeholder="Content" ref={register} />
				</Form.Group>

				<div>
				<SelectPictures register={register} />
				</div>
			
				<Button type="submit">{submitting ? "Submitting..." : "Submit"}</Button>
				</fieldset>
			</Form>
		</Container>
		</>
	);
}
