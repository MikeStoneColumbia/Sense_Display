from flask import Flask, render_template, request, jsonify
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
run_with_ngrok(app)

@app.route('/', methods=['GET'])
def display_ui():
    return render_template('index.html')

@app.route('/newDesign', methods=['POST'])
def disaply_senseHat():
    req = request.get_json()
    pixels = req.split('%')
    image = []

    for pixel in pixels:
        image.append(tuple(map(int,pixels[0].split(','))))

    print(image)

    return jsonify(response='success') # return success if we load


if __name__ == '__main__':
    app.run()
