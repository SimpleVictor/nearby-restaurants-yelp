import {Component, OnInit} from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import {NavBarComponent} from "./shared/navbar/navbar.component";
import {YelpService} from "./service/yelp.service";

@Component({
    directives: [ROUTER_DIRECTIVES, NavBarComponent],
    providers: [YelpService],
    selector: "app",
    templateUrl: "./client/components/app.component.html",
    styleUrls: ["./client/components/app.component.css"]
})
export class AppComponent implements OnInit{

    resultList;
    //used for message to show on html if location is not allowed
    isLocationSet: boolean = false;

    constructor(private _YelpService: YelpService){

    }

    ngOnInit(){
        let thiss = this;
        // this._YelpService.sendLocationBack();
        //init an alert box to allow location from user
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
                thiss._YelpService.sendLocationBack(latlng).subscribe((data) => {
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

}
