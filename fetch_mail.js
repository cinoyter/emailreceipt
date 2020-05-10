var imaps = require('imap-simple');

 
var config = {
    imap: {
        user: 'house@simberman.com',
        password: 'cXzcBSbA',
        host: 'imap.dreamhost.com',
        port: 993,
        tls: true,
        authTimeout: 3000
    }
};

var Fetch = function() {
    return;
};

Fetch.retrieve = function() {

    return imaps.connect(config).then(function (connection) {	
	return connection.openBox('INBOX').then(function () {
            var searchCriteria = [
		'UNSEEN'
            ];
	    
            var fetchOptions = {
		bodies: ['HEADER', 'TEXT'],
		markSeen: false
            };
	    
            return connection.search(searchCriteria, fetchOptions)
		.then(function (messages) {
		    var subjects = messages.map(
			function (res) {
			    var header = res.parts.filter( function (part) {
				return part.which === 'HEADER';
			    })[0];
			    var body = res.parts.filter( function(part) {
				return part.which === 'TEXT';
			    })[0];

			    console.log(header);
			    return {
				from: header.body.from,
				date: header.body.date,
				to: header.body.to,
				subject: header.body.subject,
				body: body.body
			    };
			});
		    
		    return(subjects);
		});
	});
    });


};

module.exports = Fetch;
