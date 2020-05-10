var fetch = require('./fetch_mail.js');

fetch.retrieve()
    .then( function(subjects) {
	console.log('done!', subjects);
    });
