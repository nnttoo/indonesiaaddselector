# Indonesia Address Selector Pure JS #

Make an Indonesian address selector on your website, for shipping addresses or something like that, with pure javascript and static files without a database.

## Demo
[Demo Page](https://nnttoo.github.io/indonesiaaddselector/)


Data for all districts and cities for all of Indonesia is relatively small, we don't need to use databases like mysql for things like this.

Address data is stored in a txt file, and can be used in static hosting such as the github page. to be more efficient, I separate the txt file for each province, so that the address text file becomes smaller. one text is only around 50kb.

To make that data cross-domain accessible, to retrieve data I use iframe and postmessage instead of ajax.

I recommend you copy the **docs** folder on your own hosting, but to make it easy, you can also use the src script tag that points to this github page, although I don't know the extent to which the github page can be relied upon if used for many websites.


Examples of uses :
```html
<html>
<body>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" ></script>
<script src="https://nnttoo.github.io/indonesiaaddselector/js/bundleview.js"></script>   
<script>
     var loader = new indoselector.KotaIndoSelector();
        loader.server = "https://nnttoo.github.io/indonesiaaddselector/loader.html" 

        loader.load(function(){    
                loader.getProv(function(data){
                    data.forEach(function(codename){
                        console.log(codename.code) // print code
                        console.log(codename.name) // print name
                    })
                })
        });
</script>
</body> 
</html>
```

## List Function
All functions must be accessed in a callback load, to ensure everything is prepared. see the example above

### getProv(callback)
take all provincies
example : 
```js
    loader.getProv(function(data){
        data.forEach(function(codename){
            console.log(codename.code) // print code
            console.log(codename.name) // print name
        })
    })
```

### getKab(code,callback) 
get all kabupaten/kota that matches the code
example : 
```js
    loader.getKab("11",function(data){
        data.forEach(function(codename){
            console.log(codename.code) // print code
            console.log(codename.name) // print name
        })
    })
```

### getKec(code,callback) 
get kecamatan that matches the code

### getDes(code,callback)
get desa that matches the code

 