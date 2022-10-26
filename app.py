import os
import psycopg2
from flask import Flask, render_template


app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='Mines_Project3',
                            user=os.environ['postgres'],
                            password=os.environ['postgres'])
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM commodities_price;')
    commodities_price = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', commodities_price=commodities_price)