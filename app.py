import mysql.connector
from flask import request, jsonify, Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Newlife1!',
        database='health_project'
    )

@app.route('/insert_user', methods=['POST'])
def insert_user():
    data = request.json
    print("data " + data)

    preferred_language = data.get('preferredLanguage', '')
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')
    id_number = data.get('idNumber', '')
    email = data.get('email', '')
    phone = data.get('phone', '')
    address = data.get('address', '')
    health_fund = data.get('healthFund', '')
    age = data.get('age', '')
    gender = data.get('gender', '')
    sex = data.get('sex', '')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (
                preferredLanguage, firstName, lastName, idNumber, email, phone, address, healthFund, age, gender, sex
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (preferred_language, first_name, last_name, id_number, email, phone, address, health_fund, age, gender, sex))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'success'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=3002)