var menu = new Vue({
    el: '#menu',

    data: {
        activeBtn: 'btn00',
        msg: [[ {modeText: '五星直選複式', content: '從萬位、千位、百位、十位、個位各選一個號碼組成一注。', mode: 'n'},
                {modeText: '五星直選單式', content: '手動輸入號碼，至少輸入1個五位數號碼組成一注(一次最大可投注100000注)。', mode: 't'},
                {modeText: '五星直選組合', content: '從萬位、千位、百位、十位、個位各選一個號碼組成五注。', mode: 'n'}]]
    },

    methods: {
        click(row, column) {
            info.modeText = this.msg[row][column].modeText;
            info.content = this.msg[row][column].content;
            this.activeBtn = 'btn' + row + column;
            betForm.mode = this.msg[row][column].mode;
        }
    }
});

var info = new Vue({
    el: '#info',

    data: {
        modeText: '',
        content: ''
    },

    methods: {
    },

    watch: {
        modeText: function (newModeText, oldModeText) {
            betForm.clearAll();
        }
    }
});


const pickBtn2_Words = ['全', '奇', '偶', '大', '小', '清'];

var betForm = new Vue({
    el: '#betForm',

    data: {
        mode: 'n',
        pickBtn2_Words,
        n10000: [],
        n1000: [],
        n100: [],
        n10: [],
        n1: []
    },

    methods: {
        pickBtnClick(grp, num) {
            const index = this[grp].findIndex(t => t == num);

            if (index >= 0)
            {
                this[grp].splice(index, 1);
            }
            else
            {
                this[grp].push(num);
            }
        },

        pickBtnClass(grp, num) {
            const isActive = this[grp].includes(num);

            return {
                'active': isActive
            };
        },

        pickBtn2Click(grp, num) {
            switch (num) {
                case 0:
                    this[grp].splice(0, this[grp].length);
                    for (let i = 0; i < 10; ++i) {
                        this[grp].push(i);
                    }
                    break;
                case 1:
                    this[grp].splice(0, this[grp].length);
                    for (let i = 1; i < 10; i += 2) {
                        this[grp].push(i);
                    }
                    break;
                case 2:
                    this[grp].splice(0, this[grp].length);
                    for (let i = 0; i < 10; i += 2) {
                        this[grp].push(i);
                    }
                    break;
                case 3:
                    this[grp].splice(0, this[grp].length);
                    for (let i = 5; i < 10; ++i) {
                        this[grp].push(i);
                    }
                    break;
                case 4:
                    this[grp].splice(0, this[grp].length);
                    for (let i = 0; i < 5; ++i) {
                        this[grp].push(i);
                    }
                    break;
                case 5:
                    this[grp].splice(0, this[grp].length);
                    break;
                default:
                    break;
            }
        },

        clearAll() {
            this.n10000.splice(0, this.n10000.length);
            this.n1000.splice(0, this.n1000.length);
            this.n100.splice(0, this.n100.length);
            this.n10.splice(0, this.n10.length);
            this.n1.splice(0, this.n1.length);
        }
    }
});

menu.click(0, 0);
