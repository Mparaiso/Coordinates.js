define (require)->
    ### MenuTemplate ###
    """
    <!-- affiche la liste des layouts dans la collection de layouts courante -->
    <% for( i in layouts ){%>
        <li data-type="<%-layouts[i].type %>" > 
            <a href='#changelayout/layout2d/<%- layouts[i].type %>'> <%- layouts[i].name  || layouts[i].type %> </a>
        </li>
    <%}%>
    """