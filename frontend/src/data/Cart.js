export default class Cart {
    constructor(
        id,
        products,
        packages,
        totalCartItems,
        totalCartPrice,
        totalPriceAfterCoupon,
        coupon
    ) {
        this.id = id;
        this.products = products || [];
        this.packages = packages || [];
        this.totalCartItems = totalCartItems || 0;
        this.totalCartPrice = totalCartPrice || 0;
        this.totalPriceAfterCoupon = totalPriceAfterCoupon || 0;
        this.coupon = coupon || '';
    }
}
