
from flask import request, jsonify, Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
import boto3
import json


# Use your MySQL credentials (username, password, database name, etc.)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:i~?eZT?.RxrV4oAgYS9>Gm4l]jtQ@database-1.cz2i42m6u7g1.us-east-1.rds.amazonaws.com:3306/dataformanagement'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Woman(db.Model):
    __tablename__ = "woman_answers"  # Ensure it matches your MySQL table name

    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(80), unique=True, nullable=False)
    preferredLanguage = db.Column(db.String(120))
    menstrualLength = db.Column(db.Integer)  # Updated to match column name
    durationSlider = db.Column(db.String(120))  # Updated to match column name (enum in db)
    menstrualPain = db.Column(db.String(120))  # Updated to match column name (enum in db)
    pmsSymptoms = db.Column(db.String(120))  # Updated to match column name (enum in db)
    hasMenstrualCycle = db.Column(db.String(120))  # Updated to match column name
    lastMenstrualPeriod = db.Column(db.Integer)  # Updated to match column name
    pregnancyStatus = db.Column(db.String(120))  # Updated to match column name (enum in db)
    pregnancyCount = db.Column(db.Integer)  # Updated to match column name
    childrenCount = db.Column(db.Integer)  # Updated to match column name
    postpartumDepression = db.Column(db.String(120))# Updated to match column name (enum in db)
    diagnosedDepression = db.Column(db.String(120))  # Updated to match column name (enum in db)
    treatedDepression = db.Column(db.String(120) ) # Updated to match column name (enum in db)
    treatmentMethod = db.Column(db.String(120))  # Updated to match column name
    stillTreated = db.Column(db.String(120))  # Updated to match column name (enum in db)
    contraceptiveUsing = db.Column(db.String(120))  # Updated to match column name (enum in db)
    contraceptiveType = db.Column(db.String(120))  # Updated to match column name (enum in db)
    contraceptiveAgeStarted = db.Column(db.Integer)  # Updated to match column name
    deviceAgeStarted = db.Column(db.Integer)  # Updated to match column name
    isGlulotInPast = db.Column(db.String(120)) # Updated to match column name (enum in db)
    isBikurKavua = db.Column(db.String(120))  # Updated to match column name (enum in db)
    annualVisits = db.Column(db.Integer)  # Updated to match column name (int in db)
    breastSurgeonVisits = db.Column(db.String(120)) # Updated to match column name (enum in db)
    breastSurgeonVisitFrequency = db.Column(db.String(120))  # Updated to match column name (enum in db)
    familyBreastOvarianCancer = db.Column(db.String(120))  # Updated to match column name (enum in db)
    hormonalProfile = db.Column(db.String(120))  # Updated to match column name
    additionalSymptoms = db.Column(db.JSON)  # Updated to match column type (JSON in db)

    def __repr__(self):
        return f'<Woman {self.id_number}>'
    
