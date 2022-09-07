import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, AlertController } from '@ionic/angular'; // MENU
import { ServerConnectService } from './../server-connect.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  Cpassword
  Cpassword_New
  Cpassword_Confirm
  my_code = window.localStorage.getItem("cd_scpa")
  my_token = window.localStorage.getItem("user_token")
  response: any

  constructor(    
    private conn: ServerConnectService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController) { }

  ngOnInit() {

  }

  async SimpleAlert(header: any, message: any){
    let alertSimples = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alertSimples.present();
  }


  async ChangeMyPassword(){
      //MONTA O LOADING
      let loading = await this.loadingCtrl.create({
        message: 'Alterando, aguarde...'
      });

      //LOADING APRESENTANDO
      await loading.present();

      if( this.Cpassword_New != this.Cpassword_Confirm ){
        loading.dismiss();
        this.SimpleAlert('Erro', 'A nova senha e a confirmação não podem ser diferentes');
        return false;
      }

      this.conn.changePassword(
        this.my_token, 
        this.my_code, 
        this.Cpassword, 
        this.Cpassword_New).then((response)=>{ 
          this.response = response;
          if(this.response.success===true){
            loading.dismiss();
            this.SimpleAlert('Sucesso', this.response.message);            
          }else{
            loading.dismiss();
            this.SimpleAlert('Erro no envio ', this.response.message);
          }
          
      }).catch((exception)=>{//DEU ERRO
        //fecha tela de aguarde
        loading.dismiss();
        this.SimpleAlert('Atenção', 'Erro de acesso ao servidor: '+exception.status+' '+exception.statusText);
        console.log(exception);
      });


  }

}
