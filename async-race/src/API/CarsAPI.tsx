import { LIMIT_CARS_ON_GARAGE_PAGE, LIMIT_CARS_ON_WINNERS_PAGE } from '../constants/constants';

class CarsAPI {
  static async getCarsCount(page: number) {
    const response = await fetch(
      `http://127.0.0.1:3000/garage?_page=${page}_limit=${LIMIT_CARS_ON_GARAGE_PAGE}`
    );
    const countCars = response.headers.get('X-Total-Count');
    return countCars;
  }

  static async getCars(page: number) {
    const response = await fetch(
      `http://127.0.0.1:3000/garage?_page=${page}&_limit=${LIMIT_CARS_ON_GARAGE_PAGE}`
    );
    const data = await response.json();
    return data;
  }

  static async getCar(carId: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`);
    const data = await response.json();
    return data;
  }

  static async CreateCar(name: string, color: string) {
    const response = await fetch('http://127.0.0.1:3000/garage/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, color })
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

  static async updateCar(carId: number, name: string, color: string) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, color })
    });
    const data = await response.json();
    return data;
  }

  static async startStopCarEngine(carId: number, status: string) {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=${status}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    return data;
  }

  static async switchCarEngineDriveMode(carId: number, status: string) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=${status}`, {
        method: 'PATCH'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false };
    }
  }

  static async getWinnersCount(page: number) {
    const response = await fetch(
      `http://127.0.0.1:3000/winners?_page=${page}&_limit=${LIMIT_CARS_ON_WINNERS_PAGE}`
    );
    const countCars = response.headers.get('X-Total-Count');
    return countCars;
  }

  static async getWinners(page: number, sortOptions: string) {
    const response = await fetch(
      `http://127.0.0.1:3000/winners?_page=${page}${sortOptions}&_limit=${LIMIT_CARS_ON_WINNERS_PAGE}`
    );
    const data = await response.json();
    return data;
  }

  static async getWinner(carId: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${carId}`);
    const data = await response.json();
    return data;
  }

  static async createWinner(id: number, wins: number, time: number) {
    const response = await fetch('http://127.0.0.1:3000/winners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, wins, time })
    });
    const data = await response.json();
    return data;
  }

  static async deleteWinner(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  }

  static async updateWinner(id: number, wins: number, time: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wins, time })
    });
    const data = await response.json();
    return data;
  }
}
export default CarsAPI;
