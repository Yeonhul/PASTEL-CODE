<template>
    <div :class="['header', {'h_E': header_TF}]">
        <div class="title">
            <h1>PASTEL</h1>
            <!-- <span class="close" v-if="!$store.state.TF" @click="login_bt()">
                <i class="fas fa-user"></i>
            </span> -->
        </div>
        <!-- <div class="h_box">
            <input :class="['h_bt', b_class(h_dex)]" type="button" v-for="(m, h_dex) 
            in menu" :key="h_dex" :value="m" @click="m_click(m, h_dex)">
        </div> -->
        <slot></slot>
        <!-- <LoginComponent /> -->
    </div>
</template>

<script>
import {
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onErrorCaptured,
    onMounted,
    onUnmounted,
    onUpdated
} from "vue"; // 라이프 사이클 hook 사용 

export default {
    data() {
        return {
            menu : ['MAIN', 'COLOR_LIST', 'PICK'], // router list 삭제요망
            header_TF : false, // 모바일용 header 이벤트 삭제요망
            b_count : 0, // 버튼 활성화 체크 삭제요망
        }
    },
    methods :{
        // m_click(m_name, dex) {
        //     this.$router.push({name : m_name.toLowerCase()})
        //     this.b_count = dex;
        //     $('html, body').animate({scrollTop : 0});
        // },
        
        resize_event() { //resize 이벤트
            console.log('aasdasd');
            this.$store.commit('resize');
        },

        scroll_event() { //scrollTop 이벤트
            // var sctop = $(window).scrollTop();
            // if(sctop > 100 && this.$store.state.width_resize < 1024) {
            //     this.header_TF = true;
            // }else if(sctop == 0 && this.$store.state.width_resize < 1024) {
            //     this.header_TF = false;
            // }
        },
        // b_class(index) {
        //     return this.b_count == index ? "h_E" : ""; // 최초 페이지 입장 시 route 확인 후 상태부여
        // },
        load() {
            // var name = this.$route.name;
            // return this.$route.name == undefined ? 
            // 0 : this.b_count = this.menu.indexOf(name.toUpperCase());
        },
        login_bt() {
            window.location.hash.indexOf('#login') == -1 ? 
            window.location.hash =  window.location.hash + '#login' : ''; //hash 추가
            this.$store.commit('mobile_TF');
        },
        popstate() { //back button
            this.$store.commit('popstate_event');
        }
    },
    computed : {
    },
    mounted() {
        window.addEventListener('resize', this.resize_event); //resize 삭제요망
        window.addEventListener('scroll', this.scroll_event); //scroll 삭제요망
        window.addEventListener('onload', this.load); //onload 삭제요망
        window.addEventListener('popstate', this.popstate, false); //backbutton
        this.$store.dispatch('m_menu'); // menu 초기세팅
    },
    beforeDestory() {
        window.removeEventListener('resize', this.resize_event); //resize
        window.removeEventListener('scroll', this.scroll_event); //scroll
        window.removeEventListener('onload', this.load); //onload
        window.removeEventListener('popstate', this.popstate); //backbutton
    },
    watch:{ 
        '$route' (to, from) {
            this.load() //route 가 변경 일어 날 때 마다 감지
        }
    },
}

</script>

<style>
    
</style>