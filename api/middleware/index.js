const validatePayload = keys => (req, res, next) => {
    const payload = req.body;
    for(let key of keys){
        if(payload[key] == null || (typeof payload[key] === 'string' && payload.trim() == null)){
            next({status: 400, customMessage:`${key} needs to be filled out`});
        }
    }
    next();
}

const restricted = (req, res, next) => {
    if(!req.session.user){
        next();
    }else{
        next({status: 401, customMessage: "You are not allowed here"});
    }
}

module.exports = {
    validatePayload,
    restricted
}