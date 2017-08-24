function ClozeCard(s, w) {
    this.statement = s;
    this.answer = w;
    var reg = new RegExp(this.answer,"gi");

    if(this.statement.match(reg)){
        this.found = true;
        this.question = this.statement.replace(reg, ' ... ');
    } else {
        this.found = false;
    }
    
};

module.exports = ClozeCard;