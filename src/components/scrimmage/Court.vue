<template>
  <div class="translucentBackground scrimmageBorder" v-cloak ref="canvas"></div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'court',
  data() {
    return {
      script: null,
      ps: null,
    }
  },
  mounted() {
    /**** p5.js script ****/
    this.script = p => {

      p.dots = [];
      p.setup = _ => {
        let parentWidth = document.getElementById('court').offsetWidth;
        let offsetHeights = document.getElementById('court').offsetTop + 15;
        let canvas = p.createCanvas(parentWidth, window.innerHeight-offsetHeights);
        canvas.parent(this.$refs.canvas);
      },

      p.drawCourt = _ => {
        /**** TODO ****
         * draw additional details (backboard/hoop, lane line ticks, etc)
         * coloring for the court
         * why isn't the math working out?
        */
        p.background(51);

        /* makes court lines thicker */
        p.drawingContext.lineWidth = 3;

        /**** drawing court lines ****/
        const unit = p.height/55; // each unit represents 1 foot

        /**** drawing 3pt line  *****/
        // TODO: fix arc position (make flat on top and bottom)
        p.noFill();
        p.stroke("#9B9B9B");
        p.arc(4.3*unit, p.height/2, 41.5*unit, 41.5*unit, -p.HALF_PI - p.QUARTER_PI, p.HALF_PI+p.QUARTER_PI);

        /**** drawing lane lines ****/
        p.rect(0, p.height/2 - 6*unit, 19*unit, 12*unit);



        /**** drawing top of the key  ****/
        p.arc(19*unit, p.height/2, 12*unit, 12*unit, -p.HALF_PI, p.HALF_PI, p.CHORD);
      },

      p.mouseClicked = _ => {
        if (this.$store.getters.getIfForgotTimer) this.$root.$emit('forgot', true);
        const unit = p.height/55;
        const threePointCenter = {x: 4.3*unit, y: p.height/2};
        if (p.mouseX < p.width && p.mouseX > 0 &&
            p.mouseY < p.height && p.mouseY > 0) {
          let point = {
            x: p.mouseX,
            y: p.mouseY,
            // 255 is max alpha value
            life: 255,
          }
          p.dots.push(point);
          let shotValue = 2;
          if (Math.hypot(threePointCenter.x - p.mouseX, threePointCenter.y - p.mouseY) > 41.5*unit/2) {
            shotValue = 3;
          }
          this.$store.dispatch('updatePosition', {x: p.mouseX, y: p.mouseY, shotValue: shotValue});
        }
      },

      p.draw = _ => {
        p.clear();
        p.drawCourt();
        let newDots = [];
        p.dots.forEach(point => {
          p.strokeWeight(4);
          p.stroke(52, 145, 173, point.life);
          p.ellipse(point.x, point.y, 45, 45);
          let newPoint = point;
          let loggedPosition = this.$store.getters.getCurrentEvent.position;
          if (!loggedPosition) {
            newPoint.life -= 10;
          }
          else if (newPoint.x != loggedPosition.x ||
                  newPoint.y != loggedPosition.y) {
            newPoint.life -= 4;
          }
          if (newPoint.life > 0) newDots.push(newPoint);
        });
        p.dots = newDots;
      }
    }
    const P5 = require('p5');
    this.ps = new P5(this.script);
  }
}
</script>
