from pymongo import MongoClient
import cv2
import numpy as np
from openvino.runtime import Core
from datetime import datetime
import time

# Reemplaza la cadena de conexión con la tuya. Asegúrate de que incluya un nombre de usuario y contraseña válidos.
uri = "mongodb+srv://yaelcharles417:R6GTzYyzv9Ui7wRZ@hackmty.ubuf1.mongodb.net/?retryWrites=true&w=majority&appName=hackmty"
client = None

try:
    # Conectar al cliente de MongoDB
    client = MongoClient(uri)
    print('Conexión exitosa a MongoDB Atlas')

    # Usar una base de datos llamada "hidro"
    db = client['hidro']

    # Usar una colección llamada "fugas"
    collection = db['fugas']

    # Documentos a insertar
    fugas_documents = [
        {'id': 1, 'accuracy': "96.08%", 'ocurr_time': [12, 34, 45]},
        {'id': 2, 'accuracy': "91.08%", 'ocurr_time': [2, 23, 78]},
        {'id': 3, 'accuracy': "86.08%", 'ocurr_time': [8, 54, 23]},
        {'id': 4, 'accuracy': "93.08%", 'ocurr_time': [19, 60, 55]}
    ]

    # Eliminar la colección en caso de que ya exista
    try:
        collection.drop()
        print('Colección eliminada (si existía)')
    except Exception as e:
        print(f'Error al eliminar la colección: {str(e)}')

    # Insertar documentos
    try:
        result = collection.insert_many(fugas_documents)
        print(f'Se insertaron {len(result.inserted_ids)} documentos.')
    except Exception as e:
        print(f'Error al insertar documentos: {str(e)}')

    # Archivos optimizados por OpenVINO
    model_xml = 'C:/Users/Yael Charles/Documents/HACKMTY-OPENVINO/openvino_model/best.xml'
    model_bin = 'C:/Users/Yael Charles/Documents/HACKMTY-OPENVINO/openvino_model/best.bin'

    # Cargar el modelo con OpenVINO
    ie = Core()
    model = ie.read_model(model=model_xml, weights=model_bin)
    compiled_model = ie.compile_model(model=model, device_name="CPU")
    input_layer = compiled_model.input(0)
    output_layer = compiled_model.output(0)

    # Definir las clases del modelo (Ajusta según las clases con las que entrenaste tu modelo)
    class_names = ["fuga"]  # Añade aquí las etiquetas de todas las clases si hay más

    # Inicializar la cámara
    cap = cv2.VideoCapture(0)

    # Marcar el tiempo de inicio de la grabación
    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        h, w, _ = frame.shape

        # Redimensionar la imagen para coincidir con las dimensiones esperadas por el modelo
        frame_resized = cv2.resize(frame, (640, 640))
        input_data = np.expand_dims(frame_resized.transpose(2, 0, 1), axis=0).astype(np.float32) / 255.0

        # Realizar la inferencia
        results = compiled_model([input_data])[output_layer]

        for result in results[0]:
            confidence = result[4]

            if confidence > 0.25:  # Ajusta el umbral según sea necesario
                # Obtener las coordenadas originales en la imagen redimensionada (640x640)
                x1, y1, x2, y2 = map(int, result[:4])
                cls_id = int(result[5])  # Obtener el ID de la clase detectada

                # Escalar las coordenadas de vuelta al tamaño original del frame
                x1 = int(x1 * w / 640)
                y1 = int(y1 * h / 640)
                x2 = int(x2 * w / 640)
                y2 = int(y2 * h / 640)

                # Dibujar la caja delimitadora
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 255), 2)

                # Mostrar el nombre de la clase y la puntuación de confianza
                if cls_id < len(class_names):  # Asegurarse de que el ID de clase sea válido
                    label = f"{class_names[cls_id]}: {confidence:.2f}"
                    cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

        # Mostrar el fotograma con las detecciones
        cv2.imshow("FRAME", frame)

        if cv2.waitKey(1) & 0xFF == 27:  # Presionar 'ESC' para salir
            break

    # Calcular la duración de la grabación
    end_time = time.time()
    duration = end_time - start_time  # Duración en segundos

    # Obtener la fecha actual
    recording_date = datetime.now()

    # Guardar la duración y la fecha en MongoDB Atlas
    record_data = {
        'recording_date': recording_date,
        'duration': duration  # Duración en segundos
    }
    collection.insert_one(record_data)

    print(f"Grabación guardada: {record_data}")

    cap.release()
    cv2.destroyAllWindows()

    # Consultar documentos
    try:
        result = collection.find()
        docs = list(result)

        if docs:
            for doc in docs:
                id_ = doc.get('id', 'N/A')  # 'N/A' if 'id' is not present in document
                accuracy = doc.get('accuracy', 'N/A')
                ocurr_time = doc.get('ocurr_time', [])
                doc_duration = doc.get('duration', '')
                print(f"La fuga número {id_} tiene una posibilidad de {accuracy}, ocurrió a las {ocurr_time[0] if len(ocurr_time) > 0 else 'N/A'} horas con {ocurr_time[1] if len(ocurr_time) > 1 else 'N/A'} minutos y {ocurr_time[2] if len(ocurr_time) > 2 else 'N/A'} segundos. Duración de grabación: {doc_duration} segundos.")
        else:
            print("No se encontraron documentos.")
    except Exception as e:
        print(f'Error al consultar documentos: {str(e)}')

except Exception as e:
    print(f'Error al conectar a MongoDB Atlas: {str(e)}')

finally:
    # Cerrar la conexión
    if client:
        client.close()
