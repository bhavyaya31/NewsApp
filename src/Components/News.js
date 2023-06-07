import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:"us",
        pagesize:6,
        category:"general"
    }
    static propTypes={
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    articles = []

    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            page: 1,
            loading: false
        }
            document.title = this.props.category;
    } 

   async componentDidMount(){
    this.props.setProgress(0)
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=f138f57fb4f04a1192e51c4d1a9d7252&page=1&pagesize=${this.props.pagesize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData= await data.json()
        this.setState({articles: parsedData.articles, 
            totalResults:parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100)
    }

    handlepreviousclick=async()=>{
        this.props.setProgress(0)

        console.log("this.state.page", this.state.page)
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=f138f57fb4f04a1192e51c4d1a9d7252&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData= await data.json()
        
        this.setState({
            page:this.state.page-1,
            articles: parsedData.articles,
            loading:false
        })
        this.props.setProgress(100)

       
    }
    
    handlenextclick= async ()=> {
        this.props.setProgress(0)

        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize))){

            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f138f57fb4f04a1192e51c4d1a9d7252&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
            this.setState({loading:true})
            let data= await fetch(url);
            let parsedData= await data.json()
            this.setState({
                page:this.state.page+1,
                articles: parsedData.articles,
                loading:false
            })
            this.props.setProgress(100)

        
          }  }
        
    render() {
        console.log("this.state.articles", this.state.articles)
        return (
            <div className='container my-3 '>
                <h1 className='text-center' style={{margin: '35px 0px'}}>NewsMonkey- Top Headlines {this.props.category}</h1>
                {this.state.loading && <Spinner/>}

                <div className='row'>
                    {!this.state.loading && this.state.articles?.map((element) => {
                      return <div className="col-md-4" key={element.url} >  
                            <Newsitem title={element.title} description={element.description}
                                imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                
                        </div>
                     } )}

                    
        
                 </div>
                 <div className="container d-flex justify-content-between my-5">
                 <button type="button" disabled={this.state.page<1} className="btn btn-dark" onClick={() => this.handlepreviousclick()}>&larr;Previous</button>
                 <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize)} className="btn btn-dark" onClick={() => this.handlenextclick()}>Next&rarr;</button>
                 {/* OR YOU CAN DO THIS<button type="button" disabled={this.state.page>total page - 1} className="btn btn-dark" onClick={() => this.handlenextclick()}>Next&rarr;</button> */}


                 </div>
            </div>
        )
    }
}

export default News
