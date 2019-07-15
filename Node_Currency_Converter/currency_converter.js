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

// // Alternate coding implementation without using async and await
// const convertCurrency = (from, to, amount) => {

//     let convertedAmount;

//     return getExchangeRate(from, to).then((rate) => {

//         // note that @convertedAmount is not in the same scope of the following then())
//         // hence, @convertedAmount is not accessible in then().
//         // the workaround is to declare this variable up front.
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);

//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. \nYou can spend it in the following countries: ${countries.join(', ')}`;
//     });
// };

const convertCurrency = async (from, to, amount)=> {
    const exchangeRate = await getExchangeRate(from, to);
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    const countries = await getCountries(to);

    return `${amount} ${from} is worth ${convertedAmount} ${to}. \nYou can spend it in the following countries: ${countries.join(', ')}`;
};

convertCurrency('JPY', 'MYR', 10000).then((message) => {
    console.log(message);
});

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// })

// getCountries('SGD').then((countries) => {
//     console.log(countries);
// })