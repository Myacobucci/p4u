import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {

  private serviceHostName:string = "https://p4ucloud-mnforlenza.rhcloud.com/";
  
  constructor() {}

  public getServiceHostName() {
  	return this.serviceHostName;
  }

}
