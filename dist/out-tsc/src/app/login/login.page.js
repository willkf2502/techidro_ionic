import * as tslib_1 from "tslib";
import { ServerConnectService } from './../server-connect.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular'; // MENU
import { LoadingController } from '@ionic/angular';
var LoginPage = /** @class */ (function () {
    function LoginPage(menuCtrl, conn, loadingController) {
        this.menuCtrl = menuCtrl;
        this.conn = conn;
        this.loadingController = loadingController;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false); //DESABILITA O MENU
    };
    LoginPage.prototype.Login = function () {
        var _this = this;
        var name = this.Cusuario;
        var pass = this.Cpassword;
        this.loading = this.loadingController.create({ message: "Logging in ,please wait..." });
        this.loading.present();
        this.conn.doLogin(name, pass)
            .then(function (response) {
            _this.response = response;
            if (_this.response.success === true) {
                _this.result = 'Token: ' + _this.response.user_token;
                _this.result += ' ID: ' + _this.response.user_id;
            }
            else {
                _this.result = 'Erro ao logar';
            }
            //fecha tela de aguarde
        })
            .catch(function () {
            //fecha tela de aguarde
        });
    };
    LoginPage.prototype.post = function () {
    };
    LoginPage.prototype.put = function () {
    };
    LoginPage.prototype.delete = function () {
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MenuController,
            ServerConnectService,
            LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map