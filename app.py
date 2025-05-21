
from flask import request, jsonify, Flask,make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
import boto3
import json
import pymysql
pymysql.install_as_MySQLdb()


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
    
class CrohnSurveyResponses(db.Model):
    __tablename__ = 'medical_form_first_answers'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_number = db.Column(db.Integer, db.ForeignKey('Users.id_number'), nullable=False)
    diagnosis = db.Column(db.String(255))
    crohn_onset_age = db.Column(db.Integer)
    crohn_diagnosis_age = db.Column(db.Integer)
    current_treatment_type = db.Column(db.String(255))
    treatment_duration = db.Column(db.String(255))
    treatment_change_date = db.Column(db.String(120) ) 
    treatment_change_reason = db.Column(db.Text)
    winter_illnesses_per_year = db.Column(db.Integer)
    doctor_visits_per_year = db.Column(db.Integer)
    allergy_diagnosis_age = db.Column(db.Integer)
    other_chronic_diseases = db.Column(db.String(120) ) 
    additional_chronic_disease_count = db.Column(db.Integer)
    disease_name = db.Column(db.String(255))
    symptom_onset_age = db.Column(db.Integer)
    disease_diagnosis_age = db.Column(db.Integer)
    hospitalizations_last_decade = db.Column(db.String(120) ) 
    hospitalization_details = db.Column(db.Text)
    underwent_surgeries = db.Column(db.String(120) ) 
    surgeries_list = db.Column(db.Text)
    surgery_ages = db.Column(db.Text)
    alternative_medicine = db.Column(db.String(120) ) 
    alternative_medicine_reason = db.Column(db.Text)
    alternative_medicine_type = db.Column(db.String(255))
    alternative_medicine_duration = db.Column(db.String(255))
    alternative_medicine_improvement = db.Column(db.Boolean)
    helpful_treatment = db.Column(db.Text)
    worsening_factors = db.Column(db.Text)
    suspected_trigger = db.Column(db.String(120) ) 
    trigger_details = db.Column(db.Text)
    best_self_care_method = db.Column(db.Text)
    family_chronic_diseases = db.Column(db.String(120) ) 
    family_disease_details = db.Column(db.Text)
    receiving_treatment = db.Column(db.Boolean)
    treatment_changes = db.Column(db.String(120) ) 
    treatment_adherence = db.Column(db.String(120) ) 
    gp_visits_for_crohn = db.Column(db.String(120) ) 
    diagnosed_allergy = db.Column(db.String(120) ) 
    food_sensitivity = db.Column(db.String(120) ) 
    past_hospitalizations = db.Column(db.String(120) ) 
    past_surgeries =db.Column(db.String(120) ) 
    past_alternative_medicine = db.Column(db.String(120) ) 
    alternative_medicine_effect = db.Column(db.String(120) ) 
    family_chronic_disease_history = db.Column(db.String(120) ) 
    treatment_change = db.Column(db.String(120) ) 
    treatment_consistency =db.Column(db.String(120) ) 
    winter_illnesses_frequency = db.Column(db.Integer)
    allergy_type = db.Column(db.Text)
    sensitivity_onset_age = db.Column(db.Integer)
    hospitalization_details_extended = db.Column(db.Text)
    dentist_visits_for_crohn = db.Column(db.String(120) ) 
    mole_check =db.Column(db.String(120) ) 
    crohn_limitations = db.Column(db.Text)
    work_issues_mental_frequency = db.Column(db.Integer)
    medication_without_doctor_amount = db.Column(db.Integer)
    self_esteem = db.Column(db.Text)
    parents_attitude = db.Column(db.Text)
    relationship =db.Column(db.Text)
    work_after_illness = db.Column(db.Text)
    mood = db.Column(db.Text)
    social_life=db.Column(db.Text)
    is_mouth_aftha=db.Column(db.String(120) )
    headache_frequency=db.Column(db.String(120) )
    abdominal_pain_frequency=db.Column(db.String(120) )
    back_pain_frequency=db.Column(db.String(120) )
    joints_pain_frequency=db.Column(db.String(120) )
    chronic_pain=db.Column(db.String(120) )
    mouth_ulcers=db.Column(db.String(120) )
    social_impact=db.Column(db.String(120) )
    self_confidence=db.Column(db.String(120) )
    job_impact=db.Column(db.String(120) )
    mental_health_impact=db.Column(db.String(120) )
    psychological_treatment=db.Column(db.String(120) )
    doctor_due_to_crohn=db.Column(db.String(120) )
    emotional_treatment_impact=db.Column(db.String(120) )
    blood_type=db.Column(db.String(120) )
    regular_medications=db.Column(db.String(120) )
    over_counter_medications=db.Column(db.String(120) )
    outside_activity=db.Column(db.String(120) )
    physical_health_impact=db.Column(db.String(120) )
    mental_health_impact_work=db.Column(db.String(120) )
    family_doctor_visit=db.Column(db.String(120) )
    dentist_doctor_visit=db.Column(db.String(120) )
    points_doctor_visit=db.Column(db.String(120) )
    visit_frequency_family_doctor=db.Column(db.String(120) )
    visit_frequency_dentist=db.Column(db.String(120) )

