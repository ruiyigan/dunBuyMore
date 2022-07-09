import Camera, { IMAGE_TYPES, FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import imageFileToData from '../services/dataApiServices';

const CameraComponent = ({setDataUri, setOpenCamera}) => {
  const dataURItoFileData = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const fd = new FormData(document.forms[0]);
    fd.append("file", blob);
    return fd
  }
  const handleTakePhoto = async (data) => {
    const fileResult = dataURItoFileData(data)
    const response = await imageFileToData(fileResult)
    setOpenCamera(false)
  }

  return (
    <Camera
      onTakePhotoAnimationDone={handleTakePhoto}
      imageType={IMAGE_TYPES.JPG}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
      // idealResolution={{ width: 80, height: 80 }}
      isMaxResolution={true}
    />
  )
}

export default CameraComponent