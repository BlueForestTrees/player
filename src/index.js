import Vue from 'vue';
import Play from './vue/Play';
import {navTo, play} from "./js/playerControl";

//pour usage dans une appli vue
export const nav = navTo;
export const start = play;

//usage dans une page html avec balise script
export const init = (el, film, ready) => {
    new Vue({
        el,
        components: {Play},
        data: function () {
            return {film: null};
        },
        template: '<Play :film="film"/>',
        mounted: function () {
            this.film = film;
            ready({
                start: () => play(this.film),
                nav: i => navTo(this.film, i)
            });
        }
    });
};