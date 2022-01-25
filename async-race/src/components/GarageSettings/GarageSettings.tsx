import './GarageSettings.scss';
import React, { useEffect, useState } from 'react';
import CarsAPI from '../../API/CarsAPI';
import { getRandomNumber, getRandomHexColor } from '../../utils/utils';
import { AMOUNT_RANDOMLY_GENERATED_CARS } from '../../constants/constants';
import carBrands from '../../data/carBrands';
import carModels from '../../data/carModels';

function GarageSettings(props: any): JSX.Element {
  const { selectedCarIdForEdited, isRace } = props;
  const { forceUpdateGarage, setSelectedCarIdForEdited, setIsRace } = props;

  const [newCarName, setNewCarName] = useState('');
  const [newCarColor, setNewCarColor] = useState('#000000');

  const [isCarEditingDisabled, setIsCarEditingDisabled] = useState(true);
  const [carEditingName, setCarEditingName] = useState('');
  const [carEditingColor, setCarEditingColor] = useState('#000000');

  useEffect(() => {
    if (!selectedCarIdForEdited) return;

    async function getDataCar() {
      setIsCarEditingDisabled(false);
      const { name, color } = await CarsAPI.getCar(+selectedCarIdForEdited);
      setCarEditingName(name);
      setCarEditingColor(color);
    }
    getDataCar();
  }, [selectedCarIdForEdited]);

  async function createNewCar(): Promise<void> {
    await CarsAPI.CreateCar({ name: newCarName, color: newCarColor });
    setNewCarName('');
    setNewCarColor('#000000');
    forceUpdateGarage();
  }

  async function updateCar(): Promise<void> {
    await CarsAPI.updateCar(selectedCarIdForEdited, {
      name: carEditingName,
      color: carEditingColor
    });
    setIsCarEditingDisabled(true);
    setCarEditingName('');
    setCarEditingColor('#000000');
    setSelectedCarIdForEdited(null);
    forceUpdateGarage();
  }

  async function generateRandomCars(): Promise<void> {
    const arrayPromises = [];
    for (let i = 0; i < AMOUNT_RANDOMLY_GENERATED_CARS; i += 1) {
      const randomCarBrand = carBrands[getRandomNumber(0, carBrands.length - 1)];
      const randomCarModel = carModels[getRandomNumber(0, carModels.length - 1)];
      const randomHexColor = getRandomHexColor();

      arrayPromises.push(
        CarsAPI.CreateCar({ name: `${randomCarBrand} ${randomCarModel}`, color: randomHexColor })
      );
    }
    await Promise.all(arrayPromises);
    forceUpdateGarage();
  }

  return (
    <div className="GarageSettings">
      <div className="GarageSettings__new-car">
        <input
          className="new-car__name"
          type="text"
          value={newCarName}
          onChange={(e) => setNewCarName(e.target.value)}
        />
        <input
          className="new-car__color"
          type="color"
          value={newCarColor}
          onChange={(e) => setNewCarColor(e.target.value)}
        />
        <button className="button new-car__button-create" type="button" onClick={createNewCar}>
          create
        </button>
      </div>

      <div className="GarageSettings__car-editing">
        <input
          className="car-editing__name"
          type="text"
          value={carEditingName}
          onChange={(e) => setCarEditingName(e.target.value)}
          disabled={isCarEditingDisabled}
        />
        <input
          className="car-editing__color"
          type="color"
          value={carEditingColor}
          onChange={(e) => setCarEditingColor(e.target.value)}
          disabled={isCarEditingDisabled}
        />
        <button
          className="button car-editing__button-update"
          type="button"
          onClick={updateCar}
          disabled={isCarEditingDisabled}
        >
          update
        </button>
      </div>

      <div className="GarageSettings__race-control">
        <button
          className="button race-control__button-race"
          type="button"
          onClick={() => setIsRace(true)}
          disabled={isRace}
        >
          race
        </button>
        <button
          className="button race-control__reset"
          type="button"
          onClick={() => setIsRace(false)}
          disabled={!isRace}
        >
          reset
        </button>
        <button
          className="button race-control__button-generate-cars"
          type="button"
          onClick={generateRandomCars}
        >
          generate cars
        </button>
      </div>
    </div>
  );
}

export default GarageSettings;
