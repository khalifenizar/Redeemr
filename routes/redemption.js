/**
 * Render Redemption page
 */

Redemption = require('../lib/Redemption');
redemption = new Redemption;

module.exports = function (req, res) {
	// Get redemption data
	redemption.get(req.params.id, function (err, callout) {
		if (err) return console.log('No redemption found.');	

		console.log(callout);

		callout.shortName = callout.name.split(' ')[0];

		// Render view
		res.render('redemption', {
			title: callout.name + ' | Redeemr'
		  , callout: callout
		  , redeemerImg: callout.fbid ? '//graph.facebook.com/' + callout.fbid + '/picture/?width=500&height=500' : '/images/chuck.jpg'
		});
	});
};