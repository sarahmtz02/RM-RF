import torch

model_path = 'C:/Users/Yael Charles/Documents/HACKMTY-OPENVINO/alldata/best.pt'
model = torch.hub.load('ultralytics/yolov5', 'custom', path = model_path, force_reload = True)
dummy_input = torch.randn(1,3,640,640)

onnx_path = 'best.onnx'

torch.onnx.export(model,dummy_input,onnx_path,opset_version=11)

print(f"Modelo exportado exitosamente a {onnx_path}")