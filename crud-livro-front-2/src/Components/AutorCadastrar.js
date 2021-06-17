import React from 'react';

import '../Styles/AutorCadastrar.css'

export default function AutorCadastrar(){
    const [open, setOpen] = React.useState(false);

    const hadleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            
        </div>
    )
}