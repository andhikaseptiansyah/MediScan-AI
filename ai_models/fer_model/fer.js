
// fer.js
// Real-time FER In-Browser using TensorFlow.js

let model;
const labels = ["angry","disgust","fear","happy","sad","surprise","neutral"];

async function loadModel() {
    model = await tf.loadLayersModel("model_weights/tfjs/model.json");
    console.log("FER model loaded");
}

async function predictEmotion(faceTensor) {
    const resized = tf.image.resizeBilinear(faceTensor, [48,48]);
    const gray = resized.mean(2).expandDims(-1);
    const norm = gray.div(255.0).expandDims(0);

    const pred = model.predict(norm);
    const arr = await pred.data();

    let maxIndex = arr.indexOf(Math.max(...arr));
    return labels[maxIndex];
}

loadModel();
