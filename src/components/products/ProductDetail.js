import React, {Component} from 'react';

class ProductDetail extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        window.parent.location = window.parent.location.href;
    }

    contentStyle = {
        marginTop: '30px',
        marginLeft: '40%'
        
    }

    render(props){
        let unformatted_images = this.props.images;
        let images = unformatted_images.split('||');
        
        let title_word_list = this.props.title.split(" ");
        let title_word_list_length = title_word_list.length
        for(let i=1; i<title_word_list_length; i=i+2) {
            title_word_list[i] = title_word_list[i].split("").reverse().join("")
        }
        let reverse_title = title_word_list.join(" ");

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

        return(
            <div style={this.contentStyle}>
                <div className="card" style={{ width: '22rem', height: '12rem' }}>
                    <div id="carouselImages" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={images[0]} 
                                className="d-block w-100 card-img-top" />
                            </div>
                            <div className="carousel-item">
                                <img src={images[1]} className="d-block w-100 card-img-top" />
                            </div>
                            <div className="carousel-item ">
                                <img src={images[2]} className="d-block w-100 card-img-top" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselImages" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselImages" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>
                        <p className="card-text">
                            <span style={{fontWeight: 'bold'}}>Category:</span>
                            {this.props.category}
                        </p>
                        <p className="card-text">
                            <span style={{fontWeight: 'bold'}}>Reverse Title:</span>
                            {reverse_title}
                        </p>
                        <p className="card-text">
                            <span style={{fontWeight: 'bold'}}>ASIN:</span>
                            {this.props.asin}
                        </p>
                        <div className="card-text">
                            {detailComponents}
                        </div>
                    </div>
                </div>

                <button onClick={this.handleClick}
                        className="text-center btn btn-primary">
                    Take me Back
                </button>

            </div>
        
        )
    }
}

export default ProductDetail;
