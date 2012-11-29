define (require)->
    ### MenuTemplate ###
    """
    <% for( i in layouts ){%>
        <li data-type="<%-layouts[i].type %>" > 
            <a href='#layout2d/<%- layouts[i].type %>'> <%- layouts[i].name  || layouts[i].type %> </a>
        </li>
    <%}%>
    """