<template>
<div>
    <div class="content1">
        <input class="con1_search" type="text" placeholder="SEARCH" v-model="$store.state.search">
        <div class="a_con">
            <template v-for="(color, indexs) in $store.state.ColorList">
                <div class="hex_box" @click="hex_click(indexs)" 
                :key="indexs" v-if="color.tag.join().includes(search_lower)">
                    <div class="hex_card">
                        <img :src="require(`../img/${color.hex}.png`)" alt="">
                        <p>{{ color.hex }}</p>
                    </div>  
                </div>
            </template>
        </div>
    </div>
    <div class="alert" v-show="$store.state.TF">
        <div class="a_img"><img :src="require(`../img/${c_name}.png`)" alt=""></div>
        <div class="a_txt">
            <p class="a_name" :style="c_title">{{c_name}}
                <em v-if="this.$store.state.login_check" :class="['heart', {'pick' : icon }]" @click="heart_event()"></em>
            </p> 
            <div class="rgb">
                <div class="rgb_c rgb_r" :style="c_red">{{$store.state.choice_r}} ({{ t_red }}%)</div>
            </div>
            <div class="rgb">
                <div class="rgb_c rgb_g" :style="c_green">{{$store.state.choice_g}} ({{ t_green }}%)</div>
            </div>
            <div class="rgb">
                <div class="rgb_c rgb_b" :style="c_blue">{{$store.state.choice_b}} ({{ t_blue }}%)</div>
            </div>
            <input type="button" value="HEX COPY" @click="copy(c_name)">
            <input type="button" value="Check the similar hex" @click="similar()">
            <div class="close" @click="close()"><span></span><span></span></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return { 
            c_name : 'none',
            sim_num : 0,
        }
    },
    methods : {
        hex_click(indexs) {
            this.$store.commit('change_TF', indexs)
            this.$store.commit('choice', indexs);
            this.c_name = this.$store.state.ColorList[indexs].hex;
            this.sim_num = indexs;
        },

        copy(co) {
            const c_input = document.createElement('input');
            c_input.setAttribute("value", co);
            document.body.appendChild(c_input);
            c_input.select();
            document.execCommand('copy');
            document.body.removeChild(c_input);
            console.log(co);
        },
        
        similar() {
            this.$store.commit('similar',this.sim_num);
            this.$store.commit('change_TF');
            $('html, body').animate({scrollTop : 0});
        },
        close() {
            history.back();
            this.$store.commit('change_TF');
        },
        heart_event() {
            var pick_data = { // 유저 클릭 색상정보 저장 
                user : this.$store.state.login_check,
                hex : this.sim_num,
                hex_name : this.$store.state.ColorList[this.sim_num].hex
            }
            this.axios.post('/api/pick', pick_data) // 해당 정보 전달
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            this.$store.commit('pick_tf', this.sim_num); // pick 클릭 시 해당 하트 즉시 반영
        }

    },
    computed : {
        search_lower()  {
            return this.$store.getters['search'];
        },
        c_red() {
            return `width: ${this.$store.state.percent_r}%;`
        },
        c_green() {
            return `width: ${this.$store.state.percent_g}%;`
        },
        c_blue() {
            return `width: ${this.$store.state.percent_b}%;`
        },
        c_title() {
            return `color: ${this.c_name}`
        },
        t_red() {
            return this.$store.getters['choice_r'];
        },
        t_green() {
            return this.$store.getters['choice_g'];
        },
        t_blue() {
            return this.$store.getters['choice_b'];
        },
        icon() {
            if(this.c_name != 'none') {
                return this.$store.state.ColorList[this.sim_num].tf == true ? false : true
            }
        }
    },
    
}
</script>