class PersonalInfo(db.Model):
    __tablename__ = "personal_info"
    
    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(80), db.ForeignKey("Users.id_number"), nullable=False)
    maritalStatus = db.Column(db.String(120), nullable=True)  # Allow NULL
    numberOfChildren = db.Column(db.Integer, nullable=True)
    height = db.Column(db.Float, nullable=True)
    weight = db.Column(db.Float, nullable=True)
    weightChange = db.Column(db.Float, nullable=True)
    changeTime = db.Column(db.String(120), nullable=True)
    diseaseImpact = db.Column(db.String(120), nullable=True)
    currentOccupation = db.Column(db.String(120), nullable=True)
    yearsInOccupation = db.Column(db.Integer, nullable=True)
    employmentType = db.Column(db.String(120), nullable=True)
    dailyActivity = db.Column(db.String(120), nullable=True)
    education = db.Column(db.String(120), nullable=True)
    educationYears = db.Column(db.Integer, nullable=True)
    countryOfBirth = db.Column(db.String(120), nullable=True)
    motherCountryOfBirth = db.Column(db.String(120), nullable=True)
    motherOrigin = db.Column(db.String(120), nullable=True)
    fatherCountryOfBirth = db.Column(db.String(120), nullable=True)
    fatherOrigin = db.Column(db.String(120), nullable=True)
    numberOfSiblings = db.Column(db.Integer, nullable=True)
    familyOrder = db.Column(db.Integer, nullable=True)
    motherAgeAtBirth = db.Column(db.Integer, nullable=True)
    fatherAgeAtBirth = db.Column(db.Integer, nullable=True)
    householdMembers = db.Column(db.Integer, nullable=True)
    petOwner = db.Column(db.String(120), nullable=True)
    petAge = db.Column(db.Integer, nullable=True)
    experiencedLoss = db.Column(db.String(120), nullable=True)
    ageAtLoss = db.Column(db.Integer, nullable=True)
    welfareTreatment = db.Column(db.String(120), nullable=True)


    # Establish relationship to User
    user = db.relationship('User', backref=db.backref('personal_info', lazy=True))

    def __repr__(self):
        return f"<PersonalInfo {self.id}>"




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

    id_number = db.Column(db.String(80), unique=True, nullable=False,primary_key=True)
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


@app.route('/test_questions_registration', methods=['GET'])
def test_questions():
    try:
        print("Fetching registration questions...")
        questions = Question.query.filter_by(category="הרשמה").order_by(Question.id).all()
        if not questions:
            return jsonify({"message": "No questions found for category 'הרשמה'"}), 404
        return jsonify([q.to_dict() for q in questions])
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
    
    
@app.route('/test_questions_personal', methods=['GET'])
def test_questions_personal():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="personal").order_by(Question.id).all()
        if not questions:
            return jsonify({"message": "No questions found"}), 404
        
        questions_data = [q.to_dict() for q in questions]
        app.logger.info(f"Questions data: {questions_data}")
        
        return jsonify(questions_data)  # Send questions as JSON
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/test_questions_medical', methods=['GET'])
def test_questions_medical():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="medical").order_by(Question.id).all()
        if not questions:
            return jsonify({"message": "No questions found"}), 404
        
        questions_data = [q.to_dict() for q in questions]
        app.logger.info(f"Questions data: {questions_data}")
        
        return jsonify(questions_data)  # Send questions as JSON
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
    


def to_boolean(value):
    if value in [None, '']:  
        return None  # Allow nullable values in DB
    if value == "כן":
        return True
    if value == "לא":
        return False
    return value  # Keep original value if it's neither "כן" nor "לא"



        
