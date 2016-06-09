/**
* This directive will draw a combo chart from the array of records provided
*
**/
import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CORE_DIRECTIVES } from "@angular/common";
@Directive({
    selector: "combo-chart",
})
export class ComboChartDirective implements OnInit {
    el: HTMLElement;
    w: any;  // To store the window, without generating errors in typescript on window.google
    @Input() data: any[];
    @Input() rowlabels: any[];
    @Input() columnlabels: any[];
    @Input() options: any;
     @Input() role: boolean;
    @Input() roleData: any[];
     @Input() roles: any[];
    // Constructor inject a ref to the element
    constructor(elementRef: ElementRef) {
        this.w = window;
        this.el = elementRef.nativeElement; // You cannot use elementRef directly !
        if (!this.w.google) { console.error("Hey ! It seems the needed google script was not loaded ?"); };
    }
    ngOnInit() {
        this.comboChartData();      
    }
    private comboChartData() {
       let dataTable = new this.w.google.visualization.DataTable();
      let tempData: any[] = new Array();
      this.drawComboChart(dataTable,tempData);      
    }    
    private drawComboChart(dataTable:any,tempData:any){
          if (typeof this.columnlabels !== undefined && typeof this.rowlabels !== undefined && typeof this.data != undefined) {
            if (this.role) {
                for (let i = 0; i < this.columnlabels.length; i++) {
                    if (i === 0)
                        dataTable.addColumn(this.columnlabels[i].type, this.columnlabels[i].value);
                    else {
                        dataTable.addColumn(this.columnlabels[i].type, this.columnlabels[i].value);
                        dataTable.addColumn(this.roles[i-1]);    }                }
                for (let i = 0; i < this.rowlabels.length; i++) {
                    let item: any[] = new Array();
                    item.push(this.rowlabels[i]);
                    for (let j = i; j < this.rowlabels.length; j++) {
                        for (let k = 0; k < this.data.length; k++) {
                            item.push(this.data[k][j]);
                            item.push(this.roleData[k][j]);
                        }
                        break;
                    }
                    tempData.push(item);                }
            } else {
                for (let i = 0; i < this.columnlabels.length; i++) {
                    dataTable.addColumn(this.columnlabels[i].type, this.columnlabels[i].value);
                }
                for (let i = 0; i < this.rowlabels.length; i++) {
                    let item: any[] = new Array();
                    item.push(this.rowlabels[i]);
                    for (let j = i; j < this.rowlabels.length; j++) {
                        for (let k = 0; k < this.data.length; k++)
                            item.push(this.data[k][j]);
                        break;
                    }
                    tempData.push(item);
                }            }
        }
        dataTable.addRows(tempData);
        (new this.w.google.visualization.ColumnChart(this.el))
            .draw(dataTable, this.options || {});          
      }     

}