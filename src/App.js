import logo from './new_logo.PNG';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { useEffect, useState } from 'react';
import catfoodData from './FoodCatCantEat.json';
import dogfoodData from './FoodDogCantEat.json';

// buttonFunction():


function App() {
  const [dataUri, setDataUri] = useState('');
  const [foodData, setFoodData] = useState('');
  const [dataUri1, setDataUri1] = useState('');
  const [animalData, setAnimalData] = useState('');
  const [foodSafetyMessage, setFoodSafetyMessage] = useState('');
  

  useEffect(() => {
    console.log('SYO START')
    if (!dataUri) return;

    fetch(dataUri).then(res => res.blob()).then(res => {



      const form = new FormData();
      form.append("file", res);


      const options = {
        method: 'POST',
        body: form
      };

      fetch('http://127.0.0.1:5001/', options)
        .then(response => response.json())
        .then(responseData => setFoodData(responseData))
        .catch(err => console.error(err))
    })

  

  }, [dataUri]);

  //dataUri1 is the animal and breeed datauri is the food
  
  useEffect(() => {
    console.log('SYO START')
    if (!dataUri1 || !foodData) return;

    fetch(dataUri1).then(res => res.blob()).then(res => {
      //console.log(res.length)

      const form = new FormData();
      form.append("file", res);
      form.append("food", foodData);

      const options = {
        method: 'POST',
        body: form
      };

      fetch('http://127.0.0.1:5001/photography', options)
        .then(response => response.json())
        .then(response => setAnimalData(response))
        .catch(err => console.error(err))
    })



  }, [foodData, dataUri1]);

  
  useEffect(() => {
    console.log('SYO START');
    if (!foodData || !animalData) return;
  

    const form = new FormData();

    form.append("foodFile", foodData); 
    form.append("animalFile", animalData); 
  
    const options = {
      method: 'POST',
      body: form
    };
  
    fetch('http://127.0.0.1:5001/food_animal_cant_eat', options)
      .then(response => response.json())
      .then(response => console.log(response, 'Combined data response'))
      .catch(err => console.error(err));
  
  }, [foodData, animalData]);
  

    
  const checkFoodSafety = () => {
    if (!animalData || !foodData || !animalData.category) return;

    const foodItem = foodData[0]; // Assuming foodData is an array with one item, e.g., ["Grapes"]

    // Select the appropriate food list based on the animal category
    const relevantFoodData = animalData.category === "Dog" ? dogfoodData : catfoodData;

    // Search for the food item in the relevant data
    const foodInfo = relevantFoodData.find(food => food.name.toLowerCase() === foodItem.toLowerCase());

    if (foodInfo) {
      if (foodInfo.canEat === "No") {
        setFoodSafetyMessage(`${foodItem} is not safe for ${animalData.category}. ${foodInfo.description}`);
      } else {
        setFoodSafetyMessage(`${foodItem} is safe for ${animalData.category}.`);
      }
    } else {
      // If food is not in the hardcoded data, assume it’s safe
      setFoodSafetyMessage(`${foodItem} is safe for ${animalData.category}.`);
    }
  };

  useEffect(() => {
    if (animalData && foodData) {
      checkFoodSafety();
    }
  }, [animalData, foodData]);


  
  return (
    <div className="App">
      <div className='header-container'>

        <img src={logo} className="App-logo" alt="logo" />
        <div className='header-inner-container'>
          <h1 id="main-header">Will It Survive?</h1>
          <h2 id="sub-header">Find out with our awesome website! Learn more about how we can help your beloved pet's health: </h2>
        </div>
        {/* <button id="super-cool-button"> More information</button> */}


      </div>

      <header className="App-header">

        <italicize>"If it dies, it dies"</italicize>...BUT hopefully it doesn't! Make sure your pet's food is safe!

        <div className="webcam-stuff">
          Upload a picture of your food:
          <WebcamCapture dataUri={dataUri} setDataUri={setDataUri}></WebcamCapture>
          <div>
         <p> Now upload a picture of your pet:</p>
          <p>{foodSafetyMessage}</p>
          </div>
          <div className="video-box">
            
 
            {foodData &&
            <WebcamCapture dataUri={dataUri1} setDataUri={setDataUri1} ></WebcamCapture>
          }</div>

        </div>

        {/* <div>
          <div>fooddata {dataUri1} </div>
        </div>
        <div>
          <div>data uri:{dataUri}</div>
          <div>fooddata {foodData} </div>
        </div> */}

      </header>
      <div>
        <h2>@WillItSurvive 2024</h2>
      </div>
    </div>
  );
}

export default App;
