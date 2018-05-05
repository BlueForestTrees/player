import Vue from 'vue';
import Play from './vue/Play';
import {navTo, play} from "./js/playerControl";

const endEvent = new Event('end',{bubbles:true});

//pour usage dans une appli vue
export const nav = navTo;
export const start = play;

//usage dans une page html avec balise script
export const init = (el, film, ready) => {
    new Vue({
        el,
        components: {Play},
        data: function () {
            return {film: null, dom: null, endcb:null};
        },
        template: '<Play :film="film" ref="qzszsx"/>',
        mounted: function () {
            this.dom = this.$refs.qzszsx.el;
            this.film = film;
            ready({
                start: () => play(this.film),
                nav: i => navTo(this.film, i),
                end: endcb => this.endcb = endcb
            });
        },
        watch: {
            'film.f.player.playing': function (v) {
                if (!v) {
                    this.endcb();
                }
            }
        }
    });
};


//utiliser cela pour les applis vue:
//https://unpkg.com/package@version/file