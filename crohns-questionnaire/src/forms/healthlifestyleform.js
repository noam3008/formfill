import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useEffect } from 'react';


const foodItems = [
    { label: 'בחודש האחרון כמה פעמים אכלת אוכל חריף', name: 'spicyFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת בשר', name: 'meatFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת עוף', name: 'chickenFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת ירקות', name: 'vegetableFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת דגים', name: 'fishFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת פירות', name: 'fruitFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת מנת אגוזים', name: 'nutsFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת קטניות', name: 'legumesFood' },
    { label: 'בחודש האחרון כמה פעמים אכלת חטיפים מלוחים', name: 'saltySnacks' },
    { label: 'בחודש האחרון כמה פעמים אכלת חטיפים מתוקים', name: 'sweetSnacks' },
    { label: 'בחודש האחרון כמה פעמים שתית קפה / תה', name: 'drinkingCoffeeOrTea' },
    { label: 'בחודש האחרון כמה פעמים שתית כוסות מים', name: 'drinkingGlassOfWater' },
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
        energyLevel: 0,
        sleepDuration: '',
        wakingUpAtNight :'',
        appetite: 0,
        exerciseFrequency: '',
        preferredLanguage:preferredLanguage,
        stepsPerDay: '',
        mainConcern: '',
        sleepingProblems: '',
        wakingAtNight: '',
        pastsmokingPeriod :'', 
        travelForLeisure: '',
        travelForWork: '',
        smokingPeriod:'',
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
        energyFrequency :0,
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


      const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
      
        setFormData((prevData) => {
          const updatedConcerns = checked
            ? [...prevData.mainConcern, value] // Add to list if checked
            : prevData.mainConcern.filter((concern) => concern !== value); // Remove if unchecked
      
          return {
            ...prevData,
            mainConcern: updatedConcerns,
            ...(value !== "אחר" && { otherConcern: "" }) // Clears "Other" input if not selected
          };
        });
      };
      
    



  const handleChange = (e) => {
    const { name, value } = e.target;

    {
        // Handle other fields
        setFormData((prevState) => ({
            ...prevState,
            [name]: parseInt(value, 10),
            
        }));
        console.log(`Updated ${name} to ${value}`);
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
    navigate("/leisureactivityquestionnaire", { state: { preferredLanguage: formData.preferredLanguage } });
  };


  return (
      <div className="form-container">
          <h2 >שאלון אורח חיים</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group radio-preferred">
          <label htmlFor="isSmokingNow" className="form-label" > 
          {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה מעשן כעת ?' 
                : '  האם את מעשנת כעת ?'}
           </label>
          <div className="form-check">
              <input type="radio" name="isSmokingNow" value="כן" onChange={handleChange} 
                 onClick={() => handleChange({ target: { name: "isSmokingNow", value: formData.isSmokingNow === "כן" ? "" : "כן" } })}
                 checked={formData.isSmokingNow === "כן"}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="isSmokingNow" value="לא" onChange={handleChange}  
                 onClick={() => handleChange({ target: { name: "isSmokingNow", value: formData.isSmokingNow === "לא" ? "" : "לא" } })}
                 checked={formData.isSmokingNow === "לא"}
              /> לא
          </div>
        </div>


        {formData.isSmokingNow === 'כן' && (
          <div className="form-group">
            <label htmlFor="smokingNowNumber"> 
            {preferredLanguage === 'לשון זכר' 
                ? '   פרט את מספר הסיגריות ביום' 
                : '   פרטי את מספר הסיגריות ביום'}
               </label>
            <input type="number" min ="0" name="smokingNowNumber" id="smokingNowNumber" className="form-control" value={formData.smokingNowNumber} onChange={handleChange} 
            />
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
                    <input type="radio" name="smokingPeriod" value="0-1" onChange={handleChange}  
                                     onClick={() => handleChange({ target: { name: "smokingPeriod", value: formData.smokingPeriod === "0-1" ? "" : "0-1" } })}
                                     checked={formData.smokingPeriod === "0-1"}
                    /> 0-1
                </div>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value="2-4" onChange={handleChange} 
                                                         onClick={() => handleChange({ target: { name: "smokingPeriod", value: formData.smokingPeriod === "2-4" ? "" : "2-4" } })}
                                                         checked={formData.smokingPeriod === "2-4"}
                    /> 2-4
                </div>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value="5-7" onChange={handleChange} 
                                                         onClick={() => handleChange({ target: { name: "smokingPeriod", value: formData.smokingPeriod === "5-7" ? "" : "5-7" } })}
                                                         checked={formData.smokingPeriod === "5-7"}
                    /> 5-7
                </div>
                <div className="form-check">
                    <input type="radio" name="smokingPeriod" value=">7" onChange={handleChange} 
                    onClick={() => handleChange({ target: { name: "smokingPeriod", value: formData.smokingPeriod === ">7" ? "" : ">7" } })}
                    checked={formData.smokingPeriod === ">7"}
                    /> >7
                </div>
            </div>
        )}

          {formData.isSmokingNow === 'לא' &&(
            <div className="form-group radio-preferred">
                <label htmlFor="isSmokingPast" className="form-label" > האם עישנת בעבר ?</label>
                <div className="form-check">
                    <input type="radio" name="isSmokingPast" value="כן" onChange={handleChange} 
                    onClick={() => handleChange({ target: { name: "isSmokingPast", value: formData.isSmokingPast === "כן" ? "" : "כן" } })}
                    checked={formData.isSmokingPast === "כן"}
                    /> כן
                </div>
                <div className="form-check">
                    <input type="radio" name="isSmokingPast" value="לא" onChange={handleChange} 
                    onClick={() => handleChange({ target: { name: "isSmokingPast", value: formData.isSmokingPast === "לא" ? "" : "לא" } })}
                    checked={formData.isSmokingPast === "לא"}
                    /> לא
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
                    <input type="radio" name="pastsmokingPeriod" value="0-1" onChange={handleChange} 
                                   onClick={() => handleChange({ target: { name: "pastsmokingPeriod", value: formData.pastsmokingPeriod === "0-1" ? "" : "0-1" } })}
                                   checked={formData.pastsmokingPeriod === "0-1"}
                    /> 0-1
                </div>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value="2-4" onChange={handleChange}  
                                      onClick={() => handleChange({ target: { name: "pastsmokingPeriod", value: formData.pastsmokingPeriod === "2-4" ? "" : "2-4" } })}
                                      checked={formData.pastsmokingPeriod === "2-4"}
                    /> 2-4
                </div>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value="5-7" onChange={handleChange}  
                                      onClick={() => handleChange({ target: { name: "pastsmokingPeriod", value: formData.pastsmokingPeriod === "5-7" ? "" : "5-7" } })}
                                      checked={formData.pastsmokingPeriod === "5-7"}
                    /> 5-7
                </div>
                <div className="form-check">
                    <input type="radio" name="pastsmokingPeriod" value=">7" onChange={handleChange} 
                          onClick={() => handleChange({ target: { name: "pastsmokingPeriod", value: formData.pastsmokingPeriod === ">7" ? "" : ">7" } })}
                          checked={formData.pastsmokingPeriod === ">7"}
                    /> >7
                </div>
            </div>
        )}


        <div className="form-group radio-preferred">
            <label htmlFor="drugUse" className="form-label" >
            {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה צורך היום או בעבר סמים  ?'
                : '   האם את צורכת היום או בעבר סמים  ?'}
                <br></br>
                (ניתן לדלג על השאלה)
               </label>
            <div className="form-check">
                <input type="radio" name="drugUse" value="כן" onChange={handleChange} 
                  onClick={() => handleChange({ target: { name: "drugUse", value: formData.drugUse === "כן" ? "" : "כן" } })}
                  checked={formData.drugUse === "כן"}
                /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="drugUse" value="לא" onChange={handleChange} 
                  onClick={() => handleChange({ target: { name: "drugUse", value: formData.drugUse === "לא" ? "" : "לא" } })}
                  checked={formData.drugUse === "לא"}
                /> לא
            </div>
        </div>


        {formData.drugUse === 'כן' && (
          <div className="form-group">
            <label htmlFor="drugUseDetails">? איזה סם</label>
            <textarea type="text"  name="drugUseDetails" id="drugUseDetails" className="form-control" value={formData.drugUseDetails} onChange={handleChange} />
          </div>
        )}

        {formData.drugUse === 'כן' && (
          <div className="form-group">
            <label htmlFor="drugUseDetailsAmount">? באיזו תדירות</label>
            <textarea type="text"  name="drugUseDetails" id="drugUseDetails" className="form-control" value={formData.drugUseDetails} onChange={handleChange} />
          </div>
        )}
        
        <div className="form-group radio-preferred">
            <label htmlFor="AlcoholUse" className="form-label" >
            {preferredLanguage === 'לשון זכר' 
                ? '  האם אתה שותה אלכוהול '
                : '    האם את שותה אלכוהול  '}
                
               </label>
            <div className="form-check">
                <input type="radio" name="AlcoholUse" value="כן" onChange={handleChange}
                 onClick={() => handleChange({ target: { name: "AlcoholUse", value: formData.AlcoholUse === "כן" ? "" : "כן" } })}
                 checked={formData.AlcoholUse === "כן"}
                /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="AlcoholUse" value="לא" onChange={handleChange} 
                 onClick={() => handleChange({ target: { name: "AlcoholUse", value: formData.AlcoholUse === "לא" ? "" : "לא" } })}
                 checked={formData.AlcoholUse === "לא"}
                /> לא
            </div>
        </div>


        {formData.AlcoholUse === 'כן' && (
          <div className="form-group">
            <label htmlFor="AlcoholAmount">
            {preferredLanguage === 'לשון זכר' 
                ? ' פרט כמה מנות אלכוהול בחודש ממוצע, מנת אלכוהול הינה מנה של 40 מ"ל של משקה חריף/ כוס יין/ כוס בירה'
                : '  פרטי כמה מנות אלכוהול בחודש ממוצע, מנת אלכוהול הינה מנה של 40 מ"ל של משקה חריף/ כוס יין/ כוס בירה'}
                
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
                        value={formData.energyLevel } 
                        onChange={handleChange}
                        onClick={(e) => {
                            if (formData.energyLevel === 0) {
                                handleChange(e); // Ensure the first click registers
                            }
                        }}
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
                ? ' איך תתאר את רמת התאבון שלך?'
                : 'איך תתארי את מצב התאבון שלך ? '}
                </label>
                <div className="slider-container">
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        className="slider"
                        value={formData.appetite } 
                        onClick={(e) => {
                            if (formData.appetite === 0) {
                                handleChange(e); // Ensure the first click registers
                            }
                        }}
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
                <input type="radio" name="exerciseFrequency" value="כן" onChange={handleChange}
                                 onClick={() => handleChange({ target: { name: "exerciseFrequency", value: formData.exerciseFrequency === "כן" ? "" : "כן" } })}
                                 checked={formData.exerciseFrequency === "כן"}
                /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="exerciseFrequency" value="לא" onChange={handleChange}
                                 onClick={() => handleChange({ target: { name: "exerciseFrequency", value: formData.exerciseFrequency === "לא" ? "" : "לא" } })}
                                 checked={formData.exerciseFrequency === "לא"}
                /> לא
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

        <div className="form-group radio-preferred ">
  <label htmlFor="mainConcern" className="form-label">
    {preferredLanguage === 'לשון זכר' 
      ? 'מה הבעיות המרכזיות שמעסיקות אותך בחודש האחרון? בחר' 
      : 'מה הבעיות המרכזיות שמעסיקות אותך בחודש האחרון? בחרי'}
  </label>

  {[
    "כלכלית", 
    "עבודה", 
    "אקלים", 
    "פוליטיקה", 
    "זוגיות", 
    "ילדים", 
    "בריאות שלי", 
    "בריאות של הסובבים", 
    "אחר"
  ].map((option) => (
    <div className="form-check" key={option}>
      <input
        type="checkbox"
        name="mainConcern"
        value={option}
        checked={formData.mainConcern.includes(option)}
        onChange={handleCheckboxChange}
        className="form-check-input"
      />
      <label className="form-check-label">{option}</label>
    </div>
  ))}

  {formData.mainConcern.includes("אחר") && (
    <div className="form-group">
      <label htmlFor="otherConcern" className="form-label">פרט/י</label>
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
                    value="אף פעם לא"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "sleepDifficulty", value: formData.sleepDifficulty === "אף פעם לא" ? "" : "אף פעם לא" } })}
                    checked={formData.sleepDifficulty === "אף פעם לא"}
                    /> אף פעם לא
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="sleepDifficulty"
                    value="לעיתים נדירות"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "sleepDifficulty", value: formData.sleepDifficulty === "לעיתים נדירות" ? "" : "לעיתים נדירות" } })}
                    checked={formData.sleepDifficulty === "לעיתים נדירות"}
                    /> לעיתים נדירות
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="sleepDifficulty"
                    value="לפעמים"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "sleepDifficulty", value: formData.sleepDifficulty === "לפעמים" ? "" : "לפעמים" } })}
                    checked={formData.sleepDifficulty === "לפעמים"}
                    /> לפעמים
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="sleepDifficulty"
                    value="לעיתים תכופות"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "sleepDifficulty", value: formData.sleepDifficulty === "לעיתים תכופות" ? "" : "לעיתים תכופות" } })}
                    checked={formData.sleepDifficulty === "לעיתים תכופות"}
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
                        onClick={() => handleChange({ target: { name: "wakingUpAtNight", value: formData.wakingUpAtNight === "כן" ? "" : "כן" } })}
                        checked={formData.wakingUpAtNight === "כן"}
                        /> כן
                    </div>
                    <div className="form-check">
                        <input
                        type="radio"
                        name="wakingUpAtNight"
                        value="לא"
                        onChange={handleChange}
                        onClick={() => handleChange({ target: { name: "wakingUpAtNight", value: formData.wakingUpAtNight === "לא" ? "" : "לא" } })}
                        checked={formData.wakingUpAtNight === "לא"}
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
                ? '   כמה פעמים טסת בשנה האחרונה לחופש בחו"ל' 
                : '  כמה פעמים טסת בשנה האחרונה לחופש בחו"ל'}
                          
                        </label>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="0" onChange={handleChange} 
                              onClick={() => handleChange({ target: { name: "vacationFlights", value: formData.vacationFlights === "0" ? "" : "0" } })}
                              checked={formData.vacationFlights === "0"}
                            /> 0
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="1" onChange={handleChange}
                                                          onClick={() => handleChange({ target: { name: "vacationFlights", value: formData.vacationFlights === "1" ? "" : "1" } })}
                                                          checked={formData.vacationFlights === "1"}
                            /> 1
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="2-3" onChange={handleChange}
                                                          onClick={() => handleChange({ target: { name: "vacationFlights", value: formData.vacationFlights === "2-3" ? "" : "2-3" } })}
                                                          checked={formData.vacationFlights === "2-3"}
                            /> 2-3
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value="4-5" onChange={handleChange} 
                                                          onClick={() => handleChange({ target: { name: "vacationFlights", value: formData.vacationFlights === "4-5" ? "" : "4-5" } })}
                                                          checked={formData.vacationFlights === "4-5"}
                            /> 4-5
                        </div>
                        <div className="form-check">
                            <input type="radio" name="vacationFlights" value=">5" onChange={handleChange}
                                                          onClick={() => handleChange({ target: { name: "vacationFlights", value: formData.vacationFlights === ">5" ? "" : ">5" } })}
                                                          checked={formData.vacationFlights === ">5"}
                            /> >5
                        </div>
                        </div>

                        <div className="form-group radio-preferred">
                        <label htmlFor="workFlights" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? ' כמה פעמים טסת בשנה האחרונה לחו"ל למטרת עבודה'  
                : '  כמה פעמים טסת בשנה האחרונה לחו"ל למטרת עבודה' }
                            
                        </label>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="0" onChange={handleChange}
                             onClick={() => handleChange({ target: { name: "workFlights", value: formData.workFlights === "0" ? "" : "0" } })}
                             checked={formData.workFlights === "0"}
                            /> 0
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="1" onChange={handleChange}
                             onClick={() => handleChange({ target: { name: "workFlights", value: formData.workFlights === "1" ? "" : "1" } })}
                             checked={formData.workFlights === "1"}
                            /> 1
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="2-3" onChange={handleChange} 
                             onClick={() => handleChange({ target: { name: "workFlights", value: formData.workFlights === "2-3" ? "" : "2-3" } })}
                             checked={formData.workFlights === "2-3"}
                             /> 2-3
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value="4-5" onChange={handleChange} 
                              onClick={() => handleChange({ target: { name: "workFlights", value: formData.workFlights === "4-5" ? "" : "4-5" } })}
                              checked={formData.workFlights === "4-5"}
                            /> 4-5
                        </div>
                        <div className="form-check">
                            <input type="radio" name="workFlights" value=">5" onChange={handleChange}
                             onClick={() => handleChange({ target: { name: "workFlights", value: formData.workFlights === ">5" ? "" : ">5" } })}
                             checked={formData.workFlights === ">5"}
                            /> >5
                        </div>
                        </div>

                        <div className="form-group radio-preferred">
                        <label htmlFor="booksRead" className="form-label">
                        {preferredLanguage === 'לשון זכר' 
                ? ' כמה ספרים קראת בשנה האחרונה'
                : ' כמה ספרים קראת בשנה האחרונה'}
                           
                        </label>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="0" onChange={handleChange} 
                             onClick={() => handleChange({ target: { name: "booksRead", value: formData.booksRead === "0" ? "" : "0" } })}
                             checked={formData.booksRead === "0"}
                            /> 0
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="1" onChange={handleChange} 
                             onClick={() => handleChange({ target: { name: "booksRead", value: formData.booksRead === "1" ? "" : "1" } })}
                             checked={formData.booksRead === "1"}
                            /> 1
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="2-4" onChange={handleChange} 
                             onClick={() => handleChange({ target: { name: "booksRead", value: formData.booksRead === "2-4" ? "" : "2-4" } })}
                             checked={formData.booksRead === "2-4"}
                            /> 2-4
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="4-6" onChange={handleChange}
                              onClick={() => handleChange({ target: { name: "booksRead", value: formData.booksRead === "4-6" ? "" : "4-6" } })}
                              checked={formData.booksRead === "4-6"}
                            /> 4-6
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value="6-8" onChange={handleChange} 
                             onClick={() => handleChange({ target: { name: "booksRead", value: formData.booksRead === "6-8" ? "" : "6-8" } })}
                             checked={formData.booksRead === "6-8"}
                            /> 6-8
                        </div>
                        <div className="form-check">
                            <input type="radio" name="booksRead" value=">8" onChange={handleChange}
                             onClick={() => handleChange({ target: { name: "booksRead", value: formData.booksRead === ">8" ? "" : ">8" } })}
                             checked={formData.booksRead === ">8"}
                            /> >8
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
                            value={formData.energyFrequency || 0} 
                            id="energyFrequency"
                            name="energyFrequency"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.energyFrequency === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
                        />
                        
                        <div className="slider-labels">
                            <span value="1">מעל 4 פעמים בשבוע</span>
                            <span value="2">פעם 1 - שלוש פעמים בשבוע</span>
                            <span value="3">פעם 1 - 2 פעמים בחודש</span>
                            <span value="4"> פעם 1 - שתי פעמים בחצי שנה</span>
                            <span value="5">פעם 1 בשנה</span>
                            <span value="6">בשנה  0 פעמים </span>
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
                    <input type="radio" name="meditationPractice" value="אף פעם לא" onChange={handleChange} 
                          onClick={() => handleChange({ target: { name: "meditationPractice", value: formData.meditationPractice === "אף פעם לא" ? "" : "אף פעם לא" } })}
                          checked={formData.meditationPractice === "אף פעם לא"}
                    /> אף פעם לא
                </div>
                <div className="form-check">
                    <input type="radio" name="meditationPractice" value="בעבר" onChange={handleChange} 
                          onClick={() => handleChange({ target: { name: "meditationPractice", value: formData.meditationPractice === "בעבר" ? "" : "בעבר" } })}
                          checked={formData.meditationPractice === "בעבר"}
                    /> בעבר
                </div>
                <div className="form-check">
                    <input type="radio" name="meditationPractice" value="כיום" onChange={handleChange}
                          onClick={() => handleChange({ target: { name: "meditationPractice", value: formData.meditationPractice === "כיום" ? "" : "כיום" } })}
                          checked={formData.meditationPractice === "כיום"}
                    /> כיום
                </div>
            </div>
        </div>

      <div className="form-group">
        <label>
        {preferredLanguage === 'לשון זכר' 
                ? '?כמה ארוחות אתה אוכל ביום ממוצע '
                : '  ?כמה ארוחות את אוכלת ביום ממוצע '}


        </label>
        <select
          name="averageMeals"
          onChange={handleInputChange}
          value={answers.averageMeals || ""}
          className="form-select"
        >
          <option value="">
            
          {preferredLanguage === 'לשון זכר' 
                ? 'בחר'
                : ' בחרי'}
            בחר</option>
          {['1', '2', '3', '4', '5', '6', '>6'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {foodItems.map((item) => (
  <div key={item.name} className="form-group">
    <label>{item.label}</label>
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
        max="100"
        name={item.name}
        value={answers[item.name] ?? ""} // Ensure 0 is selectable
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
                <input type="radio" name="glutenIntake" value="כן" onChange={handleChange}
                 onClick={() => handleChange({ target: { name: "glutenIntake", value: formData.glutenIntake === "כן" ? "" : "כן" } })}
                 checked={formData.glutenIntake === "כן"}
                /> כן
            </div>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="לא" onChange={handleChange} 
                 onClick={() => handleChange({ target: { name: "glutenIntake", value: formData.glutenIntake === "לא" ? "" : "לא" } })}
                 checked={formData.glutenIntake === "לא"}
                /> לא
            </div>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="נמנע" onChange={handleChange}
                 onClick={() => handleChange({ target: { name: "glutenIntake", value: formData.glutenIntake === "נמנע" ? "" : "נמנע" } })}
                 checked={formData.glutenIntake === "נמנע"}
                /> 
                {preferredLanguage === 'לשון זכר' 
                ? ' נמנע'
                : ' נמנעת'}
            </div>
            <div className="form-check">
                <input type="radio" name="glutenIntake" value="ממעט" onChange={handleChange}
                 onClick={() => handleChange({ target: { name: "meditationPractice", value: formData.meditationPractice === "כיום" ? "" : "כיום" } })}
                 checked={formData.meditationPractice === "כיום"}
                /> 
                {preferredLanguage === 'לשון זכר' 
                ? ' ממעט'
                : ' ממעטת'}
            </div>
        </div>

        <div className="form-group  radio-preferred">
            <label className="form-label">בחודש האחרון, כמה פעמים בשבוע אכלת דגנים (ללא גלוטן) אורז, תירס, קינואה, טף, דוחן וכו'</label>
            <div className="form-check">
                <input type="number" min = "0" name="grainFrequencyWeek" min="0" placeholder="מספר פעמים בשבוע" onChange={handleChange} />
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
            בחודש האחרון כמה פעמים שתית שתייה ממותקת?
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
                        onClick={() => handleChange({ target: { name: "dietChange", value: formData.dietChange === "כן" ? "" : "כן" } })}
                        checked={formData.dietChange === "כן"}
                        /> כן
                    </div>
                    <div className="form-check">
                        <input
                        type="radio"
                        name="dietChange"
                        value="לא"
                        onChange={handleChange}
                        onClick={() => handleChange({ target: { name: "dietChange", value: formData.dietChange === "לא" ? "" : "לא" } })}
                        checked={formData.dietChange === "לא"}
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
                : '         כמה פעמים בחודש את אוכלת בחוץ/ מזמינה אוכל'}
                         
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


                    <h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 6 מתוך 15" : " שלחי שאלון מספר 7 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>


        </form>
      </div>
  );
};

export default HealthLifestyleForm;
