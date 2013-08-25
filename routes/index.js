/**
 * GET home page.
 */

// Homepage view
module.exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
};

// Callout form view
module.exports.callout = require('./callout');

// Redemption view
module.exports.redemption = require('./redemption');