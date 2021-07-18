import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Button from 'react-bootstrap/Button';

export default function DeletePostButton({ id }) {
	const [error, setError] = useState(null);

	const http = useAxios();
	const history = useHistory();

	const url = `/wp/v2/posts/${id}`;

	async function handleDelete() {
		const confirmDelete = window.confirm("Are you sure you want to delete this post?");

		if (confirmDelete) {
			try {
				await http.delete(url);
				history.push("/blog");
			} catch (error) {
				setError(error);
			}
		}
	}

	return (
		<Button type="button" className="delete" onClick={handleDelete}>
			{error ? "Error" : "Delete"}
		</Button>
	);
}

DeletePostButton.propTypes = {
	id: PropTypes.number.isRequired,
};
