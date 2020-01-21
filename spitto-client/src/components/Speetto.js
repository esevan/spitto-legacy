import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SpeettoCard from './SpeettoCard';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f5f5f5',
        margin: '0 auto'
    }
})

const Speetto = ({ speettoInfos }) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container spacing={2} p={4} justify='center' xs={11} md={10}>
            {
                speettoInfos.map((speetto, idx) => (
                    <Grid item key={idx} xs={12} sm={12} md={6}>
                        <SpeettoCard {...speetto} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Speetto;
