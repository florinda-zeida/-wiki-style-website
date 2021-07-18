import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";

export default function SelectPictures({ register }) {
	const [media, setPictures] = useState([]);

	const http = useAxios();

	useEffect(function () {
		async function getSelectPictures() {
			try {
				const response = await http.get("wp/v2/media");
				console.log("response", response);
				setPictures(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		getSelectPictures();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
		<select className="select" name="featured_media" ref={register}>
			<option value="">Select media</option>
			{media.map((media) => {
				return (
					<option key={media.id} value={media.id}>
						{media.title.rendered}
					</option>
				);
			})}
		</select>
		</>
	);
}

SelectPictures.propTypes = {
	register: PropTypes.func,
};

SelectPictures.defaultProps = {
	register: () => {},
};
