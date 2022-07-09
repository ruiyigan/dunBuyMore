import axios from 'axios'
const dataAPIURL = 'http://localhost:5000/scan/'

// sending image file to data API and receive data
const imageFileToData = (imageData) => {
  const request = axios.post(dataAPIURL, imageData, {
    header: {
      "Content-Type": "multipart/form-data",
    }
  })

  return request.then(response => response.data);
}

export default imageFileToData