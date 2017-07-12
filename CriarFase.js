function CriarFase (){
  this.fase = 1;
  this.tempo = 0;
  //this.partida = true;
  this.inimigos = [];
};

CriarFase.prototype.ondas = function(desafio){

  //if(this.partida){
    this.inimigos = [];
    if(desafio.fase == 1){
	    for (var i = 0; i < 4; i++) {
        var inimigo = new Inimigo();
        inimigo.x = 48 * (2*(i+1));
        inimigo.y = -32;
        inimigo.vy = 40;
        inimigo.width = 32;
        inimigo.height = 32;
        inimigo.imgkey = "enemy1";
        this.inimigos.push(inimigo);
        //console.log("Fase 1");
  	  }
    } else if(desafio.fase == 2){
        for (var i = 0; i < 9; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 40 * (2*(i+1));
          inimigo.y = -64;
          if(i >= 5){
            inimigo.x =  48 * (2*(i-4));
            inimigo.y = -32;
          }
          inimigo.vy = 40;
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "enemy2";
          this.inimigos.push(inimigo);
          //console.log(this.inimigos[i]);
      }
    } else if (desafio.fase == 3){
        for (var i = 0; i < 3; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 30 * (4*(i+1));
          inimigo.y = 0 - (32*i+1);
          inimigo.vy = 80 * (i+1);
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "enemy3";
          this.inimigos.push(inimigo);
          //console.log(this.inimigos[i]);
        }
    } else if (desafio.fase == 4){
        for (var i = 0; i < 5; i++) {
          var inimigo = new Inimigo();
          inimigo.x = 40 * (2*(i+1));
          inimigo.y = -128 + (16*(i+1));
          inimigo.vy = 150 - (5*i);
          inimigo.width = 32;
          inimigo.height = 32;
          inimigo.imgkey = "enemy4";
          this.inimigos.push(inimigo);
          //console.log(this.inimigos[i]);
      }
    }

    return this.inimigos;
};