module.exports={
    verifyisUser:function (request, response, next){
       if(request.session.idU===undefined){
           response.redirect('/');
       }else{
           next();
       }
    },
    verifyInvitado: function (request, response,next){
       if(request.session.idU!==undefined){
           response.redirect('/perfil');
       }else{
           next();
       }
    
    }, 
    verifyProtectora: function (request, response,next){
       if(request.session.typeU!=="Protectora"){
           response.redirect('/perfil');
       }else{
           next();
       }
    
    },
    verifyAdoptante: function (request, response,next){
       if(request.session.typeU!=="Adoptante"){
           response.redirect('/perfil');
       }else{
           next();
       }
    
    },
    verifyAdmin: function (request, response,next){
       if(request.session.typeU!=="Administrador"){
           response.redirect('/');
       }else{
           next();
       }
    
    }
};