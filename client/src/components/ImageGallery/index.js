import Gallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = (props) => {
	const images = props?.images?.map((image) => {
		return {
			original: image.url,
			thumbnail: image.url
		};
	});

	return (
		<div>
			<Gallery
				items={images}
				showBullets={false}
				showThumbnails={false}
				showPlayButton={false}
				showFullscreenButton={false}
			/>
		</div>
	);
};

export default ImageGallery;
