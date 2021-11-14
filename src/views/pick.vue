<template>
    <div :class="['pick_p', {'pick_none' : pick_none}]">
        <h1> My Pick !</h1>
        <p class="what_pick" v-if="pick_none">{{user_pick}}</p>
        <div class="pick_box">
            <div class="hex_box" v-for="(color, index) in pick" :key="index" @click="link_c(color.hex)">
                <div class="hex_card">
                    <img :src="require(`../img/${color.hex}.png`)" alt="">
                    <p>{{color.hex}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods : { 
        link_c(hex) {
            this.$store.commit('toss', hex);
            this.$router.push({name : 'color_list'})
        },
    },
    computed : {
        pick() {
            return this.$store.getters['pick_page'];
        },
        pick_none() {
            return this.$store.getters['pick_page'].length == 0 ? true : false
        },
        user_pick() {
            return this.$store.state.login_check != '' ? '자신만의 색을 담아보세요!' : '로그인 후 사용 해주세요' 
        }
    },
}
</script>