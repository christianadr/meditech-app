from ultralytics import YOLO
import cv2

MODEL_PATH = './prescriptionOD.pt'
UPLOAD_PATH = 'server/uploads'


def inference_on_image(src):
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
    _img_path = cv2.imread(src)
    _img = cv2.imread(_img_path)

    # Extract bounding boxes and labels
    boxes = results[0].boxes.xyxy.tolist()
    labels = results[0].boxes.cls.tolist()
    names = model.names

    # Iterate through each bounding boxes
    for i, box in enumerate(boxes):
        min_x, min_y, max_x, max_y = box

        # Crop detected object using bounding box coordinates
        temp = _img[int(min_y):int(max_y), int(min_x), int(max_x)]
        label = names[int(labels[i])]

        cv2.imwrite(f"{UPLOAD_PATH}/{label}_{str(i)}.jpg", temp)

