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
        p.background(72);
      },
      p.draw = _ => {
        p.noFill();
        // standard college baseline is 50ft and 3pt arc is 20.75ft
        // TODO: fix arc position (make flat on top and bottom)
        // find actual mesurements and ratios of center of arc to baseline
        const arcRatio = 20.75/25;
        p.arc(15, p.height/2, arcRatio*p.height, arcRatio*p.height, -p.HALF_PI - p.QUARTER_PI, p.HALF_PI+p.QUARTER_PI);
      },
      p.mouseClicked = _ => {
        this.position = [p.mouseX, p.mouseY];
        console.log(this.position);
        p.ellipse(p.mouseX, p.mouseY, 10, 10);
        console.log('clicked!');
      }
    }

    const P5 = require('p5');
    this.ps = new P5(this.script);
    console.log(this.ps);
  }
}
</script>