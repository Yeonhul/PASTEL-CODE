<template>
    <div class="menu">
        <div class="h_box">
            <input :class="['h_bt', b_class(h_dex)]" type="button" v-for="(m, h_dex) 
            in $store.state.router_list" :key="h_dex" :value="m" @click="m_click(m, h_dex)">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            header_TF : false, // 모바일용 header 이벤트 (스크롤)
            b_count : 0, // 버튼 활성화 체크 
        }
    },
    methods :{
        m_click(m_name, index) {
            this.$router.push({name : m_name.toLowerCase()})
            this.$store.commit('menu_count',index);
            $('html, body').animate({scrollTop : 0});
        },
        b_class(index) {
            return this.$store.state.menu_bt == index ? "h_E" : ""; // 최초 페이지 입장 시 route 확인 후 상태부여
        },
        load() {
            var name = this.$route.name;
            this.$store.commit('menu_count_load',name)
        },
    },
    mounted() {
        window.addEventListener('onload', this.load); //onload
    },
    watch:{ 
        '$route' (to, from) {
            this.load() //route 가 변경 일어 날 때 마다 감지
        }
    },
}
</script>

<style lang="scss">

</style>