import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectService {

  apiToken = 'b3aa0d48aefd9207f6a07770fad4912b'
  host = 'https://www.tec-hidro.com.br/api/'
  host_files = 'https://www.tec-hidro.com.br/web_client/'

  //-----------------------------------------------------------
  //host = 'http://localhost:808/webbitbucket/Laudos%20Online/techidro/web_client/api/'
  //host_files = 'http://localhost:808/webbitbucket/Laudos%20Online/techidro/web_client/'
  //-----------------------------------------------------------

  //ENDEREÇOS
  login = 'login.api.php'
  laudos = 'laudo.api.php'
  indicador = 'indicador.api.php'
  esqueci_minha_senha = 'mail.api.php'
  change_pass = 'change.api.php'
  loglaudo = 'loglaudo.api.php'
  logindicador = 'logindicador.api.php'

  url: any;
  result: any;
  constructor(private http : HttpClient) { }

  //FAZER LOGIN
  doLogin(codigo: any, password: any){

    //DADOS DO LOGIN
    let dados = {
      user_login: codigo, 
      user_passwd: password 
    };

    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');
    //url
    this.url = this.host+this.login;   
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }

  //RETORNA OS LAUDOS DE UM CLIENTE
  getLaudos(user_token, cd_scpa){
    let dados = {
      user_token: user_token, 
      cd_scpa: cd_scpa 
    };
    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');
    //url
    this.url = this.host+this.laudos;   
    console.log(this.url)
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }

  //RETORNA OS INDICADORES DE UM CLIENTE
  getIndicadores(user_token, cd_scpa){
    let dados = {
      user_token: user_token, 
      cd_scpa: cd_scpa 
    };
    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');
    //url
    this.url = this.host+this.indicador;   
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }

  //ESQUECEU A SENHA - ENVIA UM E-MAIL
  forgetPassword(company_name, user_name, user_email){
    
    let dados = {
      company_name: company_name, 
      user_name: user_name ,
      user_email: user_email
    };

    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');
    //url
    this.url = this.host+this.esqueci_minha_senha;   
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }

  //ALTERAR SENHA
  //RETORNA OS INDICADORES DE UM CLIENTE
  changePassword(user_token, cd_scpa, pass_old, pass_new){
    let dados = {
      user_token: user_token, 
      cd_scpa: cd_scpa,
      pass_old: pass_old,
      pass_new: pass_new
    };
    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');

    console.log(cd_scpa);
    //url
    this.url = this.host+this.change_pass;   
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }
  
   
  //REGISTRA A INTENÇÃO DO CLIENTE BAIXAR UM LAUDO
  setIntentionLaudo(user_token, cd_scpa, id_laudo){
    let dados = {
      user_token: user_token, 
      cd_scpa: cd_scpa,
      id_laudo: id_laudo
    };
    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');

    console.log(cd_scpa);

    //url
    this.url = this.host+this.loglaudo;   
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }

  //REGISTRA A INTENÇÃO DO CLIENTE BAIXAR UM INDICADOR
  setIntentionIndicador(user_token, cd_scpa, id, ref ){
    let dados = {
      user_token: user_token, 
      cd_scpa: cd_scpa,
      id: id,
      ref: ref
    };
    let headers = new HttpHeaders({'Authorization': this.apiToken});
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');

    console.log(cd_scpa);
    //url
    this.url = this.host+this.logindicador;   
    return this.http.post(this.url, dados, {headers: headers }).toPromise();
  }



}
