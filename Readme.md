# Indonesia Address Selector Pure JS #

Make an address selector on your website, for shipping addresses or something like that, with pure javascript and static files without a database.

If you want to save it on your server, use the docs folder, there are already data files and javascript ready to use for your website.

If you want it to be easier, just leave the data file here, and use the src script that points to this github page, but I don't know to what extent the github page can be relied on for multiple websites.


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

## Demo
[Demo Page](https://nnttoo.github.io/indonesiaaddselector/)

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

 