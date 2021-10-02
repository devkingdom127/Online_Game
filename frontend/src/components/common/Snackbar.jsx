import MaterialSnackbar from '@material-ui/core/Snackbar'; // renamed
import SnackbarContent from '@material-ui/core/SnackbarContent';
import React from 'react';

export default function Snackbar(props) {
    const { message, show, setShow } = props;
    const { body, color } = message;

    return (
        <MaterialSnackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={show}
            onClose={() => setShow(false)}
            key="bottom center"
        >
            <SnackbarContent style={{ backgroundColor: color, color: 'white' }} message={body} />
        </MaterialSnackbar>
    );
}
