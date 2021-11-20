<template>
<!-- <transition name="demo"> -->
    <!-- <div class="login" v-if="$store.state.login_TF"> -->
    <div class="login">
        <!-- <div class="mobile_title" v-if="!$store.state.TF"> 모바일에서 수정할것-->
        <!-- </div> -->

        <form class="log_box">
            <h1>PASTEL 회원 로그인</h1>
            <div class="not" v-if="not_login"> <!-- 비로그인 상태 -->
                <div class="in_bt">
                    <input type="text" v-model="user_id" 
                    placeholder="ID">
                    <input type="password" v-model="user_password" 
                    placeholder="PASSWORD" autocomplete="on" @keyup.enter="login()">
                </div>
                <div class="act_bt">
                    <input type="button" value="로그인" @click="login()"> 
                    <input type="button" value="회원가입" @click="join()">
                </div>
                <p v-if="login_errer">
                    <i class="fas fa-exclamation-circle"></i> {{ login_errer }}
                </p>
            </div>
            <div class="success" v-if="!not_login"> <!-- 로그인 상태 -->
                <p>{{ $store.state.login_check }}</p>
                <input type="button" value="logout" @click="logout()">
            </div>
        </form>
    </div>
<!-- </transition> -->
</template>

<script>
export default {
    data() {
        return {
            user_id : '',
            user_password : '',
            login_errer : '',
            aa : false,
        }
    },
    methods : {     
        login() { // 로그인 승인 부분
            var login_data = {
                u_id : this.user_id,
                u_password : this.user_password
            }
            this.axios.post('/api/login', login_data)
            .then(res => {
                if(res.data == 'success') {
                    this.$store.commit('check', login_data.u_id);
                    this.$store.dispatch('user_color', login_data);
                    this.login_errer = '';
                }else{
                    this.login_errer = res.data;
                }
                this.user_id = "";
                this.user_password = "";
            })
            .catch(err => {
                console.log(err)
            })
        },
        join() { // 회원가입
            var user_data = {
                u_id : this.user_id.trim(), 
                u_password : this.user_password.trim()
            }
            if(user_data.u_id != '' && user_data.u_password != ''){ 
                this.axios.post('/api/join', user_data)
                .then(res => {
                    this.login_errer = res.data; 
                })
                .catch(err => {
                    console.log(err);
                })
                this.user_id = "";
                this.user_password = "";
            }
        },
        logout() { // 로그아웃
            var user_data = {
                u_id : this.$store.state.login_check
            }
            this.$store.dispatch('user_color', user_data);
        },
        // login_bt() { 
        //     history.back();
        //     this.$store.commit('mobile_TF')
        // },
    },
    mounted() {
    },
    computed : {
        not_login() { // 로그인 비로그인 확인
            return this.$store.state.login_check == "" ? true : false;
        }
    },
    watch: {
    }

}
</script>

<style lang="scss">

</style>