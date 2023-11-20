import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { EMPTY_ITINERARY_MESSAGE } from '../commons/Constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ItinerarySummary(props) {

    const { handleClose, selectedFlights} = props;

    

  return (
    <React.Fragment>
     
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
<DialogContent>
{selectedFlights.length>0 ? selectedFlights.map((flight)=>(
        <React.Fragment key={flight.FlightId}>

        <DialogTitle> {flight.FromAirportName} - {flight.ToAirportName}  </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The selected flight number :  <strong>{flight.FlightId}</strong> is set to to departure at 
            scheduled time <strong>{flight.ScheduledTimeFull}</strong> from <strong>{flight.FromAirportName} to { selectedFlights.ToAirportName}</strong>

            <br/>
       
          </DialogContentText>
        </DialogContent>
        </React.Fragment>

)): EMPTY_ITINERARY_MESSAGE }
</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
         { selectedFlights.length>0 && 
          <Button onClick={handleClose}>Confirm</Button>
        }
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}