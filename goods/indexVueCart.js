//  console.log("Hello");

const API_URL = 'https://raw.githubusercontent.com/shevtsovsv/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise (function (resolve) {
        let xhr;
  
        if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        //for Opera, Chrom, Mazila, Safari. 
        } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
        //for internet explorer
        }    
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {         
            resolve(xhr.responseText);
        }
        }
    
        xhr.open('GET', url, true);
        xhr.send();
    }); 
  };

let app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filterText: "",
        basket:[],
        showBasket: false
    },
    created(){
        this.fetchItems();
        console.log(this.fGoods);
    },
    
    methods: {
        fetchItems() {
            return new Promise((resolve) => {
                makeGETRequest(`${API_URL}/catalogData.json`).then( (goods) => {                                
                  this.goods = JSON.parse(goods);               
                resolve();                                
                });        
            });        
        },
        addToBasket(index){
            // this.basket.push(index);
            // console.log(this.basket);
            let object = {};
            
            object.id_product = index.id_product;
            object.title = index.title;
            object.price = index.price;
            object.q = 0;
            console.log(object);

            if(this.basket.length !== 0){
                let temp = false;
                let a;
                for (let i = 0; i < this.basket.length; i++){
                    console.log("hello");
                    if(this.basket[i].id_product == object.id_product){
                        temp = true;
                        a = i;}
                }
                if(temp) {
                    this.basket[a].q +=1;
                    console.log("hello hello");
                    console.log(this.basket);                      
                } else {
                    object.q = 1;
                    this.basket.push(object);
                    console.log("hello hello hello");
                }                
            } else {
                object.q = 1;
                this.basket.push(object);
                console.log("hello hell");
            }            
        },

        removeFromBasket(id){           
            
            for (let i = 0; i < this.basket.length; i++) {               
                if(this.basket[i].q > 1){
                    this.basket[i].q -= 1;
                } else {
                    this.basket = this.basket.filter(({id_product}) => id_product !== id);
                }    
            }
        }
    },

    computed: {
        fGoods(){
            const regexp = new RegExp(this.filterText,"i");
            return this.goods.filter(good => regexp.test(good.title));            
        },
        
        totalCost(){
            let totalCostVar = 0;                
            this.basket.forEach(element=> {
                if("q" in element){
                    totalCostVar += element.price * element.q;
                } else {
                    totalCostVar += element.price; 
                }                                                  
            })            
            return totalCostVar;    
        }        
    }
})

Veu.component ("goods", {
data(){
    return  {
        goods: [],
        filterText: ""
    }
},
template: "<h1>Hello, world </h1>"
})

Veu.component ("basket", {

})