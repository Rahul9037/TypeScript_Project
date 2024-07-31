// import { Company } from "./Company";
// import { User } from "./User";

//Instruction to every other class
// on how they can be an argument to addMaker

interface Mappable {
  location: {
    lat: number;
    lng: number;
  };

  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(id: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(id) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
        mapId: 'DEMO_MAP_ID',
      }
    );
  }

  // normal flow with the 2 diff function

  // addUserMarker(user : User): void{
  //   new google.maps.marker.AdvancedMarkerElement({
  //     map: this.googleMap,
  //     position: {
  //       lat: user.location.lat,
  //       lng: user.location.lng
  //     },
  //     title: user.name,
  // });
  // }

  // addCompanyMarker(company: Company) :void {
  //   new google.maps.marker.AdvancedMarkerElement({
  //     map: this.googleMap,
  //     position: {
  //       lat: company.location.lat,
  //       lng: company.location.lng
  //     },
  //     title: company.companyName
  // });
  // }

  // to remove duplicate code above - bad approach as if we need to add more class types then we need to add those as input
  // addMarker(mappable : User| Company): void{
  //   new google.maps.marker.AdvancedMarkerElement({
  //     map: this.googleMap,
  //     position: {
  //       lat: mappable.location.lat,
  //       lng: mappable.location.lng
  //     },
  // });
  // }

  // to remove duplicate code above - good approach is by creating an inteface so that the inpt type will satisfy the interface
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
