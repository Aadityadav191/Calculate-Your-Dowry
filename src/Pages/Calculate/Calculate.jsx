import { useState } from 'react';
import './Calculate.css';

function Calculate() {
  // State for form inputs
  const [inputs, setInputs] = useState({
    profession: 'engineer',
    education: 'bachelors',
    location: 'metro',
    familyStatus: 'middleClass',
    gold: 50,
    cash: 0,
    landOwned: 0,
    landLocation: 'village', // Default land location
    hasCar: false,
    hasFurniture: false
  });

  // State for results
  const [result, setResult] = useState(null);

  // Calculation function
  const calculateDowry = () => {
    // Base amounts by profession (in INR)
    const professionBase = {
      doctor: 1000000,
      engineer: 700000,
      lawyer: 800000,
      business: 1200000,
      other: 500000
    };

    // Education multipliers
    const educationMultiplier = {
      phd: 1.5,
      masters: 1.3,
      bachelors: 1.0,
      diploma: 0.8
    };

    // Location multipliers
    const locationMultiplier = {
      metro: 1.5,
      city: 1.2,
      town: 1.0,
      village: 0.7
    };

    // Family status multipliers
    const familyStatusMultiplier = {
      wealthy: 1.8,
      upperMiddle: 1.3,
      middleClass: 1.0,
      lowerMiddle: 0.7
    };

    // Land value per bigha based on location (in INR)
    const landValuePerBigha = {
      metro: 5000000,   // Metro city land value
      city: 3000000,    // City land value
      town: 1000000,    // Town land value
      village: 500000   // Village land value
    };

    // Calculate components
    const baseAmount = professionBase[inputs.profession] || 500000;
    const educationFactor = educationMultiplier[inputs.education] || 1.0;
    const locationFactor = locationMultiplier[inputs.location] || 1.0;
    const familyFactor = familyStatusMultiplier[inputs.familyStatus] || 1.0;
    
    const goldValue = inputs.gold * 5500; // Current gold rate approx
    const cashValue = Number(inputs.cash) || 0;
    const landValue = inputs.landOwned * landValuePerBigha[inputs.landLocation];
    const carValue = inputs.hasCar ? 500000 : 0;
    const furnitureValue = inputs.hasFurniture ? 200000 : 0;

    // Calculate total
    const total = Math.round(
      (baseAmount * educationFactor * locationFactor * familyFactor) + 
      goldValue + 
      cashValue + 
      landValue +
      carValue + 
      furnitureValue
    );

    // Set the result
    setResult({
      base: Math.round(baseAmount * educationFactor * locationFactor * familyFactor),
      gold: goldValue,
      cash: cashValue,
      land: landValue,
      car: carValue,
      furniture: furnitureValue,
      total: total,
      breakdown: [
        { name: "Base Amount", value: Math.round(baseAmount * educationFactor * locationFactor * familyFactor) },
        { name: "Gold", value: goldValue },
        { name: "Cash", value: cashValue },
        ...(landValue > 0 ? [{ name: `Land (${inputs.landOwned} Bigha - ${inputs.landLocation})`, value: landValue }] : []),
        ...(carValue > 0 ? [{ name: "Car", value: carValue }] : []),
        ...(furnitureValue > 0 ? [{ name: "Furniture", value: furnitureValue }] : [])
      ]
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="dowry-calculator">
      <h2>Dowry Calculator</h2>
      
      <div className="calculator-form">
        {/* Personal Details Column */}
        <div className="form-column">
          {/* Profession Selection */}
          <div className="form-group">
            <label>Profession:</label>
            <select 
              name="profession" 
              value={inputs.profession}
              onChange={handleChange}
            >
              <option value="doctor">Doctor</option>
              <option value="engineer">Engineer</option>
              <option value="lawyer">Lawyer</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Education Level */}
          <div className="form-group">
            <label>Education:</label>
            <select 
              name="education" 
              value={inputs.education}
              onChange={handleChange}
            >
              <option value="phd">PhD</option>
              <option value="masters">Master's</option>
              <option value="bachelors">Bachelor's</option>
              <option value="diploma">Diploma</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Residence Location:</label>
            <select 
              name="location" 
              value={inputs.location}
              onChange={handleChange}
            >
              <option value="metro">Metro City</option>
              <option value="city">City</option>
              <option value="town">Town</option>
              <option value="village">Village</option>
            </select>
          </div>

          {/* Family Status */}
          <div className="form-group">
            <label>Family Status:</label>
            <select 
              name="familyStatus" 
              value={inputs.familyStatus}
              onChange={handleChange}
            >
              <option value="wealthy">Wealthy</option>
              <option value="upperMiddle">Upper Middle Class</option>
              <option value="middleClass">Middle Class</option>
              <option value="lowerMiddle">Lower Middle Class</option>
            </select>
          </div>
        </div>

        {/* Assets Column */}
        <div className="form-column">
          {/* Gold (in grams) */}
          <div className="form-group">
            <label>Gold (grams): {inputs.gold}g</label>
            <input
              type="range"
              name="gold"
              min="0"
              max="500"
              value={inputs.gold}
              onChange={handleChange}
            />
          </div>

          {/* Cash Amount */}
          <div className="form-group">
            <label>Cash Amount (₹):</label>
            <input
              type="number"
              name="cash"
              value={inputs.cash}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>

          {/* Land Ownership */}
          <div className="form-group">
            <label>Land Owned (Bigha):</label>
            <div className="land-input-group">
              <input
                type="number"
                name="landOwned"
                value={inputs.landOwned}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
              <select
                name="landLocation"
                value={inputs.landLocation}
                onChange={handleChange}
              >
                <option value="metro">Metro</option>
                <option value="city">City</option>
                <option value="town">Town</option>
                <option value="village">Village</option>
              </select>
            </div>
          </div>

          {/* Additional Items */}
          <div className="form-group checkboxes">
            <label>Additional Assets:</label>
            <div>
              <input
                type="checkbox"
                id="hasCar"
                name="hasCar"
                checked={inputs.hasCar}
                onChange={handleChange}
              />
              <label htmlFor="hasCar">Car (₹5,00,000)</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="hasFurniture"
                name="hasFurniture"
                checked={inputs.hasFurniture}
                onChange={handleChange}
              />
              <label htmlFor="hasFurniture">Furniture (₹2,00,000)</label>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button 
          className="calculate-btn"
          onClick={calculateDowry}
        >
          Calculate Dowry
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div className="results">
          <h3>Estimated Total Dowry: ₹{result.total.toLocaleString('en-IN')}</h3>
          
          <div className="breakdown">
            <h4>You Deserve :</h4>
            <table>
              <tbody>
                {result.breakdown.map((item, index) => (
                  <tr key={index}>
                    <td className="item-name">{item.name}:</td>
                    <td className="item-value">₹{item.value.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="disclaimer">
        <p>⚠️ <strong>Legal Notice:</strong> Dowry is illegal in Nepal under the Dowry Prohibition Act, 1961. 
        This calculator is for Fun purposes only to demonstrate the absurdity of dowry practices.</p>
      </div>
    </div>
  );
}

export default Calculate;