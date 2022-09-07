import { ServerConnectService } from './../server-connect.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular'; // MENU
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  Cusuario;
  Cpassword;
  result : any;
  response: any;  
  loading: any;

  constructor(
    public menuCtrl: MenuController,
    private conn: ServerConnectService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController
    ) {  

    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); //DESABILITA O MENU
  }

  async SimpleAlert(header: any, message: any){
    let alertSimples = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alertSimples.present();
  }

  async Login(){
    //MONTA O LOADING
    let loading = await this.loadingCtrl.create({
      message: 'Logando, aguarde...'
    });

    //LOADING APRESENTANDO
    await loading.present();

    this.conn.doLogin(this.Cusuario, this.Cpassword)
    .then((response)=>{ //DEU CERTO

      this.response = response;

      if(this.response.success===true){
        
        //GRAVA O USERID NA MEMORIA
        window.localStorage.setItem("logado", "1")
        window.localStorage.setItem("user_id", this.response.user_id)
        window.localStorage.setItem("user_token", this.response.user_token)
        window.localStorage.setItem("cd_scpa", this.Cusuario)

        //DIRECIONA O USUARIO
        this.navCtrl.navigateRoot('home', { animated: true, animationDirection:"forward"  });

        //FECHA O LOADING
        loading.dismiss();
        this.result = 'Usuário logado ! Código: '+this.response.user_id
      }else{

        window.localStorage.removeItem("logado");
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("user_token");
        window.localStorage.removeItem("cd_scpa");

        loading.dismiss();
        this.SimpleAlert('Erro no logon', this.response.message);
      }
      

    }).catch((exception)=>{//DEU ERRO
      //fecha tela de aguarde
      loading.dismiss();
      this.SimpleAlert('Atenção', 'Erro de acesso ao servidor: '+exception.status+' '+exception.statusText);
      console.log(exception);
    });

  }

  goForget(){
    //DIRECIONA O USUARIO
    this.navCtrl.navigateRoot('forget', { animated: true, animationDirection:"forward"  });

  }



}
