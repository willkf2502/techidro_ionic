import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
var ServerConnectService = /** @class */ (function () {
    function ServerConnectService(http) {
        this.http = http;
        this.apiToken = 'b3aa0d48aefd9207f6a07770fad4912b';
        //host = 'https://www.tec-hidro.com.br/api/';
        this.host = 'http://127.0.0.1:808/webbitbucket/Laudos%20Online/techidro/web_client/api/';
        this.login = 'login.api.php';
    }
    //FAZER LOGIN
    ServerConnectService.prototype.doLogin = function (user, password) {
        var headers = new HttpHeaders({ 'apitoken': this.apiToken });
        this.url = this.host + this.login + '?user_login=' + user + '&user_passwd=' + password;
        return this.http.get(this.url, { headers: headers }).toPromise();
    };
    ServerConnectService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ServerConnectService);
    return ServerConnectService;
}());
export { ServerConnectService };
//# sourceMappingURL=server-connect.service.js.map