# -*- coding: utf-8 -*-
"""
fer_model.py
Local Training Version (Not Google Colab)
"""

import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint


# LABEL CONFIG
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


# PATH CONFIG
root = "d:/CIT-AI/fer_model/data" # 🔥 GANTI SESUAI FOLDER LOKAL MU
train_dir = os.path.join(root, "train")
val_dir   = os.path.join(root, "val")

print("Training folder:", train_dir)
print("Validation folder:", val_dir)


# IMAGE GENERATOR
IMG_SIZE = 48
BATCH = 32

train_gen = ImageDataGenerator(rescale=1./255).flow_from_directory(
    train_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH,
    class_mode="categorical"
)

val_gen = ImageDataGenerator(rescale=1./255).flow_from_directory(
    val_dir,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH,
    class_mode="categorical"
)


# MODEL CNN
model = Sequential([
    Conv2D(64, (3,3), activation="relu", input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    MaxPooling2D(2,2),

    Conv2D(128, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Flatten(),
    Dense(256, activation="relu"),
    Dropout(0.5),
    Dense(8, activation="softmax")  # 8 classes
])

model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()


# SAVE MODEL WEIGHTS
output_dir = "model_weights"
os.makedirs(output_dir, exist_ok=True)

checkpoint = ModelCheckpoint(
    filepath=os.path.join(output_dir, "fer_cnn.h5"),
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)


# TRAINING
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=10,
    callbacks=[checkpoint]
)

print("Training complete! Model saved in model_weights/fer_cnn.h5")
