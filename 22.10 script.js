const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            // console.log('-----------');
            callback(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
     }

class GoodsItem {
    constructor(title, price) {
        this.product_name = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = `<h2>Товары</h2> ${listHtml}`
    }

    calculateTotalCost () {
        let totalCost=0;
        this.goods.forEach((good) =>{
            console.log(good.price);
            totalCost += good.price;
        });
        console.log(totalCost);
    }
}

//---------------------------------------------------------------------------
let myGoodList = new GoodsList();

myGoodList.fetchGoods(() => {
    myGoodList.render();
});
// console.log(myGoodList);



myGoodList.calculateTotalCost()

//--------------------------------------------------------------------------
