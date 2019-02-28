import React from "react";

import LazyLoad from "react-lazyload";

export default function PhotoGrid(props) {
  const images = [];
  const realImages = [];
  for (let image in props.images) {
    images.push([image, props.images[image]]);
  }
  const click = image => {
    props.checkScreenSize();
    if (props.device === "mobile") props.history.push("/mobile");
    props.handleClick(image);
  };
  for (let i in props.dbImages) {
    const image = props.dbImages[i];
    if (image.image ? image.image.includes("data:image/") : 0 == 1)
      realImages.push(
        <LazyLoad key={`image-${image.id}`} height={60} offset={100} once>
          <img
            onClick={_ => click(image)}
            className="photo-grid_image"
            src={image.image}
            alt="post"
          />
        </LazyLoad>
      );
  }
  return <div className="photo-grid">{realImages.reverse()}</div>;
}
