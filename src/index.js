import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addOffset, addTileLayer, getAddress, validatIp} from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const key = 'https://geo.ipify.org/api/v2/country?apiKey=at_td6xkKakUDfwHdiiQq62WLkb6OD69&ipAddress=8.8.8.8';



btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});


const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13
});

addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);


function getData() {
    if (validatIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_td6xkKakUDfwHdiiQq62WLkb6OD69&ipAddress=${ipInput.value}`)
            .then(response => response.json())
            .then(setInfo);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const lat = mapData.location.lat;
    const lng = mapData.location.lng;

    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.location.country + ', ' + mapData.location.region;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;
    console.log(mapData);
    map.setView([lat, lng], 13);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);
}
