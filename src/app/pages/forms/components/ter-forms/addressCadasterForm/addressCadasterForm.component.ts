  import {Component , Input, Output ,OnInit, OnDestroy , EventEmitter} from '@angular/core';
  import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
  import { TerritoryFieldMasksEnum } from "app/shared/models/territory";
  import { NotificationsService } from "angular2-notifications";
  const cep = require('cep-promise');


  @Component({
    selector: 'address-cadaster-form',
    templateUrl: './addressCadasterForm.html',
    styleUrls: ['./addressCadasterForm.scss']
  })
  export class AddressCadasterForm implements OnInit {
    
    constructor(private formBuilder: FormBuilder ,  private notificationService: NotificationsService) {
      
    }

  @Input()
  allowInformGroup:boolean;
  @Input()
  territoryGroupList:any[];
  addForm: FormGroup;
  territoryGroupNames:string[];
  @Output()
  protected onAddAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  protected onTerritoryGroup: EventEmitter<any> = new EventEmitter<any>();
  errors = {};
  
  //Masks
  public  phoneMask = TerritoryFieldMasksEnum.CELLPHONE;
  public  zipMask = TerritoryFieldMasksEnum.ZIP;
  

    ngOnInit()  {
        this.formInitialBind();
    }

    formInitialBind():void{
      this.addForm = this.formBuilder.group({
                  group: this.formBuilder.group({
                    key: ['', Validators.required],
                    value: ['', Validators.required],
                  }),
                  publisher: this.formBuilder.group({
                    pubName: ['', Validators.required],
                  }),
                  houseHolder: this.formBuilder.group({
                    hhName: ['', Validators.required],
                    hhGender:['male',Validators.required],
                    hhNationality : ['nigerien',Validators.required],
                    hhPhone : [''],
                    hhZipCode :[''],
                    hhAddress : ['',Validators.required],
                    numberAddress : ['',Validators.required],
                    landmark : ['',Validators.required]
                  }),
                    status: this.formBuilder.group({
                      status: ['tbc', Validators.required],
                      pubName: [''],
                    }),
                  hhNotes:['',Validators.required]
                });
    }

 
    

      isErrorVisible(form:string , field:string, error:string) {
        let localForm:FormGroup ;
        
        if(form)
          localForm = this.addForm.controls[form] as FormGroup;
        else
        localForm  = this.addForm; 
        
        let hasErrors = localForm.controls[field].dirty
                && localForm.controls[field].errors &&
                localForm.controls[field].errors[error]
                  
        return hasErrors;

      }

  
  handleCepInformed(event){
    let zipcode = this.sanitize(event.target.value)
    this.searchZipCode(zipcode).then(address => {
                                let addressLine = this.buildAddressLine(address);
                                let houseHolderForm = this.addForm.controls['houseHolder'] as FormGroup;
                                houseHolderForm.controls['hhAddress'].setValue(addressLine);
                              });
  }

  searchZipCode(zipCode){
    return  cep(zipCode);
  }

  private buildAddressLine(addressObject):string{
    // {cep: "08275340", state: "SP", city: "São Paulo", neighborhood: "Jardim Nossa Senhora do Carmo", street: "Rua Xavier Palmerim"}
    const addressLine = `${addressObject.street} , ${addressObject.neighborhood} - ${addressObject.city} - ${addressObject.state} `
    return addressLine;
  }

   private updateAddressForm(addressLine){

   } 

    get valid() {
        return this.addForm.valid;
    }

    addedNewGroup(event){
       if(event!=="")
         this.onTerritoryGroup.emit(event);
      }

    onChangeSelectedValue(event){
       let group:FormGroup = this.addForm.controls['group'] as FormGroup;
       group.controls['key'].setValue(event.$key);
       group.controls['value'].setValue(event.$value);
    }

    sanitize(value){
     return value.replace(/[^a-zA-Z 0-9]/g, "");
     
    }

    addTerritory(){
        if(this.valid){
          this.onAddAddress.emit(this.addForm);
            }
        else{
          this.searchForDirty(this.addForm);
          this.notifyError();
            }
    }

    searchForDirty(form:FormGroup){
        Object.keys(form.controls).map(entry => form.controls[entry]).forEach(el =>{
         if (el instanceof FormGroup){
           this.searchForDirty(<FormGroup>el);
         }else{
           this.dirtify(<FormControl>el);
         }
        })
    } 

    dirtify(el: FormControl){
       el.markAsDirty();
    } 

    notifyError() {
    this.notificationService.error(
        'Error',
        'Missign inform some required fields',
        {
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 100
        }
    )
  }
  }