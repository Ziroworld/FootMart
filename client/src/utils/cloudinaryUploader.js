
export async function uploadImagesToCloudinary(files, { category, productId }) {
  const uploadedUrls = [];
  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ailav-images"); // your unsigned preset

    // Save to folder: FootMart/{category}/product_{productId}
    formData.append("folder", `FootMart/${category}/product_${productId}`);

    const res = await fetch("https://api.cloudinary.com/v1_1/dx3bvihmi/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!data.secure_url) throw new Error("Cloudinary upload failed!");
    uploadedUrls.push(data.secure_url);
  }
  return uploadedUrls; // array of urls
}
