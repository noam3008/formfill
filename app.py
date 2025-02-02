import mysql.connector
from flask import request, jsonify, Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'database-1.cz2i42m6u7g1.us-east-1.rds.amazonaws.com',
    'user': 'admin',
    'password': 'Fd[t4#iBIeiX13EuQX!kWDr2X-L*',
    'database': 'dataformanagement'
}
    

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        sql = """
        INSERT INTO Users (id_number, first_name, last_name, email, phone, age, health_fund, gender, sex, preferred_language)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['idNumber'], data['firstName'], data['lastName'], data['email'], 
            data['phone'], data['age'], data['healthFund'], data['gender'], 
            data['sex'], data['preferredLanguage']
        )
        cursor.execute(sql, values)
        conn.commit()
        return jsonify({"message": "Data inserted successfully!"}), 200
    except mysql.connector.errors.IntegrityError as e:
        return jsonify({"error": "Duplicate id_number. This ID already exists."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=3002)