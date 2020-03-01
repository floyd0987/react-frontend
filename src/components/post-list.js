import React, { Component } from 'react';
// import './PostList.css';

const API = 'http://wordpresstest2.local/wp-json/wp/v2/';
let products = [];

const stringQuery = "posts/?per_page=10"

class PostList extends Component {

    constructor() {
        super();

        this.firstLoad = true;
        this.api = API;

        this.state = {
            data : [],
            currentPage: 1,
            itemsPerPage: 10
        };
        this.handleClick = this.handleClick.bind(this);

          
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }


    componentDidMount() {

        console.log("postlist componentDidMount");
        this.loadData();
    
      }

    componentDidUpdate(oldProps) {

        const newProps = this.props
        if (oldProps.data !== newProps.data) {
            this.setState({ currentPage: 1 })
        }
    }

    //load data
    loadData() {


        this.setState({ isLoading: true });

        fetch(this.api + stringQuery )
            .then(response => {
                if (response.ok) {

                    const totalCount = response.headers.get('x-wp-total');
                    const pages = response.headers.get('x-wp-totalpages');


                      console.log('totalCount', totalCount);
                      console.log('pages', pages);

                     this.setState({ pages: pages })
                    if (pages > 1) {
                        this.loadMore(totalCount, pages);
                    }

                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            }).then(data => {
                console.log("data", data);
                this.setProducts(data);

            });
    }





    loadMore(totalCount, pages) {
        // console.log("loadmore" + totalCount + " " + pages);

        // Loop all pages, which was counted from the first REST API fetch.
        for (let i = 2; i <= pages; i++) {
            fetch(this.api + stringQuery + '&page=' + i)
                .then(response => response.json())
                .then(data => {

                    this.setProducts(data);

                });
        }

    }


    setProducts(data) {

        // Add data to contacts array.
        products.push(...data);
        console.log("products", products);

        // return products;
        this.setState({ data: products, isLoading: false })


    }
    //load data



    



    render() {
        console.log("render PostList");
        // const  data  = this.props.data;
        const { currentPage, itemsPerPage } = this.state;

        const items = this.state.data;
         
        // Logic for displaying current items
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            console.log("pageNumbers",pageNumbers);
            
            if (pageNumbers == 1) { return; }

            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });



        return (

            <div className="product-list-container mb-3">

                test

                <div className="product-list p-3 border border-primary roundedx" style={{ borderRadius: 15 }}>


                    {currentItems.length > 0 ?

                        <ul className="p-1" style={{ paddingLeft: 0 }}>
                            {currentItems.map((currentItems, i) =>
                                <li key={i} className="list-unstyled">
                                    <div className="row no-gutters">

                                        <div className="col-md-2 text-center">
                                            <a href={currentItems.link}  >

                                                {/* <img src={'https://www.generon.it/wp-content/themes/generon-understrap-child/images/generon-logo-small.jpg'} width="70" alt="" /> */}

                                                {currentItems.image &&
                                                <img src={ currentItems.image  }  width="100" alt="" />
                                                }



                                            </a>
                                        </div>

                                        <div className="col-md-10 mt-1">
                                            <a href={currentItems.link} title="test" >
                                                <div dangerouslySetInnerHTML={{ __html: currentItems.title.rendered }} />

                                            </a>






                                        </div>

                                    </div>
                                    <hr className="border-primary" />
                                </li>
                            )}
                        </ul>

                        :
                        <div>No posts</div>


                    }




                </div>

                <div className="small pt-2">Tot: {items.length}</div>


                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>





            </div>

        );



    }

}

export default PostList;
