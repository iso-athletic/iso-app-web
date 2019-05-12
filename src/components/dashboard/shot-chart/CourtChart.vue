
<template>
  <div class="noBackground" id="courtChart" v-cloak ref="canvas"></div>
</template>

<script>
export default {
  name: 'courtChart',
  props: ['shots'],
  data() {
    return {
      script: null,
      ps: null,
      window: {
        width: 0,
        height: 0
      },
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },

  },
  beforeMount() {
    /**** p5.js script ****/
    this.script = p => {
      p.dots = this.shots;
      console.log(this.shots);
      p.setup = _ => {
        let canvas = p.createCanvas(this.window.width/2, this.window.height);
        canvas.parent(this.$refs.canvas);
      }
      p.drawCourt = _ => {
        /**** TODO ****
         * draw additional details (backboard/hoop, lane line ticks, etc)
         * coloring for the court
         * why isn't the math working out?
        */
        p.background(40);
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
      }
      p.draw = _ => {
        p.clear();
        p.drawCourt();
        this.shots.forEach(point => {
          p.strokeWeight(4);

          if(point[1].shotValue == 0){
            p.stroke('red')
          }
          else {
            p.stroke(70, 149, 236, point.life);
          }
          p.ellipse(point[1].x, point[1].y, 45, 45);
          p.strokeWeight(1);
          p.text(point[0], point[1].x,  point[1].y);
        });
      }
    }
    const P5 = require('p5');
    this.ps = new P5(this.script);
  }
}
</script>
