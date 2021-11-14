import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import ColorSet from '@/data/list.js'; //data
import axios from 'axios';

export default createStore({
    state: {
        width_resize : 0,
        height_resize : 0,
        TF : true,
        ColorList : ColorSet,
        search : '',
        choice_r : 0,
        choice_g : 0,
        choice_b : 0,
        percent_r : 0,
        percent_g : 0,
        percent_b : 0,
        box : [],
        login_check : '', //로그인 체크
        ColorPick : [],
        login_TF : false,
        mobile : true, // resize 이벤트
    },
    mutations: {
        resize(state) { // resize 이벤트
            state.width_resize = window.innerWidth;
            if(state.mobile && state.width_resize < 1024) {
                state.mobile = false;
                state.TF = false;
                state.login_TF = false; 
            }else if(!state.mobile && state.width_resize >= 1024) {
                state.mobile = true;
                state.TF = true;
                state.login_TF = true;
            }
        },
        change_TF(state, index) { // 모바일 alert 
            if(state.TF == true && state.width_resize < 1024) {
                state.TF = false;
            }else if(state.TF == false && state.width_resize < 1024) {
                window.location.hash =  window.location.hash + `${state.ColorList[index].hex}`
                state.TF = true;
            }
        },
        toss(state, hex) { // colorpage color 전달 
            state.search = hex.toLowerCase();
        },
        similar(state, num) { // 관련색상 검색 기능
            state.search = state.ColorList[num].tag[1]
        },
        choice(state, index) { //alert 색상값 전달 
            state.choice_r = state.ColorList[index].r;
            state.choice_g = state.ColorList[index].g;
            state.choice_b = state.ColorList[index].b;
        },
        pick_tf(state, num) {  // pick 클릭 시 해당 하트 즉시 반영
            switch (state.ColorList[num].tf) {
                case true : return state.ColorList[num].tf = false;
                case false : return state.ColorList[num].tf = true;
            }
        },
        check(state, data) { // 로그인 승인 시 실행
            state.login_check = data;
        },
        login_color(state, data) { // 해당 유저 pick 정보 불러온 뒤 적용
            state.ColorPick = data;
            state.ColorPick.forEach(function(a) {
                state.ColorList[a.hex_index].tf = false;
            })
        },
        logout(state) { // 로그아웃
            state.login_check = '';
            state.ColorPick.forEach(function(a) {
                state.ColorList[a.hex_index].tf = true;
            })
            state.ColorPick = [];
        },
        mobile_TF(state) { //모바일 login 창 조종
            state.login_TF = !state.login_TF
        },
        mobile_TF2(state) { //모바일환경 뒤로가기
            state.login_TF ? state.login_TF = false : '';
            state.TF ? state.TF = false : '';
        },
        mobile_menu(state) { //mobile 초기값
            state.mobile = window.innerWidth < 1024 ? true : false;
        },
        popstate_event(state) { // popstate이벤트 실행 시 실행
            state.login_TF && state.width_resize < 1024 ? state.login_TF = false : 0;
            state.TF && state.width_resize < 1024 ? state.TF = false : 0;
        }
    },
    actions: {
        user_color({commit}, user) { // 로그인 승인 시 실행됨 
            axios.post('/api/pick/check', user)
            .then(res => {
                commit('login_color', res.data);
            })
            .catch(err => {
                console.log(err);
            })
        },
        m_menu({commit}) { // mobile-resize 이벤트 초기값설정
            commit('mobile_menu');
            commit('resize');
        }
    },
    modules: {

    },
    getters : {
        search(state) {
            return state.search.toLowerCase();
        },
        choice_r(state) {
            state.percent_r = (state.choice_r*100 / 
                (state.choice_r + state.choice_g + state.choice_b)).toFixed(2);
            return (state.percent_r == 'NaN') ? 0 : state.percent_r
        },
        choice_g(state) {
            state.percent_g = (state.choice_g*100 / 
                (state.choice_r + state.choice_g + state.choice_b)).toFixed(2);
            return (state.percent_g =='NaN') ? 0 : state.percent_g
        },
        choice_b(state) {
            state.percent_b = (state.choice_b*100 / 
                (state.choice_r + state.choice_g + state.choice_b)).toFixed(2);
            return (state.percent_b == 'NaN') ? 0 : state.percent_b
        },
        random(state) {
            var aa = []; 
            for (var ss = 0; ss < 6; ss++) {
                var ii = Math.floor(Math.random() * state.ColorList.length);
                if (aa.indexOf(ii) === -1) { 
                    aa.push(ii)                
                }else{ 
                    ss--
                }
            }
            return state.box = aa;
        },
        pick_page(state) {
            return state.ColorList.filter((x => x.tf == false));
        }


    },
    
    plugins: [
        createPersistedState({
            storage: window.sessionStorage, //세션스토리지 사용
            paths : ['login_check','ColorPick', 'ColorList'], // 세션에 저장할 정보
            key : 'login' // key값
        })
    ],
});
