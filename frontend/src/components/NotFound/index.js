import React from 'react';

//************************************* Material-UI Components ****************************************
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

//************************************* Styles ****************************************
import '../NotFound/css/style.css'


export default function index() {

    return ( 
            <div>
                <h1>Error - Page Not Found</h1>
                <section class="error-container">
                <span class="four"><span class="screen-reader-text">4</span></span>
                <span class="zero"><span class="screen-reader-text">0</span></span>
                <span class="four"><span class="screen-reader-text">4</span></span>
                </section>
                <div class="link-container">
                    <Button size="large" variant="outlined" href="/home" color="primary" startIcon={<HomeIcon />}>
                        Volver al inicio
                    </Button>
                </div>
            </div>
    )
}