import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from './clientApp';
import React from 'react'

function uploadFile(file, path) {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, path);
    try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        resolve(url);
    } catch (error) {
        reject(error);
    }
  })
}

export default uploadFile