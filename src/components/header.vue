<template>
    <div :class="['header', {'h_E': header_TF}]">
        <div class="title">
            <h1>PASTEL</h1>
        </div>
        <slot></slot>
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

        }
    },
    methods :{
        resize_event() { //resize 이벤트
            console.log('aasdasd');
            this.$store.commit('resize');
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
        window.addEventListener('resize', this.resize_event); //resize
        window.addEventListener('popstate', this.popstate, false); //backbutton
        this.$store.dispatch('m_menu'); // menu 초기세팅
    },
    beforeDestory() {
        window.removeEventListener('resize', this.resize_event); //resize
        window.removeEventListener('popstate', this.popstate); //backbutton
    },
    watch:{ 

    },
}

</script>

<style>
    
</style>