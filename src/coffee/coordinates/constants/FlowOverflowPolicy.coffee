define ->
    ###
     * Allow all nodes within flow that are out of the layout's bounds to continue flowing.
     * For example, a flow layout in which the <em>flowDirection</em> was <em>HORIZONTAL</em> would continue
     * places nodes horizontally even if the bounds of the layout have been reached
     ###
    ALLOW_OVERFLOW: "allow"
    ###
     * Will simply not place nodes that do not fit within the layout's bounds.
    ###
    IGNORE_OVERFLOW: "ignore"
    ###
     * Will remove node's DisplayObject link from the target's display stack if it does not 
     * fit within that layout's bounds.
    ###
    HIDE_OVERFLOW: "hide"

    