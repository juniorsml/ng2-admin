import {Component} from '@angular/core';
import {IndicationService} from './indication.service';
import { TerritoriesService } from "app/shared/services/territories.service";
import { TerritoryTypeEnum } from "app/shared/models/territory";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'indication',
  templateUrl: './indication.html',
})
export class IndicationComponent{

  constructor(private territoryService:TerritoriesService , private notificationService: NotificationsService) {
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

 

  addNewIndication(event){
    this.territoryService.createTerritory(event.value , TerritoryTypeEnum.TBC).subscribe((address) => this.notifySuccess() , (err) => this.notifyError());
  }


}
