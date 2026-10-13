from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

coefficients = np.array([0.12130523, 0.10788513, 0.09204012, -0.13291081, 0.35281176, 0.02371681, 0.02421576, 0.11101786])
intercept = -36.45854613

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    reqData = request.get_json()
    data = reqData['features']
    
    input_array = np.array(data, dtype=float)
    
    hasil = np.dot(input_array, coefficients) + intercept
    
    return jsonify({'hasil_prediksi': round(float(hasil), 4)})

if __name__ == '__main__':
    app.run(debug=True)