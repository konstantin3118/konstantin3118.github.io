import CityReplacer from './cities/cityReplacer.js';
import CityModal from './cities/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const cityReplacer = new CityReplacer();
    const cityModal = new CityModal();
    
    cityReplacer.init();
    cityModal.init();
});