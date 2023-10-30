import pkg from '@azure/storage-blob';
const { BlobServiceClient } = pkg;
import { AbortController } from 'abort-controller';
import { config } from 'dotenv';

config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadToBlob = async (buffer, blobName, mimetype) => {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log('\nUploading to Azure storage as blob:\n\t', blobName);
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 30 * 60 * 1000); // Abort uploading when it takes over 30mins
  
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: mimetype },
    abortSignal: controller.signal
  });

  clearTimeout(timeout);

  return blockBlobClient.url;
}

const deleteBlob = async (blobName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log('\nDeleting from Azure storage as blob:\n\t', blobName);
    const deleteResponse = await blockBlobClient.delete();
    console.log("Delete response:", deleteResponse);
  }
  
export default { uploadToBlob, deleteBlob };

