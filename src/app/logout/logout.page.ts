import { Component, OnInit } from '@angular/core';
import { NavController,MenuController} from '@ionic/angular'; // MENU

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController
    ) {  
      
    }

  ngOnInit() {
    
  }

  logOut(){
    window.localStorage.removeItem("logado");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("user_token");
    window.localStorage.removeItem("cd_scpa");
    this.navCtrl.navigateRoot('/login',{animated:true, animationDirection: "forward"});
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

}
