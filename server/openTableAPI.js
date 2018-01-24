const request = require('request');

const openTableAPI = (localeData, callback) => {
	var restName = localeData.locale.split(',')[0]
	var city = localeData.locale.split(',')[2].slice(1)
	console.log(localeData.locale)
	request(`https://opentable.herokuapp.com/api/restaurants?city=${city}&name=${restName}`, 
		(err, response, body) => {
			if (err) {
				callback(err)
			} else {
		callback(JSON.parse(body))
	}
	})
}

module.exports.openTableAPI = openTableAPI;