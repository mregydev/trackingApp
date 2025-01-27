import { useDispatch, useSelector } from "react-redux";
import { AppState, setSelectedVehicleIndex } from "../../store";
import styles from './style.module.scss';
import { Vehicle } from "../../types";
import { Alert, Button } from "@mui/material";

const VehicleDetails=()=>{

    const selectedVehicleIndex=useSelector((state:AppState)=>state.selectedVehicleIndex)
    const targetVehicle:Vehicle=useSelector((state:AppState)=>state.vechiles[selectedVehicleIndex])

    const dispatch=useDispatch();

    const resetSelected = () => dispatch(setSelectedVehicleIndex(-1));

    return (
      <div className={styles.vechileDetails}>
        <h1>{targetVehicle.name}</h1>
        {targetVehicle.errorMessage && (
          <Alert className={styles.alert} severity='error'>
            {targetVehicle.errorMessage}
          </Alert>
        )}
        {Object.keys(targetVehicle.attributes).map((key) => (
          <div className={styles.detailsRow}>
            <label htmlFor={key}>{key}</label>
            <span id={key}>
              {
                targetVehicle.attributes[
                  key as keyof typeof targetVehicle.attributes
                ]
              }
            </span>
          </div>
        ))}

        <Button
          className={`cancel ${styles.backButton}`}
          variant='outlined'
          onClick={resetSelected}
        >
          Back
        </Button>
      </div>
    );
}

export default VehicleDetails;