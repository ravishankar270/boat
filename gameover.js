class gameover extends Phaser.Scene
{
    constructor()
    {
        super("gameover");
    }

    preload()
    {
        this.scene.bringToTop();
        this.load.image('GOBG','images/bg1.png');
        this.load.image('GOmessage','images/gameOver.png');
        this.load.image("GOMenuBtn",'images/playBtn.png');
        //this.load.image('GOpanel','images/panel.png');
        this.load.image('MUSICOnImg','images/icon_sound_music.png');
        this.load.image('MUSICOffImg','images/icon_sound_music_off.png');
        this.load.image('logo','images/ap-logo.jpg');
        this.load.image('onamImg','images/HappyOnam.png');
    }

    create()
    {
        
        var bg = this.add.image(config.width/2,config.height/2,"GOBG").setOrigin(0.5);
        var logo = this.add.image(0,0,'logo').setOrigin(0.5);
        var menubtn = this.add.image(config.width/2,0,'GOMenuBtn').setOrigin(0.5).setInteractive();
        var go = this.add.image(config.width/2, config.height/2,'GOmessage').setOrigin(0.5);
        var onam = this.add.image(0,0,'onamImg').setOrigin(0.5);
        //this.add.image(config.width/2,config.height/2,"GOpanel").setOrigin(0.5);

        this.add.text(config.width/2,config.height/2 - TEXT_SIZE/2,"",{fontFamily:"myFont",fontSize:TEXT_SIZE,fill:"#000000",align:"center"}).setOrigin(0.5).setText("Score : " + scoreManager.GetScore());
        this.add.text(config.width/2,config.height/2 + TEXT_SIZE/2,"",{fontFamily:"myFont",fontSize:TEXT_SIZE,fill:"#000000",align:"center"}).setOrigin(0.5).setText("HighScore : "+scoreManager.GetHighScore());
        
        this.agrid = new AlignGrid({scene:this,rows:21,cols:11});

        menubtn.on("pointerdown",function(pointer){
            game.scene.start("mainmenu");
            menubtn.removeListener("pointerdown");
        },this)

        this.agrid.placeAtIndex(115,bg);
        Align.scaleToGameH(bg,1,this);
        if(bg.displayWidth/config.width < 1)
        {
            bg.displayWidth = config.width*1.2;
            bg.displayHeight = config.height*1;
        }
        this.agrid.placeAtIndex(60,go);
        Align.scaleToGameW(go,0.75,this);
        this.agrid.placeAtIndex(170,menubtn);
        Align.scaleToGameH(menubtn,0.1,this);
        this.agrid.placeAtIndex(148,logo);
        Align.scaleToGameH(logo,0.15,this);
        this.agrid.placeAtIndex(203,onam);
        Align.scaleToGameH(onam,0.15,this);

        var musicOnBtn = this.add.image(config.width,0,'MUSICOnImg').setOrigin(1,0).setInteractive();
        var musicOffBtn = this.add.image(config.width,0,'MUSICOffImg').setOrigin(1,0).setInteractive();
        musicOnBtn.on("pointerdown",function(pointer){
            musicOffBtn.setVisible(true);
            musicOnBtn.setVisible(false);
            musicFlag = false;
            this.sound.pauseAll();
        },this)
        musicOffBtn.on("pointerdown",function(pointer){
            musicOffBtn.setVisible(false);
            musicOnBtn.setVisible(true);
            musicFlag = true;
            this.sound.resumeAll();
        },this)
        //this.agrid.placeAtIndex(10,musicOnBtn);
        Align.scaleToGameH(musicOnBtn,0.075,this);
        //this.agrid.placeAtIndex(10,musicOffBtn);
        Align.scaleToGameH(musicOffBtn,0.075,this);

        if(musicFlag)
        {
            //console.log("music true");
            musicOnBtn.setVisible(true);
            musicOffBtn.setVisible(false);
        }
        else
        {
            // console.log("music false");
            musicOnBtn.setVisible(false);
            musicOffBtn.setVisible(true);
        }

        //this.agrid.showNumbers();
    }
}