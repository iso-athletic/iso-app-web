<template>
  <div ref="canvas"></div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'court',
  data() {
    return {
      script: null,
      ps: null,
      position: null,
    }
  },
  mounted() {
    this.script = p => {

      p.setup = _ => {
        let canvas = p.createCanvas(400, 600);
        canvas.parent(this.$refs.canvas);
        p.drawCourt();
      },

      p.drawCourt = _ => {
        p.background(72);
        /**** TODO ****
         * draw additional details (backboard/hoop, lane line ticks, etc)
         * coloring for the court
         * why isn't the math working out?
        */

        /**** drawing court lines ****/
        const unit = p.height/50; // each unit represents 1 foot

        /**** drawing 3pt line  *****/
        // TODO: fix arc position (make flat on top and bottom)
        p.noFill();
        p.stroke(255);
        p.arc(4*unit, p.height/2, 41.5*unit, 41.5*unit, -p.HALF_PI - p.QUARTER_PI, p.HALF_PI+p.QUARTER_PI);

        /**** drawing lane lines ****/
        p.rect(0, p.height/2 - 6*unit, 19*unit, 12*unit);

        /**** drawing top of the key  ****/
        p.arc(19*unit, p.height/2, 12*unit, 12*unit, -p.HALF_PI, p.HALF_PI, p.CHORD);
      },

      p.mouseClicked = _ => {
        if (p.mouseX < p.width && p.mouseX > 0 &&
            p.mouseY < p.height && p.mouseY > 0) {
          this.position = [p.mouseX, p.mouseY];
          p.ellipse(p.mouseX, p.mouseY, 10, 10);
        }
      }
    }

    const P5 = require('p5');
    this.ps = new P5(this.script);
  }
}
</script>