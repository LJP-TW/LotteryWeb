var menu = new Vue({
    el: '#menu',

    data: {
        msg: [[ {mode: '五星直選複式', content: '從萬位、千位、百位、十位、個位各選一個號碼組成一注。'},
                {mode: '五星直選單式', content: '手動輸入號碼，至少輸入1個五位數號碼組成一注(一次最大可投注100000注)。'},
                {mode: '五星直選組合', content: '從萬位、千位、百位、十位、個位各選一個號碼組成五注。'}]]
    },

    methods: {
        click(row, column) {
            info.mode = this.msg[row][column].mode;
            info.content = this.msg[row][column].content;
        }
    }
});

var info = new Vue({
    el: '#info',

    data: {
        mode: '',
        content: ''
    },

    methods: {
    }
});

menu.click(0, 0);
