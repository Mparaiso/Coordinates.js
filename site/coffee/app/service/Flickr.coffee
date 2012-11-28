define (require)->
    getFlickApiUrl:(options)->
        {key,quantity}=options
        "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a47e50dcce48c46c58f9b8c622c42a18&text=#{key}&per_page=#{quantity}&format=json&jsoncallback=?"
    getImageUrl:(farm,server,id,secret,format=q)->
        "http://farm#{farm}.staticflickr.com/#{server}/#{id}_#{secret}_#{format}.jpg"
    getImages:(keyword="moon",callback,format="q")->
        ### returns an array of image urls ###
        _callback = (rawdata,status)=>
            data = for photo in rawdata.photos.photo
                @getImageUrl(photo.farm,photo.server,photo.id,photo.secret,format)
            callback.apply(null,[data,status,rawdata])
        jQuery.get(@getFlickApiUrl(keyword:keyword,quantity:20),_callback,"jsonp")
    search: ->
        @getImages.apply(this,arguments)

  
