const fs = require("fs");

module.exports = function handleFile(data){
    //verifica se o arquivo existe
    if(!fs.existsSync(__dirname + "/urls.json")){
      //se não existir ele cria
      createJson(data);
    }else{
      //se existir ele busca
      fs.readFile(__dirname + "/urls.json", "utf-8", (err, data) => {
        if (err) console.log(err);
        else{
          // deleteFile();
          createJson(data);
        } 
      });
    }
  };
  
  function createJson() {
    fs.appendFile(__dirname + "/urls.json", JSON.stringify(), (err) => {
      if (err) console.log(err);
      else console.log("The file has been saved!");
    });
  }
  
  function deleteFile(){
    fs.unlink(__dirname + "/urls.json", (err) =>{
      if(err) console.log("erro: " + err);
      else console.log('The file has been removed')
    });
    
  }