define (require)->
    getFlickApiUrl:(keyword)->
        "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=650471508c5ec7adf3feb1faf05996d8&text=#{keyword}&per_page=20&format=json&jsoncallback=?"
    getImageUrl:(farm,server,id,secret,format)->
        "http://farm#{farm}.staticflickr.com/#{server}/#{id}_#{secret}_#{format}.jpg"
    getImages:(keyword="moon",callback,format="q")->
        ### returns an array of image urls ###
        _callback = (rawdata,status)=>
            data = for photo in rawdata.photos.photo
                @getImageUrl(photo.farm,photo.server,photo.id,photo.secret,format)
            callback.apply(null,[data,status,rawdata])
        jQuery.get(@getFlickApiUrl(keyword),_callback,"jsonp")
    search: ->
        @getImages.apply(this,arguments)