@app.route('/insert_woman', methods=['POST'])
def insert_woman():
    data = request.json
    print (request.json)

        # Ensure menstrualPain is included
    if "menstrualPain" in data:
        print("Menstrual Pain Value:", data["menstrualPain"])

    if not data:
        return jsonify({"error": "No data received"}), 400

    try:

        new_woman = Woman(
            id_number=data.get('idNumber') or None,
            preferredLanguage=data.get('preferredLanguage'),
            menstrualLength=data.get('menstrualLength') or None,  # Changed to match column name
            durationSlider=data.get('durationSlider') or None,  # Changed to match column name
            menstrualPain=data.get('menstrualPain'),
            pmsSymptoms=data.get('pmsSymptoms') or None,
            hasMenstrualCycle=data.get('hasMenstrualCycle') or None,
            lastMenstrualPeriod=data.get('lastMenstrualPeriod') or None,
            pregnancyStatus=data.get('pregnancyStatus') or None,
            pregnancyCount=data.get('pregnancyCount') or None,
            childrenCount=data.get('childrenCount') or None,
            postpartumDepression=data.get('postpartumDepression') or None,
            diagnosedDepression=data.get('diagnosedDepression') or None,
            treatedDepression=data.get('treatedDepression') or None,
            treatmentMethod=data.get('treatmentMethod') or None,
            stillTreated=data.get('stillTreated') or None,
            contraceptiveUsing=data.get('contraceptiveUsing'),
            contraceptiveType=data.get('contraceptiveType') or None,
            contraceptiveAgeStarted=data.get('contraceptiveAgeStarted') or None,
            deviceAgeStarted=data.get('deviceAgeStarted') or None,
            isGlulotInPast=data.get('isGlulotInPast') or None,
            isBikurKavua=data.get('isBikurKavua') or None,
            annualVisits=data.get('annualVisits') or None,
            breastSurgeonVisits=data.get('breastSurgeonVisits'),
            breastSurgeonVisitFrequency=data.get('breastSurgeonVisitFrequency') or None,
            familyBreastOvarianCancer=data.get('familyBreastOvarianCancer') or None,
            hormonalProfile=data.get('hormonalProfile') or None,
            additionalSymptoms=data.get('additionalSymptoms') or None
        )   

        db.session.add(new_woman)
        db.session.commit()

        return jsonify({"message": "Data inserted successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        app.logger.error(f"Error inserting woman data: {str(e)}")  # Log error
        return jsonify({"error": str(e)}), 500
    
def clean_data(value):
    return None if value == "" else value

@app.route('/submit_personal_info', methods=['POST', 'OPTIONS'])
def submit_personal_info():
    if request.method == 'OPTIONS':  
        return jsonify({"message": "CORS preflight passed"}), 200  # Handle preflight
    data = request.json
    print("Recived data for personal : " ,data)

    if not data:
        return jsonify({"error": "No data received"}), 400

    try:
        # Check if the User with the provided idNumber exists
        user = User.query.filter_by(id_number=data.get('idNumber')).first()
        if not user:
            return jsonify({"error": "User with given idNumber not found"}), 404

        new_personal_info = PersonalInfo(
            id_number=data.get('idNumber'),
            maritalStatus=clean_data(data.get('maritalStatus')),
            numberOfChildren=clean_data(data.get('numberOfChildren')),
            height=clean_data(data.get('height')),
            weight=clean_data(data.get('weight')),
            weightChange=clean_data(data.get('weightChange')),
            changeTime=clean_data(data.get('changeTime')),
            diseaseImpact=clean_data(data.get('diseaseImpact')),
            currentOccupation=clean_data(data.get('currentOccupation')),
            yearsInOccupation=clean_data(data.get('yearsInOccupation')),
            employmentType=clean_data(data.get('employmentType')),
            dailyActivity=clean_data(data.get('dailyActivity')),
            education=clean_data(data.get('education')),
            educationYears=clean_data(data.get('educationYears')),
            countryOfBirth=clean_data(data.get('countryOfBirth')),
            motherCountryOfBirth=clean_data(data.get('motherCountryOfBirth')),
            motherOrigin=clean_data(data.get('motherOrigin')),
            fatherCountryOfBirth=clean_data(data.get('fatherCountryOfBirth')),
            fatherOrigin=clean_data(data.get('fatherOrigin')),
            numberOfSiblings=clean_data(data.get('numberOfSiblings')),
            familyOrder=clean_data(data.get('familyOrder')),
            motherAgeAtBirth=clean_data(data.get('motherAgeAtBirth')),
            fatherAgeAtBirth=clean_data(data.get('fatherAgeAtBirth')),
            householdMembers=clean_data(data.get('householdMembers')),
            petOwner=clean_data(data.get('petOwner')),
            petAge=clean_data(data.get('petAge')),
            experiencedLoss=clean_data(data.get('experiencedLoss')),
            ageAtLoss=clean_data(data.get('ageAtLoss')),
            welfareTreatment=clean_data(data.get('welfareTreatment'))
        )

        # Add the object to the session and commit it to the database
        db.session.add(new_personal_info)
        db.session.commit()

        return jsonify({"message": "Data inserted successfully!"}), 200
    except Exception as e:
        print(f"Error inserting data: {str(e)}")  # Log error for debugging
        db.session.rollback()  # Rollback the session in case of an error
        return jsonify({"error": str(e)}), 500
    


if __name__ == '__main__':
        app.run(host='0.0.0.0', port=3002)