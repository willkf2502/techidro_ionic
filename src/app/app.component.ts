import { Component } from '@angular/core';
import { Platform, NavController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Laudos',
      url: '/laudos',
      icon: 'document'
      
    },
    {
      title: 'Indicadores',
      url: '/indicador',
      icon: 'logo-rss'
      
    },
    {
      title: 'Alterar Senha',
      url: '/change-password',
      icon: 'lock'
      
    },
    {
      title: 'Sair',
      url: '/logout',
      icon: 'exit'
      
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  
  
}