class TraumaQuestionnaireAnswers(db.Model):
    __tablename__ = 'trauma_questionnaire_answers'
    
    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(255), db.ForeignKey('Users.id_number'), nullable=False)  # ForeignKey to Users table
    preferred_language = db.Column(db.String(255))
    intrusive_memories = db.Column(db.String(255))
    intrusive_dreams = db.Column(db.String(255))
    feeling_of_reexperiencing = db.Column(db.String(255))
    distress_triggers = db.Column(db.String(255))
    physical_reactions = db.Column(db.String(255))
    avoidance_of_thoughts = db.Column(db.String(255))
    avoidance_of_reminders = db.Column(db.String(255))
    memory_gaps = db.Column(db.String(255))
    negative_beliefs = db.Column(db.String(255))
    self_blame = db.Column(db.String(255))
    negative_emotions = db.Column(db.String(255))
    loss_of_interest = db.Column(db.String(255))
    emotional_detachment = db.Column(db.String(255))
    difficulty_feeling_positive_emotions = db.Column(db.String(255))
    future_pessimism = db.Column(db.String(255))
    anger_behaviors = db.Column(db.String(255))
    risky_behaviors = db.Column(db.String(255))
    hypervigilance = db.Column(db.String(255))
    exaggerated_startle_response = db.Column(db.String(255))
    concentration_difficulties = db.Column(db.String(255))
    sleep_difficulties = db.Column(db.String(255))

    # Establishing relationship with Users table (for foreign key reference)
    user = db.relationship('User', backref='trauma_questionnaires', lazy=True)

class DepressionAnswers(db.Model):
    __tablename__ = 'depression_answers'
    
    id = db.Column(db.Integer, primary_key=True)
    id_number = db.Column(db.String(255), db.ForeignKey('Users.id_number'), nullable=False)  # ForeignKey to Users table
    preferred_language = db.Column(db.String(255))
    sleep_difficulties = db.Column(db.String(255))
    loss_of_interest = db.Column(db.String(255))
    feelings_of_guilt = db.Column(db.String(255))
    feelings_of_worthlessness = db.Column(db.String(255))
    appetite_changes = db.Column(db.String(255))
    concentration_difficulties = db.Column(db.String(255))
    concentration_difficulties = db.Column(db.String(255)) 
    suicidal_thoughts = db.Column(db.String(255)) 
    fatigue = db.Column(db.String(255))  
    restlessness = db.Column(db.String(255)) 

    # Establishing relationship with Users table (for foreign key reference)
    user = db.relationship('User', backref='depression_answers', lazy=True)

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

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # New primary key
    id_number = db.Column(db.String(80), nullable=False)  # No longer unique
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Keep email unique
    phone = db.Column(db.String(120))
    age = db.Column(db.Integer)
    health_fund = db.Column(db.String(120))
    gender = db.Column(db.String(10))
    sex = db.Column(db.String(10))
    preferred_language = db.Column(db.String(120))

    def __repr__(self):
        return f'<User {self.id_number}>'

