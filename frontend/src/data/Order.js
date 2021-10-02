export default class Order {
    constructor(id, products, packages, coupon, reports, characterName) {
        this.user_id = id;
        this.products = products || [];
        this.packages = packages || [];
        this.coupon = coupon || '';
        this.reports = reports || '';
        this.characterName = characterName;
    }
}
