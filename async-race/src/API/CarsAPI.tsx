import React from 'react';
import { LIMIT_CARS_ON_PAGE } from '../constants/constants';

class CarsAPI {
  static async getCarsCount() {
    const response = await fetch(`http://127.0.0.1:3000/garage?_page=_limit=${LIMIT_CARS_ON_PAGE}`);
    const countCars = response.headers.get('X-Total-Count');
    return countCars;
  }

  static async getCars(page: number) {
    const response = await fetch(
      `http://127.0.0.1:3000/garage?_page=${page}&_limit=${LIMIT_CARS_ON_PAGE}`
    );
    const data = await response.json();
    return data;
  }

  static async getCar(carId: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`);
    const data = await response.json();
    return data;
  }

  static async CreateCar(specification: any) {
    const response = await fetch('http://127.0.0.1:3000/garage/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(specification)
    });
    const data = await response.json();
    return data;
  }

  static async deleteCar(carId: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: 'DELETE'
    });
    return response.status;
  }

  static async updateCar(carId: number, specification: any) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(specification)
    });
    const data = await response.json();
    return data;
  }

  static async startStopCarEngine() {
    console.log('a');
  }

  static async switchCarEngineDriveMode() {
    console.log('a');
  }

  /* TODO: добавить сортировки */
  static async getWinners() {
    const response = await fetch('http://127.0.0.1:3000/winners');
    const data = await response.json();
    return data;
  }

  static async getWinner(carId: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${carId}`);
    const data = await response.json();
    return data;
  }

  /* TODO переделать, получить id и прибавлять победы, лучшая скорость */
  static async createWinner(specification: any) {
    const response = await fetch('http://127.0.0.1:3000/winners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(specification)
    });
    const data = await response.json();
    /* return data; */
  }

  static async deleteWinner() {
    console.log('a');
  }

  static async updateWinner() {
    console.log('a');
  }
}
export default CarsAPI;
