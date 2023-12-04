import cv2
import numpy as np
import os
import requests

from ultralytics import YOLO

API_URL = (
    "https://api-inference.huggingface.co/models/microsoft/trocr-small-handwritten"
)
MODEL_PATH = "models\\prescriptionOD.pt"


def query(img):
    headers = {"Authorization": "Bearer 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"}
    data = cv2.imencode(".jpg", img=img)[1].tobytes()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()


def inference_on_image(src, dest):
    """
    Run object detection inference based on custom weights

    Params:
      src: image path to run inference on

    Returns:
      result: list of predicted boxes and labels
    """
    model = YOLO(model=MODEL_PATH)
    results = model(src)

    # Load the original image
    # _img_path = cv2.imread(src)
    img = cv2.imread(src)

    # Extract bounding boxes and labels
    boxes = results[0].boxes.xyxy.tolist()
    labels = results[0].boxes.cls.tolist()
    names = model.names

    # Iterate through each bounding boxes
    results = {}
    for i, box in enumerate(boxes):
        min_x, min_y, max_x, max_y = box

        # Crop detected object using bounding box coordinates
        temp = img[int(min_y) : int(max_y), int(min_x) : int(max_x)]
        label = names[int(labels[i])]

        # Run inference
        response = query(temp)

        # Store in a dictionary
        results.update({label: response[0]["generated_text"]})

    return results
