
from flask import request, jsonify, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


# Use your MySQL credentials (username, password, database name, etc.)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:#8FJ51V6yunTOj|13_nDTKOWlT_Z@database-1.cz2i42m6u7g1.us-east-1.rds.amazonaws.com:3306/dataformanagement'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Question(db.Model):
    __tablename__ = "Questions"

    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(255), nullable=False)
    question_type = db.Column(db.String(50), nullable=False)  # e.g., text, number, email, radio, select
    options = db.Column(db.Text)  # JSON encoded string
    field_name = db.Column(db.String(50), unique=True, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # ✅ Add this column

    def to_dict(self):
        return {
            "id": self.id,
            "question_text": self.question_text,
            "question_type": self.question_type,
            "options": json.loads(self.options) if self.options else None,
            "field_name": self.field_name,
            "category": self.category  # ✅ Include category in the response
        }


    def to_dict(self):
        return {
            "id": self.id,
            "question_text": self.question_text,
            "question_type": self.question_type,
            "options": json.loads(self.options) if self.options else None,
            "field_name": self.field_name,
            "category": self.category  # ✅ Include category in the response
        }

class User(db.Model):
    __tablename__ = "Users"  # Ensure it matches your MySQL table name

    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(80), unique=True, nullable=False)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120))
    age = db.Column(db.Integer)
    health_fund = db.Column(db.String(120))
    gender = db.Column(db.String(10))
    sex = db.Column(db.String(10))
    preferred_language = db.Column(db.String(120))

    def __repr__(self):
        return f'<User {self.id_number}>'


# Test Questions Route
@app.route('/test_questions_registration', methods=['GET'])
def test_questions():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="הרשמה").order_by(Question.id).all()
        return jsonify([q.to_dict() for q in questions])  # Send questions as JSON
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    

# Test Questions Route
@app.route('/test_questions_woman', methods=['GET'])
def test_questions_woman():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="woman").order_by(Question.id).all()
        return jsonify([q.to_dict() for q in questions])  # Send questions as JSON
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/test_insert', methods=['POST'])
def test_insert():
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    try:
        new_user = User(
            id_number=data.get('idNumber'),
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data.get('email'),
            phone=data.get('phone'),
            age=data.get('age'),
            health_fund=data.get('healthFund'),
            gender=data.get('gender'),
            sex=data.get('sex'),
            preferred_language=data.get('preferredLanguage')
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Data inserted successfully!"}), 200
    except Exception as e:
        print(f"Error inserting data: {str(e)}")  # Log error for debugging
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
        app.run(host='0.0.0.0', port=3002)