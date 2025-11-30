import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load trained model
model = load_model("model_weights/fer_cnn.h5")

# Label sesuai training
EMOTION_LABELS = [
    "mad",
    "confused",
    "shock",
    "happy",
    "sad",
    "surprised",
    "normal",
    "good_mood"
]


# OpenCV face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x,y,w,h) in faces:
        face = frame[y:y+h, x:x+w]
        face = cv2.resize(face, (48,48))
        face = face.astype("float32") / 255.0
        face = np.expand_dims(face, axis=0)

        preds = model.predict(face)
        emotion = EMOTION_LABELS[np.argmax(preds)]

        cv2.rectangle(frame, (x,y), (x+w,y+h), (255,0,0), 2)
        cv2.putText(frame, emotion, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255,255,255), 2)

    cv2.imshow("Real-Time FER", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
