class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.maxQuality = 50
    this.minQuality = 0
  }

  decreaseSellIn(){
    this.sellIn -= 1
  }

  decreaseQuality(factor = 1){
    this.quality = Math.max(this.quality - factor, this.minQuality)
  }

  increaseQuality(factor = 1){
    this.quality = Math.min(this.quality + factor, this.maxQuality)
  }

  isExpired(){
    return this.sellIn < 0
  }
}

/**
 * Performs a deep copy for each item in the list
 */
function copyItems(items){
  // Why Js just why...
  return items.map((it) => {return Object.assign(
    Object.create(Object.getPrototypeOf(it))
    , it)})
}
class Shop {
  // we need a deep copy when testing to compare old and previous value
  constructor(items = [], copy = false) {
    if (copy){
      this.items = copyItems(items)
    }
    else{
      this.items = items;
    }
  }

  updateQuality() {
    for (const item of this.items){
      if(item.name === "Sulfuras, Hand of Ragnaros"){
        continue
      }

      item.decreaseSellIn()

      if(item.name === "Aged Brie"){
        item.increaseQuality(1)
        continue
      }

      if(item.name === "Backstage passes to a TAFKAL80ETC concert"){
        if(item.isExpired()){
          item.quality = 0
          continue
        }

        if(item.sellIn <= 5){
          item.increaseQuality(3)
          continue
        }

        if(item.sellIn <= 10){
          item.increaseQuality(2)
          continue
        }

        item.increaseQuality(1)
        continue
      }

      if(item.name === "Conjured Mana Cake"){
        if (item.isExpired()) {
          item.decreaseQuality(4)
        }
        else {
          item.decreaseQuality(2)
        }
      }
      else{
        if (item.isExpired()) {
          item.decreaseQuality(2)
        }
        else {
          item.decreaseQuality(1)
        }
      }
    }

    return copyItems(this.items)
  }
}

module.exports = {
  Item,
  Shop
};
