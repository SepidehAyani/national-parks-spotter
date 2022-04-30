import { Typography, Grid, ListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { parksData } from "../utils/parkdata";

import { useEffect } from "react";

const SinglePark = () => {
	const id = useParams();

	useEffect(() => {
		getPark();
	}, []);

	async function getPark(id) {
		const response = await getPark(id);

		const json = await response.json();

		console.log(json);
	}

	return (
		<>
			{/*Park title*/}
			<Typography variant="h3" className="park_title">
				{parksData.data[0].fullName}
			</Typography>

			{/*Park description and addresses section*/}
			<Grid container spacing={7}>
				<Grid item xs>
					<Grid container>
						<Typography>{parksData.data[0].description}</Typography>
					</Grid>
					<Grid container>
						<Grid item>
							<Typography>Address</Typography>
						</Grid>
						<Grid item>
							<Typography>Contact Info</Typography>
							<ListItem>PhoneNumber: </ListItem>
							<ListItem>Email: </ListItem>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={6}></Grid>
			</Grid>
		</>
	);
};

export default SinglePark;
