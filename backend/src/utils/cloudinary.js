const cloudinary = require("cloudinary").v2;
const config = require("../../config.js");

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

//////////////////////////////////////////////////////////////
// Transformation
//////////////////////////////////////////////////////////////
const createImageTag = (publicId) => {
  // Create an image tag with transformations applied to the src URL
  const mediumImageTag = cloudinary.url(publicId, {
    transformation: [
      { width: 200, height: 250, gravity: "faces", crop: "scale" },
    ],
  });

  const thumbnailImageTag = cloudinary.url(publicId, {
    transformation: [{ width: 100, crop: "thumb" }],
  });

  return { medium: mediumImageTag, thumbnail: thumbnailImageTag };
};

/////////////////
//
// Main function
//
//////////////////
(async () => {
  // Set the image to upload
  const imagePath =
    "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";

  // Upload the image
  const publicId = await uploadImage(imagePath);
  //console.log({ publicId });
  // Get the colors in the image
  //const colors = await getAssetInfo(publicId);

  // Create an image tag, using two of the colors in a transformation
  const imageTag = await createImageTag(publicId);

  // Log the image tag to the console
  console.log(imageTag);
})();
