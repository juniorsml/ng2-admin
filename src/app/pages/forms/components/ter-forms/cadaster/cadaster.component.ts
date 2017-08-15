import { Component, OnInit } from '@angular/core';
import { TerritoriesService } from "app/shared/services/territories.service";
import { TerritoryTypeEnum } from "app/shared/models/territory";
import { NotificationsService } from "angular2-notifications";
import 'rxjs/add/operator/do';


@Component({
  selector: 'cadaster',
  templateUrl: './cadaster.html',
})
export class CadasterComponent implements OnInit{

  constructor(private territoryService:TerritoriesService,  private notificationService: NotificationsService ) {
  }
 
  territoryGroupList:any[] = [];  

   ngOnInit() {
        this.loadAllTerritoryGroups();
      }

  public options = {
        position: ["bottom", "right"],
        timeOut: 50000,
        lastOnBottom: true,
    };

   notifySuccess() {
    this.notificationService.success(
        'Territory Successfuly Created',
        'Thank you very mucht',
        {
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 10
        }
    )
  } 

   notifyError() {
    this.notificationService.error(
        'Error ',
        'Territory Not Created',
        {
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 10
        }
    )
  }


  saveNewTerritoryGroup(event){
    this.territoryService.createTerritoryGroups(event);
  }

  loadAllTerritoryGroups(){
    this.territoryService.loadAllTerritoryGroups().subscribe(grps => this.territoryGroupList = grps);
  }
 
  addNewIndication(event){
    console.log("Teste" , event);
    this.territoryService.createTerritory(event.value , TerritoryTypeEnum.CONFIRMED).subscribe((address) =>  this.notifySuccess(), (err) => this.notifyError());
  }
}
