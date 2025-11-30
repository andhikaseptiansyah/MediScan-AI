# fer_api.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import uvicorn
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from PIL import Image
import io

# Load Model
model = load_model("model_weights/fer_cnn.h5")

# Label sesuai training
EMOTION_LABELS = [
    "mad", "confused", "shock", "happy",
    "sad", "surprised", "normal", "good_mood"
]

app = FastAPI()

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((48, 48))
    img_array = np.array(image).astype("float32") / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        img = preprocess_image(img_bytes)

        preds = model.predict(img)
        emotion = EMOTION_LABELS[np.argmax(preds)]
        confidence = float(np.max(preds))

        return JSONResponse(content={
            "emotion": emotion,
            "confidence": confidence
        })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/")
def home():
    return {"message": "FER API is running"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
