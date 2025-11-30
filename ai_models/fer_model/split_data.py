import os
import shutil
import random

base_dir = "d:/CIT-AI/fer_model/data"

# Folder sumber (folder asli kamu)
source_folders = [
    "0_mad",
    "1_confused",
    "2_shocked",
    "3_happy",
    "4_sad",
    "5_surprised",
    "6_normal",
    "7_good_mood"
]

train_dir = os.path.join(base_dir, "train")
val_dir = os.path.join(base_dir, "val")

# Buat folder train/ dan val/
os.makedirs(train_dir, exist_ok=True)
os.makedirs(val_dir, exist_ok=True)

for folder in source_folders:
    src_path = os.path.join(base_dir, folder)

    # Buat folder class dalam train/ dan val/
    train_class = os.path.join(train_dir, folder)
    val_class = os.path.join(val_dir, folder)

    os.makedirs(train_class, exist_ok=True)
    os.makedirs(val_class, exist_ok=True)

    images = os.listdir(src_path)
    random.shuffle(images)

    split_idx = int(len(images) * 0.8)
    train_imgs = images[:split_idx]
    val_imgs = images[split_idx:]

    # Copy file
    for img in train_imgs:
        shutil.copy(os.path.join(src_path, img), os.path.join(train_class, img))

    for img in val_imgs:
        shutil.copy(os.path.join(src_path, img), os.path.join(val_class, img))

    print(f"{folder}: {len(train_imgs)} train, {len(val_imgs)} val")

print("\nDONE! Dataset sudah di-split.")
