/**
 * @license see license.txt
 * @author mparaiso <mparaiso@online.fr>  
 * @url mparaiso.online.fr
 */
module coordinate.constantes {

    export enum FlowAlignment {
        /**
         * Flow nodes align to the top-left bounds
         */
        TOP_LEFT,

        /**
         * Flow nodes align to the top-center bounds
         */
        TOP_CENTER,

        /**
         * Flow nodes align to the top-right bounds
         */
        TOP_RIGHT,

        /**
         * Flow nodes align to the middle-left bounds
         */
        MIDDLE_LEFT,

        /**
         * Flow nodes align to the middle-center bounds
         */
        MIDDLE_CENTER,

        /**
         * Flow nodes align to the middle-right bounds
         */
        MIDDLE_RIGHT,

        /**
         * Flow nodes align to the bottom-left bounds
         */
        BOTTOM_LEFT,

        /**
         * Flow nodes align to the bottom-center bounds
         */
        BOTTOM_CENTER,

        /**
         * Flow nodes align to the bottom-right bounds
         */
        BOTTOM_RIGHT

    }

    export enum FlowDirection {
        /**
         * Nodes flow horizontally within the bounds of the layout
         */
        HORIZONTAL,

        /**
         * Nodes flow vertically within the bounds of the layout
         */
        VERTICAL
    }

    export enum FlowOverflowPolicy {

        /**
         * Allow all nodes within flow that are out of the layout's bounds to continue flowing.
         * For example, a flow layout in which the <em>flowDirection</em> was <em>HORIZONTAL</em> would continue
         * places nodes horizontally even if the bounds of the layout have been reached
         */
        ALLOW_OVERFLOW,

        /**
         * Will simply not place nodes that do not fit within the layout's bounds.
         */
        IGNORE_OVERFLOW,

        /**
         * Will remove node's DisplayObject link from the target's display stack if it does not 
         * fit within that layout's bounds.
         */
        HIDE_OVERFLOW

    }

    export enum GridLayoutDirection {
        /**
         * Places nodes within the grid layout from left to right
         */
        LEFT_TO_RIGHT,

        /**
         * Places nodes within the grid layout from right to left
         */
        RIGHT_TO_LEFT,

        /**
         * Places nodes within the grid layout from top to bottom
         */
        TOP_TO_BOTTOM,

        /**
         * Places nodes within the grid layout from bottom to top
         */
        BOTTOM_TO_TOP

    }

    export enum LayoutType {
        /**
         * @see coordinate.layouts.threedee.Ellipse3d
         */
        ELLIPSE_3D,

        /**
         * @see coordinate.layouts.threedee.Grid3d
         */
        GRID_3D,

        /**
         * @see coordinate.layouts.threedee.Scatter3d
         */
        SCATTER_3D,

        /**
         * @see coordinate.layouts.threedee.Snapshot3d
         */
        SNAPSHOT_3D,

        /**
         * @see coordinate.layouts.threedee.Sphere3d
         */
        SPHEROID_3D,

        /**
         * @see coordinate.layouts.threedee.Stack3d
         */
        STACK_3D,

        /**
         * @see coordinate.layouts.threedee.Wave3d
         */
        WAVE_3D,

        /**
         * @see coordinate.layouts.threedee.WaveEllipse3d
         */
        WAVE_ELLIPSE_3D,

        /**
         * @see coordinate.layouts.twodee.Ellipse
         */
        ELLIPSE,

        /**
         * @see coordinate.layouts.twodee.Flow
         */
        FLOW,

        /**
         * @see coordinate.layouts.twodee.Grid
         */
        GRID,

        /**
         * @see coordinate.layouts.twodee.HorizontalLine
         */
        HORIZONTAL_LINE,

        /**
         * @see coordinate.layouts.twodee.Lattice
         */
        LATTICE,

        /**
         * @see coordinate.layouts.twodee.Scatter
         */
        SCATTER,

        /**
         * @see coordinate.layouts.twodee.Snapshot
         */
        SNAPSHOT,

        /**
         * @see coordinate.layouts.twodee.Stack
         */
        STACK,

        /**
         * @see coordinate.layouts.twodee.VerticalLine
         */
        VERTICAL_LINE,

        /**
         * @see coordinate.layouts.twodee.Wave
         */
        WAVE
    }
}