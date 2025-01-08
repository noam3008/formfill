import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';

const HealthLifestyleForm = () => {
      const [formData, setFormData] = useState({
        smokingPast: '',
        smokingPresent: '',
        drugUse: '',
        alcoholConsumption: '',
        energyLevel: '',
        sleepDuration: '',
        appetite: '',
        exerciseFrequency: '',
        stepsPerDay: '',
        mainConcern: '',
        sleepingProblems: '',
        wakingAtNight: '',
        travelForLeisure: '',
        travelForWork: '',
        booksPerYear: '',
        friendsMeetings: '',
        meditationPractice: '',
        meditationFrequency: '',
        mealsPerDay: '',
        spicyFoodFrequency: '',
        meatFrequency: '',
        chickenFrequency: '',
        vegetableFrequency: '',
        fishFrequency: '',
        fruitsFrequency: '',
        nutsFrequency: '',
        legumesFrequency: '',
        saltySnacksFrequency: '',
        sweetSnacksFrequency: '',
        glutenIntake: '',
        glutenFreeGrainsFrequency: '',
        glutenGrainsFrequency: '',
        oilType: [],
        coffeeTeaFrequency: '',
        waterIntake: '',
        sweetenedDrinksFrequency: '',
        dietaryChanges: '',
        eatingOutFrequency: '',
        stoolFrequencyRemission: '',
        stoolFrequencyDuringAttack: '',
        urinationFrequency: ''
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

      const handleOilTypeChange = (e) => {
        const { options } = e.target;
        const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
        setFormData({
            ...formData,
            oilType: selectedOptions
        });
    };

      const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    navigate("/childhoodquastionaire")
  };


  return (
      <div className="form-container">
          <h2 className="mb-4">Health Lifestyle Form</h2>
          <form onSubmit={handleSubmit}>
              <h2>שאלון בריאות</h2>

              {/* Smoking Section */}
              <div className="col-md-6 mb-3">
                  <h3>עישון</h3>
                  <label>
                      עישון- בעבר לא/ כן - אם כן פרט מספר סיגריות ביום:
                      <input type="text" name="smokingPast" value={formData.smokingPast} onChange={handleChange}/>
                  </label>
                  <label>
                      עישון- בהווה לא/ כן - אם כן פרט מספר סיגריות ביום:
                      <input type="text" name="smokingPresent" value={formData.smokingPresent} onChange={handleChange}/>
                  </label>
              </div>

              {/* Substance Use Section */}
              <div className="col-md-6 mb-3">
                  <h3>שימוש בחומרים</h3>
                  <label>
                      האם אתה צורך היום או בעבר סמים? אם כן איזה סם ובאיזו תדירות?
                      <input type="text" name="drugUse" value={formData.drugUse} onChange={handleChange}/>
                  </label>
                  <label>
                      צריכת אלכהול (פרט כמה מנות אלכוהול בשבוע ממוצע):
                      <input type="text" name="alcoholConsumption" value={formData.alcoholConsumption}
                             onChange={handleChange}/>
                  </label>
              </div>

              {/* Lifestyle Section */}
              <div className="col-md-6 mb-3">
                  <h3>אורח חיים</h3>
                  <label>
                      רמת אנרגיה עייפות במשך היום:
                      <input type="text" name="energyLevel" value={formData.energyLevel} onChange={handleChange}/>
                  </label>
                  <label>
                      אורך שנת לילה ממוצעת:
                      <input type="text" name="sleepDuration" value={formData.sleepDuration} onChange={handleChange}/>
                  </label>
                  <label>
                      תאבון- בריא / ירוד:
                      <input type="text" name="appetite" value={formData.appetite} onChange={handleChange}/>
                  </label>
                  <label>
                      האם את.ה פעיל ספורטיבית- אם כן כמה פעמים בשבוע פרט איזה אימון ספורט:
                      <input type="text" name="exerciseFrequency" value={formData.exerciseFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      הערכה - כמה צעדים אתה צועד ביום ממוצע:
                      <input type="text" name="stepsPerDay" value={formData.stepsPerDay} onChange={handleChange}/>
                  </label>
              </div>

              {/* Mental and Social Health Section */}
              <div className="col-md-6 mb-3">
                  <h3>בריאות נפשית וחברתית</h3>
                  <label>
                      מה הדאגה המרכזית בחייך:
                      <select name="mainConcern" value={formData.mainConcern} onChange={handleChange}>
                          <option value="">בחר</option>
                          <option value="לעיתים נדירות">לעיתים נדירות</option>
                          <option value="לפעמים">לפעמים</option>
                          <option value="לעיתים תכופות">לעיתים תכופות</option>
                      </select>
                  </label>
                  <label>
                      האם יש לך קשיי הרדמות? אם כן אנא ציינו מספר פעמים בלילה:
                      <input type="text" name="sleepingProblems" value={formData.sleepingProblems}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      האם את.ה מתעורר.ת תדיר בלילה?
                      <select name="wakingAtNight" value={formData.wakingAtNight} onChange={handleChange}>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2-3">2-3</option>
                          <option value="4-5">4-5</option>
                          <option value=">5">>5</option>
                      </select>
                  </label>
                  <label>
                      כמה פעמים בשנה את.ה טס.ה לחו"ל לחופש?
                      <select name="travelForLeisure" value={formData.travelForLeisure} onChange={handleChange}>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2-3">2-3</option>
                          <option value="4-5">4-5</option>
                          <option value=">5">>5</option>
                      </select>
                  </label>
                  <label>
                      כמה פעמים בשנה את.ה טס.ה לחו"ל לעבודה?
                      <select name="travelForWork" value={formData.travelForWork} onChange={handleChange}>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2-4">2-4</option>
                          <option value="4-6">4-6</option>
                          <option value="6-8">6-8</option>
                          <option value=">8">>8</option>
                      </select>
                  </label>
                  <label>
                      כמה ספרים את.ה קורא בשנה:
                      <input type="text" name="booksPerYear" value={formData.booksPerYear} onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים את.ה נפגש עם חברים?
                      <select name="friendsMeetings" value={formData.friendsMeetings} onChange={handleChange}>
                          <option value="מעל 4 פעמים בשבוע">מעל 4 פעמים בשבוע</option>
                          <option value="1-3 פעמים בשבוע">1-3 פעמים בשבוע</option>
                          <option value="1-2 פעמים בחודש">1-2 פעמים בחודש</option>
                          <option value="1-2 פעמים בחצי שנה">1-2 פעמים בחצי שנה</option>
                          <option value="1 בשנה">1 בשנה</option>
                          <option value="0 בשנה">0 בשנה</option>
                      </select>
                  </label>
                  <label>
                      האם מתרגל מדיטציה/יוגה/ מיידפולנס באופן קבוע?
                      <select name="meditationPractice" value={formData.meditationPractice} onChange={handleChange}>
                          <option value="אף פעם לא">אף פעם לא</option>
                          <option value="בעבר">בעבר</option>
                          <option value="כיום">כיום</option>
                      </select>
                  </label>
                  <label>
                      האם תרגל באופן קבוע/ מספר פעמים בודדות? (כמה זמן? שבועות\חודשים\שנים?)
                      <input type="text" name="meditationFrequency" value={formData.meditationFrequency}
                             onChange={handleChange}/>
                  </label>
              </div>

              {/* Dietary Section */}
              <div className="col-md-6 mb-3">
                  <h3>תזונה</h3>
                  <label>
                      מספר ממוצע של ארוחות ביום:
                      <input type="text" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל אוכל חריף?
                      <input type="text" name="spicyFoodFrequency" value={formData.spicyFoodFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל בשר?
                      <input type="text" name="meatFrequency" value={formData.meatFrequency} onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל עוף?
                      <input type="text" name="chickenFrequency" value={formData.chickenFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל ירקות?
                      <input type="text" name="vegetableFrequency" value={formData.vegetableFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל דגים?
                      <input type="text" name="fishFrequency" value={formData.fishFrequency} onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל פירות?
                      <input type="text" name="fruitsFrequency" value={formData.fruitsFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל אגוזים?
                      <input type="text" name="nutsFrequency" value={formData.nutsFrequency} onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל קטניות?
                      <input type="text" name="legumesFrequency" value={formData.legumesFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל חטיפים מלוחים?
                      <input type="text" name="saltySnacksFrequency" value={formData.saltySnacksFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל חטיפים מתוקים?
                      <input type="text" name="sweetSnacksFrequency" value={formData.sweetSnacksFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      האם אתה אוכל גלוטן?
                      <select name="glutenIntake" value={formData.glutenIntake} onChange={handleChange}>
                          <option value="כן">כן</option>
                          <option value="לא">לא</option>
                          <option value="נמנע">נמנע</option>
                          <option value="ממעט">ממעט</option>
                      </select>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל דגנים (ללא גלוטן)?
                      <input type="text" name="glutenFreeGrainsFrequency" value={formData.glutenFreeGrainsFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה אוכל דגנים (עם גלוטן)?
                      <input type="text" name="glutenGrainsFrequency" value={formData.glutenGrainsFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      איזה שמן אתה צורך בדר"כ (ניתן לסמן יותר מאחד)
                      <select multiple name="oilType" value={formData.oilType} onChange={handleOilTypeChange}>
                          <option value="קנולה">קנולה</option>
                          <option value="זית">זית</option>
                          <option value="תירס">תירס</option>
                          <option value="סויה">סויה</option>
                          <option value="חמניה">חמניה</option>
                          <option value="חמאה">חמאה</option>
                          <option value="מרגרינה">מרגרינה</option>
                      </select>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה שותה קפה/ תה?
                      <input type="text" name="coffeeTeaFrequency" value={formData.coffeeTeaFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה כוסות מים אתה שותה ביום?
                      <input type="text" name="waterIntake" value={formData.waterIntake} onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בשבוע אתה שותה שתיה ממותקת?
                      <input type="text" name="sweetenedDrinksFrequency" value={formData.sweetenedDrinksFrequency}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      האם ערכת שינוי בדיאטה בעקבות המחלה?
                      <select name="dietaryChanges" value={formData.dietaryChanges} onChange={handleChange}>
                          <option value="כן">כן</option>
                          <option value="לא">לא</option>
                      </select>
                      <span>אם כן פרט מה היו השינויים</span>
                      <input type="text" name="dietaryChangeDetails" value={formData.dietaryChangeDetails}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      כמה פעמים בחודש את.ה אוכל בחוץ/ מזמין אוכל?
                      <select name="eatingOutFrequency" value={formData.eatingOutFrequency} onChange={handleChange}>
                          <option value="כל יום">כל יום</option>
                          <option value="4-6 בשבוע">4-6 בשבוע</option>
                          <option value="2-3 בשבוע">2-3 בשבוע</option>
                          <option value="1 בשבוע">1 בשבוע</option>
                          <option value="2-3 בחודש">2-3 בחודש</option>
                          <option value="1 לחודש">1 לחודש</option>
                          <option value="1 לחודשיים">1 לחודשיים</option>
                          <option value="לעיתים נדירות">לעיתים נדירות</option>
                          <option value="אף פעם">אף פעם</option>
                      </select>
                  </label>
              </div>

              {/* Digestive Health Section */}
              <div className="col-md-6 mb-3">
                  <h3>בריאות מעיים</h3>
                  <label>
                      מתן צואה ברמיסיה - מספר פעמים ביום/ בשבוע:
                      <input type="text" name="stoolFrequencyRemission" value={formData.stoolFrequencyRemission}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      מתן צואה בזמן התקף - מספר פעמים ביום:
                      <input type="text" name="stoolFrequencyDuringAttack" value={formData.stoolFrequencyDuringAttack}
                             onChange={handleChange}/>
                  </label>
                  <label>
                      מתן שתן- מספר פעמים ביום בממוצע:
                      <input type="text" name="urinationFrequency" value={formData.urinationFrequency}
                             onChange={handleChange}/>
                  </label>
              </div>

              <button type="submit">שלח</button>
          </form>
      </div>
  );
};

export default HealthLifestyleForm;
