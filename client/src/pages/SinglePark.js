import { Typography, Grid, ListItem } from "@mui/material";
import { parksData } from "../utils/parkdata";

import ImageGallery from "../components/ImageGallery";

const SinglePark = () => {
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
							<ListItem>{parksData.data[0].addresses[0].line1}</ListItem>
							<ListItem>{parksData.data[0].addresses[0].city}</ListItem>
							<ListItem>{parksData.data[0].addresses[0].stateCode}</ListItem>
							<ListItem>{parksData.data[0].addresses[0].postalCode}</ListItem>
							<ListItem>{parksData.data[0].addresses[0].city}</ListItem>
						</Grid>
						<Grid item>
							<Typography>Contact Info</Typography>
							<ListItem>
								PhoneNumber:{" "}
								{parksData.data[0].contacts.phoneNumbers[0].phoneNumber}
							</ListItem>
							<ListItem>
								Email:{" "}
								{parksData.data[0].contacts.emailAddresses[0].emailAddress}
							</ListItem>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={6}>
					<ImageGallery images={parksData.data[0].images} />
				</Grid>
			</Grid>
		</>
	);
};

export default SinglePark;
