const cloudName = 'dczhcauwf';
const preset = 'lfueeeon';

const useCloudinary = () => {
  const uploadImageToCloudinary = async (image) => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', preset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        return imageUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    uploadImageToCloudinary,
  };
};


export default useCloudinary