import { Component, OnInit } from '@angular/core';
import { ServerConnectService } from './../server-connect.service';
import { NavController, Platform, MenuController, AlertController, LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  company_name
  user_name
  user_email
  response:any

  constructor(
    public navCtrl: NavController,
    private conn  : ServerConnectService,
    public menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

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

  async ForgetMyPassword(){
    //MONTA O LOADING
    let loading = await this.loadingCtrl.create({
      message: 'Enviando, aguarde...'
    });

    //LOADING APRESENTANDO
    await loading.present();

    this.conn.forgetPassword(this.company_name, this.user_name, this.user_email)
    .then((response)=>{ //DEU CERTO

      this.response = response;

      if(this.response.success===true){

        loading.dismiss();
        this.SimpleAlert('Sucesso', this.response.message);
        
      }else{

        loading.dismiss();
        this.SimpleAlert('Erro no envio ', this.response.message);
      }
      

    })
    .catch((exception)=>{//DEU ERRO
      //fecha tela de aguarde
      loading.dismiss();
      this.SimpleAlert('Atenção', 'Erro de acesso ao servidor: '+exception.status+' '+exception.statusText);
      console.log(exception);
    });


  }

  goBack(){
    //DIRECIONA O USUARIO
    this.navCtrl.navigateRoot('login', { animated: true, animationDirection: "back"  });

  }

}
