from flask import Flask, render_template, request, jsonify
from sense_hat import SenseHat

sensor = SenseHat()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def display_ui():
    return render_template('index.html')

@app.route('/newDesign', methods=['POST'])
def disaply_senseHat():
    req = request.get_json()
    pixels = req.split('%')
    image = []

    for pixel in pixels:
        image.append(tuple(map(int,pixel.split(','))))

    
    sensor.set_pixels(image)

    return jsonify(response='success') # return success if we load


if __name__ == '__main__':
    app.run(debug=True,port=80,host='0.0.0.0')
