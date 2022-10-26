import os
import psycopg2
from flask import Flask, render_template


app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='Mines_Project3',
                            user='postgres',
                            password='postgres')
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM commodities_price;')
    commodities_price = cur.fetchall()
    cur.close()
    conn.close()
    Commodity = [var[0] for var in commodities_price]
    Price = [var[1] for var in commodities_price]
    Percentage_change = [var[2] for var in commodities_price]
    Variation = [var[3] for var in commodities_price]
    Unit = [var[4] for var in commodities_price]
    Last_Updated = [var[5] for var in commodities_price]

    return render_template('index.html',Commodity=Commodity,Price=Price,Percentage_change=Percentage_change,Variation=Variation,Unit=Unit,Last_Updated=Last_Updated)


if __name__ == "__main__":
    app.run()