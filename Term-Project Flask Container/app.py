#Imports for the ML model
import warnings, wget
warnings.filterwarnings('ignore')
import tensorflow as tf
from transformers import AutoTokenizer, TFDistilBertForSequenceClassification, DistilBertConfig
import numpy as np
import pandas as pd
wget.download("https://raw.githubusercontent.com/yogawicaksana/helper_prabowo/main/helper_prabowo_ml.py",out="helper_prabowo_ml.py")
from helper_prabowo_ml import clean_html, remove_links, remove_special_characters, removeStopWords, remove_, remove_digits, lower, email_address, non_ascii, punct
from transformers import TFDistilBertForSequenceClassification
from tensorflow.keras.utils import custom_object_scope
from flask_cors import CORS


def text_preprocess(data,col):
        data[col] = data[col].apply(func=clean_html)
        data[col] = data[col].apply(func=remove_)
        data[col] = data[col].apply(func=removeStopWords)
        data[col] = data[col].apply(func=remove_digits)
        data[col] = data[col].apply(func=remove_links)
        data[col] = data[col].apply(func=remove_special_characters)
        data[col] = data[col].apply(func=punct)
        data[col] = data[col].apply(func=non_ascii)
        data[col] = data[col].apply(func=email_address)
        data[col] = data[col].apply(func=lower)
        return data

def preprocess_and_tokenize(text):
    tokenizer = AutoTokenizer.from_pretrained("manishiitg/distilbert-resume-parts-classify")
    preprocessed_text = text_preprocess(text, "Text")
    return tokenizer(text=preprocessed_text.Text.tolist(),
                add_special_tokens=True,
                padding=True,
                truncation=True,
                max_length=200,
                return_tensors='tf',
                return_attention_mask=True,
                return_token_type_ids=False,
                verbose=1)



with custom_object_scope({'TFDistilBertForSequenceClassification': TFDistilBertForSequenceClassification}):
    model = tf.keras.models.load_model('LLMmodel.h5')
    inputs = model.input
    outputs = model.output
    probabilities = tf.keras.layers.Softmax()(outputs)
    model_with_softmax = tf.keras.Model(inputs=inputs, outputs=probabilities)
    model_with_softmax.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


#Imports for creating Flask App
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
CORS(app)


@app.route('/api/getPrediction', methods=['POST'])
def getPrediction():
    resume = request.form['resume']
    resume = [resume]
    df = pd.DataFrame(resume, columns=['Text'])
    block = preprocess_and_tokenize(df)
    predictions = model.predict({'input_ids': block['input_ids'], 'attention_mask': block['attention_mask']})
    
    probabilities = np.array(predictions)

    percentages = probabilities * 100
    percentages_rounded = np.round(percentages, 2)
    max_index = np.argmax(percentages_rounded)

    return jsonify( { 'max_index': int(max_index), 'percentage' : int(max(max(percentages)))  } )


if __name__ == "__main__":
    app.run(host='0.0.0.0', port = 3000)