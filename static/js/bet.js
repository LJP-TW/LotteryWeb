var menu = new Vue({
    el: '#menu',

    data: {
        activeBtn: 'btn00',
        msg: [[ {modeText: '五星直選複式', content: '從萬位、千位、百位、十位、個位各選一個號碼組成一注。', mode: 'n1'},
                {modeText: '五星直選單式', content: '手動輸入號碼，至少輸入1個五位數號碼組成一注(一次最大可投注100000注)。', mode: 't'},
                {modeText: '五星直選組合', content: '從萬位、千位、百位、十位、個位各選一個號碼組成五注。', mode: 'n5'}]]
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
function compareNum(a, b) {
    return a - b;
}

var betForm = new Vue({
    el: '#betForm',

    data: {
        mode: 'n1',
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
                this[grp].sort(compareNum);
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
        },
        
        nCountTickets() {
            betTable.tickets = this.n10000.length * 
                               this.n1000.length * 
                               this.n100.length * 
                               this.n10.length * 
                               this.n1.length;
            if (this.mode === 'n5') {
                betTable.tickets *= 5;
            }
        }
    },
    
    watch: {
        n10000: function(n, o) {
            this.nCountTickets();
        },
        n1000: function(n, o) {
            this.nCountTickets();
        },
        n100: function(n, o) {
            this.nCountTickets();
        },
        n10: function(n, o) {
            this.nCountTickets();
        },
        n1: function(n, o) {
            this.nCountTickets();
        }
    }
});

var betTable = new Vue({
    el: '#betTable',
    
    data: {
        tickets: 0,
        odds: 1,
        unit: 1
    },
    
    methods: {
        oddsDecrease() {
            --this.odds;
        },
        
        oddsIncrease() {
            ++this.odds;
        },
        
        done() {
            if (this.tickets === 0) {
                //
            }
            else {
                let numPack = [];
                let numAllStr = '';
                let numStr = '';
                let money = (this.tickets * this.odds * (this.unit * 1000)) / 1000;
                
                if (betForm.mode === 'n1' || betForm.mode === 'n5') {
                    for (let i of betForm.n10000) {
                        numAllStr += i;
                    }
                    numAllStr += ',';
                    for (let i of betForm.n1000) {
                        numAllStr += i;
                    }
                    numAllStr += ',';
                    for (let i of betForm.n100) {
                        numAllStr += i;
                    }
                    numAllStr += ',';
                    for (let i of betForm.n10) {
                        numAllStr += i;
                    }
                    numAllStr += ',';
                    for (let i of betForm.n1) {
                        numAllStr += i;
                    }
                    
                    if (numAllStr.length > 10) {
                        numStr = numAllStr.slice(0, 10);
                        numStr += ' ...';
                    }
                    else {
                        numStr = numAllStr;
                    }
                    
                    betForm.n10000 = [];
                    betForm.n1000 = [];
                    betForm.n100 = [];
                    betForm.n10 = [];
                    betForm.n1 = [];
                }
                
                betVerify.turnover.push({
                    id: betVerify.turnoverID,
                    mode: betForm.mode,
                    modeText: info.modeText,
                    num: numAllStr,
                    numStr: numStr,
                    grpAmount: this.tickets,
                    odds: this.odds,
                    money: money
                });
                
                betVerify.totalMoney = (betVerify.totalMoney * 1000 + money * 1000) / 1000;
                betVerify.totalTurnover += 1;
                betVerify.totalTickets += this.tickets;
                betVerify.turnoverID += 1;
            }
        }
    },
    
    watch: {
        odds: function (newOdds, oldOdds) {
            var i = newOdds.length;
            
            if (i === 0) {
                this.odds = 1;
            }
            else {
                while (i--) {
                    if (!(newOdds[i] >= '0' && newOdds[i] <= '9')) {
                        newOdds = newOdds.slice(0, i) + newOdds.slice(i + 1, newOdds.length);
                    }
                }
                this.odds = newOdds;
                if (this.odds == 0) {
                    this.odds = 1;
                }
            }
        }
    }
});

var betVerify = new Vue({
    el: '#betVerify',
    
    data: {
        turnoverID: 0,
        turnover: [],
        totalTurnover: 0,
        totalTickets: 0,
        totalMoney: 0
    },
    
    methods: {
        clear() {
            this.turnoverID = 0;
            this.turnover = [];
            this.totalTurnover = 0;
            this.totalTickets = 0;
            this.totalMoney = 0;
        },
        
        deleteElement(id) {
            for (let i in this.turnover) {
                if (this.turnover[i].id === id) {
                    this.totalTurnover -= 1;
                    this.totalTickets -= this.turnover[i].grpAmount;
                    this.totalMoney = (this.totalMoney * 1000 - this.turnover[i].money * 1000) / 1000;
                    this.turnover.splice(i, 1);
                    break;
                }
            }
        },
        
        verify() {
            // Insert data to database
            // Trigger betHistory to refetch data from database
        }
    },
    
    watch: {
        turnover: function(n, o) {
            betForm.clearAll();
        }
    }
});

var betHistory = new Vue({
    el: '#betHistory',
    
    data: {
        history: []
    },
    
    methods: {
        // Provide a method refetching data from database
    }
    
    // Fetch data at construction
});

menu.click(0, 0);
