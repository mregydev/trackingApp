import { useMap } from "react-leaflet"
import { useSelector } from "react-redux";
import { AppState } from "../store";

const useZoomToVehicle=(vehicleIndex:number)=>{

    const map=useMap();
    const vehicle=useSelector((state:AppState)=>state.vechiles[vehicleIndex]);

    return {
        zoomToVehicle:()=>{
            map.setView([vehicle?.position.lat, vehicle?.position.lng], 15, {
              animate: true,
            });
        }
    }
}

export default useZoomToVehicle