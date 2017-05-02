function Level (){
  this.inimigos = [];
  this.shots = [];
  this.message = "";
  this.distancia = 80;
  this.score = 0;
  this.life = 3;
  this.music = true;
  this.end = false;
  this.fases = {tempo: key.tempo, fase: key.fase};
}

// Level.prototype.init = function () {
//   for (var i = 0; i <= this.inimigosQtd; i++) {
//     if(this.colunas > 0){
//       var inimigo = new Inimigo();
//       var eixoX = 
//       (this.distancia + Math.floor((Math.random() * 16) + 1))  * this.colunas;
//       this.colunas--;
//       var eixoY = 50 * this.lanes;
//       inimigo.x = eixoX;
//       inimigo.y = eixoY;
//       inimigo.vy = 40;
//       //inimigo.vy = 0;
//       inimigo.width = 32;
//       inimigo.height = 32;
//       inimigo.imgkey = "enemy1";
//       this.inimigos.push(inimigo);
//     } else if(this.colunas <= 0){
//       this.colunas = 4;
//       this.lanes--;
//     }
//   }
// };

Level.prototype.recebeInimigo = function (enemys, tamanho){
  for (var i = 0; i < tamanho; i++) {
    this.inimigos.push(enemys[i]);
    //console.log(enemys.length);
    console.log(this.inimigos[i]);
  }
}

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.inimigos.length; i++) {
      this.inimigos[i].cair(dt);
    }
    for (var i = this.shots.length-1;i>=0; i--) {
      this.shots[i].mover(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
    for(var i = this.inimigos.length-1;i>=0; i--){
      if(this.inimigos[i].y > 496  ||
         this.inimigos[i].y < -496 ||
         this.inimigos[i].x > 600  ||
         this.inimigos[i].x < -600
        ){
         this.life--;
         this.inimigos.splice(i,1);
      }
    }
};

// Level.prototype.moverAng = function (dt) {
//     for (var i = 0; i < this.inimigos.length; i++) {
//       this.inimigos[i].moverAng(dt);
//     }
//     for (var i = this.shots.length-1; i >= 0; i--) {
//       this.shots[i].moverAng(dt);
//       if(
//         this.shots[i].x >  3000 ||
//         this.shots[i].x < -3000 ||
//         this.shots[i].y >  3000 ||
//         this.shots[i].y < -3000
//       ){
//         this.shots.splice(i, 1);
//       }
//     }
// };

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.inimigos.length; i++) {
      this.inimigos[i].desenhar(ctx);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenhar(ctx);
    }
};

Level.prototype.desenharImg = function (ctx, imageLib) {
  for (var i = 0; i < this.inimigos.length; i++) {
    this.inimigos[i].desenharImg(ctx, imageLib.images[this.inimigos[i].imgkey]);
  }
  for (var i = 0; i < this.shots.length; i++) {
    this.shots[i].desenharImg(ctx, imageLib.images[this.shots[i].imgkey]);
  }
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.inimigos.length; i++) {
      if(this.inimigos[i].colidiuCom(alvo)){
        resolveColisao(this.inimigos[i], alvo);
      }
    }
};

// Level.prototype.perseguir = function (alvo, dt) {
//   for (var i = 0; i < this.inimigos.length; i++) {
//     this.inimigos[i].perseguir(alvo,dt);
//   }
// };
// Level.prototype.perseguirAng = function (alvo, dt) {
//   for (var i = 0; i < this.inimigos.length; i++) {
//     this.inimigos[i].perseguirAng(alvo,dt);
//   }
// };

Level.prototype.fire = function (alvo, audiolib, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Player();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.vy = -75;
  tiro.width = 8;
  tiro.height = 16;
  tiro.imgkey = "shot";
  this.shots.push(tiro);
  alvo.cooldown = 1;
  if(audiolib && key) audiolib.play(key,vol);
};

Level.prototype.colidiuComTiros = function(al, key){
  var that = this;
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],      
        function(inimigo){
            inimigo.color = "green";
            that.shots.splice(i,1);
            x = that.inimigos.indexOf(inimigo);
            that.inimigos.splice(x, 1);
            that.score++;
            if(al&&key) al.play(key);
        }
      );
  }
};

Level.prototype.colidiuComPlayer = function(player, al, key){
  var that = this;
  for(var i = this.inimigos.length-1; i>=0; i--){

    this.colidiuCom(player,      
        function(inimigo){
            inimigo.color = "black";
            x = that.inimigos.indexOf(inimigo);
            that.inimigos.splice(x, 1);
            //that.score--;
            that.life--;
            if(al&&key) al.play(key);
        }
      );
  }
};

Level.prototype.playerLife = function(ctx, al = null, key = null){
  if (this.life > 0) {
    return true;
  } else {
    this.inimigos = [];
    this.message = "Você morreu!";
    ctx.fillText(this.message, 180, 240);
    if(this.music&&al&&key) { 
      al.play(key)
      this.music = false;
    }
    console.log(level.inimigos);
    return false;
  }
};

Level.prototype.victory = function(ctx, al = null, key = null){
    this.inimigos = [];
    this.message = "Você venceu!";
    ctx.fillText(this.message, 180, 240);
    if(this.music&&al&&key) { 
      al.play(key)
      this.music = false;
    }
    console.log(level.inimigos);
}