@app.route('/test_questions_trauma', methods=['GET'])
def test_questions_trauma():
    try:
        print("Fetching registration questions...")
        questions = Question.query.filter_by(category="trauma").order_by(Question.id).all()
        if not questions:
            return jsonify({"message": "No questions found for category 'trauma'"}), 404
        return jsonify([q.to_dict() for q in questions])
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500



@app.route('/test_questions_registration', methods=['GET'])
def test_questions():
    try:
        print("Fetching registration questions...")
        questions = Question.query.filter_by(category="reg").order_by(Question.id).all()
        if not questions:
            return jsonify({"message": "No questions found for category 'הרשמה'"}), 404
        return jsonify([q.to_dict() for q in questions])
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/clear-cookie', methods=['GET'])
def clear_cookie():
    resp = make_response(jsonify({"message": "Cookie cleared"}))
    resp.set_cookie('your_cookie_name', '', expires=0)
    return resp

    

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
    

    
    
    # Test Questions Route
@app.route('/test_questions_mspssquationaire', methods=['GET'])
def test_questions_leisure_mspsquastionaire():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="social_support").order_by(Question.id).all()
        return jsonify([q.to_dict() for q in questions])  # Send questions as JSON
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    
# Test Questions Route
@app.route('/test_questions_leisure_activity', methods=['GET'])
def test_questions_leisure_activity():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="leisure_activity").order_by(Question.id).all()
        return jsonify([q.to_dict() for q in questions])  # Send questions as JSON
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    
    

@app.route('/test_questions_depression', methods=['GET'])
def get_questions_depression():
    preferred_language = request.args.get('preferredLanguage', default='לשון זכר', type=str)

    try:
        # Query questions based on preferred language
        questions = Question.query.filter_by(category="mental_health").order_by(Question.id).all()
        
        # Prepare response
        question_list = [{"id": question.id, "question_text": question.question_text} for question in questions]

        # Return the response as JSON
        return jsonify(question_list)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while fetching questions."}), 500
    
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
    
