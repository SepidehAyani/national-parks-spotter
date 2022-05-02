import {
	Typography,
	Grid,
	ListItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getOnePark } from "../utils/apiCalls";
import ImageGallery from "../components/ImageGallery";

import { useEffect, useState } from "react";

const SinglePark = () => {
	const [commentDialog, setCommentDialog] = useState(false);
	const { id } = useParams();

	const [park, setPark] = useState({});

	useEffect(() => {
		async function loadPark(id) {
			console.log("api call happening");
			let parkData = await getOnePark(id);
			setPark(parkData.data[0]);
		}
		loadPark(id);
	}, []);

	return (
		<>
			{park.fullName ? (
				<>
					{/*Park title*/}{" "}
					<Typography variant="h3" className="park_title">
						<span>{park.fullName} </span>
						<span>
							<Button variant="h3" className="park_title">
								Add To Favoriate{" "}
							</Button>
						</span>
					</Typography>
					{/*Park description and addresses section*/}{" "}
					<Grid container spacing={7}>
						{" "}
						<Grid item xs>
							{" "}
							<Grid container>
								<Typography>{park.description}</Typography>{" "}
							</Grid>{" "}
							<Grid container className="section">
								{" "}
								<Grid
									item
									xs={12}
									sm={12}
									md={4}
									lg={6}
									className="section_title"
								>
									<Typography className="section_title_text">
										<span>Address</span>
									</Typography>{" "}
									<ListItem>{park.addresses[0].line1} </ListItem>
									<ListItem>{park.addresses[0].city} </ListItem>
									<ListItem>{park.addresses[0].stateCode} </ListItem>{" "}
									<ListItem>{park.addresses[0].postalCode} </ListItem>{" "}
								</Grid>{" "}
								<Grid
									item
									xs={12}
									sm={12}
									md={4}
									lg={6}
									className="section_title"
								>
									<Typography className="section_title_text">
										Contact Info
									</Typography>
									<ListItem>
										Email: {park.contacts.emailAddresses[0].emailAddress}
									</ListItem>{" "}
									<ListItem>
										PhoneNumber: {park.contacts.phoneNumbers[0].phoneNumber}{" "}
									</ListItem>
								</Grid>{" "}
							</Grid>{" "}
						</Grid>
						<Grid item xs={12} sm={12} md={4} lg={6}>
							{" "}
							<ImageGallery images={park.images} />{" "}
							<Button onClick={() => setCommentDialog(park)}>
								Read all Comments
							</Button>{" "}
						</Grid>{" "}
					</Grid>
					{/* Comment Dialog */}
					<Dialog
						open={commentDialog}
						onClose={() => setCommentDialog(false)}
						className="commentDialog"
						maxWidth={"xl"}
					>
						<DialogTitle
							onClose={() => setCommentDialog(false)}
							className="projectDialog_title"
						>
							{commentDialog.fullName}
						</DialogTitle>
						<DialogContent>
							<Typography className="projectDialog_description">
								{commentDialog.description}
							</Typography>
						</DialogContent>
						<DialogActions className="projectDialog_actions"></DialogActions>
					</Dialog>
				</>
			) : (
				<h2>park data not loaded</h2>
			)}
		</>
	);
};

export default SinglePark;
