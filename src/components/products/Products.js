import React, {Component} from 'react';


class Products extends Component {

    // let detailsComponents = [];

    // const detailLis = () => {
    //     for (let i = 0; i < props.details.length; i++) {
    //         detailsComponents.push(<li key={i}> {props.details[i]}</li>);
    //     }
    //     return detailsComponents;
    // };

    constructor() {
        super();
        this.state = {
            productClicked: false
        }
    }

    render(props) {
        return (
            <tr onClick={ this.handleClick }>
                <th scope="row">{ this.props.index }</th>
                <td> { this.props.title } </td>
                <td>{ this.props.category }</td>
                <td>  
                    {this.props.details}
                </td>
                {/* <td>
                    <ul> { detailLis() } </ul>
                </td> */}
                <td> { this.props.asin } </td>
            </tr>
        )
    }
}

export default Products;
