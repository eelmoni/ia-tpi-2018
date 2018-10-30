import ImageResizer from 'react-native-image-resizer';
import config from '../config.json';

const apiURL = `${config.googleCloud.api}${config.googleCloud.apiKey}`;

// Google Cloud Vision API call.
const searchText = async (base64) => {
    return await fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify({
            "requests": [{
                "image": { "content": base64 },
                "imageContext": { "languageHints": ["en"] },
                "features": [{ "type": "DOCUMENT_TEXT_DETECTION" }]
            }]
        })
    }).then((response) => {
        return response.json();
    }, (err) => {
        console.error('Promise rejected');
        console.error(err);
    });
};

/*
    According to https://cloud.google.com/vision/docs/supported-files,
    recommended image size for text detection is 1024x768.
*/
const resizeImage = (path, callback, width = 1024, height = 768) => {
    ImageResizer.createResizedImage(path, width, height, 'JPEG', 80)
        .then((resizedImageUri) => {
            callback(resizedImageUri);
        }).catch((err) => {
            console.error(err);
        });
};

export default {
    searchText,
    resizeImage,
};

//run filter for frontend side logic (filter for hotdog, if you wanna do a "is hotdog or not" app)
// function filterLabelsList(response, minConfidence = 0) {
//     let resultArr = [];
//     response.labelAnnotations.forEach((label) => {
//         if (label.score > minConfidence) {
//             resultArr.push(label);
//         }
//     });
//     return resultArr;
// }
