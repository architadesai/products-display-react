import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ProductsList from './components/products/ProductsList';

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
                <h1>Loading...</h1>
            )
        }
        else if (data !== "Loading" && Object.keys(data).length === 0) {
            return (
                <h1>Sorry, the API server seems to be down!</h1>
            )
        }
        else if(data !== "Loading" && Object.keys(data).length !== 0) {
            console.log(data)
            return (
                <ProductsList />
            );
        }
    }
}


export default App;
