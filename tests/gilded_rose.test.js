const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  let gildedRose
  let original_items

  // This is here to avoid code redundancy
  beforeEach(() => {
    original_items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 12),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];
    gildedRose = new Shop(original_items, true);
  })

  it("should not modify item name", () => {
    const updatedItems = gildedRose.updateQuality();
    updatedItems[0].decreaseSellIn()
    expect(updatedItems[0].name).toBe(original_items[0].name);
  });

  it("should decrease sellIn and quality", () => {
    const updatedItems = gildedRose.updateQuality()
    // regular objects in shop
    expect(updatedItems[0].sellIn).toBe(original_items[0].sellIn - 1)
    expect(updatedItems[0].quality).toBe(original_items[0].quality -1 )

    expect(updatedItems[2].sellIn).toBe(original_items[2].sellIn - 1)
    expect(updatedItems[2].quality).toBe(original_items[2].quality -1 )
  })

  it("should decrease quality faster when expired", () =>{
    let updatedItems = gildedRose.updateQuality()
    while(updatedItems[0].sellIn > 0){
      updatedItems = gildedRose.updateQuality()
    }

    const expiredItems = gildedRose.updateQuality()
    expect(expiredItems[0].sellIn).toBe(updatedItems[0].sellIn - 1)
    expect(expiredItems[0].quality).toBe(updatedItems[0].quality -2)
  })

  it("should not have negative quality", () => {
    let updatedItems = gildedRose.updateQuality()
    while(updatedItems[0].quality > 0){
      updatedItems = gildedRose.updateQuality()
    }

    const zeroQualityItems = gildedRose.updateQuality()
    expect(zeroQualityItems[0].sellIn).toBe(updatedItems[0].sellIn - 1)
    expect(zeroQualityItems[0].quality).toBe(updatedItems[0].quality)
  })

  it("should increase Aged Brie Quality", () => {
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems[1].sellIn).toBe(original_items[1].sellIn - 1)
    expect(updatedItems[1].quality).toBe(original_items[1].quality + 1)
    
  })

  it("should not increase quality over 50", () => {
    let updatedItems = gildedRose.updateQuality()
    // we increase quality of the brie
    while(updatedItems[1].quality < 50){
      updatedItems = gildedRose.updateQuality()
    }
    const maxQualityItems = gildedRose.updateQuality()

    expect(maxQualityItems[1].sellIn).toBe(updatedItems[1].sellIn -1)
    expect(maxQualityItems[1].quality).toBe(updatedItems[1].quality)
  })

  it("should not decrease legendary item's quality", () =>{
    const updatedItems = gildedRose.updateQuality()

    // legendary objects in shop
    expect(updatedItems[3].sellIn).toBe(original_items[3].sellIn)
    expect(updatedItems[3].quality).toBe(original_items[3].quality)

    expect(updatedItems[4].sellIn).toBe(original_items[4].sellIn)
    expect(updatedItems[4].quality).toBe(original_items[4].quality)
  })

  it("should increase passes 'quality", () => {
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems[5].sellIn).toBe(original_items[5].sellIn - 1)
    expect(updatedItems[5].quality).toBe(original_items[5].quality + 1)
  })

  it("should increase passes quality when 10 days or less", () => {
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems[6].sellIn).toBe(original_items[6].sellIn - 1)
    expect(updatedItems[6].quality).toBe(original_items[6].quality + 2)
  })

  it("should increase passes quality when 5 days or less", () => {
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems[7].sellIn).toBe(original_items[7].sellIn - 1)
    expect(updatedItems[7].quality).toBe(original_items[7].quality + 3)
  })

  it("should drop passes quality to 0 when expired", () => {
    let updatedItems = gildedRose.updateQuality()
    while(updatedItems[7].sellIn > 0){
      updatedItems = gildedRose.updateQuality()
    }
    const expiredItems = gildedRose.updateQuality()

    expect(expiredItems[7].sellIn).toBe(updatedItems[7].sellIn - 1)
    expect(expiredItems[7].quality).toBe(0)
  })

  it("should decrease conjured items faster", () => {
    const updatedItems = gildedRose.updateQuality()
    expect(updatedItems[8].sellIn).toBe(original_items[8].sellIn - 1)
    expect(updatedItems[8].quality).toBe(original_items[8].quality - 2)
  })
});
