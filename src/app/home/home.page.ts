import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular'; // MENU
import { ServerConnectService } from './../server-connect.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public response: any;

  public laudos_novos :any;
  public indicadores_novos: any;

  public voce_tem_1 = 'Não existem ';
  public voce_tem_2 = 'Não existem ';

  public final_1 = 'laudos disponíveis ';
  public final_2 = 'indicadores disponíveis ';

  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    private conn  : ServerConnectService,
  ) {}


  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.SelectQtdeLaudos();
  }
  ionViewDidEnter() {
    if(window.localStorage.getItem('logado') != '1' ){
      window.localStorage.removeItem("logado");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("user_token");
      window.localStorage.removeItem("cd_scpa");
      this.navCtrl.navigateRoot('/login',{animated:false});
    }
  }

  SelectQtdeLaudos(){
    
    let user_token = window.localStorage.getItem('user_token');
    let cd_scpa = window.localStorage.getItem('cd_scpa');
    
    //PEGA OS LAUDOS DO SERVIDOR
    this.conn.getLaudos(user_token, cd_scpa)
    .then( (response)=>{ 
      this.response = response;        
      if(this.response.success==true){

        var i = 0;

        for(var k in this.response.laudos) {
          i++
        }
        if(i > 0){
          this.voce_tem_1 ='Você tem ';
          this.laudos_novos = i;
          this.final_1 = ' laudo(s) disponíveis'
        }

      }
    
    });

    //PEGA OS INDICADORES DO SERVIDOR
  
    this.conn.getIndicadores(user_token, cd_scpa)
    .then( (response)=>{ 
      this.response = response;
      console.log(response)
      if(this.response.success==true){
        var i = 0;

        for(var k in this.response.indicadores) {
          i++
        }
        if(i > 0){
          this.voce_tem_2 ='Você tem ';
          this.indicadores_novos = i;
          this.final_2 = '  indicador(es) disponíveis';
        }
      }


    }).catch((error)=>{
      
    });

  }

}
