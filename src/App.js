import React, {Component} from 'react';
import './App.css';
import Products from './components/products/Products';
import ProductDetail from './components/products/ProductDetail';

class App extends Component {

    constructor() {
        super();
        this.state = {
            products: {},
            loading: false,
            showProductDetail: false,
            productDetailID: -1
        }
        this.handleProductClick = this.handleProductClick.bind(this);
    }

    handleProductClick(event, product_id) {
        this.setState({
            showProductDetail: true,
            productDetailID: product_id
        });
    }


    componentDidMount() {
        this.setState({
            loading: true
        });
        
        const url = 'https://test.pickcel.com/api/v1/getAmazonDeals';
        fetch(url)
            .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        loading: false,
                        products: data['data'][0]['amazon_data']
                    })
                    
                    // Assign 'id' to products
                    let new_products_dict = this.state.products;
                    let length = new_products_dict.length;
                    
                    for(let i=0; i<length; i++) {
                        new_products_dict[i]['id'] = i;
                    }
                    this.setState({
                        products: new_products_dict
                    });
                })
    }

    render() {
        const products = this.state.loading ? "Loading" : this.state.products;
        if(products === "Loading") {
            return (
                <h1 className="text-center" style={{ marginTop: '15%' }}>Loading...</h1>
            )
        }
        else if (products !== "Loading" && Object.keys(products).length === 0) {
            return (
                <h1>Sorry, the API server seems to be down!</h1>
            )
        }

        else if(products !== "Loading" && Object.keys(products).length !== 0) {
            
            // When a specific product will be displayed
            if(this.state.showProductDetail === true) {
                let product_id = this.state.productDetailID;
                return(
                    <ProductDetail 
                        title={products[product_id]['Title']}
                        category={products[product_id]['Category']}
                        details={products[product_id]['Details']}
                        asin={products[product_id]['ASIN']}
                        images={products[product_id]['Images']}
                    />
                )
            }
            
            let self = this;
            const productsComponents = products.map(function(product, index){ 
                return(
                    <Products key={ index }
                            index = { index+1 }
                            title={product['Title']}
                            category={product['Category']}
                            details={product['Details']}
                            asin={product['ASIN']}
                            onProductClick={self.handleProductClick}
                    />
                )            
            });
            return (
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Details</th>
                        <th scope="col">ASIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productsComponents }
                    </tbody>
                </table>
            );
        }
    }
}


export default App;
