const {unitMap} = require('../controllers/convertHandler')

const ValidateInput = (req,res,next) => {
    const input = req.query.input

    if(!input) {
        return res.status(400).send('invalid unit')
    }
  
    let invalidNum=false, invalidUnit=false
    let initNum, initUnit

    for(let i=input.length-1; i>-1; i--) {
        if(/[^a-z]/i.test(input[i])) {
            initNum = input.substring(0,i+1)
            initUnit = input.substring(i+1)
            break;
        }
    }

    if(!initNum){
        initNum = '1'
        initUnit = input;
    }

    initUnit = initUnit.toLowerCase()

    if(!initUnit || !unitMap.hasOwnProperty(initUnit)) {
        invalidUnit = 1
    }
    
    if(initNum.endsWith('.')) {
        initNum = initNum.replace('.','')
    }

    const divisionPresent = initNum.indexOf('/')!=-1 ? 1 : 0

    if(initNum.replaceAll(/[\d\.]/g,'').length-divisionPresent>0) {
        invalidNum = 1
    }

    if(divisionPresent) {
        let parts = initNum.split('/').map(item=>Number(item))
        initNum = Math.round((parts[0]/parts[1]+Number.EPSILON)*100000)/100000
    }

    if(Number.isNaN(initNum)) {
        invalidNum = 1
    }
    
    if(invalidNum && invalidUnit) {
        return res.status(200).send('invalid number and unit')
    } else if(invalidNum) {
        return res.status(200).send('invalid number')
    } else if(invalidUnit) {
        return res.status(200).send('invalid unit')
    } else {
        req.query.initNum = initNum
        req.query.initUnit = initUnit
        next()
    }
}

module.exports = ValidateInput

