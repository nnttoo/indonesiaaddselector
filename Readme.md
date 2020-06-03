# Indonesia Address Selector Pure JS #

Make an Indonesian address selector on your website, for shipping addresses or something like that, with pure javascript and static files without a database.

## Demo
[Demo Page](https://nnttoo.github.io/indonesiaaddselector/)


Data for all districts and cities for all of Indonesia is relatively small, we don't need to use databases like mysql for things like this.

I recommend you copy the <b>docs</b> folder on your own hosting, but to make it easy, you can also use the src script tag that points to this github page, although I don't know the extent to which the github page can be relied upon if used for many websites.


Examples of uses :
```html
    <script src="https://nnttoo.github.io/indonesiaaddselector/js/bundleview.js"></script>
    <script>
         var loader = new indoselector.KotaIndoSelector();
            loader.server = "https://nnttoo.github.io/indonesiaaddselector/loader.html"
 

            loader.load(function(){    
                    loader.getProv(function(data){
                        data.forEach(codename){
                            console.log(codename.code) // print code
                            console.log(codename.name) // print name
                        }
                    })
            });
    </script>
```

## List Function

### getProv(callback)
take all provincies
example : 
```js
    loader.getProv(function(data){
        data.forEach(codename){
            console.log(codename.code) // print code
            console.log(codename.name) // print name
        }
    })
```

### getKab(code,callback) 
get all kabupaten/kota that matches the code
example : 
```js
    loader.getKab("11",function(data){
        data.forEach(codename){
            console.log(codename.code) // print code
            console.log(codename.name) // print name
        }
    })
```

### getKec(code,callback) 
get kecamatan that matches the code

### getDes(code,callback)
get desa that matches the code

 