import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular'; 
import { ServerConnectService } from './../server-connect.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Storage } from '@ionic/storage';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.page.html',
  styleUrls: ['./indicador.page.scss'],
})
export class IndicadorPage implements OnInit {

  cols = [
    {prop:"referencia", name:"Referência"},
    {prop:"data_processamento", name:'Data Envio'}
  ];
  data = [];
  filteredData = [];
  rows = []; //CARREGA OS DADOS DO SERVIDOR AQUI
  response:any;
  messages: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    public navCtrl: NavController,
    private conn  : ServerConnectService,
    private storage: Storage,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private platform: Platform

    ) {
      
      this.data = null;
      
      this.messages = {
        emptyMessage: `Carregando, aguarde...`
      };

    }



  ngOnInit() { 
       
    if(window.localStorage.getItem('logado') != '1' ){
      window.localStorage.removeItem("logado");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("user_token");
      window.localStorage.removeItem("cd_scpa");
      this.navCtrl.navigateRoot('/login',{animated:true, animationDirection: "forward"});
    }else{
      this.PegarDados();
    }
    
  }

  UpdateDados(event:any){    
    setTimeout( ()=>{
      this.PegarDados();
      event.target.complete();
    },1000)
    
  }
  PegarDados(){
    this.data = null;
    this.filteredData = null;
    this.rows = null;

    let user_token = window.localStorage.getItem('user_token');
    let cd_scpa = window.localStorage.getItem('cd_scpa');
    //PEGA OS LAUDOS DO SERVIDOR
  
    this.conn.getIndicadores(user_token, cd_scpa)
    .then( (response)=>{ 
      this.response = response;
      console.log(response)
      if(this.response.success==true){
        this.data = this.response.indicadores;
        this.filteredData = this.response.indicadores;
        this.rows = this.response.indicadores;
      }

      //QUANDO ESTIVER VAZIA
      this.messages = {
        emptyMessage: ` Nenhum registro encontrado.`
        //emptyMessage: `<ion-icon name="refresh"></ion-icon> Carregando, aguarde...`
      };
    
    }).catch((error)=>{
      console.log(error);
    });

  }

  filterDatatable(event){

    // VALOR DIGITADO EM CAIXA BAIXA
    let val = event.target.value.toLowerCase();

    // QUANTIDADE DE COLUNAS
    let colsAmt = 2;
    
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function(item){ 

      //EM QUAIS COLUNAS EFETUAR A BUSCA
      let keys = ['referencia', 'data_processamento'];

      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++){
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
          // found match, return true to add to result set
          return true;
          
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  //ABRIR ARQUIVO PDF
  onActivate(event){
    if(event.type == 'click') {
      
      let myFile = this.conn.host_files+event.row.arquivo;

      let id = event.row.id
      let cd_scpa = window.localStorage.getItem('cd_scpa')
      let user_token = window.localStorage.getItem('user_token')
      let ref = event.row.referencia
      this.conn.setIntentionIndicador(user_token,cd_scpa,id, ref).then((response)=>{
        console.log(response);
      })
     

      if(this.platform.is('mobileweb')) {
        //BROWSER
        window.open(myFile, '_system', 'location=yes'); 
      }else{
        //SÓ CELULAR
        const transfer = this.transfer.create();
        let path = this.file.dataDirectory;
        transfer.download(myFile,  `${path}myfile.pdf`).then(entry=>{
          let url = entry.toURL();
          
          if (this.platform.is('ios')){
            //IOS
            this.document.viewDocument(url, 'application/pdf', {});
          }else{
            //ANDROID
            this.fileOpener.open(url, 'application/pdf');
          }
        }).catch(response =>{
          console.log(response)
        })

      }

    }
  }



}
