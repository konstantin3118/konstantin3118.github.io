import { domainCity } from './config/domain-city.js';
import city from './config/cities.js';

class CityReplacer {
    constructor() {
        this.currentCity = this.detectCity();
        this.textSelectors = {
            '.js-city-name': 'name',
            '.js-city-genitive': 'genitive',
            '.js-city-dative': 'dative',
            '.js-city-accusative': 'accusative',
            '.js-city-instrumental': 'instrumental',
            '.js-city-prepositional': 'prepositional',
            '.js-city-address': 'address'
        };

        this.linkSelectors = {
            '.js-city-phone': {
                href: data => `tel:${data.phone_href}`,
                text: (data, el) => {
                    const phoneSpan = el.querySelector('.header__phone-number');
                    if (phoneSpan) {
                        phoneSpan.textContent = data.phone_display;
                    } else {
                        const icon = el.querySelector('i');
                        el.textContent = data.phone_display;
                        if (icon) {
                            el.insertBefore(icon, el.firstChild);
                        }
                    }
                }
            },
            '.js-city-email': {
                href: data => `mailto:${data.email}`,
                text: (data, el) => {
                    const emailSpan = el.querySelector('.header__email-address');
                    if (emailSpan) {
                        emailSpan.textContent = data.email;
                    } else {
                        const icon = el.querySelector('i');
                        el.textContent = data.email;
                        if (icon) {
                            el.insertBefore(icon, el.firstChild);
                        }
                    }
                }
            },
            '.js-city-telegram': {
                href: data => data.telegram,
                text: (data, el) => {
                    const icon = el.querySelector('i');
                    el.textContent = '';
                    if (icon) el.appendChild(icon);
                }
            },
            '.js-city-whatsapp': {
                href: data => data.whatsapp,
                text: (data, el) => {
                    const icon = el.querySelector('i');
                    el.textContent = '';
                    if (icon) el.appendChild(icon);
                }
            }
        };
    }

    detectCity() {
        const hostname = window.location.hostname;
        const subdomain = hostname.split('.')[0];
        const cityKey = domainCity[`${subdomain}.local`] || 'moscow';
        return city[cityKey];
    }

    updateCityData(cityData = this.currentCity) {
        // Обновляем текстовые поля
        Object.entries(this.textSelectors).forEach(([selector, prop]) => {
            document.querySelectorAll(selector).forEach(el => {
                el.textContent = cityData[prop];
            });
        });

        // Обновляем ссылки
        Object.entries(this.linkSelectors).forEach(([selector, {href, text}]) => {
            document.querySelectorAll(selector).forEach(el => {
                el.href = href(cityData);
                text(cityData, el);
            });
        });
    }

    init() {
        this.updateCityData();
    }
}

export default CityReplacer; 