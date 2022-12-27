import React, { useState } from 'react';
import '../style.css';
import cogoToast from 'cogo-toast';

let popRegen = true;

function PasswordGenerator() {

    //== Variables ==//
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [strength, setStrength] = useState("Weak Password");
    const [indicatorColor, setIndicatorColor] = useState("red");

    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    //== Functions ==//
    

    // Generate Password //
    const generatePassword = () => {
        
        // Build the character set to choose from
        let charSet = 'abcdefghijklmnopqrstuvwxyz';

        let secScore = 1;

        if (includeUppercase) {
            charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            secScore += 1;
        }

        if (includeNumbers) {
            charSet += '01234567890123456789';
            secScore += 1;
        }

        if (includeSymbols) {
            charSet += '!@#$%^&*()!@#$%^&*()';
            secScore += 1;
        }
        
        secScore = secScore * length;

        setStrength("Weak Password");
        setIndicatorColor("red");

        if (secScore > 20) {
            setStrength("Moderate Password");
            setIndicatorColor("orange");
        }

        if (secScore > 30) {
            setStrength("Strong Password");
            setIndicatorColor("green");
        }

        // Generate a random string of characters
        let password = '';
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * charSet.length);
            password += charSet[index];
        }
        setPassword(password);
    };
    if (popRegen) {
        generatePassword();
        popRegen = false;
    };

    // Handle Slider Change //
    const handleSliderChange = (event) => {
        setLength(event.target.value);
        generatePassword();
    };

    // Copy to Clipboard //
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        cogoToast.success('Password copied to clipboard', {position: 'bottom-center'});
    }


    // Toggles //
    const toggleIncludeUppercase = () => {
        //setIncludeUppercase(!includeUppercase);
        setIncludeUppercase(prevCheck => !prevCheck);
        popRegen = true;
    };

    const toggleIncludeNumbers = () => {
        setIncludeNumbers(!includeNumbers);
        popRegen = true;
    };

    const toggleIncludeSymbols = () => {
        setIncludeSymbols(!includeSymbols);
        popRegen = true;
    };

    
    return (
        <>
            {/* Back Button */}
            <a href="/" className="button unselectable">Back</a>

            {/* Main div that contains the 2 tabs */}
            <div className="tabs" >
                <h1 className='unselectable'>Password Generator</h1>
                
                {/* 2 Tab Buttons */}
                <input type="radio" id="tab1" name="tab-control" defaultChecked />
                <input type="radio" id="tab2" name="tab-control" />

                
                <ul>

                    {/* Characters */}
                    <li title="Characters">
                        <label htmlFor="tab1" role="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-letter-case" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="17.5" cy="15.5" r="3.5" fill="none"></circle>
                            <path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" fill="none"></path>
                            <path d="M3 13h7" fill="none"></path>
                            <path d="M21 12v7" fill="none"></path>
                        </svg>

                            <br/>
                            <span>Characters</span>
                        </label>
                    </li>

                    {/* Words */}
                    <li title="Words">
                        <label htmlFor="tab2" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-align-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="12" x2="14" y2="12"></line>
                            <line x1="4" y1="18" x2="18" y2="18"></line>
                        </svg>

                            <br/>
                            <span>Words</span>
                        </label>
                    </li>
                </ul>


                {/* Slider Thing */}
                <div className="slider">
                    <div className="indicator"></div>
                </div>


                <div className="content" >

                    <section>
                        <h2>Generated Password</h2>

                        <h3 className='unselectable'>Generated Password</h3>

                        {/* Password Box */}
                        <div className="passwordBox" onClick={copyToClipboard}>
                            <p>{password}</p>
                        </div>

                        
                        {/* Password Length Slider --min:0; --max:100; --step:5; --value:75; --text-value:"75";  */}


                        <div className="range-container">

                            {/* Length */}
                            <label className='sideLabel unselectable'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ruler-3" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M19.875 8c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z"></path>
                                    <path d="M9 8v2"></path>
                                    <path d="M6 8v3"></path>
                                    <path d="M12 8v3"></path>
                                    <path d="M18 8v3"></path>
                                    <path d="M15 8v2"></path>
                                </svg>
                                {length}
                            </label>

                            {/* Password Strength */}
                            <label className='sideLabel unselectable' style={{color: indicatorColor}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shield-lock" width="24" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
                                    <circle cx="12" cy="11" r="1"></circle>
                                    <line x1="12" y1="12" x2="12" y2="14.5"></line>
                                </svg>
                                {strength}
                            </label>

                            <input type="range" max="100" min="8" value={length} onInput={handleSliderChange}/>
                        </div>
                        


                        {/* Include Capitals Toggle */}
                        <input type="checkbox" name="toggle_boxes" className="mobileToggle" id="include_uppercase" onClick={toggleIncludeUppercase} />
                        <label htmlFor="include_uppercase"></label>
                        <span title="Allows generator to use uppercase characters (A - Z)" className="unselectable">
                            Include Uppercase
                        </span>
                        <br className="unselectable"/>

                        {/* Include Numbers Toggle */}
                        <input type="checkbox" name="toggle_boxes" className="mobileToggle" id="include_numbas" onClick={toggleIncludeNumbers} />
                        <label htmlFor="include_numbas"></label>
                        <span title="Allows generator to use numbers (0 - 9)" className="unselectable">
                            Include Numbers
                        </span>
                        <br className="unselectable"/>

                        {/* Include Symbols Toggle */}
                        <input type="checkbox" name="toggle_boxes" className="mobileToggle" id="include_symbas" onClick={toggleIncludeSymbols} />
                        <label htmlFor="include_symbas"></label>
                        <span title="Allows generator to use symbols (!@#$%^&*())" className="unselectable">
                            Include Symbols
                        </span>
                        <br className="unselectable"/>

                        {/* Regenerate Password */}
                        <label className='sideLabel unselectable generate' onClick={generatePassword}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-repeat" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"></path>
                                <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"></path>
                            </svg>
                            Generate
                        </label>

                    </section>

                </div>



            </div>
        </>
    );
}

export default PasswordGenerator;
