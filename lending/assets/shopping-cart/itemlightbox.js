
AMP.getState("shopItemInfo").then(function(c){var g=document.querySelectorAll("select"),b=JSON.parse(c),e=document.getElementById("option1"),h=document.getElementById("option2"),k=document.getElementById("option3"),l=document.getElementById("price"),a=b.allPrice.split(","),m=document.getElementById("buyButton"),n=document.getElementById("addToCartButton");selectObject(b,e,h,k,m,n,a[0]);g.forEach(function(c,g){c.onchange=function(c){for(c=0;c<b.variants1.length;c++)if(b.variants2&&b.variants3)for(var d=
0;d<b.variants2.length;d++)for(var g=0;g<b.variants3.length;g++){if(e.value==b.variants1[c]&&h.value==b.variants2[d]&&k.value==b.variants3[g]){var f=a[c*b.variants2.length+d*b.variants3.length+g];l.textContent=f;selectObject(b,e,h,k,m,n,f)}}else if(b.variants2)for(d=0;d<b.variants2.length;d++)e.value==b.variants1[c]&&h.value==b.variants2[d]&&(f=a[c*b.variants2.length+d],l.textContent=f,selectObject(b,e,h,k,m,n,f));else if(b.variants3)for(d=0;d<b.variants3.length;d++)e.value==b.variants1[c]&&k.value==
b.variants3[d]&&(f=a[c*b.variants3.length+d],l.textContent=f,selectObject(b,e,h,k,m,n,f));else e.value==b.variants1[c]&&(f=a[c],l.textContent=f,selectObject(b,e,h,k,m,n,f))}})});
function selectObject(c,g,b,e,h,k,l){var a;a="https://www.paypal.com/us/cgi-bin/webscr?cmd=_xclick&"+("business="+c.email+"&");a+="amount="+l+"&";a+="item_name="+c.name+"&";a+="currency="+c.currency+"&";c.option1&&(a+="on0="+c.option1+"&",a+="os0="+g.value+"&");c.option2&&(a+="on1="+c.option2+"&",a+="os1="+b.value+"&");c.option3&&(a+="on2="+c.option3+"&",a+="os2="+e.value+"&");"&"==a.slice(-1)&&(a=a.slice(0,-1));h.setAttribute("href",encodeURI(a));k.setAttribute("href",encodeURI(a.replace("cmd=_xclick",
"cmd=_cart")+"&add=1"))};