import os
import time
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
CHANNELS_FOLDER = 'channels'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CHANNELS_FOLDER, exist_ok=True)

ads = {}
channels = {}

def compute_fingerprint(video_path):
    cap = cv2.VideoCapture(video_path)
    fingerprint = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        resized = cv2.resize(gray, (32, 32), interpolation=cv2.INTER_AREA)
        dct = cv2.dct(np.float32(resized))
        dct_low = dct[:8, :8]
        avg = dct_low.mean()
        fingerprint.append(dct_low > avg)
    cap.release()
    return np.array(fingerprint)

def compare_fingerprints(fp1, fp2):
    min_len = min(len(fp1), len(fp2))
    fp1 = fp1[:min_len]
    fp2 = fp2[:min_len]
    return np.sum(fp1 == fp2) / (fp1.size * fp2.size)

class VideoHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory and event.src_path.lower().endswith(('.mp4', '.avi', '.mov')):
            print(f"New video detected: {event.src_path}")
            channel_name = os.path.basename(os.path.dirname(event.src_path))
            video_fingerprint = compute_fingerprint(event.src_path)
            
            for ad_name, ad_data in ads.items():
                if ad_data['active']:
                    similarity = compare_fingerprints(video_fingerprint, ad_data['fingerprint'])
                    if similarity > 0.85:  # Adjusted threshold for detection
                        print(f"Ad '{ad_name}' detected in channel '{channel_name}'")
                        # Here you would typically update a database or send a notification

def start_watching(channel_name, folder_path):
    observer = Observer()
    observer.schedule(VideoHandler(), folder_path, recursive=False)
    observer.start()
    channels[channel_name] = {'path': folder_path, 'observer': observer}

@app.route('/upload_ad', methods=['POST'])
def upload_ad():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        fingerprint = compute_fingerprint(filename)
        ads[file.filename] = {'fingerprint': fingerprint, 'active': True}
        return jsonify({'message': 'Ad uploaded successfully'}), 200

@app.route('/toggle_ad', methods=['POST'])
def toggle_ad():
    ad_name = request.json.get('ad_name')
    if ad_name not in ads:
        return jsonify({'error': 'Ad not found'}), 404
    ads[ad_name]['active'] = not ads[ad_name]['active']
    return jsonify({'message': 'Ad toggled successfully', 'active': ads[ad_name]['active']}), 200

@app.route('/add_channel', methods=['POST'])
def add_channel():
    channel_name = request.json.get('name')
    folder_path = request.json.get('path')
    if not os.path.exists(folder_path):
        return jsonify({'error': 'Folder does not exist'}), 400
    start_watching(channel_name, folder_path)
    return jsonify({'message': 'Channel added successfully'}), 200

@app.route('/get_channels', methods=['GET'])
def get_channels():
    return jsonify(list(channels.keys())), 200

@app.route('/get_ads', methods=['GET'])
def get_ads():
    return jsonify([{'name': name, 'active': data['active']} for name, data in ads.items()]), 200

if __name__ == '__main__':
    app.run(debug=True)