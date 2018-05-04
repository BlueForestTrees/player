import Vue from 'vue';
import PlayerSurface from './vue/PlayerSurface';
import {navTo, play} from "./js/playerControl";

export const init = (el, film, ready) => {
    new Vue({
        el,
        components: {PlayerSurface},
        data: function () {
            return {film: null};
        },
        template: '<PlayerSurface :film="film"/>',
        mounted: function () {
            this.film = film;
            ready({
                play: () => play(this.film),
                navTo: i => navTo(this.film, i)
            });
        }
    });
};