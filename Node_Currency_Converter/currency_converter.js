const axios = require('axios');

// Alternate coding implementation without using async and await
// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=9560a33d2f4b929c655dd04413a87383&format=1').then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=9560a33d2f4b929c655dd04413a87383&format=1');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
};

const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

    let countriesThatSupportCurrency = response.data.map((country) => {
        return country.name;
    });

    return countriesThatSupportCurrency;
};

getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
})

getCountries('SGD').then((countries) => {
    console.log(countries);
})