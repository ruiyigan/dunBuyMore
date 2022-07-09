import axios from 'axios'
const dataAPIURL = ''

// sending image file to data API and receive data
const imageFileToData = (imageData) => {
  axios.post(dataAPIURL, imageData, {
    header: {
      "Content-Type": "multipart/form-data",
    }
  })
}