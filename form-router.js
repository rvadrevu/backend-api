var express = require('express');
var router = express.Router();
const {LocalStorage} = require("node-localstorage");
var localStorage = new LocalStorage('./'); 
var uniqid = require('uniqid');
/* GET item listing. */
router.get('/getFormData', function(req, res, next) {
  res.json({data:JSON.parse(localStorage.getItem('vueFormData')).reverse()});
});

router.post('/saveForm', function(req, res, next) {
	console.log("Inside Save Form Request "+JSON.stringify(req.body));
  let reqest = req.body
  reqest.uid = uniqid()
  saveDataToLocalStore(reqest)
  res.json({status:"success"});
  next();
});

function saveDataToLocalStore(data)
{
    var allData = [];
    if(localStorage.getItem('vueFormData')){
      allData = JSON.parse(localStorage.getItem('vueFormData')) || [];
    }
    allData.push(data);    
    localStorage.setItem('vueFormData', JSON.stringify(allData));
}
module.exports = router;