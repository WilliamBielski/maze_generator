from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=["GET"])
def homepage():
    return render_template("display.html")

if __name__ == '__main__':
    app.run(debug=True, host="localhost")