@app.route('/test_questions_health_lifestyle', methods=['GET'])
def test_questions_health_lifestyle():
    try:
        # Fetch all questions, ordered by ID
        questions = Question.query.filter_by(category="health_lifestyle").order_by(Question.id).all()
        if not questions:
            return jsonify({"message": "No questions found"}), 404
        
        questions_data = [q.to_dict() for q in questions]
        app.logger.info(f"Questions data: {questions_data}")
        
        return jsonify(questions_data)  # Send questions as JSON
    except Exception as e:
        app.logger.error(f"Error fetching questions: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/insert_user', methods=['POST'])
def insert_user():
    data = request.json
    print("Received Data:", data)

    if not data:
        return jsonify({"error": "No data received"}), 400

    try:
        # Check if user already exists
        existing_user = User.query.filter_by(id_number=data.get('idNumber')).first()

        if existing_user:
            # Update existing user
            existing_user.first_name = data.get('first_name', existing_user.first_name)
            existing_user.last_name = data.get('last_name', existing_user.last_name)
            existing_user.email = data.get('email', existing_user.email)
            existing_user.phone = data.get('phone', existing_user.phone)
            existing_user.age = data.get('age', existing_user.age)
            existing_user.health_fund = data.get('health_fund', existing_user.health_fund)
            existing_user.gender = data.get('gender', existing_user.gender)
            existing_user.sex = data.get('sex', existing_user.sex)
            existing_user.preferred_language = data.get('preferred_language', existing_user.preferred_language)
            message = "User updated successfully."
        else:
            # Create new user
            new_user = User(
                id_number=data.get('idNumber'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                email=data.get('email'),
                phone=data.get('phone'),
                age=data.get('age'),
                health_fund=data.get('health_fund'),
                gender=data.get('gender'),
                sex=data.get('sex'),
                preferred_language=data.get('preferred_language')
            )
            db.session.add(new_user)
            message = "User created successfully."

        db.session.commit()
        return jsonify({"message": message}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


    
@app.route('/insert_crohn_survey', methods=['POST'])
def insert_crohn_survey():
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    try:
        new_survey = CrohnSurveyResponses(
            id_number=data.get('idNumber'),
            diagnosis=data.get('diagnosis'),
            crohn_onset_age=data.get('crohnAge'),
            crohn_diagnosis_age=data.get('diagnosisAge'),
            current_treatment_type=data.get('treatmentType'),
            treatment_duration=data.get('treatmentDuration'),
            treatment_changes=data.get('treatmentChanges'),
            treatment_adherence=data.get('treatmentAdherence'),
            other_chronic_diseases=True if data.get('chronicDiseases') == "כן" else False,
            additional_chronic_disease_count=data.get('chronicCount', 0),
            disease_name=', '.join([d.get('name', '') for d in data.get('diseases', [])]),
            symptom_onset_age=', '.join([str(d.get('symptomsAge', '')) for d in data.get('diseases', [])]),
            disease_diagnosis_age=', '.join([str(d.get('diagnosisAge', '')) for d in data.get('diseases', [])]),
            hospitalizations_last_decade=True if data.get('hospitalization') == "כן" else False,
            hospitalization_details=data.get('hospitalizationDetails'),
            underwent_surgeries=True if data.get('surgeries') == "כן" else False,
            surgeries_list=data.get('surgeriesList'),
            surgery_ages=data.get('surgeryAges'),
            alternative_medicine=True if data.get('complementaryMedicine') == "כן" else False,
            alternative_medicine_reason=data.get('complementaryMedicineReason'),
            helpful_treatment=data.get('treatmentHelp'),
            worsening_factors=data.get('aggravatesCondition'),
            suspected_trigger=True if data.get('diseaseOnsetEvent') == "כן" else False,
            trigger_details=data.get('triggerDetails'),
            best_self_care_method=data.get('improvesCondition'),
            family_chronic_diseases=True if data.get('backgroundDiseases') == "כן" else False,
            family_disease_details=data.get('familyDiseaseDetails'),
            receiving_treatment=True if data.get('receivingTreatment') == "כן" else False,
            food_sensitivity=True if data.get('foodSensitivity') == "כן" else False,
            diagnosed_allergy=True if data.get('allergies') == "כן" else False,
            past_hospitalizations=True if data.get('pastHospitalizations') == "כן" else False,
            past_surgeries=True if data.get('pastSurgeries') == "כן" else False,
            past_alternative_medicine=True if data.get('pastAlternativeMedicine') == "כן" else False,
            treatment_consistency=True if data.get('treatmentConsistency') == "כן" else False,
            winter_illnesses_frequency=data.get('winterlleness', 0),
            allergy_type=data.get('allergyType'),
            sensitivity_onset_age=data.get('foodSensetivityAge'),
            hospitalization_details_extended=data.get('hospitalizationDetailsExtended'),
            dentist_visits_for_crohn=True if data.get('dentistDoctorVisit') == "כן" else False,
            mole_check=True if data.get('moleCheck') == "כן" else False,
            crohn_limitations=data.get('crohnLimitations'),
            work_issues_mental_frequency=data.get('workIssuesMentalFrequency'),
            medication_without_doctor_amount=data.get('medicationWithoutDoctorAmount'),
            self_esteem=data.get('selfEsteem'),
            parents_attitude=data.get('parentsAttidude'),

            relationship=data.get('relationship'),
            work_after_illness=data.get('workAfterIll'),
            mood=data.get('mood'),
            social_life=data.get('socialLife'),
            is_mouth_aftha=True if data.get('isMouthAftha') == "כן" else False,
            headache_frequency=data.get('headacheFrequency'),
            abdominal_pain_frequency=data.get('abdominalPainFrequency'),
            back_pain_frequency=data.get('backPainFrequency'),
            joints_pain_frequency=data.get('jointsPainFrequency'),
            chronic_pain=data.get('chronicPain'),
            mouth_ulcers=data.get('mouthUlcers'),
            social_impact=data.get('socialImpact'),
            self_confidence=data.get('selfConfidence'),
            job_impact=data.get('jobImpact'),
            mental_health_impact=data.get('mentalHealthImpact'),
            psychological_treatment=data.get('psychologicalTreatment'),
            doctor_due_to_crohn=data.get('doctorduechron'),
            emotional_treatment_impact=data.get('emotionalTreatmentImpact'),
            blood_type=data.get('bloodType'),
            regular_medications=data.get('regularMedications'),
            over_counter_medications=data.get('overCounterMedications'),
            outside_activity=data.get('outsideActivity'),
            physical_health_impact=data.get('physicalHealthImpact'),
            mental_health_impact_work=data.get('mentalHealthImpactWork'),
            family_doctor_visit=data.get('familyDoctorVisit'),
            dentist_doctor_visit=data.get('dentistDoctorVisit'),
            points_doctor_visit=data.get('pointsDoctorVisit'),
            visit_frequency_family_doctor=data.get('visitFrequencyFamilyDoctor'),
            visit_frequency_dentist=data.get('visitFrequencyDentist')
        )

        db.session.add(new_survey)
        db.session.commit()

        return jsonify({"message": "Survey data inserted successfully!"}), 200
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

@app.route('/insert_trauma_questionnaire', methods=['POST'])
def submit_trauma_questionnaire():
    data = request.json
    print("Received Data:", data)

    if not data:
        return jsonify({"error": "No data received"}), 400

    # Ensure that answers are included
    if "answers" in data:
        answers = data["answers"]  # Directly use the answers from the request
        print("Answers Received:", answers)

    try:
        # Constructing the trauma questionnaire data using the received answers
        trauma_questionnaire = TraumaQuestionnaireAnswers(
            id_number=data.get('idNumber') or None,
            preferred_language=data.get('preferredLanguage'),
            intrusive_memories=answers.get('question_1'),
            intrusive_dreams=answers.get('question_2'),
            feeling_of_reexperiencing=answers.get('question_3'),
            distress_triggers=answers.get('question_4'),
            physical_reactions=answers.get('question_5'),
            avoidance_of_thoughts=answers.get('question_6'),
            avoidance_of_reminders=answers.get('question_7'),
            memory_gaps=answers.get('question_8'),
            negative_beliefs=answers.get('question_9'),
            self_blame=answers.get('question_10'),
            negative_emotions=answers.get('question_11'),
            loss_of_interest=answers.get('question_12'),
            emotional_detachment=answers.get('question_13'),
            difficulty_feeling_positive_emotions=answers.get('question_14'),
            future_pessimism=answers.get('question_15'),
            anger_behaviors=answers.get('question_16'),
            risky_behaviors=answers.get('question_17'),
            hypervigilance=answers.get('question_18'),
            exaggerated_startle_response=answers.get('question_19'),
            concentration_difficulties=answers.get('question_20'),
            sleep_difficulties=answers.get('question_21')
        )

        db.session.add(trauma_questionnaire)
        db.session.commit()

        return jsonify({"message": "Data submitted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/insert_depression_answers', methods=['POST'])
def submit_depression_answers():
    data = request.json
    print("Received Data:", data)

    if not data:
        return jsonify({"error": "No data received"}), 400

    # Ensure that answers are included
    if "answers" in data:
        answers = data["answers"]  # answers is now a dictionary
        print("Answers Received:", answers)

    try:
        # Constructing the depression questionnaire data using the received answers
        depression_answers = DepressionAnswers(
            id_number=data.get('idNumber') or None,
            preferred_language=data.get('preferredLanguage'),
            sleep_difficulties=answers.get('0'),
            loss_of_interest=answers.get('1'),
            feelings_of_guilt=answers.get('2'),
            feelings_of_worthlessness=answers.get('3'),
            appetite_changes=answers.get('4'),
            concentration_difficulties=answers.get('5'),
            suicidal_thoughts=answers.get('6'),
            fatigue=answers.get('7'),
            restlessness=answers.get('8')
        )

        db.session.add(depression_answers)
        db.session.commit()

        return jsonify({"message": "Data submitted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500





        
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