import city from './config/cities.js';
import { domainCity } from './config/domain-city.js';

export default class CityModal {
    constructor() {
        this.modalBody = document.querySelector('#cityModal .modal-body .city-list');
        if (!this.modalBody) {
            console.error('City modal structure not found');
            return;
        }
        const currentSubdomain = window.location.hostname.split('.')[0];
        this.currentCityKey = domainCity[`${currentSubdomain}.local`] || 'moscow';
    }

    get sortedCities() {
        return Object.entries(city)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name, 'ru'))
            .map(([key, cityData]) => ({key, ...cityData}));
    }

    createCityLink(cityData) {
        const cityLink = document.createElement('a');
        cityLink.href = '#';
        cityLink.className = 'city-link';
        cityLink.textContent = cityData.name;
        if (cityData.key === this.currentCityKey) {
            cityLink.classList.add('active');
        }
        return cityLink;
    }

    fillCities() {
        if (!this.modalBody) return;
        try {
            this.modalBody.innerHTML = '';
            // Группируем города по первой букве
            const grouped = {};
            this.sortedCities.forEach(city => {
                const letter = city.name[0].toUpperCase();
                if (!grouped[letter]) grouped[letter] = [];
                grouped[letter].push(city);
            });
            // Рендерим буквы и города
            Object.entries(grouped).forEach(([letter, cities]) => {
                // Заглавная буква
                const letterDiv = document.createElement('div');
                letterDiv.className = 'city-letter';
                letterDiv.textContent = letter;
                this.modalBody.appendChild(letterDiv);
                // Города этой буквы одной строкой
                const rowDiv = document.createElement('div');
                rowDiv.className = 'city-row';
                cities.forEach(cityData => {
                    rowDiv.appendChild(this.createCityLink(cityData));
                });
                this.modalBody.appendChild(rowDiv);
            });
        } catch (error) {
            console.error('Error filling cities:', error);
        }
    }

    init() {
        this.fillCities();
    }
}
