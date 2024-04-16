import React,{Component} from "react";
import Banner from './인터페이스구현/Component/Banner';
import Movie from './인터페이스구현/Component/Movie';

class App extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true,
            datas:[],
            suggestion:[]
        }
        this.index=0
        this.prevIndex=0
    }
    

    randomIndex=(datas)=>{
        return Math.floor(Math.random()*datas.length)
    }

    changeMovie=()=>{
        let{datas}=this.state
        this.prevIndex=this.index
        while(this.prevIndex===this.index){
            this.index=this.randomIndex(datas)
        }
        this.getMovie(datas)
        
    }
    getMovie=(movies)=>{
        fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movies[this.index].id}`)
        .then(response=>response.json())
        .then(result=>{
            const{data:{movies}}=result
            this.setState({suggestion:movies})
        })
    }
    
    componentDidMount(){
        fetch("https://yts.mx/api/v2/list_movies.json?limit=30&with_rt_ratings=true&minimum_rating=7&sort_by=title&order_by=asc")
        .then(response=>response.json())
        .then(result=>{
            const {data:{movies}}=result
            this.setState({datas:movies,loading:false})
            this.countId=setInterval(this.changeMovie,3000)
            this.getMovie(movies)
        })
    }
    componentWillUnmount(){
        clearInterval(this.countId)

    }
    render(){
        const loadingStyle={
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)'
        }
        const{datas,loading, suggestion}=this.state
        if(datas.length>0&&!loading){
            return(
                <div className="App">
                    <Banner {...datas[this.index]} suggestion={suggestion}/>
                    <div className="movie-container">
                        {datas.map(data=>{
                            return <Movie key={data.id} 
                            medium_cover_image={data.medium_cover_image}
                            title={data.title}
                            genres={data.genres}
                            rating={data.rating}
                            />
                        })}
                    </div>
                </div>
            )
        }else{
            return(
                <div style={loadingStyle}>
                    <h1 >Loading...</h1>
                </div>
            )
        }
    }
}
export default App