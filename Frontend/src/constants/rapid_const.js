export const profile_options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-profile',
    params: { region: 'US' },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
};

export const history_options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data',
    params: { region: 'US' },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
};