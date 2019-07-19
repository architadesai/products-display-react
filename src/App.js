import React, {Component} from 'react';
import './App.css';
import Products from './components/products/Products';


class App extends Component {
    constructor() {
        super();
        this.state = {
            products: {},
            loading: false 
        }
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
                })
    }

    render() {
        const data = this.state.loading ? "Loading" : this.state.products;
        if(data === "Loading") {
            return (
                <h1 className="text-center" style={{ marginTop: '15%' }}>Loading...</h1>
            )
        }
        else if (data !== "Loading" && Object.keys(data).length === 0) {
            return (
                <h1>Sorry, the API server seems to be down!</h1>
            )
        }

        else if(data !== "Loading" && Object.keys(data).length !== 0) {
            console.log(data);            
            
            const productsComponents = data.map(function(product, index){ 
                return(
                    <Products key={ index }
                            index = { index+1 }
                            title={product['Title']}
                            category={product['Category']}
                            details={product['Details']}
                            asin={product['ASIN']}
                            images={product['Images']}
                    />
                )            
            });

            console.log("prod comp : ", productsComponents)
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
