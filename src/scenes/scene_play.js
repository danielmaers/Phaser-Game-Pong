import Palas from "../gameObjects/palas.js";
class Scene_play extends Phaser.Scene {
    constructor(){
        super({key: "Scene_play"})
    }

    create(){
        const centerWidth= this.sys.game.config.width/2;
        const centerHeight= this.sys.game.config.height/2
        //separador
        this.add.image(centerWidth, centerHeight, "separador");
        //paletas
        //this.izquierda = this.add.image(30, centerHeight, "izquierda");
        this.izquierda = new Palas(this, 30, centerHeight, "izquierda")

        this.derecha = new Palas(this, this.sys.game.config.width-30, centerHeight, "derecha");
        //bola
        this.physics.world.setBoundsCollision(false, false, true, true)
        this.ball= this.physics.add.image(centerWidth, centerHeight, "ball")
        this.ball.setCollideWorldBounds(true)
        this.ball.setBounce(1)
        this.ball.setVelocityX(-180)
        
        
        //fisicas
        this.physics.add.collider(this.ball, this.izquierda,this.chocaPala, null, this)
        this.physics.add.collider(this.ball, this.derecha,this.chocaPala, null, this)

        //controles
        //pala derecha
        this.cursor = this.input.keyboard.createCursorKeys()
        //pala izquierda
        this.cursor_W= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.cursor_S= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    }
    update(){
        if(this.ball.x<0|| this.ball.x > this.sys.game.config.width){
            this.ball.setPosition(this.sys.game.config.width/2,this.sys.game.config.height/2)
        }
        //control de las palas
        //pala derecha
        if(this.cursor.down.isDown){
            this.derecha.body.setVelocityY(300)
        }else if(this.cursor.up.isDown){
            this.derecha.body.setVelocityY(-300)
        }else{
            this.derecha.body.setVelocityY(0)
        }
        //pala izquierda
        if(this.cursor_S.isDown){
            this.izquierda.body.setVelocityY(300)
        }else if(this.cursor_W.isDown){
            this.izquierda.body.setVelocityY(-300)
        }else{
            this.izquierda.body.setVelocityY(0)
        }
    }
    chocaPala(){
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120))
    }

}

export default Scene_play;