import cloudinary from '../config/cloudinary';
import { IProductImage } from '../types';

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = 'products'
): Promise<IProductImage> => {
  try {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      alt: file.originalname,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};

export const uploadMultipleToCloudinary = async (
  files: Express.Multer.File[],
  folder: string = 'products'
): Promise<IProductImage[]> => {
  const uploadPromises = files.map((file) => uploadToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};

export const deleteMultipleFromCloudinary = async (publicIds: string[]): Promise<void> => {
  const deletePromises = publicIds.map((publicId) => deleteFromCloudinary(publicId));
  await Promise.all(deletePromises);
};