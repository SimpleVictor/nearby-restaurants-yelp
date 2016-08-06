import {Component, OnInit, ViewChild} from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import {NavBarComponent} from "./shared/navbar/navbar.component";
import {YelpService} from "./service/yelp.service";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
    directives: [ROUTER_DIRECTIVES, NavBarComponent, MODAL_DIRECTIVES],
    providers: [YelpService],
    selector: "app",
    templateUrl: "client/components/app.component.html",
    styleUrls: ["client/components/app.component.css"]
})
export class AppComponent implements OnInit{
    //grabs the modal variable from the html page
    @ViewChild('modal')
    modal: ModalComponent;

    modalName:any;
    modalPicture:any;
    modalPhone:any;
    modalStars:any;
    modalCity:any;
    modalAddress:any;
    modalDistance:any;

    resultList:any;
    //used for message to show on html if location is not allowed
    isLocationSet: boolean = false;
    isDataHere:boolean = false;


    constructor(private _YelpService: YelpService){

    }

    ngOnInit(){
        //Had to set a variable to this because inside the subscribe method of the call         //back, "this" was referring to that method
        let thiss = this;
        // this._YelpService.sendLocationBack();
        //init an alert box to allow location from user
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
                thiss._YelpService.sendLocationBack(latlng).subscribe((data) => {
                    thiss.isDataHere = true;
                    var returningResult = JSON.parse(data.body);
                    thiss.resultList = returningResult.businesses;
                    console.log(thiss.resultList);
                    return console.log(JSON.parse(data.body));
                });
            });
            this.isLocationSet = true;
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    //In case user blocks notification at init of browser
    //They can always click the button to allow us to have their location
    getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this._YelpService.sendLocationBack);
            this.isLocationSet = true;
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    openModal(index){
        //Once a user clicks on an individual list. A modal will be populated by that           //individual store
        this.modalName = index.name;
        this.modalPicture = index.image_url;
        this.modalPhone = index.display_phone;
        this.modalStars = index.ratting_img_url_large;
        this.modalAddress = index.location.address[0];
        this.modalCity = index.location.city;
        //open the modal and set the size to small
        this.modal.open('sm');
    }

}
