import React, {Component} from 'react';


class Products extends Component {


    constructor() {
        super();
        this.state = {
            productClicked: false
        }
    }

    render(props) {
        let unformatted_details = this.props.details;
        let trimmed_bracket = unformatted_details.replace(']', '');
        let all_trimmed_details = trimmed_bracket.replace('[', '');
        let details = all_trimmed_details.split('"')
        let detailComponents = []
        for(var i=0; i<details.length; i++) {
            if(details[i] !== ''){
                detailComponents.push(<li key={i}> {details[i]} </li>)
            }
        }
        return (
            <tr onClick={ (event) => this.props.onProductClick(event, this.props.index-1)}>
            
                <th scope="row">{ this.props.index }</th>
                <td> { this.props.title } </td>
                <td>{ this.props.category }</td>
                <td>  
                    {detailComponents}
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
