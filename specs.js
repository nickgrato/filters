/**
 * This file expresses all of the specification used in the filter 
 * for collecttions
 * - Price Specification
 * - And Specification ('blue' And 'Small')
 * - Or Specification ('blue' Or 'black')
 * 
 * - MegaFilter
 */


export class PriceSpecification {
  /**
   * @param {min: Number, max: Number} price
   */
  constructor(price) {
    this.min = price.min
    this.max = price.max
  }

  /**
   * Spec Description
   * @param {Product} product
   */
  isSatisfied(product) {
    const product_price = product.price / 100
    return product_price <= this.max && product_price >= this.min
  }
}


export class StoreSpecification {
  /**
   * @param {min: Number, max: Number} price
   */
  constructor(storeIds) {
    this.storeIds = storeIds
  }

  /**
   * Spec Description
   * @param {Features} features/store
   */
  isSatisfied(features) {
    if(!this.storeIds.length) return true

    return this.storeIds.indexOf(features.properties.storeId) !== -1
  }
}


export class StoreProductSpecification {
  /**
   * @param {Array} products
   */
  constructor(products) {
    this.products = products
  }

  /**
   * Spec Description
   * @param {Features} features 
   */
  isSatisfied(features) {
    let found = false
    if(!this.products.length) return true

    features.properties.products.forEach(product => {
      const index = this.products.indexOf(product)
      if(index !== -1 ) {
        found = true;
      }
    })
    return found
  }
} 


/**
 * 'And' specification example blue 'AND' small will only satifisy,
 * this is used as a relationship between two specification blocks.
 */
export class AndSpecification {
  /** 
   * @param  {Specs} specs 
   */
  constructor(...specs) {
    this.specs = specs
  }

  isSatisfied(product) {
    return this.specs.every((spec) => spec.isSatisfied(product))
  }
}


/**
 * 'OR' specification example blue 'OR' white will satifisy, this
 * is used as a relationship between filter values in a specific specification.
 */
export class OrSpecification {
  /** 
   * @param  {Specs} specs 
   */
  constructor(...specs) {
    this.specs = specs
  }

  isSatisfied(product) {
    return this.specs.some((spec) => spec.isSatisfied(product))
  }
}



export class MegaFilter {
  /**
   * @param {Product} products 
   * @param {Spec} spec 
   */
  filter(products, spec) {
    return products.filter((product) => spec.isSatisfied(product))
  }
}
