import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
                        products: data
                    })
                })

    }

    render() {
        const data = this.state.loading ? "Loading" : this.state.products;
        console.log(data)
        return (
            <h1>data</h1>
        );
    }
}


export default App;
