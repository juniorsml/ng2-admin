import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Rx from 'rxjs/Rx';



@Component({
  selector: 'selector-with-add',
  templateUrl: './selector.html',
  styleUrls: ['./modals.scss']
})
export class SelectorWithAdd implements OnInit , OnChanges {


  constructor() {
  }

  ngOnInit() {
    this.setInitialState();
  }

  ngOnChanges(changes: SimpleChanges){
    Rx.Observable.from(changes.groupList.currentValue.map(g => g.$value)).subscribe(i => this.itemsList.push(i as string));
   }

  protected value: string;
  protected selectedValue: string;
  protected itemsList: string[] = [];
  @Input()
  protected groupList: any[] = [];
  @Output()
  protected addedNewValues: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  protected onChangeSelectedValue: EventEmitter<string> = new EventEmitter<string>();




  //UI Variables
  feedBackClass: string;
  successfeedBackClass: string = " has-success ";
  failfeedBackClass: string = " has-error ";
  initialfeedBackClass: string = " has-feedback ";

  handleNewValues() {
    this.addedNewValues.emit(this.value);
    this.feedBackClass += this.successfeedBackClass;
    this.value = "";
  }

  handleSelectedValue() {
    let gp = this.groupList.find(i => this.selectedValue == i.$key );
    this.onChangeSelectedValue.emit(gp);
  }

  setInitialState(): void {
    this.feedBackClass = this.initialfeedBackClass;
  }


}
