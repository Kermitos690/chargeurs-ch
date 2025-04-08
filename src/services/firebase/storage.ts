
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

// File upload
export const uploadFile = async (
  folder: string,
  file: File,
  fileName?: string,
  metadata?: any
) => {
  try {
    const name = fileName || `${Date.now()}_${file.name}`;
    const path = `${folder}/${name}`;
    const storageRef = ref(storage, path);
    
    await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    
    return { 
      success: true, 
      data: { 
        url: downloadURL, 
        path: path, 
        fileName: name 
      } 
    };
  } catch (error: any) {
    console.error("Erreur lors du téléchargement du fichier:", error);
    return { success: false, error: error.message };
  }
};

// Get file URL
export const getFileUrl = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return { success: true, url };
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'URL du fichier:", error);
    return { success: false, error: error.message };
  }
};

// Delete file
export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la suppression du fichier:", error);
    return { success: false, error: error.message };
  }
};

// List files in a folder
export const listFiles = async (folderPath: string) => {
  try {
    const storageRef = ref(storage, folderPath);
    const fileList = await listAll(storageRef);
    
    const urls = await Promise.all(
      fileList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return {
          name: item.name,
          fullPath: item.fullPath,
          url
        };
      })
    );
    
    return { success: true, files: urls };
  } catch (error: any) {
    console.error("Erreur lors de la liste des fichiers:", error);
    return { success: false, error: error.message };
  }
};
