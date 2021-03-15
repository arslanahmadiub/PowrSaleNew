import React from 'react'
import Grid from "@material-ui/core/Grid"
import Product from './Product';



const RenderProducts = props => {

    const products = props.products;
    return <Grid container direction="row" spacing={3}>
        {
            products && products.map(product => {
                return <Grid item xs={6} sm={4} md={2} lg={2}>
                    <Product key={product.name} details={product} />
                </Grid>

            })
        }

    </Grid>
}

export default RenderProducts;