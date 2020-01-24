
jsforce.browser.init({
    loginUrl: 'https://hrsv-dev-ed.lightning.force.com',
    clientId : '3MVG9G9pzCUSkzZtHFsROVHXdXdLQ.8B2KiEI.MkUsXOxuh1i8t3b8gd36SAWNgGEK17dUW7jP56rvKz5yWYZ',
    clientSecret: 'E78E57DACB3616D4A696A7F1F3E5062D2E668C098D51C09BFC553247347270AD',
    redirectUri: 'http://localhost:8000/index.html'
});
//jsforce.browser.login();
// jsforce.browser.login('hrsv@hrsv.com', 'svetacraft1985', function(err, res) {
//     if (err) { return console.error(err); }
//     console.log(res);
// });

let conn;

if (jsforce.browser.isLoggedIn()) {
    console.log('loogged in');
    conn = jsforce.browser.connection;
    startQuery();
} else {
    console.log('not loogged in');
    jsforce.browser.on('connect', function(_conn) {
        console.log('connected', _conn);
        conn = _conn;
        startQuery();
    });
}

function startQuery() {
    conn.query('SELECT Id, Name FROM Account', function(err, res) {
        if (err) { return console.error(err); }
        console.log(res);
    });
    conn.apex.get('/page?address=%2F01p2v00000Mg9Ec', 'USD', function(err, res) {
        if (err) { return console.error(err); }
        console.log("response: ", res);
    });
}

function getDateFormat(dateThis) {
    return (`${dateThis.getFullYear()}-${dateThis.getMonth() + 1}-${dateThis.getDate()}`);
}

class ExchangeService {
    _api = `https://api.exchangeratesapi.io/`;

    async getResource(url) {
        const response = await fetch(`${this._api}${url}`);
        if(!response.ok){
            throw new Error(`Could not fetch, received ${response.status}`);
        }

        return await response.json();
    }

    getExchangeOfPeriod(start, end, base){
        return this.getResource(`history?start_at=${start}&end_at=${end}&base=${base}`);
    }

    getExchangeToday(base){
        return this.getResource(`latest?base=${base}`);
    }
}

let exchangeSelect = document.querySelector('#exchangeSelect'),
    startDate = document.getElementById('startDate'),
    endDate = document.getElementById('endDate'),
    baseCurrency = exchangeSelect.value,
    start,
    end;

console.log(baseCurrency);

exchangeSelect.addEventListener('change', () => {
    console.log(exchangeSelect.value)
    baseCurrency = exchangeSelect.value;
});

startDate.addEventListener('input', () => {
   start = startDate.value;
});

endDate.addEventListener('input', () => {
    end = endDate.value;
});


let exchangeBtn = document.getElementById('exchangeBtn');
const ex = new ExchangeService();

exchangeBtn.addEventListener('click', () => {
    console.log('base: ' + baseCurrency);
    ex.getExchangeOfPeriod(start, end, baseCurrency)
        .then((body) => {
            console.log(start + ' ' + end + ' ' + baseCurrency);
            console.log(body.rates);
            const abjArr = Object.entries(body.rates).sort();
            console.log(abjArr);
            document.getElementById('messageEx').classList.add('hidden');

            let htmlcode = ``;
            abjArr.forEach(function (item) {
                htmlcode += `<div style="display: inline-block; margin: 10px;">
                    <span class="label" style="font-size: medium;color: #313f50;">${item[0]}</span> <hr/>`;
                for (let [key, value] of Object.entries(item[1])) {
                   htmlcode += `<span class="label" style="color: #333333">${key} : ${value}</span> <br/>`;
                }
                htmlcode += `</div>`;
            });
            clearBox('dataEx');
            let dataEx = document.getElementById('dataEx');
            dataEx.insertAdjacentHTML('afterBegin', htmlcode);
        })
        .catch((err) => {
            console.log(err);
            document.getElementById('messageEx').classList.remove('hidden');
            document.getElementById('messageEx').innerHTML = `${err}`;
        });

});

function clearBox(elementID) {
    let div = document.getElementById(elementID);
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


