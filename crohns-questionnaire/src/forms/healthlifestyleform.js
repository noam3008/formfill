import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useEffect } from 'react';


const foodItems = [
    { label: 'כמות אכילת האוכל החריף', name: 'spicyFood' },
    { label: 'כמות אכילת הבשר', name: 'meatFood' },
    { label: 'כמות אכילת העוף', name: 'chickenFood' },
    { label: 'כמות אכילת הירקות', name: 'vegetableFood' },
    { label: 'כמות אכילת הדגים', name: 'fishFood' },
    { label: 'כמות אכילת הפירות', name: 'fruitFood' },
    { label: 'כמות אכילת מנת האגוזים', name: 'nutsFood' },
    { label: 'כמות אכילת הקטניות', name: 'legumesFood' },
    { label: 'כמות אכילת החטיפים המלוחים', name: 'saltySnacks' },
    { label: 'כמות אכילת החטיפים המתוקים', name: 'sweetSnacks' },
    { label: 'מינון שתיית קפה / תה', name: 'drinkingCoffeeOrTea' },
    { label: 'מינון שתיית כוסות מים', name: 'drinkingGlassOfWater' },
  ];
const HealthLifestyleForm = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {};

      const [formData, setFormData] = useState({
        isSmokingNow: '',
        smokingNowNumber : '',
        isSmokingPast :'',
        drugUse: '',
        drugUseDetails:'',
        AlcoholUse: '',
        AlcoholAmount: '',
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

    
      useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
      }, []); // Empty dependency array to ensure it runs only once when the component mounts
    

    const [timePeriod, setTimePeriod] = useState("week"); // Default is 'week'
    const [answers, setAnswers] = useState({}); // Store the answers dynamically

    const handleTimePeriodChange = (e) => {
        setTimePeriod(e.target.value); // Update the selected time period
        setAnswers({}); // Reset answers when the time period changes
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prev) => ({
          ...prev,
          [name]: Math.max(0, Math.min(10, parseInt(value, 10))), // Clamp value between 0 and 10
        }));
      };
    
    


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "oilType") {
        const checked = e.target.checked; 
        // If checked, add the value to the array; otherwise, remove it
        const updatedOilTypes = checked
            ? [...formData.oilType, value]
            : formData.oilType.filter((item) => item !== value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedOilTypes,
        }));
    } else {
        // Handle other fields
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

  // Update form data
  setFormData((prevFormData) => {
    const updatedFormData = { ...prevFormData, [name]: value };

    // Reset dependent fields when switching options
    if (name === "isSmokingNow" && value === "כן") {
      updatedFormData.isSmokingPast = ""; // Reset past smoking question
      updatedFormData.pastSmokingNumber = ""; // Reset past smoking number
      updatedFormData.pastSmokingPeriod = ""; // Reset past smoking period
    }

    if (name === "isSmokingNow" && value === "לא") {
      updatedFormData.smokingNowNumber = ""; // Reset current smoking number
      updatedFormData.smokingPeriod = ""; // Reset current smoking period
    }

    return updatedFormData;
  });

  };


    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    navigate("/mspssquastionaire", { state: { preferredLanguage: formData.preferredLanguage } });
  };


  return (
      <div className="form-container">
          <h2 >Health Lifestyle Form</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group radio-preferred">
          <label htmlFor="isSmokingNow" className="form-label" > 
          {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה מעשן כעת ?' 
                : '  האם את מעשנת כעת ?'}
           </label>
          <div className="form-check">
              <input type="radio" name="isSmokingNow" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="isSmokingNow" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>


        {formData.isSmokingNow === 'כן' && (
          <div className="form-group">
            <label htmlFor="smokingNowNumber"> 
            {preferredLanguage === 'לשון זכר' 
                ? '   פרט את מספר הסיגריות ביום' 
                : '   פרטי את מספר הסיגריות ביום'}
               </label>
            <input type="number" min ="0" name="smokingNowNumber" id="smokingNowNumber" className="form-control" value={formData.smokingNowNumber} onChange={handleChange} />
          </div>
        )}

        {formData.isSmokingNow === 'כן' && (
            <div className="form-group radio-preferred">
                <label htmlFor="smokingPeriod" className="form-label" >
                {preferredLanguage === 'לשון זכר' 
                ? '  כמה שנים אתה מגדיר את עצמך מעשן (אל תספור תקופות בהן לא עישנת)?' 
                : '   כמה שנים את מגדירה את עצמך מעשנת (אל תספרי תקופות בהן לא עישנת)?'}
                   
                    </label>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value="0-1" onChange={handleChange}  /> 0-1
                </div>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value="2-4" onChange={handleChange}  /> 2-4
                </div>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value="5-7" onChange={handleChange}  /> 5-7
                </div>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value=">7" onChange={handleChange}  /> >7
                </div>
            </div>
        )}

          {formData.isSmokingNow === 'לא' &&(
            <div className="form-group radio-preferred">
                <label htmlFor="isSmokingPast" className="form-label" > האם עישנת בעבר ?</label>
                <div className="form-check">
                    <input type="radio" name="isSmokingPast" value="כן" onChange={handleChange}  /> כן
                </div>
                <div className="form-check">
                    <input type="radio" name="isSmokingPast" value="לא" onChange={handleChange}  /> לא
                </div>
            </div>

          )}

        {formData.isSmokingPast === 'כן' && (
          <div className="form-group">
            <label htmlFor="smokingPastNumber"> 
            {preferredLanguage === 'לשון זכר' 
                ? '    פרט את מספר הסיגריות ביום בתקופה בה עישנת'
                : '   פרטי את מספר הסיגריות ביום בתקופה בה עישנת'}
                
              </label>
            <input type="number" min ="0" name="smokingPastNumber" id="smokingPastNumber" className="form-control" value={formData.smokingPastNumber} onChange={handleChange} />
          </div>
        )}

        {formData.isSmokingPast === 'כן' && (
            <div className="form-group radio-preferred">
                <label htmlFor="pastsmokingPeriod" className="form-label" >
                {preferredLanguage === 'לשון זכר' 
                ? '   כמה שנים עישנת במהלך חייך (אל תספור תקופות בהן לא עישנת)?'
                : '  כמה שנים עישנת במהלך חייך (אל תספרי תקופות בהן לא עישנת)?'}
                    
                   </label>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value="0-1" onChange={handleChange}  /> 0-1
                </div>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value="2-4" onChange={handleChange}  /> 2-4
                </div>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value="5-7" onChange={handleChange}  /> 5-7
                </div>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value=">7" onChange={handleChange}  /> >7
                </div>
            </div>
        )}


        <div className="form-group radio-preferred">
            <label htmlFor="drugUse" className="form-label" >
            {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה צורך היום או בעבר סמים  ?'
                : '   האם את צורכת היום או בעבר סמים  ?'}
                
               </label>
            <div className="form-check">
                <input type="radio" name="drugUse" value="כן" onChange={handleChange}  /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="drugUse" value="לא" onChange={handleChange}  /> לא
            </div>
        </div>


        {formData.drugUse === 'כן' && (
          <div className="form-group">
            <label htmlFor="drugUseDetails">? איזה סם ובאיזו תדירות</label>
            <textarea type="text"  name="drugUseDetails" id="drugUseDetails" className="form-control" value={formData.drugUseDetails} onChange={handleChange} />
          </div>
        )}
        
        <div className="form-group radio-preferred">
            <label htmlFor="AlcoholUse" className="form-label" >
            {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה שותה אלכוהול  ?'
                : '    האם את שותה אלכוהול  ?'}
                
               </label>
            <div className="form-check">
                <input type="radio" name="AlcoholUse" value="כן" onChange={handleChange}  /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="AlcoholUse" value="לא" onChange={handleChange}  /> לא
            </div>
        </div>


        {formData.AlcoholUse === 'כן' && (
          <div className="form-group">
            <label htmlFor="AlcoholAmount">
            {preferredLanguage === 'לשון זכר' 
                ? ' פרט כמה מנות אלכוהול בשבוע ממוצע, מנת אלכוהול הינה מנה של 40 מ"ל של משקה חריף/ כוס יין/ כוס בירה'
                : '  פרטי כמה מנות אלכוהול בשבוע ממוצע, מנת אלכוהול הינה מנה של 40 מ"ל של משקה חריף/ כוס יין/ כוס בירה'}
                
               </label>
            <input type="number" min ="0" name="AlcoholAmount" id="AlcoholAmount" className="form-control" value={formData.AlcoholAmount} onChange={handleChange} />
          </div>
        )}


        <div className="energyLevel">
                <label className="form-label">
                {preferredLanguage === 'לשון זכר' 
                ? ' הגדר את רמת האנרגיה שלך בדרך כלל במשך היום בטווח מ 1-5 כאשר 1 עייף מאוד - 5 מאוד אנרגטי'
                : ' הגדירי את רמת האנרגיה שלך בדרך כלל במשך היום בטווח מ 1-5 כאשר 1 עייפה מאוד - 5 מאוד אנרגטית?'}
                 </label>
                <div className="slider-container">
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        className="slider"
                        id="energyLevel"
                        name="energyLevel"
                        onChange={handleChange}
                    />
                    <div className="slider-labels">
                        <span value="1">1</span>
                        <span value ="2" >2</span>
                        <span value ="3" >3</span>
                        <span value = "4" >4</span>
                        <span value ="5">5</span>
                    </div>
                </div>
        </div>

        <div className="form-group">
            <label htmlFor="sleepDuration">? בחודש האחרון כמה שעות בממוצע ישנת בלילה</label>
            <input type="number" min ="0" name="sleepDuration" id="sleepDuration" className="form-control" value={formData.sleepDuration} onChange={handleChange} />
        </div>


        <div className="appetite">
                <label className="form-label">

                {preferredLanguage === 'לשון זכר' 
                ? '? איך תתאר את רמת התאבון שלך'
                : 'איך תתארי את מצב התאבון שלך ? '}
                </label>
                <div className="slider-container">
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        className="slider"
                        id="appetite"
                        name="appetite"
                        onChange={handleChange}
                    />
                    <div className="slider-labels">
                        <span value="נמוך">נמוך</span>
                        <span value ="ממוצע" >ממוצע</span>
                        <span value ="גבוה" >גבוה</span>
                    </div>
                </div>
        </div>

        <div className="form-group radio-preferred">
            <label htmlFor="exerciseFrequency" className="form-label" >
            {preferredLanguage === 'לשון זכר' 
                ? ' האם אתה נהנה מפעילות ספורטיבית ?' 
                : ' האם את נהנית מפעילות ספורטיבית  ?'}
                
               </label>
            <div className="form-check">
                <input type="radio" name="exerciseFrequency" value="כן" onChange={handleChange}  /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="exerciseFrequency" value="לא" onChange={handleChange}  /> לא
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="stepsPerDay">
            {preferredLanguage === 'לשון זכר' 
                ? '? הערכה - כמה צעדים אתה צועד ביום ממוצע ' 
                : ' ? הערכה - כמה צעדים את צועדת ביום ממוצע '}
                </label>
            <input type="number" min ="0" name="stepsPerDay" id="stepsPerDay" className="form-control" value={formData.stepsPerDay} onChange={handleChange} />
        </div>

        <div className="form-group  radio-preferred">
            <label htmlFor="mainConcern" className="form-label">
            {preferredLanguage === 'לשון זכר' 
                ? '      מה הבעיה המרכזית בחייך ? בחר' 
                : '       מה הבעיה המרכזית בחייך ? בחרי'}
          
            </label>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="כלכלית"
                onChange={handleChange}
                /> כלכלית
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="עבודה"
                onChange={handleChange}
                /> עבודה
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="אקלים"
                onChange={handleChange}
                /> אקלים
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="פוליטיקה"
                onChange={handleChange}
                /> פוליטיקה
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="זוגיות"
                onChange={handleChange}
                /> זוגיות
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="ילדים"
                onChange={handleChange}
                /> ילדים
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="בריאות שלי"
                onChange={handleChange}
                /> בריאות שלי
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="בריאות של הסובבים"
                onChange={handleChange}
                /> בריאות של הסובבים
            </div>
            <div className="form-check">
                <input
                type="radio"
                name="mainConcern"
                value="אחר"
                onChange={handleChange}
                /> אחר
            </div>

            {formData.mainConcern === "אחר" && (
                <div className="form-group">
                <label htmlFor="otherConcern" className="form-label">
                    פרט/י
                </label>
                <input
                    type="text"
                    id="otherConcern"
                    name="otherConcern"
                    className="form-control"
                    value={formData.otherConcern || ""}
                    onChange={handleChange}
                />
                </div>
            )}
            </div>

            <div className="form-group radio-preferred">
                <label htmlFor="sleepDifficulty" className="form-label">
                    האם יש לך קשיי הרדמות?
                </label>
                <div className="form-check">
                    <input
                    type="radio"
                    name="sleepDifficulty"
                    value="לעיתים נדירות"
                    onChange={handleChange}
                    /> לעיתים נדירות
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="sleepDifficulty"
                    value="לפעמים"
                    onChange={handleChange}
                    /> לפעמים
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="sleepDifficulty"
                    value="לעיתים תכופות"
                    onChange={handleChange}
                    /> לעיתים תכופות
                </div>
                </div>

                <div className="form-group radio-preferred">
                    <label htmlFor="wakingUpAtNight" className="form-label">
                    {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה מתעורר תדיר בלילה?' 
                : ' האם את מתעוררת תדיר בלילה?'}
                      
                    </label>
                    <div className="form-check">
                        <input
                        type="radio"
                        name="wakingUpAtNight"
                        value="כן"
                        onChange={handleChange}
                        /> כן
                    </div>
                    <div className="form-check">
                        <input
                        type="radio"
                        name="wakingUpAtNight"
                        value="לא"
                        onChange={handleChange}
                        /> לא
                    </div>

                    {formData.wakingUpAtNight === "כן" && (
                        <div className="form-group">
                        <label htmlFor="wakingUpFrequency" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? ' אנא ציין מספר פעמים בלילה:' 
                : 'אנא צייני מספר פעמים בלילה:'}
                             
                        </label>
                        <input
                            type="number"
                            min="0"
                            name="wakingUpFrequency"
                            id="wakingUpFrequency"
                            className="form-control"
                            value={formData.wakingUpFrequency || ""}
                            onChange={handleChange}
                        />
                        </div>
                    )}
                    </div>

                    <div className="form-group radio-preferred">
                        <label htmlFor="vacationFlights" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? '   כמה פעמים בשנה אתה טס לחו"ל לחופש' 
                : '  כמה פעמים בשנה את טסה לחו"ל לחופש'}
                          
                        </label>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="0" onChange={handleChange} /> 0
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="1" onChange={handleChange} /> 1
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="2-3" onChange={handleChange} /> 2-3
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="4-5" onChange={handleChange} /> 4-5
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value=">5" onChange={handleChange} /> >5
                        </div>
                        </div>

                        <div className="form-group radio-preferred">
                        <label htmlFor="workFlights" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? '   כמה פעמים בשנה אתה טס לחו"ל למטרת עבודה' 
                : '  כמה פעמים בשנה את טסה לחו"ל למטרת עבודה'}
                            
                        </label>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="0" onChange={handleChange} /> 0
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="1" onChange={handleChange} /> 1
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="2-3" onChange={handleChange} /> 2-3
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="4-5" onChange={handleChange} /> 4-5
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value=">5" onChange={handleChange} /> >5
                        </div>
                        </div>

                        <div className="form-group radio-preferred">
                        <label htmlFor="booksRead" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? '  כמה ספרים אתה קורא בשנה'
                : '  כמה ספרים את קוראת בשנה'}
                           
                        </label>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="0" onChange={handleChange} /> 0
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="1" onChange={handleChange} /> 1
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="2-4" onChange={handleChange} /> 2-4
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="4-6" onChange={handleChange} /> 4-6
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="6-8" onChange={handleChange} /> 6-8
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value=">8" onChange={handleChange} /> >8
                        </div>
                        </div>

            <div className="appetite">
                <label className="form-label">
                {preferredLanguage === 'לשון זכר' 
                ? '  כמה פעמים אתה נפגש עם חברים ?'
                : '  כמה פעמים את נפגשת עם חברים '}
                           
               </label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            className="slider"
                            id="energyFrequency"
                            name="energyFrequency"
                            onChange={handleChange}
                        />
                        <div className="slider-labels">
                            <span value="1">מעל 4 פעמים בשבוע</span>
                            <span value="2"> אחת - שלוש פעמים בשבוע </span>
                            <span value="3">אחת - שתי פעמים בחודש</span>
                            <span value="4"> אחת - שתי פעמים בחצי שנה </span>
                            <span value="5">פעם אחת בשנה</span>
                            <span value="6">אפס פעמים בשנה</span>
                        </div>
                    </div>
            </div>

            <div className="form-group radio-preferred">
            <label className="form-label">
            {preferredLanguage === 'לשון זכר' 
                ? ' האם אתה מתרגל מדיטציה/יוגה/ מיידפולנס באופן קבוע?'
                : '  האם את מתרגלת מדיטציה/יוגה/ מיידפולנס באופן קבוע?'}
               
            </label>
            <div className="form-check-group">
                <div className="form-check">
                    <input type="radio" name="meditationPractice" value="אף פעם לא" onChange={handleChange} /> אף פעם לא
                </div>
                <div className="form-check">
                    <input type="radio" name="meditationPractice" value="בעבר" onChange={handleChange} /> בעבר
                </div>
                <div className="form-check">
                    <input type="radio" name="meditationPractice" value="כיום" onChange={handleChange} /> כיום
                </div>
            </div>
        </div>

        <div className="form-group radio-preferred">
        {preferredLanguage === 'לשון זכר' 
                ? ' :בחר עבור איזה פרק זמן תרצה למלאות את שאלון הארוחות '
                : '  :בחרי עבור איזה פרק זמן תרצה למלאות את שאלון הארוחות '}
        <label></label>
        <div>
          <label>
            <input
              type="radio"
              name="timePeriod"
              value="month"
              checked={timePeriod === "month"}
              onChange={handleTimePeriodChange}
            />
            חודש
          </label>
          <label>
            <input
              type="radio"
              name="timePeriod"
              value="week"
              checked={timePeriod === "week"}
              onChange={handleTimePeriodChange}
            />
            שבוע
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>מספר ממוצע של ארוחות ביום</label>
        <select
          name="averageMeals"
          onChange={handleInputChange}
          value={answers.averageMeals || ""}
          className="form-select"
        >
          <option value="">בחר</option>
          {['1', '2', '3', '4', '5', '6', '>6'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {foodItems.map((item) => (
            <div key={item.name} className="form-group">
              <label>
                {item.label} ({timePeriod === "week" ? "בשבוע" : "בחודש"})
              </label>
              {item.type === "select" ? (
                <select
                  name={item.name}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {item.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  min="0"
                  max="10"
                  name={item.name}
                  value={answers[item.name] || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              )}
              </div>
      ))}


        <div className="form-group radio-preferred">
            <label className="form-label">
            {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה אוכל גלוטן?'
                : '   האם את אוכלת גלוטן?'}
                
               </label>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="כן" onChange={handleChange} /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="לא" onChange={handleChange} /> לא
            </div>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="נמנע" onChange={handleChange} /> נמנע
            </div>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="ממעט" onChange={handleChange} /> ממעט
            </div>
        </div>

        <div className="form-group  radio-preferred">
            <label className="form-label">בחודש האחרון, כמה פעמים בשבוע אכלת דגנים (ללא גלוטן) אורז, תירס, קינואה, טף, דוחן וכו'</label>
            <div className="form-check">
                <input type="number" name="grainFrequencyWeek" min="0" placeholder="מספר פעמים בשבוע" onChange={handleChange} />
            </div>
        </div>

        <div className="form-group radio-preferred">
            <label className="form-label">
            {preferredLanguage === 'לשון זכר' 
                ? '  כמה פעמים בשבוע אתה אוכל דגנים (עם גלוטן)'
                : '   כמה פעמים בשבוע את אוכלת דגנים (עם גלוטן)'}
                
              </label>
            <div className="form-check">
                <label className="form-label">מספר פעמים בשבוע:</label>
                <input 
                    type="number" 
                    name="glutenGrainFrequencyWeek" 
                    min="0" 
                    onChange={handleChange} 
                />
            </div>
        </div>

        <div className="form-group radio-preferred">
                <label className="form-label">
                {preferredLanguage === 'לשון זכר' 
                ? '  איזה שמן אתה צורך בדר"כ? (ניתן לסמן יותר מאחד)'
                : '   איזה שמן את צורכת בדר"כ? (ניתן לסמן יותר מאחד)'}
                    
                   </label>
                <div className="form-check-group">
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="קנולה" 
                            onChange={handleChange} 
                        /> קנולה
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="זית" 
                            onChange={handleChange} 
                        /> זית
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="תירס" 
                            onChange={handleChange} 
                        /> תירס
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="סויה" 
                            onChange={handleChange} 
                        /> סויה
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="חמניה" 
                            onChange={handleChange} 
                        /> חמניה
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="חמאה" 
                            onChange={handleChange} 
                        /> חמאה
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            name="oilType" 
                            value="מרגרינה" 
                            onChange={handleChange} 
                        /> מרגרינה
                    </div>
                </div>
            </div>

            <div className="form-group  radio-preferred">
            <label className="form-label">
            {preferredLanguage === 'לשון זכר' 
                ? ' בחודש האחרון כמה פעמים בשבוע אתה שותה שתיה ממותקת?'
                : '  בחודש האחרון כמה פעמים בשבוע את שותה שתיה ממותקת?'}
               </label>
            <div className="form-check">
                <input type="number" name="drinkingSweetAmountPerWeek" min="0" placeholder="מספר פעמים בשבוע" onChange={handleChange} />
            </div>
        </div>


        <div className="form-group radio-preferred">
                    <label htmlFor="dietChange" className="form-label">
                    האם ערכת שינוי בדיאטה בעקבות המחלה?
                    </label>
                    <div className="form-check">
                        <input
                        type="radio"
                        name="dietChange"
                        value="כן"
                        onChange={handleChange}
                        /> כן
                    </div>
                    <div className="form-check">
                        <input
                        type="radio"
                        name="dietChange"
                        value="לא"
                        onChange={handleChange}
                        /> לא
                    </div>

                    {formData.dietChange === "כן" && (
                        <div className="form-group">
                        <label htmlFor="dietChange" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? '       פרט בבקשה מה היו השינויים'
                : '        פרטי בבקשה מה היו השינויים'}
                    
                        </label>
                        <input
                            type="number"
                            min="0"
                            name="dietChange"
                            id="dietChange"
                            className="form-control"
                            value={formData.dietChange || ""}
                            onChange={handleChange}
                        />
                        </div>
                    )}
                    </div>

                    <div className="form-group radio-preferred">
                        <label htmlFor="eatingOutFrequency" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? '         כמה פעמים בחודש אתה אוכל בחוץ/ מזמין אוכל'
                : '         כמה פעמים בחודש את אוכלת בחוץ/ מזמין אוכל'}
                         
                        </label>
                        <div className="form-check-group">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="כל יום"
                                    onChange={handleChange}
                                />
                                כל יום
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="4-6 בשבוע"
                                    onChange={handleChange}
                                />
                                ארבע - שש פעמים בשבוע
                                 
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="2-3 בשבוע"
                                    onChange={handleChange}
                                />
                                שתיים - שלוש פעמים בשבוע
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="1 בשבוע"
                                    onChange={handleChange}
                                />
                                פעם בשבוע
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="2-3 בחודש"
                                    onChange={handleChange}
                                />
                                פעמיים עד שלוש בחודש
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="1 לחודש"
                                    onChange={handleChange}
                                />
                               אחת לחודש
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="1 לחודשיים"
                                    onChange={handleChange}
                                />
                                אחת לחודשיים
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="לעיתים נדירות"
                                    onChange={handleChange}
                                />
                                לעיתים נדירות
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="eatingOutFrequency"
                                    value="אף פעם"
                                    onChange={handleChange}
                                />
                                אף פעם
                            </div>
                        </div>
                    </div>


          <button type="submit" className="btn btn-primary">Submit</button>


        </form>
      </div>
  );
};

export default HealthLifestyleForm;
