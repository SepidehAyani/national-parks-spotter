import {
	Typography,
	Grid,
	ListItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Paper,
	Avatar,
	Divider
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
// import { parksData } from "../utils/parkdata";
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
							Comments
						</DialogTitle>
						<DialogContent>
							<Paper style={{ padding: "40px 20px" }}>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										<Avatar alt="Remy Sharp" />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										<h4 style={{ margin: 0, textAlign: "left" }}>
											Michel Michel
										</h4>
										<p style={{ textAlign: "left" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean luctus ut est sed faucibus. Duis bibendum ac ex
											vehicula laoreet. Suspendisse congue vulputate lobortis.
											Pellentesque at interdum tortor. Quisque arcu quam,
											malesuada vel mauris et, posuere sagittis ipsum. Aliquam
											ultricies a ligula nec faucibus. In elit metus, efficitur
											lobortis nisi quis, molestie porttitor metus. Pellentesque
											et neque risus. Aliquam vulputate, mauris vitae tincidunt
											interdum, mauris mi vehicula urna, nec feugiat quam lectus
											vitae ex.{" "}
										</p>
										<p style={{ textAlign: "left", color: "gray" }}>
											posted 1 minute ago
											<span
												style={{
													justifyContent: "space-between",
													color: "gray"
												}}
											>
												Replay{" "}
											</span>
										</p>
									</Grid>
								</Grid>
								<Divider variant="fullWidth" style={{ margin: "30px 0" }} />
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										<Avatar alt="Remy Sharp" />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										<h4 style={{ margin: 0, textAlign: "left" }}>
											Michel Michel
										</h4>
										<p style={{ textAlign: "left" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean luctus ut est sed faucibus. Duis bibendum ac ex
											vehicula laoreet. Suspendisse congue vulputate lobortis.
											Pellentesque at interdum tortor. Quisque arcu quam,
											malesuada vel mauris et, posuere sagittis ipsum. Aliquam
											ultricies a ligula nec faucibus. In elit metus, efficitur
											lobortis nisi quis, molestie porttitor metus. Pellentesque
											et neque risus. Aliquam vulputate, mauris vitae tincidunt
											interdum, mauris mi vehicula urna, nec feugiat quam lectus
											vitae ex.{" "}
										</p>
										<p style={{ textAlign: "left", color: "gray" }}>
											posted 1 minute ago
										</p>
									</Grid>
								</Grid>
							</Paper>

							<Paper style={{ padding: "40px 20px", marginTop: 100 }}>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										<Avatar alt="Remy Sharp" />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										<h4 style={{ margin: 0, textAlign: "left" }}>
											Michel Michel
										</h4>
										<p style={{ textAlign: "left" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean luctus ut est sed faucibus. Duis bibendum ac ex
											vehicula laoreet. Suspendisse congue vulputate lobortis.
											Pellentesque at interdum tortor. Quisque arcu quam,
											malesuada vel mauris et, posuere sagittis ipsum. Aliquam
											ultricies a ligula nec faucibus. In elit metus, efficitur
											lobortis nisi quis, molestie porttitor metus. Pellentesque
											et neque risus. Aliquam vulputate, mauris vitae tincidunt
											interdum, mauris mi vehicula urna, nec feugiat quam lectus
											vitae ex.{" "}
										</p>
										<p style={{ textAlign: "left", color: "gray" }}>
											posted 1 minute ago
										</p>
									</Grid>
								</Grid>
							</Paper>
							<Paper style={{ padding: "40px 20px", marginTop: 10 }}>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										<Avatar alt="Remy Sharp" />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										<h4 style={{ margin: 0, textAlign: "left" }}>
											Michel Michel
										</h4>
										<p style={{ textAlign: "left" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean luctus ut est sed faucibus. Duis bibendum ac ex
											vehicula laoreet. Suspendisse congue vulputate lobortis.
											Pellentesque at interdum tortor. Quisque arcu quam,
											malesuada vel mauris et, posuere sagittis ipsum. Aliquam
											ultricies a ligula nec faucibus. In elit metus, efficitur
											lobortis nisi quis, molestie porttitor metus. Pellentesque
											et neque risus. Aliquam vulputate, mauris vitae tincidunt
											interdum, mauris mi vehicula urna, nec feugiat quam lectus
											vitae ex.{" "}
										</p>
										<p style={{ textAlign: "left", color: "gray" }}>
											posted 1 minute ago
										</p>
									</Grid>
								</Grid>
							</Paper>
							<Paper le={{ padding: "40px 20px", marginTop: 10 }}>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										<Avatar alt="Remy Sharp" />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										<h4 style={{ margin: 0, textAlign: "left" }}>
											Michel Michel
										</h4>
										<p style={{ textAlign: "left" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean luctus ut est sed faucibus. Duis bibendum ac ex
											vehicula laoreet. Suspendisse congue vulputate lobortis.
											Pellentesque at interdum tortor. Quisque arcu quam,
											malesuada vel mauris et, posuere sagittis ipsum. Aliquam
											ultricies a ligula nec faucibus. In elit metus, efficitur
											lobortis nisi quis, molestie porttitor metus. Pellentesque
											et neque risus. Aliquam vulputate, mauris vitae tincidunt
											interdum, mauris mi vehicula urna, nec feugiat quam lectus
											vitae ex.{" "}
										</p>
										<p style={{ textAlign: "left", color: "gray" }}>
											posted 1 minute ago
										</p>
									</Grid>
								</Grid>
							</Paper>
							<Paper style={{ padding: "40px 20px", marginTop: 10 }}>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										<Avatar alt="Remy Sharp" />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										<h4 style={{ margin: 0, textAlign: "left" }}>
											Michel Michel
										</h4>
										<p style={{ textAlign: "left" }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean luctus ut est sed faucibus. Duis bibendum ac ex
											vehicula laoreet. Suspendisse congue vulputate lobortis.
											Pellentesque at interdum tortor. Quisque arcu quam,
											malesuada vel mauris et, posuere sagittis ipsum. Aliquam
											ultricies a ligula nec faucibus. In elit metus, efficitur
											lobortis nisi quis, molestie porttitor metus. Pellentesque
											et neque risus. Aliquam vulputate, mauris vitae tincidunt
											interdum, mauris mi vehicula urna, nec feugiat quam lectus
											vitae ex.{" "}
										</p>
										<p style={{ textAlign: "left", color: "gray" }}>
											posted 1 minute ago
										</p>
									</Grid>
								</Grid>
							</Paper>
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
